import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Header from "@/src/componentes/ui/Header";
import Button from "@/src/componentes/ui/Button";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/src/lib/supabase";

interface CandidatoInscrito {
  id: number;
  status: string;
  perfis: {
    nome: string;
    habilidades: string;
    bio: string;
  };
}

export default function TriagemCandidatos() {
  const params = useLocalSearchParams();
  const vagaId = params.id;
  const vagaTitulo = params.titulo || "Vaga Selecionada";

  const [candidatos, setCandidatos] = useState<CandidatoInscrito[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarInscritos() {
    try {
      setCarregando(true);
      const { data, error } = await supabase
        .from('candidaturas')
        .select(`
          id,
          status,
          perfis:candidato_id (nome, habilidades, bio)
        `)
        .eq('vaga_id', vagaId);

      if (error) throw error;
      if (data) setCandidatos(data as any);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível listar os candidatos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (vagaId) carregarInscritos();
  }, [vagaId]);

  async function mudarStatus(candidaturaId: number, novoStatus: "APROVADO" | "REPROVADO") {
    try {
      const { error } = await supabase
        .from('candidaturas')
        .update({ status: novoStatus })
        .eq('id', candidaturaId);

      if (error) throw error;

      Alert.alert("Atualizado! ✔️", `Status alterado para ${novoStatus === 'APROVADO' ? 'Aprovado' : 'Reprovado'}.`);
      
      setCandidatos(prev => prev.map(c => c.id === candidaturaId ? { ...c, status: novoStatus } : c));
    } catch (error: any) {
      Alert.alert("Erro ao salvar", error.message);
    }
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Candidatos Inscritos" subtitulo={`Vaga: ${vagaTitulo}`} theme="dark" />

      <View style={styles.corpo}>
        {carregando ? (
          <ActivityIndicator size="large" color="#191919" style={{ marginTop: 40 }} />
        ) : candidatos.length === 0 ? (
          <Text style={styles.textoVazio}>Nenhum candidato inscrito nesta vaga até o momento.</Text>
        ) : (
          candidatos.map((cand) => (
            <View key={cand.id} style={styles.cardCandidato}>
              <View style={styles.topoCard}>
                <Text style={styles.nome}>{cand.perfis?.nome || "Candidato Oculto"}</Text>
                <Text style={[styles.statusBadge, cand.status === 'APROVADO' ? styles.badgeAprovado : cand.status === 'REPROVADO' ? styles.badgeReprovado : styles.badgeEnviado]}>
                  {cand.status}
                </Text>
              </View>

              <Text style={styles.subTitulo}>💡 Resumo/Bio:</Text>
              <Text style={styles.txtBio}>{cand.perfis?.bio || "Nenhuma biografia fornecida."}</Text>

              <Text style={styles.subTitulo}>🛠️ Habilidades:</Text>
              <Text style={styles.habs}>{cand.perfis?.habilidades || "Não especificadas"}</Text>

              <TouchableOpacity
                style={{ padding: 12, marginVertical: 12, backgroundColor: '#E0E0E0', borderRadius: 8, alignItems: 'center' }}
                onPress={() => alert("Visualização de PDF indisponível.")}
              >
                <Text style={{ color: '#333', fontWeight: 'bold' }}>📄 Ver Currículo (PDF)</Text>
              </TouchableOpacity>
              <View style={styles.botoesStatus}>
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#E2F6EA' }]} onPress={() => mudarStatus(cand.id, 'APROVADO')}>
                  <Text style={{ color: '#1e7e34', fontWeight: 'bold', fontSize: 12 }}>Aprovar Candidato</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#F8D7DA' }]} onPress={() => mudarStatus(cand.id, 'REPROVADO')}>
                  <Text style={{ color: '#721c24', fontWeight: 'bold', fontSize: 12 }}>Reprovar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F3F2EF' 
  },
  corpo: { 
    padding: 20 
  },
  cardCandidato: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 11, 
    borderWidth: 1, 
    borderColor: '#E0E0E0' 
  },
  subTitulo: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#555', 
    marginTop: 8 
  },
  txtBio: { 
    fontSize: 13, 
    color: '#666', 
    fontStyle: 'italic' 
  },
  nome:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
  },
  topoCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  habs:{
    fontSize: 13,
    color: '#666',
    marginVertical: 8,
  },
  botoesStatus: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 8,
  },
  btn: {
    width: '48%', 
    padding: 10, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  status: { 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  textoVazio: { 
    textAlign: 'center', 
    color: '#888', 
    marginTop: 40, 
    fontStyle: 'italic' 
  },
  statusBadge: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 6, 
    overflow: 'hidden' 
  },
  badgeEnviado: { 
    backgroundColor: '#D1ECF1', 
    color: '#0C5460' 
  },
  badgeAprovado: { 
    backgroundColor: '#E2F6EA', 
    color: '#1e7e34' 
  },
  badgeReprovado: { 
    backgroundColor: '#F8D7DA', 
    color: '#721c24' 
  },
});