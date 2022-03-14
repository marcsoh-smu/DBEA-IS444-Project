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
    $annualIncome = $_GET['annualIncome'];
    $homeOwnership = $_GET['homeOwnership'];
    $monthlyDebt = $_GET['monthlyDebt'];
    $monthlyCreditLimit = $_GET['monthlyCreditLimit'];
    $mortAcc = $_GET['mortAcc'];
    
    $userProfileDAO = new userProfileDAO;
    $user = new userProfile($username, $email, $creditScore, $interestRate, $tBankAcc, $tBankID, $tBankPIN, $annualIncome, $homeOwnership, $monthlyDebt, $monthlyCreditLimit, $mortAcc);
    $result = $userProfileDAO->edit($user);
    echo 'true';

?>