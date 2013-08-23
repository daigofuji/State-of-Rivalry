<?php
//   if there is not a cached version start output buffering

ob_start();

	$jasondata = file_get_contents('http://stateofrivalry.com/data/rivalry_orig.js');
	echo $jasondata;

$bufferContent = ob_get_contents();
   //   get buffer content
ob_end_flush();
   //   clean and display buffer content in the browser
$fp = fopen ('data/rivalry.js','w') or die ('Error opening cached data file');
   //  write buffer content to cache file
fwrite ( $fp , $bufferContent );
fclose ( $fp );
?>