import React, { useEffect, useRef, useState } from "react";
import { Link,useNavigate,NavLink } from "react-router-dom";
const Profile = () => {
  const fullname = useRef();
  const picRef = useRef();
 // const code = useRef();
 const navigate = useNavigate()

  const [nameValue, setNamevalue] = useState();
  const [emailverify, setemailvarify] = useState(false);
 
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
      console.log(res.users.[0].displayName)
      setNamevalue(res.users.[0].displayName)
      // localStorage.setItem("name", res);
    } catch (error) {
      console.log(error);
    }
  }
  //console.log(localStorage.getItem("name"));
  //inirunfun();
  useEffect(()=> inirunfun(),[])
//<h3>Code<input ref={code} type='text'/><button onClick={()=>verifycode()}>Verify</button></h3>
  // const verifycode = async(e) => {
  //   const value = code.current.value
  //   console.log(value);
  //   setemailvarify(value)
  //  // setNamevalue(value)
  //  try{
  //   const initialprofilevalue = await fetch(
  //     "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({
  //         oobCode: value,
  //       })
  //     }
  //   );
  //   const res = await initialprofilevalue.json();
  //   console.log(res)
  //  // setNamevalue(res.users.[0].displayName)
  //   // localStorage.setItem("name", res);
  // } catch (error) {
  //   console.log(error);
  // }
  // };

  const logmeout =()=>{
    const lvalue = localStorage.getItem('token')
    console.log(lvalue)
    localStorage.removeItem('token')
    const mvalue = localStorage.getItem('token')
    console.log(mvalue)
   // navigate('/')
  }

  const Fullnamechange = (e) => {
    const value = e.target.value;
    console.log(value);
    setNamevalue(value)
  };

  const verifyemail=async()=>{
    try{
      const initialprofilevalue = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC1cHwbFf5M0-WkzZzuui1ilakaxz8Og2c",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("token")
          })
        }
      );
      const res = await initialprofilevalue.json();
      console.log(res)
      setemailvarify(true)
      
      // localStorage.setItem("name", res);
    } catch (error) {
      console.log(error);
    }
  }

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
     <Link to={'/'}> <button onClick={()=> logmeout()}>Logout</button> </Link>
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
          <NavLink to={'/welcome'}>
            
            <button style={{ marginRight: "10rem", marginTop: "15rem" }}>
              Cancel
            </button>
          </NavLink>
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
          <h2>varify your email <button onClick={()=>verifyemail()}>click</button></h2>
          {emailverify && <h3>check your email you receive code there</h3>  }
        </div>
      </div>
    </div>
  );
};

export default Profile;
