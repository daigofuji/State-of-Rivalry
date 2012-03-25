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

	
	<h2>All time score</h2>
	<div id="alltime-score">	
		<dl>
			<dt class="ny">New York</dt>
			<dd class="num ny">1,114</dd>
		</dl>
		<dl>
			<dt class="bos">Boston</dt>
			<dd class="num bos">918</dd>
		</dl>
		<dl>
			<dt class="tie">Tie</dt>
			<dd class="num tie">14</dd>
		</dl>	
	</div>


	<div>
	</div>
	
	<h2>Filter</h2>
	<div>
	<form>
		Runs:
		<select name="score_margin">
		  <option value="-">All</option>
		  <option value="0">Shutouts</option>
		  <option value="1">One-run game</option>
		  <option value="5">Blowouts (5 runs)</option>
		</select>
		Home team:
		<select name="home_team_abbrev">
		  <option value="-">Both</option>
		  <option value="BAL">BAL</option>
		  <option value="TAM">TAM</option>
			<!--
			<option value="NYY">At New York</option>
			<option value="BOS">At Boston</option>
			-->
		</select>
		Day/Night:
		<select name="day_or_night">
		  <option value="-">Both</option>
		  <option value="d">Day game</option>
		  <option value="n">Night game</option>
		</select>
		<!-- 
		Extra innings:
		<select>
		  <option value="homeall">Both</option>
		  <option value="homeny">9-inning game</option>
		  <option value="homebos">Extra innings</option>
		</select>
		-->	
	</form>
	</div>
	<div class="games">
		<div class="game boswin"> <div class="gamedate">April 5, 2011</div><div class="gamescore"><span class="ny">NY 1</span> - <span class="bos">BOS 1</span></div></div>
		
		<div class="game nywin "> <div class="gamedate">April 5, 2011</div><div><span class="ny">1</span> - <span class="bos">1</span></div></div>
	
		<div class="game boswin "> <div class="gamedate">April 5, 2011</div><div><span class="ny">1</span> - <span class="bos">1</span></div></div>
		
		<div class="game boswin "> <div class="gamedate">April 5, 2011</div><div><span class="ny">1</span> - <span class="bos">1</span></div></div>
		
		<div class="game nywin "> <div class="gamedate">April 5, 2011</div><div><span class="ny">1</span> - <span class="bos">1</span></div></div>
		
		<div class="game boswin "> <div class="gamedate">April 5, 2011</div><div><span class="ny">1</span> - <span class="bos">1</span></div></div>	
		
		
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
		<script type="text/javascript" src="js/libs/data.min.js"></script>
		<script type="text/javascript" src="js/query.js"></script>

  <!-- end scripts -->
  
   <!-- All JavaScript at the bottom, except this Modernizr build.
       Modernizr enables HTML5 elements & feature detects for optimal performance.
       Create your own custom Modernizr build: www.modernizr.com/download/ -->
  <script src="js/libs/modernizr-2.5.3.min.js"></script>
  <script src="js/libs/dropdown.js"></script>
  <link href='http://fonts.googleapis.com/css?family=Ropa+Sans:400,400italic|Balthazar|Six+Caps' rel='stylesheet' type='text/css'>



  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>