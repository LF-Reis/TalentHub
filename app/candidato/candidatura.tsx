import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "@/src/componentes/ui/Header";

const MINHAS_INSCRECOES = [
  { id: '1', vaga: "Dev Front-end Júnior", empresa: "TechCorp", status: "EM_ANALISE", data: "05/06/2026" },
  { id: '2', vaga: "Estágio em Node.js", empresa: "DevLabs", status: "APROVADO", data: "01/06/2026" },
];

export default function CandidaturasCandidato() {
  function obterEstiloStatus(status: string) {
    switch(status) {
      case 'APROVADO': return { texto: 'Aprovado 🎉', cor: '#1e7e34', fundo: '#E2F6EA' };
      case 'EM_ANALISE': return { texto: 'Em Análise 📝', cor: '#856404', fundo: '#FFF3CD' };
      default: return { texto: 'Enviado', cor: '#0C5460', fundo: '#D1ECF1' };
    }
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Seus Processos Seletivos" subtitulo="Acompanhe o retorno e os feedbacks das empresas" theme="blue" />

      <View style={styles.corpo}>
        {MINHAS_INSCRECOES.map((item) => {
          const configStatus = obterEstiloStatus(item.status);
          return (
            <View key={item.id} style={styles.cardProcesso}>
              <View style={styles.topoCard}>
                <Text style={styles.nomeVaga}>{item.vaga}</Text>
                <Text style={styles.dataEnvio}>{item.data}</Text>
              </View>
              <Text style={styles.nomeEmpresa}>{item.empresa}</Text>
              <View style={[styles.badgeStatus, { backgroundColor: configStatus.fundo }]}>
                <Text style={[styles.textoStatus, { color: configStatus.cor }]}>Status: {configStatus.texto}</Text>
              </View>
            </View>
          );
        })}
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
});