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
    }
?>