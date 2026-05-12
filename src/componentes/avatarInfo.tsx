import { View, Text, Image, StyleSheet } from "react-native";       
import { PerfilinfoProps } from "../types";
import Tag from "./tag";


export default function Perfil({nome, email}:PerfilinfoProps){
    return(
        <View style={styles.perfil}>
            <View style = {styles.direction}>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.email}>{email}</Text>
            </View>
        </View> 
    )
}
const styles = StyleSheet.create({
    perfil:{
        flexDirection:'row',
        marginBottom: 10,
    },
    direction:{
        marginLeft: 5,
        justifyContent: 'center',
    },
    nome:{
        marginBottom: 3,
        fontWeight: 'bold',
        fontSize: 18,

    },
    email:{
        fontWeight: "200",
        fontSize: 13,
    },
})