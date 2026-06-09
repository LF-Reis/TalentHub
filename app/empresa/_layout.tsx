import { Slot, useSegments } from "expo-router";
import { View, StyleSheet } from "react-native";
import Footer from "@/src/componentes/footer";

export default function LayoutEmpresa() {
  const segments = useSegments();
  const telaAtual = segments[segments.length - 1];
  
  let aba: 'painel' | 'perfil' = 'painel';
  if (telaAtual === 'perfil') aba = 'perfil';

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}><Slot /></View>
      <Footer abaAtiva={aba} tipoUsuario="empresa" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F3F2EF" 
  },
  conteudo: { 
    flex: 1, 
    paddingBottom: 65 
  },
});