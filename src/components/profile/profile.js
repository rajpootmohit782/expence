import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const Profile = () => {
  const fullname = useRef();
  const picRef = useRef();

  const [nameValue, setNamevalue] = useState();
  //
 
 const inirunfun =  async() => {
   try{
      const initialprofilevalue = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token")
          })
        }
      );
      const res = await initialprofilevalue.json();
      console.log(res.users.[0].displayName);
      setNamevalue(res.users.[0].displayName)
      // localStorage.setItem("name", res);
    } catch (error) {
      console.log(error);
    }
  }
  //console.log(localStorage.getItem("name"));
  //inirunfun();
  useEffect(()=>inirunfun(),[])
  const Fullnamechange = (e) => {
    const value = e.target.value;
    console.log(value);
    setNamevalue(value)
  };

  const update = async () => {
    const enterdname = fullname.current.value;
    const piclink = picRef.current.value;
    console.log(enterdname, piclink);

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c";

    try {
      const updating = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: enterdname,
          //photoUrl: piclink,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("update--", await updating.json());
      inirunfun();
      //  history("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <h1 style={{ marginLeft: "10rem", marginTop: "15rem" }}>
            {" "}
            Contact Details
          </h1>
          <Link to={'/welcome'}>
            
            <button style={{ marginRight: "10rem", marginTop: "15rem" }}>
              Cancel
            </button>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <div>
            <label htmlFor="name">Full name :</label>
            <input
              onChange={Fullnamechange}
              value={nameValue}
              ref={fullname}
              type="text"
            />
          </div>
          <div>
            <label>profile photo url:</label>
            <input type="url" ref={picRef} />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              update();
            }}
            style={{
              backgroundColor: "red",
              color: "white",
              borderBlockColor: "red",
              borderRadius: "70px",
              marginTop: "29px",
              display: "flex",
              marginLeft: "18rem"
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
