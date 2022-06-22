import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utility/date";

function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  selectedExpense,
}) {
  // one state to manage all input values
  const [inputValues, setInputValues] = useState({
    amount: selectedExpense ? selectedExpense.amount.toString() : "",
    date: selectedExpense ? getFormattedDate(selectedExpense.date) : "",
    description: selectedExpense ? selectedExpense.description : "",
  });

  // generic input changed handler function
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue, // ex: amount: 19.99
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount, // + use to convert the string to number
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    onSubmit(expenseData);
  }

  return (
    <View>
      <Input
        label="Amount"
        textInputConfigs={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputValues.amount,
        }}
      />
      <Input
        label="Date"
        textInputConfigs={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputValues.date,
        }}
      />
      <Input
        label="Description"
        textInputConfigs={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
