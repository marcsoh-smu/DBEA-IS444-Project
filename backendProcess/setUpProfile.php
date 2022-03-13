<?php
    //connect to database to put these data in
    require_once('common.php');
    $username = $_GET['username'];
    $email = $_GET['email'];
    $tBankAcc = strval($_GET['tBankAcc']);
    $tBankID = strval($_GET['tBankID']);
    $tBankPIN = strval($_GET['tBankPIN']);
    $creditScore = $_GET['creditScore'];
    $interestRate = $_GET['interestRate'];
    
    $userProfileDAO = new userProfileDAO;
    $user = new userProfile($username, $email, $creditScore, $interestRate, $tBankAcc, $tBankID, $tBankPIN);
    $result = $userProfileDAO->edit($user);
    echo 'true';

?>