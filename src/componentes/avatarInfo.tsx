import { View, Text, StyleSheet } from "react-native";      
import { PerfilinfoProps } from "../types";

export default function Perfil({ nome, email }: PerfilinfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.nome} numberOfLines={1}>{nome}</Text>
      <Text style={styles.email} numberOfLines={1}>{email}</Text>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191919',
    marginBottom: 2,
  },
  email: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666666',
  },
});