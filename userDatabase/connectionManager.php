<?php

class ConnectionManager {

    public function getConnection() {


      //LocalHost
      $servername = 'localhost';
      $username = 'root';
      $password = ''; 
      $dbname = 'dbea_project'; 


        // Create connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);     
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // if fail, exception will be thrown

        // Return connection object
        return $conn;
    }

}