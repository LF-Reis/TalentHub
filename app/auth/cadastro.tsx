import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter, Href } from "expo-router";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";

export default function TelaCadastro() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<"CANDIDATO" | "EMPRESA">("CANDIDATO");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Criar Nova Conta</Text>

        <View style={styles.containerAbas}>
          <TouchableOpacity style={[styles.aba, perfil === "CANDIDATO" && { backgroundColor: '#E8F4FF' }]} onPress={() => setPerfil("CANDIDATO")}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: perfil === 'CANDIDATO' ? '#0A66C2' : '#666' }}>👤 Candidato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.aba, perfil === "EMPRESA" && { backgroundColor: '#EAEAEA' }]} onPress={() => setPerfil("EMPRESA")}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: perfil === 'EMPRESA' ? '#191919' : '#666' }}>🏢 Empresa</Text>
          </TouchableOpacity>
        </View>

        <Input label="Nome" value={nome} onChangeText={setNome} />
        <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />

        {perfil === "EMPRESA" && (
          <Input label="CNPJ Corporativo" value={cnpj} onChangeText={setCnpj} keyboardType="numeric" />
        )}

        <Button title="Concluir" style={perfil === 'EMPRESA' ? { backgroundColor: '#191919' } : { backgroundColor: '#0A66C2' }} onPress={() => { Alert.alert("Sucesso", "Conta criada!"); router.replace("/entrar" as Href); }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: "#F3F2EF", 
    justifyContent: "center", 
    padding: 20 
  },
  card: { 
    backgroundColor: "#FFF", 
    borderRadius: 16, 
    padding: 24 
  },
  titulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#191919", 
    textAlign: "center", 
    marginBottom: 20 
  },
  containerAbas: { 
    flexDirection: "row", 
    gap: 10, 
    marginBottom: 20 
  },
  aba: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: "center",
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "#DCDCDC" 
  },
});