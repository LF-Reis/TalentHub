import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Header from "@/src/componentes/ui/Header";
import Button from "@/src/componentes/ui/Button";

const CANDIDATOS_INICIAIS = [
  { id: '1', nome: "Luiz Felipe", habilidades: "React Native, TypeScript, Node.js", status: "ENVIADO" },
];

export default function TriagemCandidatos() {
  const [candidatos, setCandidatos] = useState(CANDIDATOS_INICIAIS);

  function mudarStatus(id: string, novoStatus: string) {
    setCandidatos(prev => prev.map(c => c.id === id ? { ...c, status: novoStatus } : c));
    Alert.alert("Sucesso", `Status alterado para ${novoStatus}`);
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Candidatos Inscritos" subtitulo="Vaga: Dev Front-end Júnior" theme="dark" />

      <View style={styles.corpo}>
        {candidatos.map((cand) => (
          <View key={cand.id} style={styles.cardCandidato}>
            <Text style={styles.nome}>{cand.nome} <Text style={styles.status}>({cand.status})</Text></Text>
            <Text style={styles.habs}>Habilidades: {cand.habilidades}</Text>
            
            <Button title="📄 Analisar Currículo (PDF)" variant="secondary" onPress={() => alert("Abrindo PDF...")} />

            <View style={styles.botoesStatus}>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#E2F6EA' }]} onPress={() => mudarStatus(cand.id, 'APROVADO')}>
                <Text style={{ color: '#1e7e34', fontWeight: 'bold', fontSize: 12 }}>Aprovar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, { backgroundColor: '#F8D7DA' }]} onPress={() => mudarStatus(cand.id, 'REPROVADO')}>
                <Text style={{ color: '#721c24', fontWeight: 'bold', fontSize: 12 }}>Reprovar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  nome:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
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
  }
});