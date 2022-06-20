import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Buy a pair of shoes",
    amount: 59.99,
    date: new Date("2022-01-19"),
  },
  {
    id: "e2",
    description: "Buy a pair of trouses",
    amount: 29.59,
    date: new Date("2021-11-10"),
  },
  {
    id: "e3",
    description: "Buy a book",
    amount: 18.99,
    date: new Date("2021-11-19"),
  },
  {
    id: "e4",
    description: "Buy a car",
    amount: 59.99,
    date: new Date("2022-01-18"),
  },
  {
    id: "e5",
    description: "Buy a laptop",
    amount: 159.99,
    date: new Date("2022-01-19"),
  },
];

function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
