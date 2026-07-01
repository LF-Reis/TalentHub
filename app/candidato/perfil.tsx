import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import { useRouter, Href } from "expo-router"; 
import Header from "@/src/componentes/ui/Header";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";
import { supabase } from "@/src/lib/supabase";

export default function PerfilCandidato() {
  const router = useRouter(); 
  const [bio, setBio] = useState('');
  const [habilidades, setHabilidades] = useState('');
  const [pdfNome, setPdfNome] = useState('Nenhum currículo enviado');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('perfis')
          .select('bio, habilidades')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setBio(data.bio || '');
          setHabilidades(data.habilidades || '');
        }
      } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  async function salvarPerfil() {
    setSalvando(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('perfis')
        .update({ bio, habilidades })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert("Sucesso 🎉", "Perfil atualizado com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro ao salvar", error.message);
    } finally {
      setSalvando(false);
    }
  }

  async function handleSair() {
    Alert.alert("Terminar Sessão", "Tem a certeza que deseja sair da conta?", [
      { text: "Cancelar", style: "cancel" },
      { 
        text: "Sair", 
        style: "destructive", 
        onPress: async () => {
          await supabase.auth.signOut();
          router.replace("/auth/entrar" as Href); 
        }
      }
    ]);
  }

  if (carregando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0A66C2" />
        <Text style={{ marginTop: 10, color: '#666' }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Seu Perfil Profissional" subtitulo="Mantenha seus dados atualizados para os recrutadores" theme="blue" />
      
      <View style={styles.corpo}>
        <Input label="Biografia (Sobre Mim)" value={bio} onChangeText={setBio} multiline />
        <Input label="Habilidades Técnicas" value={habilidades} onChangeText={setHabilidades} placeholder="Ex: React Native, TypeScript..." />
        
        <Text style={styles.labelCustom}>Seu Currículo (PDF)</Text>
        <View style={styles.boxUpload}>
          <Text style={styles.textoPdf}>📄 {pdfNome}</Text>
          <Button title="Substituir" style={{ width: 100, padding: 8 }} onPress={() => alert("Upload de PDF será implementado em breve!")} />
        </View>

        <Button 
          title={salvando ? "Salvando..." : "Salvar Alterações"} 
          disabled={salvando}
          onPress={salvarPerfil} 
        />

        <Button 
          title="Sair da Conta" 
          onPress={handleSair} 
          style={{ backgroundColor: '#DC3545', marginTop: 15 }} 
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F3F2EF" 
  },
  corpo: { 
    padding: 20,
    paddingBottom: 100, 
  },
  labelCustom: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6,
  },
  boxUpload: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  textoPdf: { 
    fontSize: 13, 
    color: "#333", 
    fontWeight: "500" 
  },
});