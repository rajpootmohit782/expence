import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [isloggedin, setisloggedin] = useState(false);

  const emailInput = useRef();
  const passInput = useRef();
  const confirmpass = useRef();
  const submitHndler = async (e) => {
    //AIzaSyBjG0tiB3qYciqbdkcZa8_sGA-9ywrL3xU
    e.preventDefault();
    console.log("Submit");
    const email = emailInput.current.value;
    const pass = passInput.current.value;

    console.log(email, pass);
    if (!isloggedin) {
      const confirm = confirmpass.current.value;
      if (pass === confirm) {
        let url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c";

        try {
          const signup = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: pass,
              returnSecureToken: true
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });

          console.log("signup--", await signup.json());
          //  history("/");
        } catch (error) {
          console.log(error);
          alert(error);
        }
      } else {
        alert("check password");
      }
    }
    if (isloggedin) {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c";
      try {
        const login = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: pass,
            returnSecureToken: true
          }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        let data = await login.json();
        console.log("login--", data.idToken);
        navigate("./welcome");
        localStorage.setItem("token", data.idToken);
        // authCtx.login(data.idToken);
        // history("/");
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  return (
    <div>
      <div>Header</div>
      <form className="container" onSubmit={submitHndler}>
        {!isloggedin && <h1>SignUp</h1>}
        {isloggedin && <h1>login</h1>}
        <input type="email" required ref={emailInput} />
        <br />
        <input type="password" required ref={passInput} />
        <br />
        {!isloggedin && <input type="password" required ref={confirmpass} />}
        <br />
        <button>Submit</button>
      </form>
      <div style={{ border: "2px solid blue" }}>
        {!isloggedin && (
          <div onClick={() => setisloggedin(true)}>
            Already a member
            <p>click to login</p>
          </div>
        )}
        {isloggedin && (
          <div onClick={() => setisloggedin(false)}>
            not a member
            <p>click to signup</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
