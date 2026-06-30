import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter, Href } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";
import { supabase } from "@/src/lib/supabase"; 
export default function TelaCadastro() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<"CANDIDATO" | "EMPRESA">("CANDIDATO");
  const [carregando, setCarregando] = useState(false);
  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [ramoAtuacao, setRamoAtuacao] = useState("");

  async function handleConcluir() {
    if (!nome || !email || !senha) return Alert.alert("Erro", "Preencha os dados básicos.");
    if (perfil === "EMPRESA" && (!cnpj || !razaoSocial)) return Alert.alert("Erro", "CNPJ e Razão Social são obrigatórios.");
    if (senha.length < 6) return Alert.alert("Erro", "A senha precisa ter no mínimo 6 caracteres.");

    setCarregando(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: senha,
        options: {
          data: {
            display_name: nome,
            role: perfil,
            cnpj: perfil === "EMPRESA" ? cnpj : null,
            razao_social: perfil === "EMPRESA" ? razaoSocial : null,
            ramo_atuacao: perfil === "EMPRESA" ? ramoAtuacao : null,
          }
        }
      });

      if (error) throw error;

      Alert.alert("Sucesso 🎉", "Conta criada! Verifique seu e-mail se a confirmação estiver ativa.");
      router.replace("/auth/entrar" as Href);
    } catch (error: any) {
      Alert.alert("Erro no Cadastro", error.message || "Ocorreu um erro inesperado.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        
        <View style={styles.logoContainer}>
          <View style={[styles.iconeBg, perfil === 'EMPRESA' ? {backgroundColor: '#191919'} : {backgroundColor: '#0A66C2'}]}>
             <FontAwesome5 name={perfil === 'EMPRESA' ? "building" : "user-astronaut"} size={26} color="#FFF" />
          </View>
          <Text style={styles.titulo}>Criar Nova Conta</Text>
          <Text style={styles.subtitulo}>Junte-se ao TalentHub hoje mesmo</Text>
        </View>

        <View style={styles.containerAbas}>
          <TouchableOpacity style={[styles.aba, perfil === "CANDIDATO" && styles.abaAtivaCandidato]} onPress={() => setPerfil("CANDIDATO")}>
            <Text style={[styles.textoAba, perfil === 'CANDIDATO' && {color: '#0A66C2'}]}>👤 Sou Candidato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.aba, perfil === "EMPRESA" && styles.abaAtivaEmpresa]} onPress={() => setPerfil("EMPRESA")}>
            <Text style={[styles.textoAba, perfil === 'EMPRESA' && {color: '#191919'}]}>🏢 Sou Empresa</Text>
          </TouchableOpacity>
        </View>

        <Input label={perfil === "CANDIDATO" ? "Nome Completo" : "Nome do Responsável"} value={nome} onChangeText={setNome} placeholder="Digite aqui..." />
        <Input label="E-mail de Acesso" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="exemplo@email.com" />
        <Input label="Crie uma Senha" value={senha} onChangeText={setSenha} secureTextEntry placeholder="Mínimo 6 caracteres" />

        {perfil === "EMPRESA" && (
          <View style={styles.blocoEmpresa}>
            <View style={styles.divisor} />
            <Text style={styles.tituloSecao}>Dados Corporativos</Text>
            
            <Input label="CNPJ Corporativo" value={cnpj} onChangeText={setCnpj} keyboardType="numeric" placeholder="00.000.000/0001-00" />
            <Input label="Razão Social" value={razaoSocial} onChangeText={setRazaoSocial} placeholder="Ex: TechCorp Soluções S/A" />
            <Input label="Ramo de Atuação (Opcional)" value={ramoAtuacao} onChangeText={setRamoAtuacao} placeholder="Ex: Tecnologia e Softwares" />
          </View>
        )}

        <Button 
          title={carregando ? "Carregando..." : "Finalizar Cadastro"} 
          disabled={carregando}
          style={perfil === 'EMPRESA' ? { backgroundColor: '#191919', marginTop: 15 } : { backgroundColor: '#0A66C2', marginTop: 15 }} 
          onPress={handleConcluir} 
        />

        <TouchableOpacity style={styles.linkRodape} onPress={() => router.back()}>
          <Text style={styles.textoLink}>Já possui cadastro? <Text style={styles.destaqueLink}>Fazer Login</Text></Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: "#F3F2EF", 
    justifyContent: "center", 
    padding: 20,
    paddingVertical: 50,
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
  titulo: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#191919", 
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  containerAbas: { 
    flexDirection: "row", 
    gap: 12, 
    marginBottom: 24 
  },
  aba: { 
    flex: 1, 
    paddingVertical: 14, 
    alignItems: "center",
    borderRadius: 12, 
    borderWidth: 1.5, 
    borderColor: "#E5E7EB",
    backgroundColor: "#FAFAFA"
  },
  abaAtivaCandidato: {
    borderColor: "#0A66C2",
    backgroundColor: "#E8F4FF",
  },
  abaAtivaEmpresa: {
    borderColor: "#191919",
    backgroundColor: "#F3F4F6",
  },
  textoAba: {
    fontSize: 13, 
    fontWeight: 'bold',
    color: '#888'
  },
  blocoEmpresa: {
    marginTop: 5,
  },
  divisor: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 15,
  },
  tituloSecao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#191919",
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 0.5,
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