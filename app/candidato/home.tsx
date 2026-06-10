import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Header from "@/src/componentes/ui/Header";
import CardVaga from "@/src/componentes/ui/CardVaga";

const TODAS_VAGAS = [
  { id: '1', titulo: "Dev Front-end Júnior", empresa: "TechCorp", local: "Almenara - MG", tipo: "CLT" },
  { id: '2', titulo: "Estágio em Node.js", empresa: "DevLabs", local: "Remoto", tipo: "Estágio" },
  { id: '3', titulo: "Analista de Dados Pleno", empresa: "DataInfo", local: "Belo Horizonte - MG", tipo: "Remoto" },
];

export default function HomeCandidato() {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string | null>(null);

  const vagasFiltradas = TODAS_VAGAS.filter(vaga => {
    const bateTexto = vaga.titulo.toLowerCase().includes(busca.toLowerCase()) || vaga.empresa.toLowerCase().includes(busca.toLowerCase());
    const bateTipo = filtroTipo ? vaga.tipo === filtroTipo : true;
    return bateTexto && bateTipo;
  });

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Olá, Desenvolvedor! 👋" subtitulo="Encontre sua próxima oportunidade de trabalho" theme="blue" />
      
      <View style={styles.corpo}>
        <TextInput 
          style={styles.inputBusca}
          placeholder="🔍 Buscar vaga ou empresa..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
        />

        <Text style={styles.tituloSecao}>Filtrar por Tipo</Text>
        <View style={styles.containerFiltros}>
          {['Todos', 'CLT', 'Estágio', 'Remoto'].map((tipo) => (
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
        {vagasFiltradas.map((vaga) => (
          <TouchableOpacity key={vaga.id} onPress={() => alert(`Candidatar-se à vaga: ${vaga.titulo}`)}>
            <CardVaga titulo={vaga.titulo} subinfo={vaga.empresa} local={vaga.local} tag={vaga.tipo} />
          </TouchableOpacity>
        ))}
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
    padding: 12, 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 18,
  },
  corpo: { 
    padding: 20, 
  },
  containerFiltros: { 
    flexDirection: 'row', 
    gap: 8, 
    marginBottom: 20, 
  },
  botaoFiltro: { 
    backgroundColor: '#FFF', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#DCDCDC' 
  },
  botaoFiltroAtivo: { 
    backgroundColor: '#0A66C2', 
    borderColor: '#0A66C2' 
  },
  textoFiltro: { 
    color: '#666', 
    fontSize: 13, 
    fontWeight: '500' 
  },
  textoFiltroAtivo: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },
  tituloSecao: {
    fontWeight: 'bold',
    fontSize: 20,  
    color: '#191919',
    marginBottom: 20,
  },
});