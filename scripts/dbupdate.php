<?php
	require '/home/madeinkent/creds/dblogin.php';
	require 'Classes/PHPExcel.php';
	
    try {
        $dbh = new PDO("mysql:host=$hostname;
            dbname=madeinke_madeinkent", $username, $password);
        // echo "Connected to database.";
    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }

    //error reporting
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
	
	$exceldocument = '6-digit_2017_Codes.xlsx';
	
	$reader = PHPExcel_IOFactory::createReaderForFile($exceldocument);
	$excelObj = $reader->load($exceldocument);
	$worksheet = $excelObj->getSheet(0);
	
	$naicstokeywords = $excelObj->getActiveSheet()->toArray(null, true, true, true);
	
	$query = "SELECT * FROM `kentbiz` WHERE (`NAICS` RLIKE '^3[1-3].*' OR `SIC` RLIKE '^[23].*') ORDER BY `BUSINESS NAME`";

	//prepare the statement
	$statement = $dbh->prepare($query);
	
	//execute
	$statement->execute();
	$rows = $statement->fetchAll();
	
	function find($needle, $haystack)
	{
		foreach($haystack as $key=>$value)
		{
		   if(is_array($value) && array_search($needle, $value) !== false)
		   {
			  return $key;
		   }
		}
		return false;
	}
	
	$query = "UPDATE 'kentbiz' SET 'KEYWORDS' = :keyword WHERE 'NAICS' = :naics";
	$statement = $dbh->prepare($query);
	
	foreach($rows as $row)
	{		
		$rownum = find($row['NAICS'], $naicstokeywords);
		if (!empty($rownum))
		{
			$keyword = $worksheet->getCell('B' . $rownum)->getValue();
			$statement->bindParam(':keyword', $keyword, PDO::PARAM_STR);
			$statement->bindParam(':naics', $row['NAICS'], PDO::PARAM_INT);
			
			$statement->execute();
		}
	}
?>