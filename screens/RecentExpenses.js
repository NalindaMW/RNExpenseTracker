import { useContext } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDaysMinusDays } from "../utility/date";

function RecentExpenses() {
  const expenseContext = useContext(ExpensesContext);

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const days7DaysAgo = getDaysMinusDays(today, 7);

    return expense.date > days7DaysAgo;
  });

  return <ExpensesOutput periodName="Last 7 Days" expenses={recentExpenses} />;
}

export default RecentExpenses;

const styles = StyleSheet.create({});
