import { Link } from "react-router-dom";
import ExpensesTrac from "../components/Expense/ExpensesTrac";
const Welcome = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>welcome to expense traker</div>
        <div>
          Your profile is Incomplete{" "}
          <Link to={"/updateprofile"}> Complete now</Link>
        </div>
      </div>
      <ExpensesTrac />
    </div>
  );
};

export default Welcome;
