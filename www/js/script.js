/* Author: Daigo Fujiwara (so far, please add yourself ) */

 $(document).ready(function() {
		getgames();

	$(".filter").change(function() {
		//console.log("changed");
		filtergames();
		countwinloss();
	});

	
	
});

//table top http://builtbybalance.com/Tabletop/

var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Apvvlouo3eMgdHhDWF9vTThTODlxRnFMMWVjd09GdWc&output=htm';

function getgames() {
        var a = Tabletop({
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

	// creating games

	//var a, countw=0, countl=0, countt=0;

	for(i = 0; i < data.length; i++) {
        
        
        /* desired output -- underscore template style - still working
 
        */
        


		html += '<div class="game ' + data[i].res +' y'+ data[i].yyyy +' '+ data[i].ha +' '+ data[i].dn +'"';

		//start loading the database info on this div -- used by infobox
		html += 'data-res="' + data[i].res + '"';
		html += 'data-year="' + data[i].yyyy + '"';
		html += 'data-playoff="' + data[i].playoff + '"';
		html += 'data-mm="' + data[i].mm + '"';
		html += 'data-dd="' + data[i].dd + '"';
		html += 'data-dbl="' + data[i].dbl + '"';
		html += 'data-soxscor="' + data[i].soxscor + '"';
		html += 'data-oppscor="' + data[i].oppscor + '"';
		html += 'data-rundiff="' + (data[i].soxscor - data[i].oppscor) + '"';

		//shutouts?
		if(data[i].soxscor == 0 || data[i].oppscor == 0) { html += 'data-shut="1"'; } else {html += 'data-shut="0"'; }
		//blowouts?
		if(data[i].soxscor - data[i].oppscor > 4 || data[i].soxscor - data[i].oppscor < -4) { html += 'data-blow="1"'; } else {html += 'data-blow="0"'; }
		//one run?
		if(data[i].soxscor - data[i].oppscor == 1 || data[i].soxscor - data[i].oppscor == -1) { html += 'data-one="1"'; } else {html += 'data-one="0"'; }

		
		
		html += 'data-ha="' + data[i].ha + '"';
		//
		if(data[i].ha === "Vs") {html += 'data-hometeam="Boston"'; }
			else if (data[i].ha === "At") {html += 'data-hometeam="New York"'; }
				else  {html += 'data-hometeam="N/A"'; }
		if(data[i].wpit) { html += 'data-wpit="' + data[i].wpit + '"'; } else {html += 'data-wpit="N/A"'; }
		if(data[i].lpit) { html += 'data-lpit="' + data[i].lpit + '"'; } else {html += 'data-lpit="N/A"'; }
		if(data[i].spit) { html += 'data-spit="' + data[i].spit + '"'; } else {html += 'data-spit="-"'; }
		if(data[i].spec) { html += 'data-spec="' + number_format(data[i].spec) + '"'; } else {html += 'data-spec="N/A"'; }
		if(data[i].time) { html += 'data-time="' + data[i].time + '"'; } else {html += 'data-time="N/A"'; }
		if(data[i].dn) { html += 'data-dn="' + data[i].dn + '"'; } else {html += 'data-dn="N/A"'; }
		
		
		html += '>'; // end beginning of div
		html += '<div class="gamedate">';

		html += '<a target ="_blank" href="';

		html += get_box_url(data[i].yyyy, data[i].mm, data[i].dd, data[i].ha, data[i].dbl);
		
		html += '">';

		
		
		html += spell_month(data[i].mm) + ' ' + data[i].dd + ', ' + data[i].yyyy +'</a></div>'; // end game date

		html += '<div class="gamescore"><span class="bos">BOS ' + data[i].soxscor +'</span>-<span class="ny">NY '+ data[i].oppscor  + '</span>'; 
		//if extra innings 
		if (data[i].extr){ html += ' <span class="extra">(' + data[i].extr + ')</span>';}
		
		html += '</div>'; //end game score


		html = html + "</div>";
		// ending game div here
		}

		div.innerHTML = div.innerHTML + html;

		countwinloss();

		//enable tooltip 
		$(".game").hover( function () {
				$("#tip-wpit").text($(this).attr("data-wpit"));
				$("#tip-lpit").text($(this).attr("data-lpit"));
				$("#tip-spit").text($(this).attr("data-spit"));
				$("#tip-hometeam").text($(this).attr("data-hometeam"));
				$("#tip-time").text($(this).attr("data-time").replace(/(\s+)?:00$/, ""));
				$("#tip-spec").text($(this).attr("data-spec"));
				$("#tip-dn").text($(this).attr("data-dn"));
				
				var leftposition = $(this).offset().left;
				var thisw = $(this).width()/2;
				var tipw = $("#tooltip").width()/2;
				var tipx = leftposition + thisw - tipw -4;
				$("#tooltip").css("left", tipx + "px"); 
				
				var tipy = $(this).offset().top + $(this).height() + 8;
				$("#tooltip").css("top", tipy + "px");
		
				$("#tooltip").fadeIn("fast");
			}, function (){
				$("#tooltip").hide();
		});




		// remove loading
		$('#loading').slideUp();
}


function filtergames(){

	//hide the win total
	$('#alltime-score dl').hide();
	
	//regularseason has date, mm, dd, yyyy, dbl, ha, opp, res, soxscor, oppscor, extr, wpit, lpit, spit, spec, time, dn
 	//first shaw all the games
   	$('.game').show();
   	//runs?
	   if ($('#sel-runs').val() === 'all') { 
			// do nothing!
		} else {
			//console.log("you selected " + $('#sel-runs').val() );
			// sel runs values are shut one and blow
			 $('[data-'+$('#sel-runs').val()+'="0"]').hide();
		}
	//Home or away?
		if ($('#sel-ha').val() === 'all') {
			//do nothing!
		} else {
			// hide if the selection (Vs/At) does not match 
			 $('.game:not([data-ha="'+ $('#sel-ha').val()+'"])').hide();
		}
	//is it day/night?
		if ($('#sel-dn').val() === 'all') {
			//do nothing! Show all
		} else {
			//hide unmatch
			 $('.game:not([data-dn="'+ $('#sel-dn').val()+'"])').hide();
		}
	//SELECTED YEAR change this to range
		if ($('#sel-year').val() === 'all') {
			//do nothing!
		} else {
			 $('.game:not([data-year="'+ $('#sel-year').val()+'"])').hide();
		}
	//SELECTED month change this to range
		if ($('#sel-mm').val() === 'all') {
			//do nothing!
		} else {
			 $('.game:not([data-mm="'+ $('#sel-mm').val()+'"])').hide();
		}	
	//Playoff?
		if ($('#sel-playoff').val() === 'all') {
		//do nothing!
		} else {
			 $('.game:not([data-playoff="'+ $('#sel-playoff').val()+'"])').hide();
		}	
		
	//slowly reveal the all time score
	$('#alltime-score dl').fadeIn('slow');
	
}


function countwinloss() {
	var countl = $(".L:visible").length, 
		countw = $(".W:visible").length, 
		countt = $(".T:visible").length; 
	var tot = countw+countl+countt;
		$('#ny_total').html(number_format(countl)+'<span></span>');
			$('#ny_total span').html(' '+number_format(countl/tot*100, 1)+'% <em class="peity" data-diameter="35" data-colour="#7cc9d1">'+countl+'/'+tot+'</em>');
		$('#bos_total').html(number_format(countw)+'<span></span>');
			$('#bos_total span').html(' '+number_format(countw/tot*100, 1)+'% <em class="peity" data-diameter="35" data-colour="#d55a1f">'+countw+'/'+tot+'</em>');
		$('#tie_total').html(number_format(countt)+'<span></span>');
			$('#tie_total span').html(' '+number_format(countt/tot*100, 1)+'% <em class="peity" data-diameter="25" data-colour="#939598">'+countt+'/'+tot+'</em>');
		$('#game_total').html(number_format(tot));
		
	$('em.peity').peity('pie', {
	  colours: function() {
		return ["#ffffff", this.getAttribute("data-colour")]
	  },
	  diameter: function() {
		return this.getAttribute("data-diameter")
	  }
	});	
}		
   
function pad2(number) {
	return (number < 10 ? '0' : '') + number;
}

function spell_month(month) {
		switch (month) {
			case '1' : return 'Jan'; break;
			case '2' : return 'Feb'; break;
			case '3' : return 'Mar'; break;
			case '4' : return 'Apr'; break;
			case '5' : return 'May'; break;
			case '6' : return 'Jun'; break;
			case '7' : return 'Jul'; break;
			case '8' : return 'Aug'; break;
			case '9' : return 'Sept'; break;
			case '10' : return 'Oct'; break;
			case '11' : return 'Nov'; break;
			case '12' : return 'Dec';
		}
}

function get_box_url(yyyy, mm, dd, ha, dbl){
	var boxurl = "";
	//If it is the current year, retrosheet URL is not available, so URL to baseball-reference
		//http://www.baseball-reference.com/boxes/BOS/BOS201209130.sboxurl
		if (yyyy === "2012") {
				boxurl += 'http://www.baseball-reference.com/boxes/';
					if(ha === "At") {boxurl += 'NYA/NYA';}else {boxurl += 'BOS/BOS';}
					boxurl += yyyy + pad2(mm) + pad2(dd) + dbl + '.shtml';
		}else {		
		//by default, links to retrosheet	
			boxurl += 'http://www.retrosheet.org/boxesetc/' + yyyy +'/';
			//before 1917 redirect to game page
				if(yyyy < 1918){
					boxurl += pad2(mm) + pad2(dd) + yyyy + '.htm'; 
				} else {
			//boxscore page
					boxurl += 'B' + pad2(mm) + pad2(dd) + dbl;
					if(ha === 'Vs') {boxurl += 'BOS';} else {boxurl += 'NYA';}
					boxurl += yyyy + '.htm';
				}//end link to retrosheet	
	}// end link to retrosheet or baseball-reference
	return boxurl;
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