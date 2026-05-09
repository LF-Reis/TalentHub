import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function TelaCadastro(){
    const[nome, setNome] = useState('' );
    const[email, setEmail] = useState('');
    const[senha, setSenha]= useState('');
    const[tipoSelecionado, setTipoSelecionado] = useState('');

    const router = useRouter();

    function fazerCadastro(){
        console.log("Cadastrando:", nome, email, senha);

    }
   
    return(
        <View style={styles.container1}>
            
            <View style={styles.container2}>
            <Text style={styles.titulo}>Crie sua Conta</Text>
            <Text style={styles.subTitulo}>Comece sua jornada profissional hoje!</Text>
                <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        onChangeText={setNome}/>
                <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        keyboardType="email-address"/>
                <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        onChangeText={setSenha}
                        secureTextEntry/>


                <Text style={styles.subTitulo}>Tipo de conta</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={[styles.botaOpcao,
                        tipoSelecionado === 'candidato' && styles.botaoSelecionado]}
                        onPress={() => setTipoSelecionado('candidato')}
                        activeOpacity={0.6} >
                            <Text style={[styles.textOpcao,
                                tipoSelecionado === 'candidato' && styles.textoSelecionado
                            ]}>
                                Candidato
                            </Text>
                        </TouchableOpacity>

                    <TouchableOpacity style={[styles.botaOpcao,
                        tipoSelecionado === 'empresa' && styles.botaoSelecionado]}
                        onPress={() => setTipoSelecionado('empresa')}
                        activeOpacity={0.6} >
                            <Text style={[styles.textOpcao,
                                tipoSelecionado === 'empresa' && styles.textoSelecionado
                            ]}>
                                empresa
                            </Text>
                        </TouchableOpacity>
                </View>


                <TouchableOpacity style={styles.botao} onPress={fazerCadastro}>
                          <Text style={styles.textoBotao}>Criar Conta</Text>
                        </TouchableOpacity>
                
                <TouchableOpacity style={styles.botaoSecundario} onPress={() => router.push('/entrar')}>
                          <Text style={styles.textoSecundario}>Já tem conta? Entrar</Text>
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
  image:{
    width: 55,
    height: 55,
  },
  container2:{
    backgroundColor: '#F3F2EF',
    borderRadius: 50,
    height: 600,
    padding:20,
    elevation: 4,
    marginBottom: -300,
  },
  titulo:{
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#191919',
  },
  subTitulo:{
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
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
    borderRadius: 20,
    alignItems: "center",
  },
  textoBotao:{
    color: "white",
    fontSize: 18,
  },
  textoSecundario:{
    color: '#0A66C2',
    fontSize: 18,
  },
  botaoSecundario:{
    alignItems: 'center',
    marginTop:20,
  },
  card:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaOpcao: {
    width: '48%',
    paddingVertical: 15,
    borderWidth:1.5,
    borderColor: "#dcdcdc",
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botaoSelecionado:{
    borderColor: '#0A66C2',
    backgroundColor: '#f4fdf8'
  },
  textOpcao:{
    fontSize: 16,
    color: '#333',
  },
  textoSelecionado:{
    color: '#0A66C2',
    fontWeight: 'bold'
  }
})