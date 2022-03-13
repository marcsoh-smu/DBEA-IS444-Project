<?php
class userAccDAO {

    # Add a new user into the database
    // expects a user class
    public function add($user) {
        $connMgr = new ConnectionManager();
        $pdo = $connMgr->getConnection();
        $sql = 'insert into userAcc (username, pwd) values (:username, :pwd)';
        $isAddOK = FALSE;
        try { 
            $stmt = $pdo->prepare($sql); 

            $username = $user->getUsername();
            $pwd = $user->getPwd();
            
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':pwd', $pwd, PDO::PARAM_STR);
            
        
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

    //check if a username is taken
    public function lookFor($username) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();

        $sql = "select username from userAcc where username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

		$user = true;
        if ($row = $stmt->fetch() ) {
            $user = false;
        }

        $stmt = null;
        $conn = null;
        
        return $user;
    }

    //retrieve username and hashed pwd to check at login
    public function pwdCheck($username) {
        $connMgr = new ConnectionManager();
        $conn = $connMgr->getConnection();

        $sql = "select pwd from userAcc where username = :username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);

        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

		$ret = '';
        if ($row = $stmt->fetch() ) {
            $ret = $row['pwd'];
        }

        $stmt = null;
        $conn = null;
        
        return $ret;
    }
    
}

?>
