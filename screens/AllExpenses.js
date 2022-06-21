import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expenseContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput periodName="Total" expenses={expenseContext.expenses} />
  );
}

export default AllExpenses;

const styles = StyleSheet.create({});
