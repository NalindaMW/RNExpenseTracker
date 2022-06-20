import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpenses() {
  return <ExpensesOutput periodName="Last 7 Days" />;
}

export default RecentExpenses;

const styles = StyleSheet.create({});
