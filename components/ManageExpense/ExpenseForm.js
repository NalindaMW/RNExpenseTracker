import { useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utility/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({
  submitButtonLabel,
  onCancel,
  onSubmit,
  selectedExpense,
}) {
  // one state to manage all input values
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense ? getFormattedDate(selectedExpense.date) : "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense.description : "",
      isValid: true,
    },
  });

  // generic input changed handler function
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }, // ex: amount: 19.99
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, // + use to convert the string to number
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== "Invalid Date";
    const isValidDescription = expenseData.description.trim().length > 0;

    if (!isValidAmount || !isValidDate || !isValidDescription) {
      //Alert.alert("Invalid Inputs", "Please check your input values.");

      setInputs((currentInput) => {
        return {
          amount: { value: currentInput.amount.value, isValid: isValidAmount },
          date: { value: currentInput.date.value, isValid: isValidDate },
          description: {
            value: currentInput.description.value,
            isValid: isValidDescription,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const isFormInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View>
      <Input
        label="Amount"
        isValid={inputs.amount.isValid}
        textInputConfigs={{
          keyboardType: "decimal-pad",
          onChangeText: inputChangedHandler.bind(this, "amount"),
          value: inputs.amount.value,
        }}
      />
      <Input
        label="Date"
        isValid={inputs.date.isValid}
        textInputConfigs={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandler.bind(this, "date"),
          value: inputs.date.value,
        }}
      />
      <Input
        label="Description"
        isValid={inputs.description.isValid}
        textInputConfigs={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {isFormInvalid && (
        <Text style={styles.errorText}>
          Invalid Inputs. Please check your input values.
        </Text>
      )}
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
  errorText: {
    color: GlobalStyles.colors.error500,
    margin: 8,
    textAlign: "center",
  },
});
