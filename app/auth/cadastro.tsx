import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

export default function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoSelecionado, setTipoSelecionado] = useState<'candidato' | 'empresa'>('candidato');
  
  const [cnpj, setCnpj] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [ramoAtuacao, setRamoAtuacao] = useState('');

  const router = useRouter();

  function fazerCadastro() {
    if (!nome || !email || !senha) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    if (tipoSelecionado === 'empresa' && (!cnpj || !nomeEmpresa)) {
      alert("Por favor, preencha o CNPJ e o Nome da Empresa.");
      return;
    }

    console.log("Enviando dados:", { nome, email, senha, tipoSelecionado, cnpj, nomeEmpresa, ramoAtuacao });
    
    if (tipoSelecionado === 'empresa') {
      router.replace('/sistema/homeEmpresa');
    } else {
      router.replace('/sistema/home');
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.headerArea}>
          <Text style={styles.logoText}>TalentHub</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Crie sua Conta</Text>
          <Text style={styles.subTitulo}>Preencha os dados abaixo para começar</Text>

          <Text style={styles.labelTipo}>Você é Candidato ou Empresa?</Text>
          <View style={styles.cardOpcoes}>
            <TouchableOpacity 
              style={[styles.botaoOpcao, tipoSelecionado === 'candidato' && styles.botaoSelecionado]}
              onPress={() => setTipoSelecionado('candidato')}
            >
              <Text style={[styles.textOpcao, tipoSelecionado === 'candidato' && styles.textoSelecionado]}>Candidato</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.botaoOpcao, tipoSelecionado === 'empresa' && styles.botaoSelecionado]}
              onPress={() => setTipoSelecionado('empresa')}
            >
              <Text style={[styles.textOpcao, tipoSelecionado === 'empresa' && styles.textoSelecionado]}>Empresa</Text>
            </TouchableOpacity>
          </View>

          <TextInput style={styles.input} placeholder="Seu Nome Completo" placeholderTextColor="#999" onChangeText={setNome} value={nome} />
          <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#999" onChangeText={setEmail} value={email} keyboardType="email-address" autoCapitalize="none" />
          <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#999" onChangeText={setSenha} value={senha} secureTextEntry />

          {tipoSelecionado === 'empresa' && (
            <View style={styles.camposEmpresaContainer}>
              <Text style={styles.labelEmpresaSecao}>Informações Jurídicas</Text>
              <TextInput style={styles.input} placeholder="Nome Fantasia da Empresa" placeholderTextColor="#999" onChangeText={setNomeEmpresa} value={nomeEmpresa} />
              <TextInput style={styles.input} placeholder="CNPJ" placeholderTextColor="#999" onChangeText={setCnpj} keyboardType="numeric" value={cnpj} />
              <TextInput style={styles.input} placeholder="Ramo de Atuação (ex: Tecnologia, Comércio)" placeholderTextColor="#999" onChangeText={setRamoAtuacao} value={ramoAtuacao} />
            </View>
          )}

          <TouchableOpacity style={styles.botaoPrincipal} onPress={fazerCadastro}>
            <Text style={styles.textoBotaoPrincipal}>Concluir Cadastro</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoSecundario} onPress={() => router.push('/auth/entrar')}>
            <Text style={styles.textoBotaoSecundario}>Já tem conta? Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A66C2' 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'space-between' 
  },
  headerArea: { 
    paddingVertical: 35, 
    alignItems: 'center' 
  },
  logoText: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#FFF' 
  },
  formContainer: { 
    flex: 1, 
    backgroundColor: '#F3F2EF', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    paddingHorizontal: 24, 
    paddingTop: 28, 
    paddingBottom: 40 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#191919' 
  },
  subTitulo: { 
    fontSize: 13, 
    textAlign: "center", 
    marginBottom: 20, 
    color: '#666' 
  },
  labelTipo: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#444', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  cardOpcoes: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  botaoOpcao: { 
    width: '48%', 
    paddingVertical: 12, 
    borderWidth: 1.5, 
    borderColor: "#DCDCDC", 
    borderRadius: 12, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },
  botaoSelecionado: { 
    borderColor: '#0A66C2', 
    backgroundColor: '#E8F4FF' 
  },
  textOpcao: { 
    fontSize: 14, 
    color: '#666', 
    fontWeight: '500' 
  },
  textoSelecionado: { 
    color: '#0A66C2', 
    fontWeight: 'bold' 
  },
  input: { 
    backgroundColor: '#fff', 
    borderWidth: 1, 
    borderColor: "#E0E0E0", 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 14, 
    fontSize: 14, 
    color: '#333' 
  },
  camposEmpresaContainer: { 
    marginTop: 5, 
    padding: 12, 
    backgroundColor: '#EBF3FB', 
    borderRadius: 14, 
    marginBottom: 14, 
    borderWidth: 1, 
    borderColor: '#D0E3F5' 
  },
  labelEmpresaSecao: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#0A66C2', 
    marginBottom: 10 
  },
  botaoPrincipal: { 
    backgroundColor: "#0A66C2", 
    padding: 16, 
    borderRadius: 12, 
    alignItems: "center", 
    marginTop: 10 
  },
  textoBotaoPrincipal: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  botaoSecundario: { 
    alignItems: 'center', 
    marginTop: 16 
  },
  textoBotaoSecundario: { 
    color: '#0A66C2', 
    fontSize: 14, 
    fontWeight: '500' 
  }
});