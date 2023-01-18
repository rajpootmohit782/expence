import { useState } from "react";

const Expenses = () => {
  // const [item, setItem] = useState();
  // const [amount, setAmount] = useState();
  // const [des, setdes] = useState();
  // const [catogery, setCatogery] = useState();

  const getfunction = async () => {
    let geturl =
      "https://expense-c3e30-default-rtdb.firebaseio.com/expenses.json";
    try {
      const datareceive = await fetch(geturl, {
        method: "GET",
        //body: JSON.stringify({
        // amount: amount,
        // description: des,
        // catogery: catogery,
        //   returnSecureToken: true
        // }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const datagot = await datareceive.json();
      console.log(datagot);
      // if (datagot.length > 0) {
      //   for (let i = 0; i < datagot.length; i++) {
      //     console.log(datagot[i].amount);
      //}
      // }
      //  history("/");
    } catch (error) {
      console.log(error);
      //alert(error);
    }
  };

  getfunction();

  const savetodatabase = async (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;
    const des = e.target.des.value;
    const catogery = e.target.catogery.value;
    let url = "https://expense-c3e30-default-rtdb.firebaseio.com/expenses.json";
    try {
      const datasend = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          amount: amount,
          description: des,
          catogery: catogery,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("datasend--", await datasend.json());
      //  history("/");
    } catch (error) {
      console.log(error);
      alert(error);
    }

    const obj = {
      amount,
      des,
      catogery
    };
    //setItem(obj);
    // setAmount(obj.amount);
    // setdes(obj.des);
    // setCatogery(obj.catogery);
    // localStorage.setItem("expense", obj);
    // const a = localStorage.getItem("expense");
    //  console.log(item);
    // axios
    //   .post(
    //     "https://crudcrud.com/api/62a300c18fca46999de4940c88540df7/expences",
    //     obj
    //   )
    //   .then((response) => {
    //  display(response.data);
    //     console.log(response);
    //   })
    //   .catch((Error) => console.log(Error));
  };
  // const ans = (item.[0].amount);
  return (
    <div style={{ margin: "30px", backgroundColor: "wheat" }}>
      <form onSubmit={savetodatabase} action="#" id="form">
        <label>Choose expence amount</label>
        <input type="number" id="amount" required />
        <label>Choose description</label>
        <input type="text" id="des" required />
        <label>Choose a catogery</label>
        <select
          style={{ backgroundColor: "rgb(172, 159, 159)" }}
          name="catogery"
          id="catogery"
        >
          <option value="Fuel">Fuel</option>
          <option value="Market">Market</option>
          <option value="Movie">Movie</option>
          <option value="Shopping">Shopping</option>
        </select>

        <button id="submit">Submit</button>
        <ul id="result"></ul>
        <div id="clear"></div>
      </form>
      <ul>
        <li id="list"></li>
      </ul>
    </div>
  );
};

export default Expenses;
