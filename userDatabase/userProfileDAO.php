<?php
class userProfileDAO {

    //retrieve all info of a particular user
    public function getAll($username) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();

        $sql = "SELECT
                    email,
                    creditscore, 
                    interestrate,
                    tbankacc,
                    tbankid,
                    tbankpin,
                    annualincome,
                    homeownership,
                    monthlydebt,
                    monthlycreditlimit,
                    mortacc
                FROM userProfile
                WHERE username = :username"; 
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);


        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        $user = [];
        while( $row = $stmt->fetch() ) {
            $user = [$row['email'],
                     $row['creditscore'],
                     $row['interestrate'],
                     $row['tbankacc'],
                     $row['tbankid'],
                     $row['tbankpin'],
                     $row['annualincome'],
                     $row['homeownership'],
                     $row['monthlydebt'],
                     $row['monthlycreditlimit'],
                     $row['mortacc']];
        }

        $stmt = null;
        $conn = null;

        return $user;
    }

    //check if a username is inside
    public function lookFor($username) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();

        $sql = "select username from userProfile where username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

		$user = false;
        if ($row = $stmt->fetch() ) {
            $user = true;
        }

        $stmt = null;
        $conn = null;
        
        return $user;
    }

    # Add a new user profile into the database
    // expects a profile class object
    //a profile will be created every time a user clicks on "start browsing for recipe"
    //the "start browsing for recipe" page is only accessible for first time users who are creating their profile (not logged in yet)
    public function add($profile) {
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->getConnection();
        $sql = 'insert into userProfile (username, email, creditscore, interestrate, tbankacc, tbankid, tbankpin, annualincome, homeownership, monthlydebt, monthlycreditlimit, mortacc)
                 values (:username, :email, :creditscore, :interestrate, :tbankacc, :tbankid, :tbankpin, :annualincome, :homeownership, :monthlydebt, :monthlycreditlimit, :mortacc)';
        $isAddOK = FALSE;
        try { 
            $stmt = $pdo->prepare($sql); 

            $username = $profile->getUsername();
            $email = $profile->getEmail();
            $creditscore = $profile->getCreditscore();
            $interestrate = $profile->getInterestrate();
            $tbankacc = $profile->getTbankacc();
            $tbankid = $profile->getTbankid();
            $tbankpin = $profile->getTbankpin();
            $annualincome = $profile->getAnnualincome();
            $homeownership = $profile->getHomeownership();
            $monthlydebt = $profile->getMonthlydebt();
            $monthlycreditlimit = $profile->getMonthlycreditlimit();
            $mortacc = $profile->getMortacc();
            
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':creditscore', $creditscore, PDO::PARAM_STR);
            $stmt->bindParam(':interestrate', $interestrate, PDO::PARAM_STR);
            $stmt->bindParam(':tbankacc', $tbankacc, PDO::PARAM_STR);
            $stmt->bindParam(':tbankid', $tbankid, PDO::PARAM_STR);
            $stmt->bindParam(':tbankpin', $tbankpin, PDO::PARAM_STR);
            $stmt->bindParam(':annualincome', $annualincome, PDO::PARAM_STR);
            $stmt->bindParam(':homeownership', $homeownership, PDO::PARAM_STR);
            $stmt->bindParam(':monthlydebt', $monthlydebt, PDO::PARAM_STR);
            $stmt->bindParam(':monthlycreditlimit', $monthlycreditlimit, PDO::PARAM_STR);
            $stmt->bindParam(':mortacc', $mortacc, PDO::PARAM_STR);
        
            if ($stmt->execute()) {
                $isAddOK = TRUE;
            }
            
            $stmt->closeCursor();
            $pdo = null;
        } catch (Exception $e) {
            return $isAddOK;    
        }

        return $isAddOK;
    }

    //edit the profile every time the 'save button' is clicked
    //this save button is only accessible from the logged in page
    public function edit($profile) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection   ();

        $username = $profile->getUsername();
        $email = $profile->getEmail();
        $creditscore = $profile->getCreditscore();
        $interestrate = $profile->getInterestrate();
        $tbankacc = $profile->getTbankacc();
        $tbankid = $profile->getTbankid();
        $tbankpin = $profile->getTbankpin();
        $annualincome = $profile->getAnnualincome();
        $homeownership = $profile->getHomeownership();
        $monthlydebt = $profile->getMonthlydebt();
        $monthlycreditlimit = $profile->getMonthlycreditlimit();
        $mortacc = $profile->getMortacc();

        $sql = "UPDATE
                    userProfile
                SET
                    email = :email,
                    creditscore = :creditscore,
                    interestrate = :interestrate,
                    tbankacc = :tbankacc,
                    tbankid = :tbankid,
                    tbankpin = :tbankpin,
                    annualincome = :annualincome,
                    homeownership = :homeownership,
                    monthlydebt = :monthlydebt,
                    monthlycreditlimit = :monthlycreditlimit,
                    mortacc = :mortacc
                WHERE 
                    username = :username";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':creditscore', $creditscore, PDO::PARAM_STR);
        $stmt->bindParam(':interestrate', $interestrate, PDO::PARAM_STR);
        $stmt->bindParam(':tbankacc', $tbankacc, PDO::PARAM_STR);
        $stmt->bindParam(':tbankid', $tbankid, PDO::PARAM_STR);
        $stmt->bindParam(':tbankpin', $tbankpin, PDO::PARAM_STR);
        $stmt->bindParam(':annualincome', $annualincome, PDO::PARAM_STR);
        $stmt->bindParam(':homeownership', $homeownership, PDO::PARAM_STR);
        $stmt->bindParam(':monthlydebt', $monthlydebt, PDO::PARAM_STR);
        $stmt->bindParam(':monthlycreditlimit', $monthlycreditlimit, PDO::PARAM_STR);
        $stmt->bindParam(':mortacc', $mortacc, PDO::PARAM_STR);

        $status = $stmt->execute();
        
        $stmt = null;
        $conn = null;

        return $status;

    }
    
}

?>
