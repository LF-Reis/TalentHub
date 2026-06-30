import { StyleSheet, Text, TouchableOpacity, StyleProp, TextStyle } from "react-native";
import { ButtonProps } from "../../types";

export default function Button({
  title,
  variant = "primary",
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.botao, styles[variant], style]} {...rest}>
      <Text
        style={[
          styles.texto, 
          variant === "secondary" && styles.textoSecondary,
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  primary: {
    backgroundColor: "#0A66C2",
  },
  secondary: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DCDCDC",
  },
  danger: {
    backgroundColor: "#DC3545",
  },
  texto: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  textoSecondary: {
    color: "#666",
  },
});