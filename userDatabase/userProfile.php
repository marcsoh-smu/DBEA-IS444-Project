<?php
  class userProfile{
    private $username;
    private $email;
    private $creditscore;
    private $interestrate;
    private $tbankacc;
    private $tbankid;
    private $tbankpin;
    private $annualincome;
    private $homeownership;
    private $monthlydebt;
    private $monthlycreditlimit;
    private $mortacc;

    // constructor
    public function __construct($username, $email, $creditscore, $interestrate, $tbankacc, $tbankid, $tbankpin, $annualincome, $homeownership, $monthlydebt, $monthlycreditlimit, $mortacc) {
        $this->username = $username;
        $this->email = $email;
        $this->creditscore = $creditscore;
        $this->interestrate = $interestrate;
        $this->tbankacc = $tbankacc;
        $this->tbankid = $tbankid;
        $this->tbankpin = $tbankpin; 
        $this->annualincome = $annualincome; 
        $this->homeownership = $homeownership; 
        $this->monthlydebt = $monthlydebt; 
        $this->monthlycreditlimit = $monthlycreditlimit; 
        $this->mortacc = $mortacc; 
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

    public function getAnnualincome() {
        return $this->annualincome;
    }
    
    public function getHomeownership() {
        return $this->homeownership;
    }

    public function getMonthlydebt() {
        return $this->monthlydebt;
    }

    public function getMonthlycreditlimit() {
        return $this->monthlycreditlimit;
    }

    public function getMortacc() {
        return $this->mortacc;
    }
   
}
?>