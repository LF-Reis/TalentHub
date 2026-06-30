import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert, ActivityIndicator, Text } from "react-native";
import Header from "@/src/componentes/ui/Header";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";
import { supabase } from "@/src/lib/supabase";

export default function PerfilEmpresa() {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [sobre, setSobre] = useState('');
  const [ramo, setRamo] = useState('');
  
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregarPerfilEmpresa() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('perfis')
          .select('nome, cnpj, bio, ramo_atuacao')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setNomeEmpresa(data.nome || '');
          setCnpj(data.cnpj || 'Não Informado');
          setSobre(data.bio || '');
          setRamo(data.ramo_atuacao || '');
        }
      } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os dados institucionais.");
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfilEmpresa();
  }, []);

  async function handleAtualizarDados() {
    if (!nomeEmpresa) return Alert.alert("Erro", "O nome fantasia é obrigatório.");

    setSalvando(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('perfis')
        .update({
          nome: nomeEmpresa,
          bio: sobre,
          ramo_atuacao: ramo
        })
        .eq('id', user.id);

      if (error) throw error;

      Alert.alert("Sucesso 🎉", "Dados salvos e atualizados!");
    } catch (error: any) {
      Alert.alert("Erro ao atualizar", error.message);
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#191919" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Perfil Institucional" subtitulo="Gerencie as informações públicas da sua empresa" theme="dark" />

      <View style={styles.corpo}>
        <Input label="Nome Fantasia" value={nomeEmpresa} onChangeText={setNomeEmpresa} />
        
        <Input label="CNPJ da Empresa (Inalterável)" value={cnpj} editable={false} style={{ backgroundColor: '#EAEAEA', color: '#777' }} />
        
        <Input label="Ramo de Atuação" value={ramo} onChangeText={setRamo} placeholder="Ex: Tecnologia, Logística, Saúde..." />
        
        <Input label="Sobre a Empresa" value={sobre} onChangeText={setSobre} placeholder="Conte um pouco sobre a cultura e história da empresa..." multiline />

        <Button 
          title={salvando ? "Atualizando..." : "Atualizar Dados"} 
          disabled={salvando}
          style={{ backgroundColor: '#191919', marginTop: 10 }} 
          onPress={handleAtualizarDados} 
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
  }

});
