import { StyleSheet, Text, View } from "react-native";
import { HeaderProps } from "../../types";


export default function Header({ titulo, subtitulo, theme = 'blue' }: HeaderProps) {
  const isDark = theme === 'dark';
  return (
    <View style={[styles.header, isDark && styles.headerDark]}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={[styles.subtitulo, isDark && styles.subtituloDark]}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0A66C2",
    paddingTop: 65,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerDark: { 
    backgroundColor: "#191919" 
  },
  titulo: { 
    fontSize: 30, 
    fontWeight: "bold", 
    color: "#FFF" 
  },
  subtitulo: { 
    fontSize: 15, 
    color: "#E8F4FF", 
    marginTop: 4, 
    opacity: 0.9 
  },
  subtituloDark: { 
    color: "#AAA" 
  },
});