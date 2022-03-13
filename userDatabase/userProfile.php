<?php
  class userProfile{
    private $username;
    private $email;
    private $creditscore;
    private $interestrate;
    private $tbankacc;
    private $tbankid;
    private $tbankpin;

    // constructor
    public function __construct($username, $email, $creditscore, $interestrate, $tbankacc, $tbankid, $tbankpin) {
        $this->username = $username;
        $this->email = $email;
        $this->creditscore = $creditscore;
        $this->interestrate = $interestrate;
        $this->tbankacc = $tbankacc;
        $this->tbankid = $tbankid;
        $this->tbankpin = $tbankpin; 
    }

    public function getUsername() {
        return $this->username;
    }

    public function getEmail() {
      return $this->email;
    }

    public function getCreditscore() {
        return $this->creditscore;
    }

    public function getInterestrate() {
        return $this->interestrate;
    }

    public function getTbankacc() {
        return $this->tbankacc;
    }

    public function getTbankid() {
        return $this->tbankid;
    }

    public function getTbankpin() {
        return $this->tbankpin;
    }
   
}
?>