<?php

require_once 'common.php';
echo 'usersDAO';
class usersDAO
{
  public function addUser($username, $password, $name, $acc_Id, $email, $pin, $userid)
  {
    echo 'hi2';
    $dao = new usersDAO;
    

    $conn_manager = new ConnectionManager();
    $pdo = $conn_manager->getConnection();
      
    $password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "insert into users (given_name, account_id, email, username, pword, pin, userid) 
    values (:name, :accid, :email, :username, :pword, :pin, :userid);";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":accid", $acc_Id);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":pword", $password);
    $stmt->bindParam(":pin", $pin);
    $stmt->bindParam(":userid", $userid);
    
    if ($stmt->execute()) {
        $stmt = null;
        $pdo = null;
        return true;
    }

    $stmt = null;
    $pdo = null;
    return false;
  }
  
  public function getUserId($username)
  {
    $connMgr = new ConnectionManager();
    $conn = $connMgr->getConnection();

    $sql = "SELECT * FROM users where username = :username";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username, PDO::PARAM_STR);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $stmt->execute();

    $obj = null;
    $usrId = "";

    while ($row = $stmt->fetch()) {
      $obj = new users($row['id'], $row['username'], $row['pword'], $row['given_name'], $row['account_id'], $row['email'], $row['pin'], $row['userid']);
    }

    if (!empty($obj)) {
      $usrId = $obj->getId();
    }

    $stmt = null;
    $conn = null;

    return $usrId;
  }

  public function getPassword($id)
  {
    $connMgr = new ConnectionManager();
    $conn = $connMgr->getConnection();

    $sql = "SELECT * FROM users where id = :id";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    $stmt->execute();

    $obj = null;
    $usrId = "";

    while ($row = $stmt->fetch()) {
      $obj = new users($row['id'], $row['username'], $row['pword'], $row['given_name'], $row['account_id'], $row['email'], $row['pin'], $row['userid']);
    }

    if (!empty($obj)) {
      $usrId = $obj->getPassword();
    }

    $stmt = null;
    $conn = null;

    return $usrId;
  }

  public function login($username, $password)
  {
    $isValid = False;
    $dao = new usersDAO();
    $uId = $dao->getUserId($username);
    
    if ($uId !== "") {
      $hPass = $dao->getPassword($uId);
    }

    if ($hPass !== "") {
      if (password_verify($password, $hPass)) {
        $isValid = True;
      }
    }
    
    return $isValid;
  }
  
}
?>


