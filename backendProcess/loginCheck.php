<?php
    require_once('common.php');
    $username = $_GET['username'];
    $pwd = $_GET['pwd'];
    $userAccDAO = new userAccDAO;
    $result = $userAccDAO->lookFor($username);
    if(!$result){ //if username is in the database
        $hashedPwd = $userAccDAO->pwdCheck($username);
        
        if(!password_verify($pwd, $hashedPwd)){
            echo 'false';
        } else{
            session_start();
            $_SESSION['username']=$username;
            echo 'true';
        }
    } else{
        echo 'false';
    }
?>