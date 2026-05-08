import { StyleSheet, Text, View } from "react-native";
import { CardProps } from "../types";

export default function Card({titulo, subTitulo, periodo, descricao}:CardProps){
    return(
        <View>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.subTitulo}>{subTitulo}</Text>
            <Text style={styles.periodo}>{periodo}</Text>
            <Text style={styles.descricao}>{descricao}</Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
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
})