// var annualIncome = document.getElementById("annualIncome").value;

//Annual Income points
function calc_annual_income_point() {
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);

  if (0 <= annualIncome && annualIncome < 50000) {
    return 47;
  } else if (50000 <= annualIncome && annualIncome < 75000) {
    return 58;
  } else if (75000 <= annualIncome && annualIncome < 105000) {
    return 70;
  } else if (annualIncome && annualIncome >= 105000) {
    return 80;
  } else {
    return "Error annual income";
  }
}

//No. Mort Acct Points
function calc_mort_acc_point() {
  var mortAcc = parseFloat(document.getElementById("mortAcc").value);

  if (0 <= mortAcc && mortAcc < 1.0) {
    return 54;
  } else if (1.0 <= mortAcc && mortAcc < 3.0) {
    return 62;
  } else if (3.0 <= mortAcc && mortAcc < 5.0) {
    return 68;
  } else if (mortAcc && mortAcc >= 5.0) {
    return 72;
  } else {
    return "Error mort acc point";
  }
}

//HomeOwnership Points
function calc_home_point() {
  var homeOwnership = document.getElementById("homeOwnership").value;

  if (homeOwnership == "MORTGAGE") {
    return 68;
  } else if (homeOwnership == "OWN") {
    return 59;
  } else if (homeOwnership == "RENT") {
    return 52;
  } else {
    return "Error homeownership";
  }
}

//Loan Amt Points
function calc_loan_amount_point() {
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);

  if (0 <= loanAmount && loanAmount < 4000) {
    return 77;
  } else if (4000 <= loanAmount && loanAmount < 10000) {
    return 70;
  } else if (10000 <= loanAmount && loanAmount < 16000) {
    return 60;
  } else if (loanAmount && loanAmount >= 16000) {
    return 53;
  } else {
    return "Error loan amt";
  }
}

//Interest rate points
//Interest default 6%
// function calc_int_rate_point() {
//   var interestRate = parseFloat(document.getElementById("interestRate").value);

//   if (0 <= interestRate && interestRate < 8.0) {
//     return 138;
//   } else if (8.0 <= interestRate && interestRate < 12.5) {
//     return 91;
//   } else if (12.5 <= interestRate && interestRate < 16.5) {
//     return 57;
//   } else if (16.5 <= interestRate && interestRate < 21.5) {
//     return 28;
//   } else if (interestRate && interestRate >= 21.5) {
//     return 5;
//   } else {
//     return "Error int rate";
//   }
// }

//Loan Term points
function calc_term_point() {
  var numberOfMonths = document.getElementById("numberOfMonths").value;

  if (numberOfMonths == 12) {
    return 68;
  } else if (numberOfMonths == 24) {
    return 59;
  } else {
    return "Error no. of months";
  }
}

//CALCULATE Debt to Income
function get_dti() {
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);

  var monthly_inc = annualIncome / 12;
  var current_dti = 0;
  if (monthly_inc == 0 && monthlyDebt != 0) {
    current_dti = 0;
    return current_dti * 100;
  } else if (monthlyDebt != 0) {
    current_dti = monthlyDebt / monthly_inc;
    return current_dti * 100;
  }
}

//CALCULATE Debt to Income points
function calc_dti_point() {
  var annualIncome = parseFloat(document.getElementById("annualIncome").value);
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);

  var dti = get_dti(annualIncome, monthlyDebt);
  var current_dti_2dec = dti.toFixed(2);

  if (0 <= current_dti_2dec && current_dti_2dec < 13.0) {
    return 78;
  } else if (13.0 <= current_dti_2dec && current_dti_2dec < 21.0) {
    return 64;
  } else if (21.0 <= current_dti_2dec && current_dti_2dec < 26.0) {
    return 52;
  } else if (26.0 <= current_dti_2dec && current_dti_2dec < 30.0) {
    return 44;
  } else if (current_dti_2dec && current_dti_2dec >= 30.0) {
    return 32;
  } else {
    return "Error cal DTI";
  }
}

//CALCULATE UTILIZATION RATE
function get_util_rate() {
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);
  var monthlyCreditLimit = parseFloat(
    document.getElementById("monthlyCreditLimit").value
  );

  util_rate = 0;
  if (monthlyCreditLimit == 0 && monthlyDebt != 0) {
    var util_rate = 0;
    return util_rate * 100;
  } else if (monthlyDebt != 0) {
    util_rate = monthlyDebt / monthlyCreditLimit;
    return util_rate * 100;
  }
}
// Utilization points
function calc_util_point() {
  var monthlyDebt = parseFloat(document.getElementById("monthlyDebt").value);
  var monthlyCreditLimit = parseFloat(
    document.getElementById("monthlyCreditLimit").value
  );

  var util = get_util_rate(monthlyCreditLimit, monthlyDebt);
  var util_rate = util.toFixed(2);

  if (0 <= util && util < 20.0) {
    return 69;
  } else if (20.0 <= util && util < 40.0) {
    return 64;
  } else if (40.0 <= util && util < 65.0) {
    return 60;
  } else if (65.0 <= util && util < 90.0) {
    return 58;
  } else if (util && util >= 90.0) {
    return 55;
  } else {
    return "Error calc util";
  }
}

function apply_loan_btn() {
  var creditScore = document.getElementById("creditScore").value;

  if (creditScore >= 600) {
    var myDiv = document.getElementById("apply_btn");

    // creating button element
    var str = `<a href="./confirmLoanApplication.html" class="btn btn-primary">Apply for Bank Loan</></a>`;
    myDiv.innerHTML = str;
  } else {
    var myDiv = document.getElementById("apply_btn");

    var para = document.createElement("p");
    var textNode = document.createTextNode(
      "Sorry, you are not eligible for loan."
    );
    para.appendChild(textNode);
    myDiv.append(para);
  }
}

//Calculate total points
function calculate_score() {
  var annual_inc_point = calc_annual_income_point(annualIncome);
  // console.log("annual_inc_point")
  console.log(annual_inc_point);
  var mort_acc_point = calc_mort_acc_point(mortAcc);
  // console.log("mort_acc_point")
  // console.log(mort_acc_point)
  var home_point = calc_home_point(homeOwnership);
  // console.log("home_point")
  // console.log(home_point)
  var loan_amount_point = calc_loan_amount_point(loanAmount);
  // console.log("loan_amount_point")
  // console.log(loan_amount_point)

  //interest default 6% 138points
  // var int_rate_point = calc_int_rate_point(interestRate);
  // console.log("int_rate_point")
  var int_rate_point = 138;

  var term_point = calc_term_point(numberOfMonths);
  // console.log("term_point")
  // console.log(term_point)

  var dti_point = calc_dti_point();
  // console.log("dti_point")
  // console.log(dti_point)
  var util_point = calc_util_point();
  // console.log("util_point")
  // console.log(util_point)

  var total =
    annual_inc_point +
    dti_point +
    util_point +
    int_rate_point +
    mort_acc_point +
    home_point +
    term_point +
    loan_amount_point;

  document.getElementById("creditScore").value = total;
  // if(total <= 600) {
  //   document.getElementById("apply_loan_btn").style.display = "none";
  // }
  // else {
  //   document.getElementById("apply_loan_btn").style.display = "";
  // }

  // console.log("creditScore")
  // console.log(total)
}

// function display_apply_loan_btn() {

// }
