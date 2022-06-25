import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utility/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function ManageExpense({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId; // check for undifined with ? symbol
  const isEditing = !!editedExpenseId; // convert a value into a boolean with !! symbols

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  async function deleteExpenseHandler() {
    expensesContext.deleteExpense(editedExpenseId);
    setIsLoading(true);
    await deleteExpense(editedExpenseId);
    // setIsLoading(false); // No need to set to false bcs screen is already dismissing
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsLoading(true);
    if (isEditing) {
      expensesContext.updateExpense(editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesContext.addExpense({ ...expenseData, id: id });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        selectedExpense={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
