import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TelaLogin(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  function fazerLogin(){
    console.log("Tentando logar com:", email, senha);
  }
  return(
    <View style={styles.container1}>
      <Text style={styles.titulo}>TalentHub</Text>
      <Text style={styles.subTitulo}>Entre para encontrar sua próxima oportunidade</Text>
      <View style={styles.container2}>
        <TextInput
        style={styles.input}
        placeholder="Digite seu Email"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"/>

        <TextInput
        style={styles.input}
        placeholder="Digite sua Senha"
        onChangeText={setSenha}
        secureTextEntry
        />

        <TouchableOpacity style={styles.botao} onPress={() => router.push('/perfil')}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={() => router.push('/cadastro')}>
          <Text style={styles.textoSecundario}>Não tem conta? Cadastra-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container1:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  container2:{
    backgroundColor: '#fff',
    borderRadius: 6,
    padding:20,
    elevation: 4,
  },
  titulo:{
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subTitulo:{
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    marginBottom: 40,
    color: '#6c6c6c',
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    marginBottom:15,
    fontSize: 14,
  },
  botao:{
    backgroundColor: "#1b8151",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao:{
    color: "white",
    fontSize: 18,
  },
  textoSecundario:{
    color: '#1b8151',
    fontSize: 18,
  },
  botaoSecundario:{
    alignItems: 'center',
    marginTop:20,
  }
})