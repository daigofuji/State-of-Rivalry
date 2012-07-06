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

  <title>State of Rivalry</title>
  <meta name="description" content="">

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
  <p class="note">Note: This site is not quite there yet... Working from <a href="https://docs.google.com/a/daigofujiwara.com/spreadsheet/pub?key=0Apvvlouo3eMgdHhDWF9vTThTODlxRnFMMWVjd09GdWc&amp;single=true&amp;gid=0&amp;output=html">this Google Doc data</a>, which we got from <a href="http://www.retrosheet.org/">retrosheet</a>. Please report errors to <a href="mailto:daigo@daigofujiwara.com">Daigo</a> </p>
	
	<h2>All time win-loss record</h2>
	<h3 id="loading"><br/><img src="img/loading.gif" width="16" height="11" /><br/>Loading data...<br/></h3>
	<div id="alltime-score">	
		<dl>
			<dt class="ny">New York Yankees</dt>
			<dd class="num ny" id="ny_total">---</dd>
		</dl>
		<dl>
			<dt class="bos">Boston Red Sox</dt>
			<dd class="num bos" id="bos_total">---</dd>
		</dl>
		<dl>
			<dt class="tie">Tie</dt>
			<dd class="num tie" id="tie_total">--</dd>
		</dl>	
	</div>


	<div>
	</div>
	
	<h2>Filter (*Not working... yet!)</h2>
	<div>
	<form>
		Runs:
		<select name="score_margin">
		  <option value="-">All</option>
		  <option value="0">Shutouts</option>
		  <option value="1">One-run games</option>
		  <option value="5">Blowouts (+5 runs)</option>
		</select>
		Home team:
		<select name="ha_value">
		  <option value="-">Both</option>
			<option value="At">At New York</option>
			<option value="Vs">At Boston</option>
		</select>
		Day/Night:
		<select name="day_or_night">
		  <option value="-">Both</option>
		  <option value="day">Day game</option>
		  <option value="night">Night game</option>
		</select>
		<!-- Extra innings:
		<select name="extra">
		  <option value="exall">All</option>
		  <option value="noex">9-inning game</option>
		  <option value="ex">Extra innings</option>
		</select> -->
		Year: 
		<select name="year">
			<option value="-">All time</option>
			<option value="y1903">1903</option>
			<option value="y1904">1904</option>
			<option value="y1905">1905</option>
			<option value="y1906">1906</option>
			<option value="y1907">1907</option>
			<option value="y1908">1908</option>
			<option value="y1909">1909</option>
			<option value="y1910">1910</option>
			<option value="y1911">1911</option>
			<option value="y1912">1912</option>
			<option value="y1913">1913</option>
			<option value="y1914">1914</option>
			<option value="y1915">1915</option>
			<option value="y1916">1916</option>
			<option value="y1917">1917</option>
			<option value="y1918">1918</option>
			<option value="y1919">1919</option>
			<option value="y1920">1920</option>
			<option value="y1921">1921</option>
			<option value="y1922">1922</option>
			<option value="y1923">1923</option>
			<option value="y1924">1924</option>
			<option value="y1925">1925</option>
			<option value="y1926">1926</option>
			<option value="y1927">1927</option>
			<option value="y1928">1928</option>
			<option value="y1929">1929</option>
			<option value="y1930">1930</option>
			<option value="y1931">1931</option>
			<option value="y1932">1932</option>
			<option value="y1933">1933</option>
			<option value="y1934">1934</option>
			<option value="y1935">1935</option>
			<option value="y1936">1936</option>
			<option value="y1937">1937</option>
			<option value="y1938">1938</option>
			<option value="y1939">1939</option>
			<option value="y1940">1940</option>
			<option value="y1941">1941</option>
			<option value="y1942">1942</option>
			<option value="y1943">1943</option>
			<option value="y1944">1944</option>
			<option value="y1945">1945</option>
			<option value="y1946">1946</option>
			<option value="y1947">1947</option>
			<option value="y1948">1948</option>
			<option value="y1949">1949</option>
			<option value="y1950">1950</option>
			<option value="y1951">1951</option>
			<option value="y1952">1952</option>
			<option value="y1953">1953</option>
			<option value="y1954">1954</option>
			<option value="y1955">1955</option>
			<option value="y1956">1956</option>
			<option value="y1957">1957</option>
			<option value="y1958">1958</option>
			<option value="y1959">1959</option>
			<option value="y1960">1960</option>
			<option value="y1961">1961</option>
			<option value="y1962">1962</option>
			<option value="y1963">1963</option>
			<option value="y1964">1964</option>
			<option value="y1965">1965</option>
			<option value="y1966">1966</option>
			<option value="y1967">1967</option>
			<option value="y1968">1968</option>
			<option value="y1969">1969</option>
			<option value="y1970">1970</option>
			<option value="y1971">1971</option>
			<option value="y1972">1972</option>
			<option value="y1973">1973</option>
			<option value="y1974">1974</option>
			<option value="y1975">1975</option>
			<option value="y1976">1976</option>
			<option value="y1977">1977</option>
			<option value="y1978">1978</option>
			<option value="y1979">1979</option>
			<option value="y1980">1980</option>
			<option value="y1981">1981</option>
			<option value="y1982">1982</option>
			<option value="y1983">1983</option>
			<option value="y1984">1984</option>
			<option value="y1985">1985</option>
			<option value="y1986">1986</option>
			<option value="y1987">1987</option>
			<option value="y1988">1988</option>
			<option value="y1989">1989</option>
			<option value="y1990">1990</option>
			<option value="y1991">1991</option>
			<option value="y1992">1992</option>
			<option value="y1993">1993</option>
			<option value="y1994">1994</option>
			<option value="y1995">1995</option>
			<option value="y1996">1996</option>
			<option value="y1997">1997</option>
			<option value="y1998">1998</option>
			<option value="y1999">1999</option>
			<option value="y2000">2000</option>
			<option value="y2001">2001</option>
			<option value="y2002">2002</option>
			<option value="y2003">2003</option>
			<option value="y2004">2004</option>
			<option value="y2005">2005</option>
			<option value="y2006">2006</option>
			<option value="y2007">2007</option>
			<option value="y2008">2008</option>
			<option value="y2009">2009</option>
			<option value="y2010">2010</option>
			<option value="y2011">2011</option>
			<option value="y2012">2012</option>			
		</select>
		Starting pitcher:
		<input type="text" name="starting_pitcher" placeholder="Start typing names...">
	</form>
	</div>
	
	<div id="games">
	
		
	</div><!-- games -->
	
	
	<div id="infobox"></div>
	
	
	

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