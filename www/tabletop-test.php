<!DOCTYPE html>
<html>
	</head>
		<link href='http://fonts.googleapis.com/css?family=Ropa+Sans:400,400italic|Balthazar|Six+Caps' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/style.css">
	</head>
  <body>

<p>regularseason has date, mm, dd, yyyy, dbl, ha, opp, res, soxscor, oppscor, extr, wpit, lpit, spit, spec, time, dn</p>

    <div id="data"></div>

    <script type="text/javascript" src="js/libs/tabletop.js"></script>
    <script type="text/javascript">
      var a;
      window.onload = function() { init() };

      var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Apvvlouo3eMgdHhDWF9vTThTODlxRnFMMWVjd09GdWc&output=htm';

      function init() {
        a = Tabletop({
            key: public_spreadsheet_url,
            callback: showInfo,
            simpleSheet: true
        });
      }

      var count = 0;

      function showInfo(data, tabletop) {
        // data comes through as a simple array since simpleSheet is turned on
        var div = document.getElementById('data'),
            html = "",
            prop, i;
            
         //regularseason has date, mm, dd, yyyy, dbl, ha, opp, res, soxscor, oppscor, extr, wpit, lpit, spit, spec, time, dn

   
        for(i = 0; i < data.length; i++) {
        
        //		<div class="game boswin"> <div class="gamedate">Sep 25, 2011</div><div class="gamescore"><span class="ny">NY 4</span> - <span class="bos">BOS 7</span></div></div>
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
			if(data[i].ha = "Vs") {html += 'NYA';}else {html += 'BOS';}
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
      }
      
      	function pad2(number) {
			return (number < 10 ? '0' : '') + number
		}
      
      document.write("The published spreadsheet is<a target='_new' href='" + public_spreadsheet_url + "'>" + here + "</a>");    
    </script>
  </body>
</html>
