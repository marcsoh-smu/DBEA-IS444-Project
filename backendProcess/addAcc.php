<?php
    //connect to database to put these data in
    //redirect user to set up profile
    require_once('common.php');
    $username = $_GET['username'];
    $pwd = $_GET['pwd'];
    $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);
    $user = new userAcc($username, $hashedPwd);
    $userAccDAO = new userAccDAO;
    $result = $userAccDAO->add($user);
    $ret = [];
    if($result) {
        //sign up is a success->user acc is added to database ->proceed to setting up the profile page
        $userProfileDAO = new userProfileDAO;
        $userProfile = new userProfile($username, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
        $userProfileDAO->add($userProfile);
        session_start();
        $_SESSION['username']=$username;
        echo 'true';
    } else{
        echo 'false';
    }

?>