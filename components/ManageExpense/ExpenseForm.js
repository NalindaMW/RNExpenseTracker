import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  // one state to manage all input values
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
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
    </View>
  );
}

export default ExpenseForm;
