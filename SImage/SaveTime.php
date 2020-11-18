<?php

error_reporting(-1);
ini_set('display_errors', true);

//$action = $_GET["action"];
//$Checkbox1 = $_POST["Checkbox1"];
//$Answer1 = $_POST["Antwort1"];

//$Seconds= $_GET["Hidden_Seconds"]

//if ($Checkbox1 == "on") 

//if($action = "save") {
	
	$newfilename = 'T_' . $_GET['que'] . '_' . $_GET['tic'] . '.txt';
	$content = 'ID,Time' . $_GET['que'] . "\n" . $_GET['tic'] . ',' . $_GET['tim'];
	
  $targetFolder = "time/";
  file_put_contents($targetFolder.$newfilename, $content);
//}
?> 