function retrieve() {
  changeNavBar();
  retrieveUsername();
  retrieveEmail();
  retrieveCreditscore();
  retrieveInterestrate();
  retrieveTbankacc();
  retrieveTbankid();
  retrieveTbankpin();
}

function retrieveUsername() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var url = "backendProcess/retrieveUsername.php";

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      username.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveEmail() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var email = document.getElementById("email");
  var details = "username=" + username;
  var url = "backendProcess/retrieveProfileInfo.php?retrieve=email&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      email.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveCreditscore() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var creditScore = document.getElementById("creditScore");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=creditScore&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      creditScore.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveInterestrate() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var interestRate = document.getElementById("interestRate");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=interestRate&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      interestRate.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveTbankacc() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var tBankAcc = document.getElementById("tBankAcc");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=tBankAcc&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      tBankAcc.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveTbankid() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var tBankID = document.getElementById("tBankID");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=tBankID&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      tBankID.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function retrieveTbankpin() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username");
  var tBankPIN = document.getElementById("tBankPIN");
  var details = "username=" + username;
  var url =
    "backendProcess/retrieveProfileInfo.php?retrieve=tBankPIN&" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string
      tBankPIN.value = result;
    }
  };

  request.open("GET", url, true);
  request.send();
}

function bmiCalculator() {
  var height = Number(document.getElementById("Height").value);
  var weight = Number(document.getElementById("Weight").value);
  var result = document.getElementById("bmi");
  if (height == "" || weight == "") {
    result.innerHTML = "current BMI: ";
  } else {
    var bmi = weight / height ** 2;
    var bmi = bmi.toFixed(1);
    if (bmi < 18.5) {
      result.innerHTML = "current BMI: " + bmi + "(Underweight)";
    } else if (bmi < 23) {
      result.innerHTML = "current BMI: " + bmi + "(Healthy)";
    } else if (bmi < 27.5) {
      result.innerHTML = "current BMI: " + bmi + "(Mildly Obese)";
    } else {
      result.innerHTML = "current BMI: " + bmi + "(Extremely Obese)";
    }
  }
}

function setUpProfile() {
  var request = new XMLHttpRequest();

  var username = document.getElementById("Username").value;
  var email = document.getElementById("email").value;
  var tBankAcc = document.getElementById("tBankAcc").value;
  var tBankID = document.getElementById("tBankID").value;
  var tBankPIN = document.getElementById("tBankPIN").value;

  var details =
    "username=" +
    username +
    "&email=" +
    email +
    "&tBankAcc=" +
    tBankAcc +
    "&tBankID=" +
    tBankID +
    "&tBankPIN=" +
    tBankPIN;
  var url = "backendProcess/setUpProfile.php?" + details;

  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var result = this.responseText; //string

      if (result == "true") {
        location.href = "profile.html"; //tentative
        alert("Profile saved!");
      } else {
        alert("Profile failed to save. Please try again later.");
      }
    }
  };

  request.open("GET", url, true);
  request.send();
}
