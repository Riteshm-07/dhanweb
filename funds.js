let balance =
Number(localStorage.getItem("fundBalance")) || 0;

let history =
JSON.parse(
  localStorage.getItem("fundHistory")
) || [];

/* ADD FUNDS */

function addFunds(){

  let amount =
  Number(
    document.getElementById("addMoney").value
  );

  if(amount <= 0){

    alert("Enter Valid Amount");

    return;

  }

  balance += amount;

  history.unshift(
    `Added ₹${amount}`
  );

  saveData();

  document.getElementById("addMoney").value = "";

}

/* WITHDRAW */

function withdrawFunds(){

  let amount =
  Number(
    document.getElementById("withdrawMoney").value
  );

  if(amount <= 0){

    alert("Enter Valid Amount");

    return;

  }

  if(amount > balance){

    alert("Insufficient Balance");

    return;

  }

  balance -= amount;

  history.unshift(
    `Withdraw ₹${amount}`
  );

  saveData();

  document.getElementById("withdrawMoney").value = "";

}

/* SAVE */

function saveData(){

  localStorage.setItem(
    "fundBalance",
    balance
  );

  localStorage.setItem(
    "fundHistory",
    JSON.stringify(history)
  );

  render();

}

/* RENDER */

function render(){

  document.getElementById("balance")
  .innerText =
  "₹" + balance;

  let historyBox =
  document.getElementById("history");

  historyBox.innerHTML = "";

  history.forEach(item=>{

    historyBox.innerHTML += `

      <div class="history-item">
        ${item}
      </div>

    `;

  });

}



render();