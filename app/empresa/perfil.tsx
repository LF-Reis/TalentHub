import { useState } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import Header from "@/src/componentes/ui/Header";
import Input from "@/src/componentes/ui/Input";
import Button from "@/src/componentes/ui/Button";

export default function PerfilEmpresa() {
  const [nomeEmpresa, setNomeEmpresa] = useState('TechCorp Sistemas');
  const [cnpj] = useState('12.345.678/0001-00');
  const [sobre, setSobre] = useState('Empresa com foco em soluções web e mobile corporativas.');

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Header titulo="Perfil Institucional" subtitulo="Gerencie as informações públicas da sua empresa" theme="dark" />

      <View style={styles.corpo}>
        <Input label="Nome Fantasia" value={nomeEmpresa} onChangeText={setNomeEmpresa} />
        <Input label="CNPJ da Empresa" value={cnpj} editable={false} style={{ backgroundColor: '#EAEAEA', color: '#888' }} />
        <Input label="Sobre a Empresa" value={sobre} onChangeText={setSobre} multiline />

        <Button title="Atualizar Dados" style={{ backgroundColor: '#191919' }} onPress={() => Alert.alert("Sucesso", "Dados salvos!")} />
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
    padding: 20,
  }

});
