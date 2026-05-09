import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TelaLogin(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  function fazerLogin(){
    console.log("Tentando logar com:", email, senha);
  }
  return(
    <View style={styles.container1}>
      <View style={styles.container2}>
      <Text style={styles.titulo}>TalentHub</Text>
      <Text style={styles.subTitulo}>Entre para encontrar sua próxima oportunidade</Text>
        <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"/>

        <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setSenha}
        secureTextEntry
        />

        <TouchableOpacity style={styles.botao} onPress={() => router.push('/home')}>
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
    backgroundColor: '#0A66C2',
  },
  container2:{
    backgroundColor: '#F3F2EF',
    borderRadius: 50,
    padding:20,
    height:600,
    elevation: 4,
    marginBottom: -300,
  },
  titulo:{
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#191919',
    marginTop: 30,
  },
  subTitulo:{
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    marginBottom: 30,
    color: '#191919',
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 20,
    marginTop:20,
    fontSize: 14,
  },
  botao:{
    backgroundColor: "#0A66C2",
    padding: 15,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
  },
  textoBotao:{
    color: "white",
    fontSize: 20,
  },
  textoSecundario:{
    color: '#0A66C2',
    fontSize: 18,
  },
  botaoSecundario:{
    alignItems: 'center',
    marginTop:20,
  }
})