import { useLayoutEffect } from "react";
import { Text, StyleSheet } from "react-native";

function ManageExpense({ route, navigation }) {
  const editedExpense = route.params?.expenseId; // check for undifined with ? symbol
  const isEditing = !!editedExpense; // convert a value into a boolean with !! symbols

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>Manage Expense</Text>;
}

export default ManageExpense;

const styles = StyleSheet.create({});
