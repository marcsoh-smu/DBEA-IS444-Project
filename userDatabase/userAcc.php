<?php
  class userAcc{
    private $username;
    private $pwd;  //hashed

    // constructor
    public function __construct($username, $pwd) {
        $this->username = $username;
        $this->pwd = $pwd;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPwd() {
      return $this->pwd;
    }
   
}
?>