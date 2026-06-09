import { StyleSheet, Text, View } from "react-native";
import { CardVagaProps } from "../../types";


export default function CardVaga({ titulo, subinfo, local, tag }: CardVagaProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subinfo}>{subinfo}</Text>
      </View>
      <View style={styles.rodape}>
        <Text style={styles.local}>📍 {local}</Text>
        <Text style={styles.tag}>{tag}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  topo: { 
    marginBottom: 12 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#191919" 
  },
  subinfo: { 
    fontSize: 13, 
    color: "#666", 
    marginTop: 2 
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  local: { 
    fontSize: 12, 
    color: "#555" 
  },
  tag: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0A66C2",
    backgroundColor: "#E8F4FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});