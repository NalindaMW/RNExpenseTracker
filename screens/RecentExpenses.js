import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDaysMinusDays } from "../utility/date";
import { fetchExpenses } from "../utility/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState();
  const expenseContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expenseContext.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const days7DaysAgo = getDaysMinusDays(today, 7);

    return expense.date > days7DaysAgo;
  });

  return <ExpensesOutput periodName="Last 7 Days" expenses={recentExpenses} />;
}

export default RecentExpenses;

const styles = StyleSheet.create({});
