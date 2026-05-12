import { StyleSheet, Text, View } from "react-native";
import { CardProps } from "../types";

export default function Card({titulo, subTitulo, periodo, descricao, quantidade, pagamento, cidade}:CardProps){
    return(
        <View style={styles.card}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.subTitulo}>{subTitulo}</Text>
            <Text style={styles.periodo}>{periodo}</Text>
            <View style={styles.info}>
                <Text style={styles.cidade}>{cidade}</Text>
                <Text style={styles.quantidade}>{quantidade}</Text>
            </View>
            <Text style={styles.descricao}>{descricao}</Text>
            <Text style={styles.pagamento}>{pagamento}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        margin:10,
    },
    info:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    titulo:{
        fontWeight: 'bold',
    },
    subTitulo:{
        color: '#191919',
        fontWeight: '300',

    },
    periodo:{
        fontWeight: '300',
    },
    descricao:{
        paddingTop: 8,
        fontWeight: '400',
    },
    quantidade:{
        color: '#191919',
    },
    cidade:{
        color: '#191919',
    },
    pagamento:{
        color:'#145c02',
    }
})