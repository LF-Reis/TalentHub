import { StyleSheet, Text, View } from "react-native";
import { CardProps } from "../types";

export default function Card({ titulo, subTitulo, periodo, descricao, quantidade, pagamento, cidade }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subTitulo}>{subTitulo}</Text>
      
      {periodo && <Text style={styles.periodo}>{periodo}</Text>}
      
      {(cidade || quantidade) && (
        <View style={styles.infoRow}>
          {cidade && <Text style={styles.metaText}>{cidade}</Text>}
          {quantidade && <Text style={styles.metaTextHighlight}>{quantidade}</Text>}
        </View>
      )}
      
      {descricao && <Text style={styles.descricao}>{descricao}</Text>}
      {pagamento && <Text style={styles.pagamento}>{pagamento}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#191919',
    marginBottom: 2,
  },
  subTitulo: {
    fontSize: 14,
    color: '#444444',
    fontWeight: '500',
    marginBottom: 2,
  },
  periodo: {
    fontSize: 12,
    color: '#777777',
    fontWeight: '400',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#666666',
  },
  metaTextHighlight: {
    fontSize: 13,
    color: '#0A66C2',
    fontWeight: '500',
  },
  descricao: {
    fontSize: 13,
    color: '#555555',
    marginTop: 6,
    lineHeight: 18,
  },
  pagamento: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e7e34',
    marginTop: 6,
  }
});