/*
 * jQuery Sheetrock
 * Quickly connect to, query, and lazy-load data from Google Spreadsheets
 * http://github.com/chriszarate/Sheetrock
 */

;(function($) {

  $.fn.sheetrock = function(options) {

    // Load options.
    options = _options($.extend({}, $.fn.sheetrock.options, options), this);

    // Abort if options were not validated.
    if(!options) return this;

    // Show loading indicator.
    if(options.loading) options.loading.show();

    // Enable chunking, if requested, and store offset as jQuery.data.
    if(options.chunkSize) {
      options.sql += ' limit ' + (options.chunkSize + 1) + ' offset ' + options.offset;
      $.data(this[0], _offset, options.offset + options.chunkSize);
    }

    // Create callback environment and turn on `working` flag.
    options.callback = 'sheetrock_' + _callbackIndex++;
    $.fn.sheetrock.working++;

    // Create AJAX request parameters from config options.
    var params = _params(options);

    // Send request.
    $.ajax({

      data: params,
      context: options,
      url: 'https://spreadsheets.google.com/tq',

      dataType: 'jsonp',
      cache: true,
      jsonp: false,
      jsonpCallback: options.callback,

      success: function(data) {

        // IF valid THEN process ELSE error.
        if(_validate(data)) {
          this.dataHandler(data, this);
        } else {
          if(this.target) $.data(this.target[0], _error, 1);
        }

        // Clean up.
        if(this.loading) this.loading.hide();
        if(this.userCallback) this.userCallback(this);
        $.fn.sheetrock.working--;

      }

    });

    return this;

  };


  /* Callback index */

  var _callbackIndex = 0;


  /* Data parsing */

  // Validate returned data.
  var _validate = function(data) {

    // Check for successful response types.
    if(_has(data, 'status') && (data.status === 'ok' || data.status === 'warning') && _has(data, 'table')) {

      // Enumerate any warnings.
      if(_has(data, 'warnings')) {
        $.each(data.warnings, function(i, warning) { _log(warning); });
      }

      return true;

    } else {

      // Enumerate any errors.
      if(_has(data, 'errors')) {
        $.each(data.errors, function(i, error) {
          _log(error.message);
          _log(error.detailed_message);
        });
      }

      return false;

    }

  }

  // Parse data, row by row.
  var _parse = function(data, options) {

    // Debug returned data
    // _log(data);

    // The Google API generates an unrecoverable error when the 'offset' 
    // is larger than the number of available rows. As a workaround, we 
    // request one more row than we need and stop when we see less rows 
    // than we requested.

    var last   = (options.chunkSize) ? Math.min(data.table.rows.length, options.chunkSize) : data.table.rows.length;
    var loaded = (!options.chunkSize || last < options.chunkSize) ? 1 : 0;

    // Store loaded status on target element.
    if(options.target) $.data(options.target[0], _loaded, loaded);

    // If no column labels are provided (or if there are too many or too 
    // few), use the returned column labels.
    var labels = (options.labels && options.labels.length == data.table.cols.length) ? options.labels : _labels(data.table.cols);

    // Output a header row unless told otherwise.
    if(!options.headers) options.target.append(options.rowHandler(_obj(labels), 0));

    // Each table cell ('c') can contain two properties: 'p' contains 
    // formatting and 'v' contains the actual cell value.

    $.each(data.table.rows, function(i, obj) {

      if(_has(obj, 'c') && i < last) {

        var objData = {
          num: options.offset + i + 1,
          cells: {}
        }

        $.each(obj.c, function(x, cell) {
          var style = (options.formatting) ? _style(cell) : false;
          var value = (cell && _has(cell, 'v')) ? options.cellHandler(cell.v) : '';
          objData.cells[labels[x]] = (style) ? _wrap(value, 'span', style) : value;
        });

        // Pass to row handler and append to target.
        options.target.append(options.rowHandler(objData));

      }

    });


  }


  /* Validation and assembly */

  // Validate user-passed options.
  var _options = function(options, target) {

    // Debug options
    // _log(options);

    // Get spreadsheet key and gid.
    options.key = _key(options.url) || false;
    options.gid = _gid(options.url) || false;

    // Validate chunk size and header rows.
    options.chunkSize = (target.length) ? parseInt(options.chunkSize) || 0 : 0;
    options.offset = (options.chunkSize) ? parseInt($.data(target[0], _offset)) || 0 : 0;
    options.headers = parseInt(options.headers) || 0;

    // Add `this` to callback context.
    options.target = (target.length) ? target : false;

    // Determine if the data is already loaded or previously generated an error.
    var loaded = (target.length) ? parseInt($.data(target[0], _loaded)) || 0 : 0;
    var error  = (target.length) ? parseInt($.data(target[0], _error))  || 0 : 0;

    // Make sure `loading` is a jQuery object.
    if(options.loading && !(options.loading instanceof jQuery)) options.loading = $(options.loading);

    // Require `this` or a handler to receive the data.
    if(!target.length && options.dataHandler === _parse) {
      _log('Error: No element targeted or data handler provided.');
      return false;
    // Abort for finished or error-generating requests.
    } else if(loaded) {
      _log('Halt: No more rows to load!');
      return false;
    } else if(error) {
      _log('Halt: A previous request for this resource failed.');
      return false;
    // Require a spreadsheet URL.
    } else if(!options.url) {
      _log('Error: No spreadsheet URL provided.');
      return false;
    // Require a spreadsheet key.
    } else if(!options.key) {
      _log('Error: Could not find a key in the provided URL.');
      return false;
    // Require a spreadsheet gid.
    } else if(!options.gid) {
      _log('Error: Could not find a gid in the provided URL.');
      return false;
    }

    return options;

  }

  // Create AJAX request paramater object.
  var _params = function(options) {

    var params = {
      key: options.key,
      gid: options.gid,
      tqx: 'responseHandler:' + options.callback
    };

    // Optional SQL request.
    if(options.sql) params.tq = options.sql;

    return params;
 
  }


  /* Miscellaneous functions */

  // Trim string.
  var _trim = function(str) {
    return str.toString().replace(/^ +/, '').replace(/ +$/, '');
  }

  // Shorthand object property lookup.
  var _has = function(obj, prop) {
    return (typeof obj[prop] === 'undefined') ? false : true;
  }

  // Shorthand log to console.
  var _log = function(item) {
    console.log(item);
  }

  // Extract the key from a spreadsheet URL.
  var _key = function(url) {
    var keyRegExp = new RegExp('key=([a-z0-9]{30,})&?','i');
    return (keyRegExp.test(url)) ? url.match(keyRegExp)[1] : false;
  }

  // Extract the gid from a spreadsheet URL.
  var _gid = function(url) {
    var gidRegExp = new RegExp('gid=([0-9]+)','i');
    return (gidRegExp.test(url)) ? url.match(gidRegExp)[1] : false;
  }

  // Get column labels from returned data.
  var _labels = function(cols) {
    var labels = [];
    $.each(cols, function(i, obj) {
      labels[i] = (_has(obj, 'label')) ? obj.label.replace(/ /, '') : obj.id;
    });
    return labels;
  }

  // Convert array to object.
  var _obj = function(arr) {
    var obj = {};
    $.each(arr, function(i, str) { obj[str] = str; });
    return obj;
  }

  // Extract formatting from a Google spreadsheet cell.
  var _style = function(cell) {
    return (cell && _has(cell, 'p') && _has(cell.p, 'style')) ? cell.p.style : false;
  }

  // Output object to HTML (default row handler).
  var _output = function(row) {
    var str = '', tag = (row.num) ? 'td' : 'th';
    for(prop in row.cells) str += _wrap(row.cells[prop], tag, '');
    return _wrap(str, 'tr', '');
  }

  // Wrap string in tag.
  var _wrap = function(str, tag, style) {
    attr = (style) ? ' style="' + style + '"' : ''
    return '<' + tag + attr + '>' + str + '</' + tag + '>';
  }


  /* Data labels */

  var _error  = 'sheetrock-error',
      _loaded = 'sheetrock-loaded',
      _offset = 'sheetrock-row-offset';


  /* Default options */

  $.fn.sheetrock.options = {

    // You must provide, at minimum, the `url` of your spreadsheet. 
    // Everything else is optional! Defaults can be overridden either 
    // globally ($.fn.sheetrock.key = value) or per-call using the 
    // passed options object.

    url:        '',     // String  -- Google spreadsheet URL

    headers:    0,      // Integer -- Number of header rows to skip
    labels:     [],     // Array   -- Override returned column labels
    formatting: false,  // Boolean -- Include Google HTML formatting
    chunkSize:  0,      // Integer -- Number of rows to fetch (0 = all)

    sql:        '',     // String  -- Google Visualization query (SQL-like)

    // Providing a row handler is the recommended way to override the 
    // default data formatting. This function should accept a row object 
    // and a row number (header = 0, first data row = 1). The properties 
    // of this object will be named after its column labels. Your function 
    // should return content (a DOM/jQuery object or an HTML string) that 
    // is ready to be appended to your target element. A very easy way to 
    // do this is to provide an Underscore.js template (which is itself a 
    // function).

    rowHandler: _output,  // Function

    // This function is used to process every cell value. It should return 
    // a string. The provided default is a simple trim function.

    cellHandler: _trim,  // Function

    // Providing your own data handler means you don't want any processing 
    // to take place except for basic validation. The returned data, if 
    // valid, is passed to your data handler (along with an options hash) 
    // and it will be completely up to you to do something with it. The 
    // cell handler and row handler functions will not be called.

    dataHandler: _parse,  // Function

    // You can provide a function to be called when all processing is 
    // complete. The options hash is passed to this function.

    userCallback: false,  // Function

    // If you have a loading indicator in your page, provide a jQuery object 
    // or selector here. It will be shown when the request starts and hidden 
    // when it ends.

    loading: false  // jQuery object or selector

  };

  // This property is set to the number of active requests. This can be useful 
  // for monitoring or for infinite scroll bindings.

  $.fn.sheetrock.working = 0;

})(jQuery);