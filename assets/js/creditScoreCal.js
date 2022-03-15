function creditScoreCal() {
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
var annualIncome = document.getElementById("annualIncome").value;
var homeOwnership = document.getElementById("homeOwnership").value;
var monthlyDebt = document.getElementById("monthlyDebt").value;
var monthlyCreditLimit = document.getElementById("monthlyCreditLimit").value;
var mortAcc = document.getElementById("mortAcc").value;
var loanAmt = document.getElementById("loanAmt").value;
var loanTerm = document.getElementById("loanTerm").value;
var interestRate = document.getElementById("interestRate").value;
var monthlyDebt = document.getElementById("monthlyDebt").value;

//CALCULATE DTI
function get_dti() {
  var monthly_inc = annualIncome / 12;
  var current_dti = 0;
  if (monthly_inc == 0 && monthlyDebt != 0) {
    current_dti = 0;
  } 
  else if (monthlyDebt != 0) {
    current_dti = monthlyDebt / monthly_inc;
  }
  return current_dti * 100;
}

var dti = get_dti(annualIncome, monthlyDebt);
var current_dti = dti.toFixed(2);

//CALCULATE UTILIZATION RATE
function get_util_rate() {
  util_rate = 0;
  if (monthlyCreditLimit == 0 && monthlyDebt != 0) {
    var util_rate = 0;
  }
  else if (monthlyDebt != 0) {
    util_rate = (monthlyDebt / monthlyCreditLimit);
}
  return util_rate * 100;
}

var util = get_util_rate(monthlyCreditLimit, monthlyDebt);
var util_rate = util.toFixed(2);

//SCORECARD POINTS Breakdown
function calc_annual_income_point() {
  if (0 <= annualIncome < 50000) {
    return 47;
  } else if (50000 <= annualIncome < 75000) {
    return 58;
  } else if (75000 <= annualIncome < 105000) {
    return 70;
  } else if (annualIncome >= 105000) {
    return 80;
  } else {
    return "Seems like you keyed an negative value";
  }
}

var annual_inc_point = calc_annual_income_point(annualIncome);

function calc_dti_point() {
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
    return "Seems like you keyed an negative value";
  }
}

var dti_point = calc_dti_point(dti);

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
    return "Seems like you keyed an negative value";
  }
}

var util_point = calc_util_point(util);

function calc_loan_amount_point() {
  if (0 <= loanAmt < 4000) {
    return 77;
  } else if (4000 <= loanAmt < 10000) {
    return 70;
  } else if (10000 <= loanAmt < 16000) {
    return 60;
  } else if (loanAmt >= 16000) {
    return 53;
  } else {
    return "Seems like you keyed an negative value";
  }
}

var loan_amount_point = calc_loan_amount_point(loanAmt);

function calc_int_rate_point() {
  if (0 <= int_rate < 8.0) {
    return 138;
  } else if (8.0 <= int_rate < 12.5) {
    return 91;
  } else if (12.5 <= int_rate < 16.5) {
    return 57;
  } else if (16.5 <= int_rate < 21.5) {
    return 28;
  } else if (int_rate >= 21.5) {
    return 5;
  } else {
    return "Seems like you keyed an negative value";
  }
}

var int_rate_point = calc_int_rate_point(int_rate);
