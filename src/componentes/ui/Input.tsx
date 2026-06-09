import { StyleSheet, Text, TextInput, View } from "react-native";
import { InputProps } from "../../types";

export default function Input({
  label,
  multiline,
  style,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea, style]}
        multiline={multiline}
        placeholderTextColor="#999"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 85,
    textAlignVertical: "top",
  },
});
