// var annualIncome = document.getElementById("annualIncome").value;

var monthlyDebt = document.getElementById("monthlyDebt").value;
var monthlyCreditLimit = document.getElementById("monthlyCreditLimit").value;
var mortAcc = document.getElementById("mortAcc").value;
var loanAmount = document.getElementById("loanAmount").value;

var interestRate = document.getElementById("interestRate").value;
var monthlyDebt = document.getElementById("monthlyDebt").value;

//CALCULATE DTI
function get_dti() {
  var annualIncome = document.getElementById("annualIncome").value;
  var monthlyDebt = document.getElementById("monthlyDebt").value;

  var monthly_inc = annualIncome / 12;
  var current_dti = 0;
  if (monthly_inc == 0 && monthlyDebt != 0) {
    current_dti = 0;
  } else if (monthlyDebt != 0) {
    current_dti = monthlyDebt / monthly_inc;
    console.log("currentdti1")
    console.log(current_dti)
  }
  console.log("currentdti2")
  console.log(current_dti)
  return current_dti * 100;
  
  
}

//CALCULATE UTILIZATION RATE
function get_util_rate() {
  util_rate = 0;
  if (monthlyCreditLimit == 0 && monthlyDebt != 0) {
    var util_rate = 0;
  } else if (monthlyDebt != 0) {
    util_rate = monthlyDebt / monthlyCreditLimit;
  }
  return util_rate * 100;
}
var util = get_util_rate(monthlyCreditLimit, monthlyDebt);
var util_rate = util.toFixed(2);

//SCORECARD POINTS Breakdown
function calc_annual_income_point() {
  var annualIncome = document.getElementById("annualIncome").value;

  if (0 <= annualIncome < 50000) {
    return 47;
  } else if (50000 <= annualIncome < 75000) {
    return 58;
  } else if (75000 <= annualIncome < 105000) {
    return 70;
  } else if (annualIncome >= 105000) {
    return 80;
  } else {
    return "Error annual income";
  }
  
}


function calc_dti_point() {

  var dti = get_dti(annualIncome, monthlyDebt);
  var current_dti = dti.toFixed(2);

  if (0 <= dti < 13.0) {
    return 78;
  } else if (13.0 <= dti < 21.0) {
    return 64;
  } else if (21.0 <= dti < 26.0) {
    return 52;
  } else if (26.0 <= dti < 30.0) {
    return 44;
  } else if (dti >= 30.0) {
    return 32;
  } else {
    return "Error cal DTI";
  }
}


function calc_util_point() {
  if (0 <= util < 20.0) {
    return 69;
  } else if (20.0 <= util < 40.0) {
    return 64;
  } else if (40.0 <= util < 65.0) {
    return 60;
  } else if (65.0 <= util < 90.0) {
    return 58;
  } else if (util >= 90.0) {
    return 55;
  } else {
    return "Error calc util";
  }
}
var util_point = calc_util_point(util);

function calc_loan_amount_point() {
  if (0 <= loanAmount < 4000) {
    return 77;
  } else if (4000 <= loanAmount < 10000) {
    return 70;
  } else if (10000 <= loanAmount < 16000) {
    return 60;
  } else if (loanAmount >= 16000) {
    return 53;
  } else {
    return "Error loan amt";
  }
}
var loan_amount_point = calc_loan_amount_point(loanAmount);

function calc_int_rate_point() {
  if (0 <= interestRate < 8.0) {
    return 138;
  } else if (8.0 <= interestRate < 12.5) {
    return 91;
  } else if (12.5 <= interestRate < 16.5) {
    return 57;
  } else if (16.5 <= interestRate < 21.5) {
    return 28;
  } else if (interestRate >= 21.5) {
    return 5;
  } else {
    return "Error int rate";
  }
}
var int_rate_point = calc_int_rate_point(interestRate);

function calc_mort_acc_point() {
  if (0 <= mortAcc < 1.0) {
    return 54;
  } else if (1.0 <= mortAcc < 3.0) {
    return 62;
  } else if (3.0 <= mortAcc < 5.0) {
    return 68;
  } else if (mortAcc >= 5.0) {
    return 72;
  } else {
    return "Error mort acc point";
  }
}
var mort_acc_point = calc_mort_acc_point(mortAcc);

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


function calc_term_point() {
  var numberOfMonths = document.getElementById("numberOfMonths").value;
  if (numberOfMonths == "12 months") {
    console.log("term point 68")
    return 68;
  } else if (numberOfMonths == "24 months") {
    console.log("term point 59")
    return 59;
  } else {
    return "Error no. of months";
  }
}


function calculate_score() {
  var annual_inc_point = calc_annual_income_point(annualIncome);

  
  
  var dti_point = calc_dti_point(dti);

  var home_point = calc_home_point(homeOwnership);
  var term_point = calc_term_point(numberOfMonths);

  var total = annual_inc_point +
  dti_point +
  util_point +
  int_rate_point +
  mort_acc_point +
  home_point +
  term_point +
  loan_amount_point;

  document.getElementById("creditScore").innerHTML = total
  console.log("creditscore")
  console.log(total)
}
