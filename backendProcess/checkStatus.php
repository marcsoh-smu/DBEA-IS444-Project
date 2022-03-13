<?php
    session_start();
    if(isset($_SESSION['username'])){
        if(strlen($_SESSION['username'])>0){
            echo 'true';
        } else{
            echo 'false';
        }
    } else{
        echo 'false';
    }
?>