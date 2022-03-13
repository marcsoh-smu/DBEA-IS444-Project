<?php
    //call database and check username
    require_once('common.php');
    $username = $_GET['username'];
    $userAccDAO = new UserAccDAO;
    $result = $userAccDAO->lookFor($username);
    if(!$result){
        echo 'false'; //username is taken
    } else{
        echo 'true';
    }
?>