import { Slot, useSegments } from "expo-router";
import { View, StyleSheet } from "react-native";
import Footer from "@/src/componentes/footer";

export default function LayoutSistema() {
  const segments = useSegments();
  
  const telaAtual = segments[segments.length - 1];
  
  let aba: 'inicio' | 'candidaturas' | 'perfil' = 'inicio';
  if (telaAtual === 'candidaturas') aba = 'candidaturas';
  if (telaAtual === 'perfil') aba = 'perfil';

  const ehEmpresa = telaAtual === 'homeEmpresa';

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Slot />
      </View>
      
      <Footer abaAtiva={aba} tipoUsuario={ehEmpresa ? 'empresa' : 'candidato'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2EF',
  },
  conteudo: {
    flex: 1,
    paddingBottom: 65, 
  },
});