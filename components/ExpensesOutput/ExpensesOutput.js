import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({ expenses, periodName }) {
  return (
    <View>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList />
    </View>
  );
}

export default ExpensesOutput;
