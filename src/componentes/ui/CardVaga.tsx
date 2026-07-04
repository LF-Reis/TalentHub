import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CardVagaProps } from "../../types";

export default function CardVaga({ titulo, subinfo, local, tag, onPressCard, onEdit, onDelete }: CardVagaProps) {
  return (
    <View style={styles.card}>
      
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPressCard} 
        disabled={!onPressCard} 
      >
        <View style={styles.topo}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.subinfo}>{subinfo}</Text>
        </View>
        <View style={styles.rodape}>
          <Text style={styles.local}>📍 {local}</Text>
          <Text style={styles.tag}>{tag}</Text>
        </View>
      </TouchableOpacity>

      {(onEdit || onDelete) && (
        <View style={styles.areaAcoes}>
          {onEdit && (
            <TouchableOpacity style={[styles.btnAcao, styles.btnEditar]} onPress={onEdit}>
              <Text style={styles.txtBtnEditar}>✏️ Editar</Text>
            </TouchableOpacity>
          )}
          
          {onDelete && (
            <TouchableOpacity style={[styles.btnAcao, styles.btnExcluir]} onPress={onDelete}>
              <Text style={styles.txtBtnExcluir}>🗑 Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  topo: { 
    marginBottom: 12 
  },
  titulo: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#191919" 
  },
  subinfo: { 
    fontSize: 16, 
    color: "#666", 
    marginTop: 2 
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  local: { 
    fontSize: 14, 
    color: "#555" 
  },
  tag: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0A66C2",
    backgroundColor: "#E8F4FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  areaAcoes: {
    flexDirection: "row",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderColor: "#EEEEEE",
    justifyContent: "space-between",
    gap: 10,
  },
  btnAcao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEditar: {
    backgroundColor: "#E8F4FF",
  },
  btnExcluir: {
    backgroundColor: "#FFEBEE",
  },
  txtBtnEditar: {
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 14,
  },
  txtBtnExcluir: {
    color: "#C62828",
    fontWeight: "bold",
    fontSize: 14,
  },
});