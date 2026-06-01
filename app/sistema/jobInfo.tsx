import Card from "@/src/componentes/cardInfo";
import Tag from "@/src/componentes/tag";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TelaInfoJob() {
  const router = useRouter();

  function candidatar() {
    alert("Candidatura enviada com sucesso! Boa sorte. 🚀");
    router.back();
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
            <Text style={styles.textoVoltar}>← Voltar</Text>
          </TouchableOpacity>
          
          <Text style={styles.jobTitle}>Desenvolvedor Front-end Júnior</Text>
          <Text style={styles.companyTitle}>TechCorp</Text>
          
          <View style={styles.badgeRow}>
            <Tag nomeTag="CLT"/>
            <Tag nomeTag="Tecnologia"/>
            <Tag nomeTag="Presencial"/>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.gridInfo}>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>Localização</Text>
              <Text style={styles.miniCardValue}>Almenara - MG</Text>
            </View>
            <View style={styles.miniCard}>
              <Text style={styles.miniCardLabel}>Candidatos</Text>
              <Text style={styles.miniCardValue}>15 inscritos</Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitulo}>Descrição da Vaga</Text>
            <Text style={styles.descricaoTexto}>
              Procuramos um desenvolvedor focado em criar interfaces incríveis para aplicações web e mobile. 
              Necessário conhecimento em React, React Native e boas práticas de estilização estruturada.
            </Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitulo}>Requisitos Desejados</Text>
            <Card
              titulo="Bacharelado em Ciência da Computação ou áreas afins"
              subTitulo="Universidade Federal de Minas Gerais (Desejável)"
              periodo="Concluído ou em andamento"/>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerAction}>
        <TouchableOpacity style={styles.botaoCandidatar} onPress={candidatar}>
          <Text style={styles.textoCandidatar}>Quero esta vaga</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#0A66C2",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  botaoVoltar: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  textoVoltar: {
    color: "white",
    fontSize: 16,
    fontWeight: '500',
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  companyTitle: {
    fontSize: 16,
    color: '#E8F4FF',
    marginTop: 4,
  },
  badgeRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, 
  },
  gridInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  miniCard: {
    backgroundColor: '#FFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  miniCardLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  miniCardValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#191919',
    marginTop: 4,
  },
  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitulo: {
    color: "#191919",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descricaoTexto: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  footerAction: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  botaoCandidatar: {
    backgroundColor: '#0A66C2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoCandidatar: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});