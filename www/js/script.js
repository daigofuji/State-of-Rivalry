/* Author: Daigo Fujiwara (so far, please add yourself )

*/


 var a, countw=0, countl=0, countt=0;

 $(document).ready(function() {
		getgames();
		
		
});

     
      var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Apvvlouo3eMgdHhDWF9vTThTODlxRnFMMWVjd09GdWc&output=htm';

      function getgames() {
        a = Tabletop({
            key: public_spreadsheet_url,
            callback: showInfo,
            simpleSheet: true
        });
      }

      var count = 0;

      function showInfo(data, tabletop) {
        // data comes through as a simple array since simpleSheet is turned on
        var div = document.getElementById('games'),
            html = "",
            prop, i;
            
         //regularseason has date, mm, dd, yyyy, dbl, ha, opp, res, soxscor, oppscor, extr, wpit, lpit, spit, spec, time, dn

   		// create games        
   		//		<div class="game boswin"> <div class="gamedate">Sep 25, 2011</div><div class="gamescore"><span class="ny">NY 4</span> - <span class="bos">BOS 7</span></div></div>
   
        for(i = 0; i < data.length; i++) {
        
        	//counting
        	if (data[i].res=="W") {countw++; console.log(countw)}
        	if (data[i].res=="L") {countl++; console.log(countl)}
        	if (data[i].res=="T") {countt++; console.log(countt)}

		html += '<div class="game ' + data[i].res + ' y'  + data[i].yyyy + ' m'  + data[i].mm + ' d'  + data[i].dd + ' ' + data[i].ha + ' bos' + data[i].soxscor + ' nyy' + data[i].oppscor + ' ' + data[i].dn + ' ex' + data[i].extr + '"> ' ;
		
		html += '<div class="gamedate">';
		
		//link to retrosheet 
		
		html += '<a href="http://www.retrosheet.org/boxesetc/' + data[i].yyyy +'/'
		;
		
		//before 1917 redirect to game page
		if(data[i].yyyy < 1918){
			html += pad2(data[i].mm) + pad2(data[i].dd) + data[i].yyyy + '.htm'; 
		} else {
			html += 'B' + pad2(data[i].mm) + pad2(data[i].dd) + data[i].dbl;
			if(data[i].ha == 'Vs') {html += 'BOS';} else {html += 'NYA';}
			html += data[i].yyyy + '.htm';
		}
		
		
		html += '" target ="_blank">';
		//end link
		
		//covert month name
		switch (data[i].mm) {
			case '1' : html += 'Jan '; break;
			case '2' : html += 'Feb '; break;
			case '3' : html += 'Mar '; break;
			case '4' : html += 'Apr '; break;
			case '5' : html += 'May '; break;
			case '6' : html += 'Jun '; break;
			case '7' : html += 'Jul '; break;
			case '8' : html += 'Aug '; break;
			case '9' : html += 'Sept '; break;
			case '10' : html += 'Oct '; break;
			case '11' : html += 'Nov '; break;
			case '12' : html += 'Dec ';
		}	
		
		
		
		html += data[i].dd + ', ' + data[i].yyyy +'</a></div>';
        
        html += '<div class="gamescore"><span class="bos">BOS ' + data[i].soxscor +'</span>-<span class="ny">NY '+ data[i].oppscor  + '</span></div>'
        /*
          for(prop in data[i]) {
            html = html + "&nbsp;-&nbsp;" + data[i][prop];
          }
         */ 
          html = html + "</div>";
         // ending game div here
        }
        div.innerHTML = div.innerHTML + html;
        
        $('#ny_total').html(number_format(countl));
		$('#bos_total').html(number_format(countw));
		$('#tie_total').html(number_format(countt));
		$('#loading').slideUp();
		

      }
      
      	function pad2(number) {
			return (number < 10 ? '0' : '') + number
		}


function number_format (number, decimals, dec_point, thousands_sep) {
    // https://raw.github.com/kvz/phpjs/master/functions/strings/number_format.js
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}