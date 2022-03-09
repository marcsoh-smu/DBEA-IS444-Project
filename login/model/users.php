<?php

class users {
    private $id;
    private $username;
    private $password;
    private $name;
    private $acc_Id;
    private $email;
    private $pin;
    private $userid;

    public function __construct($id, $username, $password, $name, $acc_Id, $email, $pin, $userid) {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->name = $name;
        $this->acc_Id = $acc_Id;
        $this->email = $email;
        $this->pin = $pin;
        $this->userid = $userid;
    }

    public function getId(){
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getName(){
        return $this->name;
    }

    public function getAccId() {
        return $this->acc_Id;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getPin() {
        return $this->pin;
    }

    public function getUserid() {
        return $this->userid;
    }
}
?>