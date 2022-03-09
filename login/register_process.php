<?php
    require_once "./model/common.php";

    if (!isset($_POST["submit"])) {

        $username = $_POST["userName"];
        $password = $_POST["password"];
        $name = $_POST["givenName"];
        $acc_Id = $_POST["accid"];
        $email = $_POST["email"];
        $pin = $_POST["pin"];
        $userid = $_POST["userid"];
        echo 'Register_process_1';

        $dao = new usersDAO();
        echo 'Register_process_2';
        $status = $dao->addUser($username, $password, $name, $acc_Id, $email, $pin, $userid);

        
        if ($status) {
            $_SESSION["status"] = true;
            header("Location: login.php");
            exit();
        } else {
            $_SESSION["status"] = false;
            header("Location: register.php");
        }
        
    }
?>