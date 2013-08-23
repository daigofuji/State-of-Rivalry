<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!-- Consider adding a manifest.appcache: h5bp.com/d/Offline -->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

  <!-- Use the .htaccess and remove these lines to avoid edge case issues.
       More info: h5bp.com/i/378 -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>State of Rivalry: All-time Red Sox vs Yankees scorecard</title>
  <meta name="description" content="All-time win-loss record of the Boston Red Sox and the New York Yankees, with details. Project of Boston Baseball Hack Day 2012.">

  <!-- Mobile viewport optimized: h5bp.com/viewport -->
  <meta name="viewport" content="width=device-width">

  <!-- Place favicon.ico and apple-touch-icon.png in the root directory: mathiasbynens.be/notes/touch-icons -->
	<link href='http://fonts.googleapis.com/css?family=Ropa+Sans:400,400italic|Balthazar|Six+Caps' rel='stylesheet' type='text/css'>

  <link rel="stylesheet" href="css/style.css">

  <!-- More ideas for your <head> here: h5bp.com/d/head-Tips -->

</head>
<body>
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->
  <header>
  	<div class="wrap">
		<?php include 'lib/header.html'; ?>
	</div>
  </header>
  <div role="main" class="wrap">
  		<div class="debug" style="color:#ccc;">
		<?php 
		// Data caching but may not have to use... we are switching to google doc-table top model
		
		// is my cached datafile there? and new? 86400 is 24 hours
		if ( file_exists('data/rivalry.js') && filemtime('data/rivalry.js') > (time()-30)) {
		   //   if there is a cached version read content and display
			?><!-- Debug: Cache file is there --><?php
			} else {
			?><!-- Debug: Cache file is not there and/or old at <?php echo  filemtime('data/rivalry.js'); ?>. Creating new. -->
			<?php
				echo "<!-- ";
				// so run the php to write that file
				 include 'get_data.php';
				echo "-->";
			}
		?>
		</div>
  <p class="note"><strong>Note:</strong> Thanks for visiting! This site is still work in progress (though it is functional and data is up to date). If you are using this for reference, always double check the data in <a href="https://docs.google.com/a/daigofujiwara.com/spreadsheet/pub?key=0Apvvlouo3eMgdHhDWF9vTThTODlxRnFMMWVjd09GdWc&amp;single=true&amp;gid=0&amp;output=html">Google Doc</a>, gathered from <a href="http://www.retrosheet.org/">retrosheet</a>. A <a href="http://baseballhackday.com/">Boston Baseball Hack Day 2012</a> project. Contribute via <a href="https://github.com/daigofuji/State-of-Rivalry">GitHub</a> & <a href="mailto:daigo@daigofujiwara.com">report errors</a>. Thank you.</p>
	
	<h2>All-time win-loss record <em>(<span class="smaller">Total number of games:</span> <span id="game_total">..</span>)</em></h2>
	<h3 id="loading"><br/><img src="img/ajax-loader.gif" width="220" height="19" /><br/>Loading over 2,000 game data... (Thanks for your patience!)<br/></h3>
	<div id="alltime-score">	
		<dl>
			<dt class="ny">New York Yankees</dt>
			<dd class="num ny" id="ny_total">..</dd>
		</dl>
		<dl>
			<dt class="bos">Boston Red Sox</dt>
			<dd class="num bos" id="bos_total">..</dd>
		</dl>
		<dl class="narrow">
			<dt class="tie">Tie</dt>
			<dd class="num tie" id="tie_total">.</dd>
		</dl>	
	</div>


	<div>
	</div>
	
	<h2>Filter</h2>
	<div>
	<form>
		Runs:
		<select name="score_margin" id="sel-runs" class="filter">
		  <option value="all">All</option>
		  <option value="shut">Shutouts</option>
		  <option value="one">One-run games</option>
		  <option value="blow">Blowouts (+5 runs)</option>
		</select>
		Home team:
		<select name="ha_value" id="sel-ha" class="filter">
		  <option value="all">Both</option>
		  	<!-- data is boston centric, so At NYA is NY Vs NYA is in Bos --> 
			<option value="At">At New York</option>
			<option value="Vs">At Boston</option>
		</select>
		Day/Night:
		<select name="day_or_night" id="sel-dn" class="filter">
		  <option value="all">Both</option>
		  <option value="day">Day game</option>
		  <option value="night">Night game</option>
		</select>
		<!-- Extra innings:
		<select name="extra">
		  <option value="exall">All</option>
		  <option value="noex">9-inning game</option>
		  <option value="ex">Extra innings</option>
		</select> -->
		<br/>
		Year: 
		<select name="year" id="sel-year" class="filter">
			<option value="all">All time</option>
			<option value="1903">1903</option>
			<option value="1904">1904</option>
			<option value="1905">1905</option>
			<option value="1906">1906</option>
			<option value="1907">1907</option>
			<option value="1908">1908</option>
			<option value="1909">1909</option>
			<option value="1910">1910</option>
			<option value="1911">1911</option>
			<option value="1912">1912</option>
			<option value="1913">1913</option>
			<option value="1914">1914</option>
			<option value="1915">1915</option>
			<option value="1916">1916</option>
			<option value="1917">1917</option>
			<option value="1918">1918</option>
			<option value="1919">1919</option>
			<option value="1920">1920</option>
			<option value="1921">1921</option>
			<option value="1922">1922</option>
			<option value="1923">1923</option>
			<option value="1924">1924</option>
			<option value="1925">1925</option>
			<option value="1926">1926</option>
			<option value="1927">1927</option>
			<option value="1928">1928</option>
			<option value="1929">1929</option>
			<option value="1930">1930</option>
			<option value="1931">1931</option>
			<option value="1932">1932</option>
			<option value="1933">1933</option>
			<option value="1934">1934</option>
			<option value="1935">1935</option>
			<option value="1936">1936</option>
			<option value="1937">1937</option>
			<option value="1938">1938</option>
			<option value="1939">1939</option>
			<option value="1940">1940</option>
			<option value="1941">1941</option>
			<option value="1942">1942</option>
			<option value="1943">1943</option>
			<option value="1944">1944</option>
			<option value="1945">1945</option>
			<option value="1946">1946</option>
			<option value="1947">1947</option>
			<option value="1948">1948</option>
			<option value="1949">1949</option>
			<option value="1950">1950</option>
			<option value="1951">1951</option>
			<option value="1952">1952</option>
			<option value="1953">1953</option>
			<option value="1954">1954</option>
			<option value="1955">1955</option>
			<option value="1956">1956</option>
			<option value="1957">1957</option>
			<option value="1958">1958</option>
			<option value="1959">1959</option>
			<option value="1960">1960</option>
			<option value="1961">1961</option>
			<option value="1962">1962</option>
			<option value="1963">1963</option>
			<option value="1964">1964</option>
			<option value="1965">1965</option>
			<option value="1966">1966</option>
			<option value="1967">1967</option>
			<option value="1968">1968</option>
			<option value="1969">1969</option>
			<option value="1970">1970</option>
			<option value="1971">1971</option>
			<option value="1972">1972</option>
			<option value="1973">1973</option>
			<option value="1974">1974</option>
			<option value="1975">1975</option>
			<option value="1976">1976</option>
			<option value="1977">1977</option>
			<option value="1978">1978</option>
			<option value="1979">1979</option>
			<option value="1980">1980</option>
			<option value="1981">1981</option>
			<option value="1982">1982</option>
			<option value="1983">1983</option>
			<option value="1984">1984</option>
			<option value="1985">1985</option>
			<option value="1986">1986</option>
			<option value="1987">1987</option>
			<option value="1988">1988</option>
			<option value="1989">1989</option>
			<option value="1990">1990</option>
			<option value="1991">1991</option>
			<option value="1992">1992</option>
			<option value="1993">1993</option>
			<option value="1994">1994</option>
			<option value="1995">1995</option>
			<option value="1996">1996</option>
			<option value="1997">1997</option>
			<option value="1998">1998</option>
			<option value="1999">1999</option>
			<option value="2000">2000</option>
			<option value="2001">2001</option>
			<option value="2002">2002</option>
			<option value="2003">2003</option>
			<option value="2004">2004</option>
			<option value="2005">2005</option>
			<option value="2006">2006</option>
			<option value="2007">2007</option>
			<option value="2008">2008</option>
			<option value="2009">2009</option>
			<option value="2010">2010</option>
			<option value="2011">2011</option>
			<option value="2012">2012</option>			
		</select>
		Month: 
		<select name="month" id="sel-mm" class="filter">
			<option value="all">All</option>
			<!-- <option value="1">Jan.</option>
			<option value="2">Feb.</option>
			<option value="3">Mar.</option> -->
			<option value="4">Apr.</option>
			<option value="5">May</option>
			<option value="6">June</option>
			<option value="7">July</option>
			<option value="8">Aug.</option>
			<option value="9">Sept.</option>
			<option value="10">Oct.</option>
			<!-- <option value="11">Nov.</option>
			<option value="12">Dec</option> -->
		</select>
		Playoff games: 
		<select name="playoff" id="sel-playoff" class="filter">
			<option value="all">Both</option>
			<option value="0">Regular Season</option>
			<option value="1">Playoff only</option>
		</select>
		
		<!--
		Day: 
		<select name="day" id="sel-dd" class="filter">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
			<option value="13">13</option>
			<option value="14">14</option>
			<option value="15">15</option>
			<option value="16">16</option>
			<option value="17">17</option>
			<option value="18">18</option>
			<option value="19">19</option>
			<option value="20">20</option>
			<option value="21">21</option>
			<option value="22">22</option>
			<option value="23">23</option>
			<option value="24">24</option>
			<option value="25">25</option>
			<option value="26">26</option>
			<option value="27">27</option>
			<option value="28">28</option>
			<option value="29">29</option>
			<option value="30">30</option>
			<option value="31">31</option>

		</select>
		
		Pitchers with decision:
		<input type="text" name="starting_pitcher" placeholder="Start typing names...">-->
	</form>
	</div>
	
	<div id="games">
	
		
	</div><!-- games -->
	
	
	<div id="tooltip" style="display:none;">
		<div class="tip">
			<div class="tip-inner"></div>
		</div>
		W: <span id="tip-wpit"></span><br/>
		L: <span id="tip-lpit"></span><br/>
		S: <span id="tip-spit"></span><br/>
		Home team: <span id="tip-hometeam"></span> <br/>
		Time of game: <span id="tip-time"></span> <br/>
		Attendance: <span id="tip-spec"></span> <br/>
		Day/Night: <span id="tip-dn"></span>
	</div>
	
	

  </div>


  <footer>
 	<div class="wrap">
		<?php include 'lib/footer.html'; ?>
  	</div>

  </footer>


  <!-- JavaScript at the bottom for fast page loading -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
 <!--  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script> -->

  <!-- scripts concatenated and minified via build script -->
  <script src="js/plugins.js"></script>
  <script src="js/script.js"></script>
 		<script type="text/javascript" src="js/libs/underscore.min.js"></script>
		<script type="text/javascript" src="js/libs/backbone.min.js"></script>
		<!-- <script type="text/javascript" src="js/libs/data.min.js"></script>
		<script type="text/javascript" src="js/query.js"></script> -->
		<script type="text/javascript" src="js/libs/tabletop.js"></script>
		<!-- peity -->
		<script type="text/javascript" src="js/libs/jquery.peity.min.js"></script>

  <!-- end scripts -->
  
   <!-- All JavaScript at the bottom, except this Modernizr build.
       Modernizr enables HTML5 elements & feature detects for optimal performance.
       Create your own custom Modernizr build: www.modernizr.com/download/ -->
  <script src="js/libs/modernizr-2.5.3.min.js"></script>
  <script src="js/libs/dropdown.js"></script>


	


  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <script>
    var _gaq=[['_setAccount','UA-339429-13'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>