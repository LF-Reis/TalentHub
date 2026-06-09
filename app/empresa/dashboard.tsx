import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Header from "@/src/componentes/ui/Header";
import CardVaga from "@/src/componentes/ui/CardVaga";
import Button from "@/src/componentes/ui/Button";
import { useRouter, Href } from "expo-router";

const VAGAS_EMPRESA = [
  { id: '1', titulo: "Dev Front-end Júnior", inscritos: "15 Candidatos", local: "Almenara - MG", tipo: "CLT" },
];

export default function DashboardEmpresa() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Painel da Empresa 🏢" subtitulo="Gerenciamento de vagas e triagem de currículos" theme="dark" />

      <View style={styles.corpo}>
        <View style={styles.gridMetricas}>
          <View style={styles.cardMetrica}>
            <Text style={styles.numeroMetrica}>1</Text>
            <Text style={styles.labelMetrica}>Vaga Ativa</Text>
          </View>
          <View style={styles.cardMetrica}>
            <Text style={styles.numeroMetrica}>15</Text>
            <Text style={styles.labelMetrica}>Inscritos Totais</Text>
          </View>
        </View>

        <Text style={styles.tituloSecao}>Suas Vagas Publicadas</Text>
        {VAGAS_EMPRESA.map((vaga) => (
          <TouchableOpacity key={vaga.id} onPress={() => router.push('/empresa/candidatos' as Href)}>
            <CardVaga titulo={vaga.titulo} subinfo={vaga.inscritos} local={vaga.local} tag={vaga.tipo} />
          </TouchableOpacity>
        ))}

        <Button title="+ Publicar Nova Vaga" style={{ backgroundColor: '#191919', marginTop: 10 }} onPress={() => alert("Abrir formulário de nova vaga")} />
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
  tituloSecao: { 
    fontSize: 15, 
    fontWeight: 'bold',
    color: '#191919', 
    marginBottom: 12 
  },
  gridMetricas: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  cardMetrica: { 
    backgroundColor: '#FFF', 
    width: '48%', 
    padding: 16, 
    borderRadius: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#E0E0E0' 
  },
  numeroMetrica: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#0A66C2' 
  },
  labelMetrica: { 
    fontSize: 12, 
    color: '#666', 
    marginTop: 2 
  },
});