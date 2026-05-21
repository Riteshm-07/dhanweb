let isLogin = true;
console.log("Script Connected");
/* TOGGLE LOGIN/SIGNUP */

function toggleForm(){

  isLogin = !isLogin;

  const loginForm =
  document.getElementById("loginForm");

  const signupForm =
  document.getElementById("signupForm");

  const title =
  document.getElementById("formTitle");

  const switchText =
  document.getElementById("switchText");

  const switchLink =
  document.querySelector(".switch a");

  if(isLogin){

    loginForm.style.display = "block";

    signupForm.style.display = "none";

    title.innerText = "Login to Dhan";

    switchText.innerText =
    "Don't have account?";

    switchLink.innerText = "Sign Up";

  }

  else{

    loginForm.style.display = "none";

    signupForm.style.display = "block";

    title.innerText = "Create Account";

    switchText.innerText =
    "Already have account?";

    switchLink.innerText = "Login";

  }

}

/* SIGNUP */

function signup(){

  const name =
  document.getElementById("signupName").value;

  const email =
  document.getElementById("signupEmail").value;

  const password =
  document.getElementById("signupPassword").value;

  if(!name || !email || !password){

    alert("Fill all fields");

    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem(
    "dhanUser",
    JSON.stringify(user)
  );

  alert("Account Created Successfully");

  toggleForm();

}

/* LOGIN */

function login(){

  const email =
  document.getElementById("loginEmail").value;

  const password =
  document.getElementById("loginPassword").value;

  const stored =
  JSON.parse(localStorage.getItem("dhanUser"));

  if(!stored){

    alert("Create account first");

    return;
  }

  if(
    email === stored.email &&
    password === stored.password
  ){

    alert(
      "Welcome " + stored.name
    );

   window.location.href = "heatmap.html";
  }

  else{

    alert("Invalid Email or Password");

  }

}