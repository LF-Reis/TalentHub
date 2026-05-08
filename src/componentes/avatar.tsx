import { View, Text, Image, StyleSheet } from "react-native";       
import { PerfilProps } from "../types";
import Tag from "./tag";


export default function Perfil({image, nome, email}:PerfilProps){
    return(
        <View style={styles.perfil}>
            <Image style={styles.image} source={{uri: image}}/>
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
    image:{
        flexDirection: 'row',
        borderRadius: 30,
        borderColor:'#0080ff',
        borderWidth:2,
        width: 55,
        height: 55,
        resizeMode: "contain",
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