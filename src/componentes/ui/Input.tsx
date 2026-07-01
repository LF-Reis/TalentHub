import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { InputProps } from "../../types"; 

export default function Input({ label, iconName, isPassword, style, secureTextEntry, ...rest }: InputProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        
        {iconName && (
          <FontAwesome5 name={iconName} size={18} color="#999" style={styles.iconeEsquerda} />
        )}
        
        <TextInput 
          style={[styles.inputs, style]} 
          placeholderTextColor="#999"
          secureTextEntry={isPassword ? !mostrarSenha : secureTextEntry}
          {...rest} 
        />

        {isPassword && (
          <TouchableOpacity 
            onPress={() => setMostrarSenha(!mostrarSenha)} 
            style={styles.iconeDireita}
            activeOpacity={0.7}
          >
            <FontAwesome5 name={mostrarSenha ? "eye" : "eye-slash"} size={18} color="#999" />
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: "bold", color: "#444", marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  icone: { 
    marginRight: 10 
  },
  input: { 
    flex: 1, 
    paddingVertical: 12, 
    fontSize: 15, 
    color: '#333',
  },
  iconeEsquerda: { 
    marginRight: 10 
  },
  iconeDireita: { 
    marginLeft: 10, 
    padding: 4 
  },
  inputs: { 
    flex: 1, 
    paddingVertical: 12, 
    fontSize: 15, 
    color: '#333' 
  },
});
