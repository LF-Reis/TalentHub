import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import Header from "@/src/componentes/ui/Header";
import CardVaga from "@/src/componentes/ui/CardVaga";
import { supabase } from "@/src/lib/supabase";
 
interface Vaga {
  id: number;
  titulo: string;
  empresa: string;
  local: string;
  tipo: string;
  descricao: string;
  empresa_id: string;
}

export default function HomeCandidato() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function buscarVagas() {
    try {
      setCarregando(true);
      const { data, error } = await supabase
        .from('vagas')
        .select('*')
        .order('created_at', { ascending: false }); 

      if (error) throw error;
      if (data) setVagas(data);
    } catch (error: any) {
      Alert.alert("Erro ao carregar", error.message || "Não foi possível buscar as vagas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarVagas();
  }, []);

  async function handleCandidatar(vagaId: number, tituloVaga: string) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return Alert.alert("Atenção", "Você precisa estar logado para se candidatar.");
      }

      const { error } = await supabase
        .from('candidaturas')
        .insert([
          { vaga_id: vagaId, candidato_id: user.id }
        ]);

      if (error) {
        if (error.code === '23505') {
          return Alert.alert("Aviso", "Você já se inscreveu nesta vaga anteriormente!");
        }
        throw error;
      }

      Alert.alert("Sucesso 🎉", `Inscrição realizada para: ${tituloVaga}`);
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível concluir a candidatura.");
    }
  }

  const vagasFiltradas = vagas.filter(vaga => {
    const bateTexto = vaga.titulo.toLowerCase().includes(busca.toLowerCase()) || vaga.empresa.toLowerCase().includes(busca.toLowerCase());
    const bateTipo = filtroTipo ? vaga.tipo === filtroTipo : true;
    return bateTexto && bateTipo;
  });

  const tiposFiltro = ["CLT", "Estágio", "PJ", "Remoto"];

  return (
    <ScrollView 
      style={styles.container} 
      bounces={false}
      onScrollEndDrag={buscarVagas} 
    >
      <Header titulo="Olá, Desenvolvedor! 👋" subtitulo="Encontre a oportunidade ideal para sua carreira" theme="blue" />

      <View style={styles.corpo}>
        <TextInput 
          style={styles.inputBusca} 
          placeholder="🔍 Buscar por cargo ou empresa..." 
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />

        <View style={styles.containerFiltros}>
          {tiposFiltro.map((tipo) => (
            <TouchableOpacity 
              key={tipo} 
              style={[styles.botaoFiltro, filtroTipo === tipo && styles.botaoFiltroAtivo]}
              onPress={() => setFiltroTipo(filtroTipo === tipo ? null : tipo)}
            >
              <Text style={[styles.textoFiltro, filtroTipo === tipo && styles.textoFiltroAtivo]}>{tipo}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.tituloSecao}>Vagas Disponíveis ({vagasFiltradas.length})</Text>

        {carregando ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0A66C2" />
            <Text style={styles.textLoading}>Buscando vagas no banco...</Text>
          </View>
        ) : vagasFiltradas.length === 0 ? (
          <Text style={styles.textoVazio}>Nenhuma vaga encontrada para os filtros selecionados.</Text>
        ) : (
          vagasFiltradas.map((vaga) => (
            <TouchableOpacity key={vaga.id} onPress={() => handleCandidatar(vaga.id, vaga.titulo)}>
              <CardVaga titulo={vaga.titulo} subinfo={vaga.empresa} local={vaga.local} tag={vaga.tipo} />
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  inputBusca: { 
    backgroundColor: '#FFF', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 15, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  corpo: { 
    padding: 20, 
  },
  containerFiltros: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 24, 
  },
  botaoFiltro: { 
    backgroundColor: '#FFF', 
    paddingHorizontal: 16, 
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0D0D0'
  },
  botaoFiltroAtivo: {
    backgroundColor: '#0A66C2',
    borderColor: '#0A66C2',
  },
  textoFiltro: {
    color: '#666',
    fontWeight: '600',
    fontSize: 13,
  },
  textoFiltroAtivo: {
    color: '#FFF',
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '700',
    color: '#191919',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  textLoading: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 14,
    fontStyle: 'italic'
  }
});