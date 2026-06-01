import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  function fazerLogin() {
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }
    console.log("Tentando logar com:", email, senha);
    router.replace('/sistema/home');
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.headerArea}>
          <Text style={styles.logoText}>TalentHub</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Bem-vindo de volta</Text>
          <Text style={styles.subTitulo}>Entre para encontrar sua próxima oportunidade local</Text>

          <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor="#999"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Sua senha"
            placeholderTextColor="#999"
            onChangeText={setSenha}
            value={senha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.botaoPrincipal} onPress={fazerLogin}>
            <Text style={styles.textoBotaoPrincipal}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoSecundario} onPress={() => router.push('/auth/cadastro')}>
            <Text style={styles.textoBotaoSecundario}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A66C2',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerArea: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    flex: 0.6,
    backgroundColor: '#F3F2EF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#191919',
  },
  subTitulo: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 32,
    marginTop: 6,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  botaoPrincipal: {
    backgroundColor: "#0A66C2",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoPrincipal: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotaoSecundario: {
    color: '#0A66C2',
    fontSize: 15,
    fontWeight: '500',
  }
});