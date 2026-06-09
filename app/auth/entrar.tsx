import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useRouter, Href } from "expo-router";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";

export default function TelaEntrar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<"candidato" | "empresa">("candidato");

  function handleLogin() {
    if (!email || !senha) return Alert.alert("Erro", "Preencha tudo.");
    
    if (tipoUsuario === "empresa") {
      router.replace("/empresa/dashboard" as Href);
    } else {
      router.replace("/home" as Href);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>TalentHub</Text>
        
        <View style={styles.seletor}>
          <TouchableOpacity style={[styles.aba, tipoUsuario === 'candidato' && styles.ativoC]} onPress={() => setTipoUsuario('candidato')}>
            <Text style={[styles.txtAba, tipoUsuario === 'candidato' && styles.txtAtivo]}>Candidato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.aba, tipoUsuario === 'empresa' && styles.ativoE]} onPress={() => setTipoUsuario('empresa')}>
            <Text style={[styles.txtAba, tipoUsuario === 'empresa' && styles.txtAtivo]}>Empresa</Text>
          </TouchableOpacity>
        </View>

        <Input label="E-mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <Input label="Senha" value={senha} onChangeText={setSenha} secureTextEntry />
        
        <Button title="Entrar" style={tipoUsuario === 'empresa' ? { backgroundColor: '#191919' } : { backgroundColor: '#0A66C2' }} onPress={handleLogin} />
        
        <TouchableOpacity style={{ marginTop: 12 }} onPress={() => router.push("/cadastro" as Href)}>
          <Text style={{ color: '#666', fontSize: 13 }}>Não tem conta? <Text style={{ color: '#0A66C2', fontWeight: 'bold' }}>Cadastre-se</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F2EF",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#191919",
    marginBottom: 20,
  },
  seletor: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  aba: { 
    flex: 1, 
    paddingVertical: 10, 
    alignItems: "center", 
    borderRadius: 6 
  },
  ativoC: { 
    backgroundColor: "#0A66C2" 
  },
  ativoE: { 
    backgroundColor: "#191919" 
  },
  txtAba: { 
    fontSize: 13, 
    color: "#555" 
  },
  txtAtivo: { 
    color: "#FFF", 
    fontWeight: "bold" 
  },
});
