import { useState } from "react";
import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import Header from "@/src/componentes/ui/Header";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";

export default function PerfilCandidato() {
  const [bio, setBio] = useState('Desenvolvedor focado em soluções mobile com React Native.');
  const [habilidades, setHabilidades] = useState('TypeScript, React Native, Expo');
  const [pdfNome, setPdfNome] = useState('Curriculo_Luiz_2026.pdf');

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Seu Perfil Profissional" subtitulo="Mantenha seus dados atualizados para os recrutadores" theme="blue" />
      
      <View style={styles.corpo}>
        <Input label="Biografia (Sobre Mim)" value={bio} onChangeText={setBio} multiline />
        <Input label="Habilidades Técnicas" value={habilidades} onChangeText={setHabilidades} />
        
        <Text style={styles.labelCustom}>Seu Currículo (PDF)</Text>
        <View style={styles.boxUpload}>
          <Text style={styles.textoPdf}>📄 {pdfNome}</Text>
          <Button title="Substituir" style={{ width: 100, padding: 8 }} onPress={() => setPdfNome("Novo_Curriculo.pdf")} />
        </View>

        <Button title="Salvar Alterações" onPress={() => Alert.alert("Sucesso", "Perfil atualizado!")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F3F2EF" 
  },
  corpo: { 
    padding: 20 
  },
  labelCustom: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 6,
  },
  boxUpload: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  textoPdf: { 
    fontSize: 13, 
    color: "#333", 
    fontWeight: "500" 
  },
});
