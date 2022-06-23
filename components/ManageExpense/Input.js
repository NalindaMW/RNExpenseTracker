import { View, TextInput, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, isValid, type, maxLength, textInputConfigs }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        {...textInputConfigs}
      />
      {/* <TextInput keyboardType={type} maxLength={maxLength} /> */}
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: GlobalStyles.colors.primary100,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
