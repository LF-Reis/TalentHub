import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "@/src/componentes/cardInfo";

export default function TelaCandidaturas() {
  return (
    <View style={styles.containerPrincipal}>
      <ScrollView style={styles.scroll} bounces={false}>
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>Suas Candidaturas</Text>
          <Text style={styles.subtituloHeader}>Acompanhe o andamento dos seus processos</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.processoCard}>
            <View style={styles.badgeStatus}>
              <Text style={styles.statusTexto}>Currículo Visualizado</Text>
            </View>
            <Card 
              titulo="Desenvolvedor Front-end Júnior"
              subTitulo="TechCorp"
              cidade="Almenara - MG"
              pagamento="R$ 1.500 - R$ 3.000"
            />
          </View>

          <View style={styles.processoCard}>
            <View style={[styles.badgeStatus, { backgroundColor: '#FFF3CD' }]}>
              <Text style={[styles.statusTexto, { color: '#856404' }]}>Inscrição Recebida</Text>
            </View>
            <Card 
              titulo="Atendente Geral"
              subTitulo="Farmácia Central"
              cidade="Almenara - MG"
              pagamento="R$ 1.412"
            />
          </View>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: { 
    flex: 1, 
    backgroundColor: '#F3F2EF' 
},
  scroll: { 
    flex: 1 
},
  header: { 
    backgroundColor: '#0A66C2', 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    paddingBottom: 24 
},
  tituloHeader: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#FFF' 
},
  subtituloHeader: { 
    fontSize: 13, 
    color: '#E8F4FF', 
    marginTop: 4, 
    opacity: 0.9 
},
  body: { 
    padding: 20, 
    paddingBottom: 100 
},
  processoCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 14, 
    borderWidth: 1, 
    borderColor: '#E0E0E0' 
},
  badgeStatus: { 
    backgroundColor: '#D1ECF1', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6, 
    alignSelf: 'flex-start', 
    marginBottom: 10 
},
  statusTexto: { 
    fontSize: 11, 
    fontWeight: 'bold', 
    color: '#0C5460' 
}
});