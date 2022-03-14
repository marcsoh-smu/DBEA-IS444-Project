<?php
    require_once('common.php');
    session_start();
    $username = $_SESSION['username'];
    $request = $_GET['retrieve'];
    $userProfileDAO = new UserProfileDAO;
    $result = $userProfileDAO->getAll($username);
    if($request=='email'){
        echo $result[0];
    } elseif($request=='creditScore'){
        echo $result[1];
    } elseif($request=='interestRate'){
        echo $result[2];
    } elseif($request=='tBankAcc'){
        echo $result[3];
    } elseif($request=='tBankID'){
        echo $result[4];
    } elseif($request=='tBankPIN'){
        echo $result[5];
    } elseif($request=='annualIncome'){
        echo $result[6];
    } elseif($request=='homeOwnership'){
        echo $result[7];
    } elseif($request=='monthlyDebt'){
        echo $result[8];
    } elseif($request=='monthlyCreditLimit'){
        echo $result[9];
    } elseif($request=='mortAcc'){
        echo $result[10];
    }
?>