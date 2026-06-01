import Avatar from "@/src/componentes/avatar";
import Card from "@/src/componentes/cardInfo";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const VAGAS_MOCK = [
  { id: '1', titulo: "Dev Front-end Júnior", empresa: "TechCorp", cidade: "Almenara - MG", candidatos: "15 candidatos", salario: "R$ 1.500 - R$ 3.000" },
  { id: '2', titulo: "Atendente de Loja", empresa: "Comércio Central", cidade: "Almenara - MG", candidatos: "8 candidatos", salario: "R$ 1.412" },
  { id: '3', titulo: "Gerente de Mídias", empresa: "Agência Click", cidade: "Pedra Azul - MG", candidatos: "5 candidatos", salario: "R$ 2.000 - R$ 2.500" },
  { id: '4', titulo: "Auxiliar Administrativo", empresa: "Contabilidade Silva", cidade: "Almenara - MG", candidatos: "22 candidatos", salario: "R$ 1.600" },
];

export default function TelaInicial() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} bounces={false}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.welcomeTitle}>Olá, Leonan! 👋</Text>
          <TouchableOpacity style={styles.botaoSair} onPress={() => router.replace('/auth/entrar')}>
            <Text style={styles.textoSair}>Sair</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.welcomeSubtitle}>Encontre sua próxima oportunidade perto de você</Text>
        
        <TextInput 
          style={styles.searchBar}
          placeholder="Buscar vagas, empresas ou áreas..."
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionTitulo}>{VAGAS_MOCK.length} Vagas disponíveis na sua região</Text>
        
        {VAGAS_MOCK.map((vaga) => (
          <TouchableOpacity 
            key={vaga.id} 
            style={styles.vagaCard} 
            onPress={() => router.push('/sistema/jobInfo')}
          >
            <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
            <View style={styles.cardInfoContainer}>
              <Card 
                titulo={vaga.titulo}
                subTitulo={vaga.empresa}
                cidade={vaga.cidade}
                quantidade={vaga.candidatos}
                pagamento={vaga.salario}
              />
            </View>
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
  header: {
    backgroundColor: "#0A66C2",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#E8F4FF',
    marginTop: 4,
    opacity: 0.9,
  },
  botaoSair: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  textoSair: {
    color: "white",
    fontSize: 14,
    fontWeight: '500',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitulo: {
    fontWeight: 'bold',
    fontSize: 16,  
    color: '#191919',
    marginBottom: 12,
  },
  vagaCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  cardInfoContainer: {
    flex: 1,
    marginLeft: 12,
  }
});