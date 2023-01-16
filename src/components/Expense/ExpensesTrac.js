import { useState } from "react";

const Expenses = () => {
  const [item, setItem] = useState([]);
  function savetodatabase(e) {
    e.preventDefault();
    const amount = e.target.amount.value;
    const des = e.target.des.value;
    const catogery = e.target.catogery.value;

    const obj = [
      {
        amount,
        des,
        catogery
      }
    ];

    setItem(obj);
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
  }
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
    </div>
  );
};

export default Expenses;
