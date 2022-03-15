function crediScoreCal() {
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


//CALCULATE DTI
@st.cache
def get_dti(annual_inc, monthly_debt):
  monthly_inc = annual_inc/12
  current_dti = 0
  if monthly_inc == 0 and monthly_debt != 0:
    current_dti = 0
  elif monthly_debt != 0:
    current_dti = (monthly_debt/monthly_inc)
  return current_dti * 100

dti = get_dti(annual_inc,monthly_debt)
current_dti =  "{:.2f}".format(dti)

//CALCULATE UTILIZATION RATE###
@st.cache
def get_util_rate(monthly_credit_limit,monthly_debt):
  util_rate = 0
  if monthly_credit_limit == 0 and monthly_debt != 0:
    util_rate = 0
  elif monthly_debt != 0:
    util_rate = (monthly_debt/monthly_credit_limit)
  return util_rate * 100

util = get_util_rate(monthly_credit_limit,monthly_debt)
util_rate =  "{:.2f}".format(util)



##SCORECARD POINTS BREAKDOWN###
with st.expander("Breakdown of Credit Score Points"):

  @st.cache
  def calc_annual_income_point(annual_inc):
    if 0 <= annual_inc < 50000:
        return 47
    elif 50000 <= annual_inc < 75000:
        return 58
    elif 75000 <= annual_inc < 105000:
        return 70
    elif annual_inc >= 105000:
        return 80
    else: 
        return 'Seems like you keyed an negative value'
    
  annual_inc_point = calc_annual_income_point(annual_inc)


  @st.cache
  def calc_dti_point(dti):
    if 0 <= dti < 13.0:
        return 78
    elif 13.0 <= dti < 21.0:
        return 64
    elif 21.0 <= dti < 26.0:
        return 52
    elif 26.0 <= dti < 30.0:
        return 44
    elif dti >= 30.0:
        return 32
    else: 
        return 'Seems like you keyed an negative value'
    
  dti_point = calc_dti_point(dti)


  @st.cache
  def calc_util_point(util):
    if 0 <= util < 20.0:
        return 69
    elif 20.0 <= util < 40.0:
        return 64
    elif 40.0 <= util < 65.0:
        return 60
    elif 65.0 <= util < 90.0:
        return 58
    elif util >= 90.0:
        return 55
    else: 
        return 'Seems like you keyed an negative value'
    
  util_point = calc_util_point(util)


  @st.cache
  def calc_loan_amount_point(loan_amnt):
    if 0 <= loan_amnt < 4000:
        return 77
    elif 4000 <= loan_amnt < 10000:
        return 70
    elif 10000 <= loan_amnt < 16000:
        return 60
    elif loan_amnt >= 16000:
        return 53
    else: 
        return 'Seems like you keyed an negative value'
    
  loan_amount_point = calc_loan_amount_point(loan_amnt)


  @st.cache
  def calc_int_rate_point(int_rate):
    if 0 <= int_rate < 8.0:
        return 138
    elif 8.0 <= int_rate < 12.5:
        return 91
    elif 12.5 <= int_rate < 16.5:
        return 57
    elif 16.5 <= int_rate < 21.5:
        return 28
    elif int_rate >= 21.5:
        return 5
    else: 
        return 'Seems like you keyed an negative value'
    
  int_rate_point = calc_int_rate_point(int_rate)


  @st.cache
  def calc_mort_acc_point(mort_acc):
    if 0 <= mort_acc < 1.0:
        return 54
    elif 1.0 <= mort_acc < 3.0:
        return 62
    elif 3.0 <= mort_acc < 5.0:
        return 68
    elif mort_acc >= 5.0:
        return 72
    else: 
        return 'Seems like you keyed an negative value'
    
  mort_acc_point = calc_mort_acc_point(mort_acc)


  @st.cache
  def calc_home_point(home_ownership):
    if home_ownership == 'MORTGAGE':
        return 68
    elif home_ownership == 'OWN':
        return 59
    elif home_ownership == 'RENT':
        return 52
    else: 
        return 'Seems like you keyed a wrong value'
    
  home_point = calc_home_point(home_ownership)


  @st.cache
  def calc_term_point(term):
    if term == ' 36 months':
        return 71
    elif term == ' 60 months':
        return 35
    else: 
        return 'Seems like you keyed a wrong value'
    
  term_point = calc_term_point(term)


  total = annual_inc_point + dti_point + util_point + int_rate_point + mort_acc_point + home_point + term_point + loan_amount_point
  
  breakdown_dict = {'Scores': [annual_inc_point,dti_point,util_point,int_rate_point,mort_acc_point,home_point,term_point,loan_amount_point]}
  breakdown_df =  pd.DataFrame(breakdown_dict, index = ['Annual Income','Debt-to-Income','Utilization Rate', 'Interest Rate', 'Mortgage Account', 'Home Ownership', 'Term of Loan', 'Loan Amount'])
  st.table(breakdown_df)
