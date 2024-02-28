const state = {
  earnings: 0,
  expense: 0,
  net: 0,
  transactions: [
    {
      id: 5,
      text: "Demo",
      amount: 500,
      type: "credit",
    },
    {
      id: 5,
      text: "Demo Debit",
      amount: 600,
      type: "debit",
    },
  ],
};
const transactionFormEl = document.getElementById("transaction-form");

const renderTransactions = function () {
  const transactionContainerEl = document.querySelector(".transactions-count");
  const netAmountEl = document.getElementById("netAmount");
  const earningEl = document.getElementById("earning");
  const expenseEl = document.getElementById("expense");

  const transactions = state.transactions;

  let earning = 0;
  let expense = 0;
  let net = 0;

  transactionContainerEl.innerHTML=""
  transactions.forEach(function (transaction) {
    const { id, amount, text, type } = transaction;
    const isCredit = type === "credit" ? true : false;
    const sign =  isCredit ? "+" : "-";
    
    const transactionEl = `
    <div class="individual-transaction" id="${id}">
     <div class="left">
       <p>${text}</p>
       <p>${sign} ₹ ${amount}</p>
     </div>
    <div class="right ${isCredit ? "credit" : "debit"}">${isCredit ? "C" : "D"}</div>
  </div>`;

  earning+=isCredit?amount:0
  expense+=!isCredit?amount:0
  net=earning-expense
  transactionContainerEl.insertAdjacentHTML('afterbegin',transactionEl)

  });

  netAmountEl.innerHTML = `₹ ${net}`
   earningEl.innerHTML = `₹ ${earning}`
   expenseEl.innerHTML = `₹ ${expense}`


};

const addTransaction = function (event) {
  event.preventDefault();
  const isEarn = event.submitter.id === "earnBtn" ? true : false;

  // console.log(event.submitter.id);

  const formData = new FormData(transactionFormEl);
  const tData = {};
  formData.forEach(function (value, key) {
    tData[key] = value;
  });
  const { text, amount } = tData;
  const transaction = {
    id: Math.floor(Math.random() * 1000),
    text: text,
    amount: +amount,
    type: isEarn ? "credit" : "debit",
  };

  state.transactions.push(transaction);
  renderTransactions()
  
};
transactionFormEl.addEventListener("submit", addTransaction);
