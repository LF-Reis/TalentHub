import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useRouter, Href } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";

export default function TelaEntrar() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<"candidato" | "empresa">("candidato");

  function handleLogin() {
    if (!email || !senha) return Alert.alert("Erro", "Preencha todos os campos.");
    
    if (tipoUsuario === "empresa") {
      router.replace("/empresa/dashboard" as Href);
    } else {
      router.replace("/home" as Href);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        <View style={styles.logoContainer}>
          <View style={[styles.iconeBg, tipoUsuario === 'empresa' ? {backgroundColor: '#191919'} : {backgroundColor: '#0A66C2'}]}>
            <FontAwesome5 name={tipoUsuario === 'empresa' ? "building" : "rocket"} size={26} color="#FFF" />
          </View>
          
          <Text style={styles.titulo}>TalentHub</Text>
          <Text style={styles.subtitulo}>Faça login para continuar</Text>
        </View>
        
        <View style={styles.seletor}>
          <TouchableOpacity style={[styles.aba, tipoUsuario === 'candidato' && styles.ativoC]} onPress={() => setTipoUsuario('candidato')}>
            <Text style={[styles.txtAba, tipoUsuario === 'candidato' && styles.txtAtivo]}>👤 Sou Candidato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.aba, tipoUsuario === 'empresa' && styles.ativoE]} onPress={() => setTipoUsuario('empresa')}>
            <Text style={[styles.txtAba, tipoUsuario === 'empresa' && styles.txtAtivo]}>🏢 Sou Empresa</Text>
          </TouchableOpacity>
        </View>

        <Input label="E-mail de Acesso" placeholder="exemplo@email.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label="Senha" placeholder="••••••••" value={senha} onChangeText={setSenha} secureTextEntry />
        
        <Button 
          title="Entrar na Plataforma" 
          style={tipoUsuario === 'empresa' ? { backgroundColor: '#191919', marginTop: 10 } : { backgroundColor: '#0A66C2', marginTop: 10 }} 
          onPress={handleLogin} 
        />
        
        <TouchableOpacity style={styles.linkRodape} onPress={() => router.push("/auth/cadastro" as Href)}>
          <Text style={styles.textoLink}>Primeira vez aqui? <Text style={styles.destaqueLink}>Crie sua conta</Text></Text>
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
    borderRadius: 24, 
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 8, 
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconeBg: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoImagem: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#191919",
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  seletor: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6", 
    borderRadius: 12,
    padding: 6,
    marginBottom: 24,
  },
  aba: { 
    flex: 1, 
    paddingVertical: 12, 
    alignItems: "center", 
    borderRadius: 8 
  },
  ativoC: { 
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ativoE: { 
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  txtAba: { 
    fontSize: 13, 
    color: "#666",
    fontWeight: "600",
  },
  txtAtivo: { 
    color: "#191919", 
    fontWeight: "bold" 
  },
  linkRodape: {
    marginTop: 20,
    alignItems: 'center',
    padding: 8,
  },
  textoLink: { 
    color: '#666', 
    fontSize: 14 
  },
  destaqueLink: { 
    color: '#0A66C2', 
    fontWeight: 'bold' 
  }
});