import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import Header from "@/src/componentes/ui/Header";
import { supabase } from "@/src/lib/supabase";

interface Candidatura {
  id: number;
  status: string;
  created_at: string;
  vagas: {
    titulo: string;
    empresa: string;
  };
}

export default function CandidaturasCandidato() {
  const [inscricoes, setInscricoes] = useState<Candidatura[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function carregarCandidaturas() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('candidaturas')
        .select(`
          id, 
          status, 
          created_at,
          vagas (titulo, empresa)
        `)
        .eq('candidato_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setInscricoes(data as any);
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar suas inscrições.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCandidaturas();
  }, []);

  function obterEstiloStatus(status: string) {
    switch(status) {
      case 'APROVADO': return { texto: 'Aprovado 🎉', cor: '#1e7e34', fundo: '#E2F6EA' };
      case 'REPROVADO': return { texto: 'Não aprovado', cor: '#721c24', fundo: '#F8D7DA' };
      case 'EM_ANALISE': return { texto: 'Em Análise 📝', cor: '#856404', fundo: '#FFF3CD' };
      default: return { texto: 'Enviado', cor: '#0C5460', fundo: '#D1ECF1' }; // ENVIADO
    }
  }

  function formatarData(dataIso: string) {
    const data = new Date(dataIso);
    return data.toLocaleDateString('pt-BR');
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Seus Processos Seletivos" subtitulo="Acompanhe o retorno e os feedbacks das empresas" theme="blue" />

      <View style={styles.corpo}>
        {carregando ? (
           <ActivityIndicator size="large" color="#0A66C2" style={{ marginTop: 40 }} />
        ) : inscricoes.length === 0 ? (
          <Text style={styles.textoVazio}>Você ainda não se candidatou a nenhuma vaga.</Text>
        ) : (
          inscricoes.map((item) => {
            const configStatus = obterEstiloStatus(item.status);
            return (
              <View key={item.id} style={styles.cardProcesso}>
                <View style={styles.topoCard}>
                  <Text style={styles.nomeVaga}>{item.vagas?.titulo || 'Vaga Removida'}</Text>
                  <Text style={styles.dataEnvio}>{formatarData(item.created_at)}</Text>
                </View>
                <Text style={styles.nomeEmpresa}>{item.vagas?.empresa || 'Empresa Desconhecida'}</Text>
                <View style={[styles.badgeStatus, { backgroundColor: configStatus.fundo }]}>
                  <Text style={[styles.textoStatus, { color: configStatus.cor }]}>Status: {configStatus.texto}</Text>
                </View>
              </View>
            );
          })
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
    padding: 20, 
},
  cardProcesso: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#E0E0E0' 
},
  badgeStatus: { 
    backgroundColor: '#D1ECF1', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 6, 
    alignSelf: 'flex-start', 
},
  textoStatus: { 
    fontSize: 14, 
    fontWeight: 'bold', 
},
  topoCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  nomeVaga: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#191919' 
  },
  dataEnvio: { 
    fontSize: 14, 
    color: '#999' 
  },
  nomeEmpresa: { 
    fontSize: 16, 
    color: '#666', 
    marginTop: 2, 
    marginBottom: 12 
  },
  textoVazio: { 
    textAlign: 'center',
     color: '#888',
      marginTop: 40,
       fontSize: 15 
  },
});