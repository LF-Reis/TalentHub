import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, Platform } from "react-native";
import { useLocalSearchParams, useRouter, Href } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { supabase } from "@/src/lib/supabase";
import Button from "@/src/componentes/ui/Button";
import Header from "@/src/componentes/ui/Header";

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
        .from("candidaturas")
        .insert([
          { vaga_id: id, candidato_id: userData.user.id }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error("Você já se candidatou a esta vaga!");
        }
        throw error;
      }

      Alert.alert("Sucesso! 🎉", "Sua candidatura foi confirmada.");
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
        <Header titulo="Carregando..." subtitulo="Aguarde um momento" theme="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header 
        titulo={vaga.titulo} 
        subtitulo={`${vaga.empresa} • 📍 ${vaga.local} • 💼 ${vaga.tipo}`} 
        theme="blue" 
      />

      <ScrollView bounces={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={20} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.conteudo}>
          
          <View style={styles.cardInfo}>
            <View style={styles.infoRow}>
              <FontAwesome5 name="money-bill-wave" size={16} color="#0A66C2" style={styles.infoIcon} />
              <View>
                <Text style={styles.infoLabel}>Faixa Salarial</Text>
                <Text style={styles.infoValor}>
                  {vaga.faixa_salarial || vaga.salario || "A combinar / Não informado"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.descricaoContainer}>
            <Text style={styles.descricaoTitulo}>Sobre a vaga</Text>
            <Text style={styles.descricaoTexto}>{vaga.descricao}</Text>
          </View>

          <Button 
            title={enviando ? "Enviando..." : "Candidatar-se agora"} 
            onPress={handleCandidatar}
            disabled={enviando}
            style={{ backgroundColor: '#0A66C2', marginTop: 24, borderRadius: 12 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F2EF",
  },
  btnVoltar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  conteudo: {
    padding: 20,
    marginTop: 10,
  },
  cardInfo: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    width: 24,
    textAlign: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  infoValor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#191919',
    marginTop: 2,
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
  abaItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  abaTexto: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontWeight: '500',
  }
});