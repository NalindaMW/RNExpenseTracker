import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({ expenses, periodName }) {
  var content = <Text style={styles.infoText}>No Expenses Available.</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 6,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
  },
});
