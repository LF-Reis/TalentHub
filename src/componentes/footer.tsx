import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

type FooterProps = {
  abaAtiva: 'inicio' | 'candidaturas' | 'perfil';
  tipoUsuario?: 'candidato' | 'empresa';
};

export default function Footer({ abaAtiva, tipoUsuario = 'candidato' }: FooterProps) {
  const router = useRouter();
  const homeRota = tipoUsuario === 'empresa' ? '/sistema/homeEmpresa' : '/sistema/home';

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.botaoMenu} 
        onPress={() => router.replace(homeRota)}
      >
        <Text style={[styles.emojiMenu, abaAtiva !== 'inicio' && styles.emojiInativo]}>🏠</Text>
        <Text style={[styles.textoMenu, abaAtiva === 'inicio' && styles.textoAtivo]}>
          Início
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botaoMenu} 
        onPress={() => router.replace('/sistema/candidaturas')}
      >
        <Text style={[styles.emojiMenu, abaAtiva !== 'candidaturas' && styles.emojiInativo]}>💼</Text>
        <Text style={[styles.textoMenu, abaAtiva === 'candidaturas' && styles.textoAtivo]}>
          {tipoUsuario === 'empresa' ? 'Minhas Vagas' : 'Candidaturas'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.botaoMenu} 
        onPress={() => router.replace('/sistema/perfil')}
      >
        <Text style={[styles.emojiMenu, abaAtiva !== 'perfil' && styles.emojiInativo]}>👤</Text>
        <Text style={[styles.textoMenu, abaAtiva === 'perfil' && styles.textoAtivo]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    height: 65,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 5, 
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  botaoMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emojiMenu: {
    fontSize: 20,
  },
  emojiInativo: {
    opacity: 0.4, 
  },
  textoMenu: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    fontWeight: '500',
  },
  textoAtivo: {
    color: '#0A66C2',
    fontWeight: 'bold',
  },
});