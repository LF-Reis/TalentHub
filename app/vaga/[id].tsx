import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { supabase } from "@/src/lib/supabase";
import Button from "@/src/componentes/ui/Button";

export default function TelaDetalhesVaga() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [vaga, setVaga] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    buscarDetalhesVaga();
  }, [id]);

  async function buscarDetalhesVaga() {
    try {
      const { data, error } = await supabase
        .from("vagas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setVaga(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar a vaga.");
      router.back();
    } finally {
      setCarregando(false);
    }
  }

  async function handleCandidatar() {
    setEnviando(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) throw new Error("Usuário não autenticado.");

      const { error } = await supabase
        .from("inscricoes")
        .insert([
          { vaga_id: id, candidato_id: userData.user.id, status: 'pendente' }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error("Você já se candidatou a esta vaga!");
        }
        throw error;
      }

      Alert.alert("Sucesso! 🎉", "Sua candidatura foi enviada para a empresa.");
      router.back();

    } catch (error: any) {
      Alert.alert("Aviso", error.message || "Erro ao tentar se candidatar.");
    } finally {
      setEnviando(false);
    }
  }

  if (carregando || !vaga) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Carregando vaga...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#191919" />
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Detalhes da Vaga</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.conteudo}>
        <View style={styles.cabecalhoVaga}>
          <Text style={styles.titulo}>{vaga.titulo}</Text>
          <Text style={styles.empresa}>{vaga.empresa}</Text>
        </View>

        <View style={styles.tagsContainer}>
          <View style={styles.tag}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#666" />
            <Text style={styles.tagText}>{vaga.local}</Text>
          </View>
          <View style={styles.tag}>
            <FontAwesome5 name="briefcase" size={14} color="#666" />
            <Text style={styles.tagText}>{vaga.tipo}</Text>
          </View>
        </View>

        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoTitulo}>Sobre a vaga</Text>
          <Text style={styles.descricaoTexto}>{vaga.descricao}</Text>
        </View>
      </View>

      <View style={styles.rodape}>
        <Button 
          title={enviando ? "Enviando..." : "Candidatar-se agora"} 
          onPress={handleCandidatar}
          disabled={enviando}
          style={{ backgroundColor: '#0A66C2' }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F2EF",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#FFF',
  },
  btnVoltar: {
    padding: 10,
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#191919',
  },
  conteudo: {
    padding: 20,
  },
  cabecalhoVaga: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#191919',
    marginBottom: 8,
  },
  empresa: {
    fontSize: 18,
    color: '#0A66C2',
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  tagText: {
    color: '#333',
    fontWeight: '500',
  },
  descricaoContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  descricaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#191919',
  },
  descricaoTexto: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
  },
  rodape: {
    padding: 20,
    paddingBottom: 40,
  }
});