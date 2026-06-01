import Avatar from "@/src/componentes/avatar";
import Perfil from "@/src/componentes/avatarInfo";
import Card from "@/src/componentes/cardInfo";
import Tag from "@/src/componentes/tag";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TelaPerfil() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.header}> 
        <View style={styles.navigationRow}>
          <TouchableOpacity style={styles.botaoTop} onPress={() => router.back()}>
            <Text style={styles.textoBotaoTop}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoTop} onPress={() => router.replace('/auth/entrar')}>
            <Text style={styles.textoBotaoTop}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
          <View style={styles.profileMeta}>
            <Perfil nome="Luiz Felipe" email="luiz@gmail.com"/>
          </View>
        </View>

        <View style={styles.linha} />

        <Text style={styles.secaoTitulo}>Sobre mim</Text>
        <Text style={styles.sobreTexto}>
          Desenvolvedor empolgado em resolver problemas reais por meio de códigos bem feitos. 
          Buscando oportunidades locais no ecossistema de Minas Gerais.
        </Text>

        <View style={styles.linha} />

        <Text style={styles.secaoTitulo}>Habilidades</Text>
        <View style={styles.skillsContainer}>
          <Tag nomeTag="React"/>
          <Tag nomeTag="Figma"/>
          <Tag nomeTag="Node.js"/>
          <Tag nomeTag="Typescript"/>
        </View>
      </View>

      <View style={styles.cardInfoSecao}>
        <Text style={styles.secaoTituloInterno}>Experiências</Text>
        <Card 
          titulo="Estagiário de Desenvolvimento"
          subTitulo="TechStart Inc."
          periodo="Jan 2025 - Atual (Presencial)"
          descricao="Desenvolvimento de novas funcionalidades utilizando React e TypeScript em projetos internos."
        />
      </View>

      <View style={styles.cardInfoSecao}>
        <Text style={styles.secaoTituloInterno}>Formação</Text>
        <Card
          titulo="Bacharelado em Ciência da Computação"
          subTitulo="Universidade Federal de Minas Gerais"
          periodo="2021 - 2026"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  header: {
    height: 120,
    backgroundColor: "#0A66C2",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoTop: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  textoBotaoTop: {
    color: "white",
    fontSize: 14,
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: -40, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileMeta: {
    marginLeft: 16,
    flex: 1,
  },
  linha: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 16,
  },
  secaoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#191919',
    marginBottom: 8,
  },
  secaoTituloInterno: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#191919',
    marginBottom: 12,
  },
  sobreTexto: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardInfoSecao: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  }
});