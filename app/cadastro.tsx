import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
            <Text style={styles.titulo}>Crie sua Conta</Text>
            <Text style={styles.subTitulo}>Comece sua jornada profissional hoje!</Text>
            <View style={styles.container2}>
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
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
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
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botaoSelecionado:{
    borderColor: '#1b8151',
    backgroundColor: '#f4fdf8'
  },
  textOpcao:{
    fontSize: 16,
    color: '#333',
  },
  textoSelecionado:{
    color: '#1b8151',
    fontWeight: 'bold'
  }
})