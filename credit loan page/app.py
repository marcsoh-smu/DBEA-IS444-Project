import streamlit as st
import pandas as pd
import pickle
import numpy as np
from PIL import Image
from sklearn.ensemble import GradientBoostingClassifier
from datetime import datetime
import scorecardpy as sc



#sidebar widgets
col1, col2 = st.sidebar.columns([1,2])
with col1:
  st.image('AhHuatLogo.png')

with col2:
  st.markdown("<h1>Ah Huat Bank</h1>",unsafe_allow_html=True)

#customer details
st.sidebar.header("Customer Details:")
name = st.sidebar.text_input("Customer Name", value='Elon Musk')

#details for loan assessment below
annual_inc = st.sidebar.number_input("Annual Income", min_value = 0, step = 1000, value = 120000)

home_ownership = st.sidebar.selectbox('Home Ownership',('MORTGAGE', 'RENT', 'OWN',))

monthly_debt = st.sidebar.number_input("Monthly Debt", min_value = 0, step = 100, value=1000)

monthly_credit_limit = st.sidebar.number_input("Monthly Credit Limit", min_value = 0, step = 1000, value= 10000)

mort_acc = st.sidebar.number_input("Mortgage Account(s)", min_value = 0, value = 2, step = 1)

##CALCULATE DTI###
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


##CALCULATE UTILIZATION RATE###
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

#CSS
util_rate_html = f"""
<style>
p.a {{
  font: bold 20px Courier;
}}
</style>
<p class="a">{util_rate}</p>
"""

dti_html = f"""
<style>
p.a {{
  font: bold 20px Courier;
  color: dodgerblue
}}
</style>
<p class="a">{current_dti}</p>
"""

#MAIN PAGE
st.title("Credit Scorecard \U0001F3E6")
st.subheader("Financial Ratios")
col1, col2 = st.columns(2)
with col1:
  st.markdown('Debt-to-Income Ratio:')
  st.markdown(dti_html, unsafe_allow_html=True)
with col2:
  st.markdown('Debt-to-Limit Ratio/Credit Utilization Rate:')
  st.markdown(util_rate_html, unsafe_allow_html=True)

st.subheader("Loan Details")
col1, col2, col3 = st.columns(3)
with col1:
  loan_amnt = st.number_input("Loan Amount", min_value = 0, max_value = 20000, value = 0, step = 1000)
with col2:
  term = st.selectbox('Loan Term',(' 36 months', ' 60 months'))
  #st.write('You selected:', term)
with col3:
  int_rate = st.number_input("Loan Interest Rate (%)", min_value = 6.00, value=6.00, step = 1.00)


### PREDICT CREDIT SCORE #####
card = pickle.load(open('credit_score_no_bp.pkl', 'rb'))
#Dummy var 
creditScoreData = {
        'annual_inc': annual_inc,
        'dti': dti,
        'home_ownership': home_ownership,
        'int_rate': int_rate,
        'loan_amnt': loan_amnt,
        'mort_acc': mort_acc,
        'revol_util': util,
        'term': term
        }

creditScoreFeatures = pd.DataFrame(creditScoreData, index=[0])

score = sc.scorecard_ply(creditScoreFeatures, card)['score'].to_string(index=False)


# st.subheader('Credit Score:')
st.metric('Credit Score', score)

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

  
  st.markdown(f'**Total Score: {total}**',unsafe_allow_html=True)


###SCORE TABLE####
annual_inc_dict = {'Scores': [47,58,70,80]}
annual_inc_df =  pd.DataFrame(annual_inc_dict, index = ['$0 to $49,999','$50,000 to $74,999','$75,000 to $104,999', 'Above $105,000'])

dti_dict = {'Scores': [78,64,52,44,33]}
dti_df =  pd.DataFrame(dti_dict, index = ['0 to 12','13 to 20','21 to 25', '26 to 29', 'Above 30'])

home_ownership_dict = {'Scores': [68,59,52]}
home_ownership_df =  pd.DataFrame(home_ownership_dict, index = ['Mortgage','Own','Rent'])

int_rate_dict = {'Scores': [138,91,57,28,5]}
int_rate_df =  pd.DataFrame(int_rate_dict, index = ['0% to 8%','8% to 12.5%','12.5% to 16.5%', '16.5% to 21.5%', 'Above 21.5%'])

loan_amount_dict = {'Scores': [77,70,60,53]}
loan_amount_df =  pd.DataFrame(loan_amount_dict, index = ['$0 to $3,999','$4,000 to $9,999','$10,000 to $15,999', 'Above $16,000'])

mort_dict = {'Scores': [54,62,68,72]}
mort_df =  pd.DataFrame(mort_dict, index = ['0 to 1','1 to 2','3 to 5', 'Above 5 '])

util_dict = {'Scores': [69,64,60,58,55]}
util_df =  pd.DataFrame(util_dict, index = ['0 to 19','20 to 39','40 to 64', '65 to 89', 'Above 90'])

term_dict = {'Scores': [71,35]}
term_df =  pd.DataFrame(term_dict, index = ['36 months','60 months'])

with st.expander("Scoring Table"):
  st.markdown('**Target Score:** 600, **Target Odds:** 1:20, **Points to Double Odds:** 50 ')
  col1, col2= st.columns(2)
  with col1:
    st.write('Annual Income')
    st.table(annual_inc_df)

    st.write('Mortgage Account')
    st.table(mort_df)

    st.write('Loan Amount')
    st.table(loan_amount_df)

    st.write('Term of Loan')
    st.table(term_df)
  
  with col2:
    st.write('Debt to Income Ratio')
    st.table(dti_df)

    st.write('Home Ownership')
    st.table(home_ownership_df)

    st.write('Interest Rate')
    st.table(int_rate_df)

    st.write('Credit Utilization Rate')
    st.table(util_df)


## RECOMMENDATIONS ###
st.subheader('Recommendation to Customer:')

#recommendation2 pushes customer up to next tier in order of priority of both bank and customer.
#priority: easily changeable values first
#Bank perspective: increase interest earnings
#Customer perspective: to get loan amount desired
@st.cache
def recommendation2(score, loan_amnt, term, home_ownership, dti, annual_inc, monthly_credit_limit, int_rate, util_point):
  message = []
  score = float(score)
  #if credit score is < 600
  if score < 600:
    #loan term reduction
    if term == ' 60 months':
      term = ' 36 months'
      message.append("Reduce loan term to 36 months.")
      score += 36
      message.append("Credit score: " + str(score) + " (after reduction in loan term)")

    #if score still < 600
    if score < 600:
      #reduce monthly debt obligations - improve util rate at the same time
      monthly_inc = annual_inc/12
      monthly_debt = 0
      increase = 0
      if dti != 0 and monthly_inc != 0:
        if 13.0 <= dti < 21.0:
          dti = 12.0
          monthly_debt = (dti/100) * (monthly_inc)
          message.append("Reduce monthly debt obligations to " + str(int(monthly_debt))+ ".")
          score += 14
          if monthly_credit_limit != 0 and monthly_debt != 0:
            util_rate = (monthly_debt/monthly_credit_limit) * 100
            upoint = calc_util_point(util_rate)
            increase = upoint - util_point
            score += increase
        elif 21.0 <= dti < 26.0:
          dti = 20.0
          monthly_debt = (dti/100) * (monthly_inc)
          message.append("Reduce monthly debt obligations to " + str(int(monthly_debt))+ ".")
          score += 12
          if monthly_credit_limit != 0 and monthly_debt != 0:
            util_rate = (monthly_debt/monthly_credit_limit) * 100
            upoint = calc_util_point(util_rate)
            increase = upoint - util_point
            score += increase
        elif 26.0 <= dti < 30.0:
          dti = 25.0
          monthly_debt = (dti/100) * (monthly_inc)
          message.append("Reduce monthly debt obligations to " + str(int(monthly_debt))+ ".")
          score += 8
          if monthly_credit_limit != 0 and monthly_debt != 0:
            util_rate = (monthly_debt/monthly_credit_limit) * 100
            upoint = calc_util_point(util_rate)
            increase = upoint - util_point
            score += increase
        elif 30.0 <= dti < 100:
          dti = 29.0
          monthly_debt = (dti/100) * (monthly_inc)
          message.append("Reduce monthly debt obligations to " + str(int(monthly_debt)) + ".")
          score += 11
          if monthly_credit_limit != 0 and monthly_debt != 0:
            util_rate = (monthly_debt/monthly_credit_limit) * 100
            upoint = calc_util_point(util_rate)
            increase = upoint - util_point
            score += increase
        monthly_debt = int(monthly_debt)
      #calculate increase in util rate points due to decrease in debt obligations
      if increase != 0:
        message.append("Credit score: " + str(score) + " (after reduction in monthly debt obligations)")

      #if score still < 600
      if score < 600:
        #reduce int rate
        if int_rate > 7.9:
          if 8.0 <= int_rate < 12.5:
            int_rate = 7.9
            message.append("Reduce loan interest rate to < 8%.")
            score += 47
          elif 12.5 <= int_rate < 16.5:
            int_rate = 12.4
            message.append("Reduce loan interest rate to < 12.5%.")
            score += 34
          elif 16.5 <= int_rate < 21.5:
            int_rate = 16.4
            message.append("Reduce loan interest rate to < 16.4%.")
            score += 29
          else:
            int_rate = 21.4
            message.append("Reduce loan interest rate to < 21.5%.") 
            score += 23
          message.append("Credit score: " + str(score) + " (after reduction in loan interest rate)")

        #if score still < 600
        if score < 600:
          #reduce loan amount
          if loan_amnt > 3999:
            if loan_amnt < 10000:
              loan_amnt = 3999
              message.append("Reduce loan amount to < $4000.")
              score += 7
            elif loan_amnt < 16000:
              loan_amnt = 9999
              message.append("Reduce loan amount to < $10000.")
              score += 10
            else:
              loan_amnt = 15999
              message.append("Reduce loan amount to < $16000.")
              score += 7
            message.append("Credit score: " + str(score) + " (after reduction in loan amount)")
          #if score still < 600     
          if score < 600:
            #customer cannot be recommended above 600 points even if pushed to next tier for all values in recommender2
            message = "No recommendations are available for customer to achieve 600 points. Please alter details manually."
  return message


recommendations = recommendation2(score, loan_amnt, term, home_ownership, dti, annual_inc, monthly_credit_limit, int_rate, util_point)
if type(recommendations) != str:
  for i in range(0, len(recommendations)):
    recommendation = recommendations[i]
    i = i +1
    i = str(i)
    st.write(i,"."," ",recommendation)
else: 
  st.write(recommendations)
