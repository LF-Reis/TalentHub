import Avatar from "@/src/componentes/avatar";
import Perfil from "@/src/componentes/avatarInfo";
import Card from "@/src/componentes/cardInfo";
import Tag from "@/src/componentes/tag";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function telaPerfil(){

    const router = useRouter();



    return(
        
        <ScrollView >
            <View style={styles.header}> 
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.botao} onPress={() => router.push('/entrar')}>
                        <Text style={styles.sair}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => router.push('/entrar')}>
                        <Text style={styles.sair}>Sair</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.card}>
                    <View style={styles.badge}>
                        <Avatar
                        image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
                        <Perfil 
                        nome="Luiz Felipe"
                        email="Luiz@gmail.com"/>
                    </View>
                    <View style={styles.linha}></View>

                    <View style={styles.card1}>
                        <Text style={styles.nome}>Sobre mim</Text>
                            <Text>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Facere nobis, impedit eos ex laborum facilis, in ea corrupti cumque ab esse!
                                Eveniet quas porro maiores quo ducimus numquam natus atque?
                            </Text>
                        <View style={styles.linha}></View>
                        <Text style={styles.nome}>Habilidades</Text>
                        <View style={styles.badge}>
                            <Tag nomeTag="React"/>
                            <Tag nomeTag="Figma"/>
                            <Tag nomeTag="Node.js"/>
                            <Tag nomeTag="Typescript"/>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <Text style={styles.nome}>Experiências</Text>
                    <Card 
                    titulo="Estagiário de Desenvolvimento"
                    subTitulo="TechStart inc."
                    periodo="Jan 2025 - Presencial"
                    descricao="Desenvolvimento de features em React e Typescript"/>
                </View>
                <View style={styles.card}>
                    <Text style={styles.nome}>Formação</Text>
                    <Card
                    titulo="Bacharelado em Ciência da Computação"
                    subTitulo="Universidade Federal de Minas Gerais"
                    periodo="2021 - 2026"/>
                </View>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container1:{
        justifyContent: 'space-between',
        marginBottom: 50,
        marginTop: 30,
        flexDirection: 'row',
    },
    linha:{
        height: 1,
        backgroundColor: '#bcbaba',
        marginTop: 10,
    },
    card1:{
        marginBottom:5,
    },
    card:{
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 15,
        elevation: 10,
    },
    header:{
        height:150,
        backgroundColor: "#0A66C2",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 3,
    },
    badge:{
        flexDirection:'row',
    },
    nome:{
        paddingTop: 5,
        paddingLeft: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    botao:{

        borderRadius: 8,
        width:100,
        height:25,
        alignItems: "center",
        justifyContent: 'center',
    },
    sair:{
        color: "white",
        fontSize: 20,
    }
})