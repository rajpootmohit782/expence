import { useRef } from "react";

const SignUp = () => {
  const emailInput = useRef();
  const passInput = useRef();
  const confirmpass = useRef();
  const submitHndler = async (e) => {
    //AIzaSyBjG0tiB3qYciqbdkcZa8_sGA-9ywrL3xU
    e.preventDefault();
    console.log("Submit");
    const email = emailInput.current.value;
    const pass = passInput.current.value;
    const confirm = confirmpass.current.value;
    console.log(email, pass);
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
  };
  return (
    <div>
      <div>Header</div>
      <form className="container" onSubmit={submitHndler}>
        <h1>SignUp</h1>
        <input type="email" required ref={emailInput} />
        <br />
        <input type="password" required ref={passInput} />
        <br />
        <input type="password" required ref={confirmpass} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
