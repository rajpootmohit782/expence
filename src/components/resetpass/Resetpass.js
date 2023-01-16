import React, { useRef, useState } from "react";
import { Form } from "react-router-dom";

const Resetpass = () => {
  const [email, setEmail] = useState();
  const [show, setshow] = useState(false);
  const emailinter = useRef();
  //  const email = emailinter;
  // console.log(email);
  const resetHandle = async (e) => {
    // e.preventDefault();
    console.log("resethandle running");
    // const sss = emailinter.current.value;
    // console.log(sss);

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c";

    try {
      const updatepass = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          requestType: "PASSWORD_RESET",
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("resetpass--", await updatepass.json());
      setshow(true);
      //  history("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const emailchanged = (e) => {
    const value = e.target.value;
    console.log(value);
    setEmail(value);
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="email">your email</label>
          <input
            onChange={emailchanged}
            value={email}
            type="email"
            required
            useRef={emailinter}
          />
        </div>
        <div style={{ padding: "10px" }}>
          <button onClick={() => resetHandle()}>reset</button>
          {show && <h3>link sent to your email for reset</h3>}
        </div>
      </div>
    </div>
  );
};

export default Resetpass;
