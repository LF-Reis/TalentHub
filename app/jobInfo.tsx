import Card from "@/src/componentes/cardInfo";
import Tag from "@/src/componentes/tag";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function telaInfoJob(){

    const router = useRouter();
    return(
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.botao} onPress={() => router.push('/home')}>
                        <Text style={styles.sair}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.column}>
                    <Text style={styles.welcome}>
                        Desenvolvedor Front-end Júnior
                    </Text>
                    <Text style={styles.sair}>
                        TechCorp
                    </Text>
                    <View style={styles.badge}>
                        <Tag nomeTag="CLT"/>
                        <Tag nomeTag="Tecnologia"/>
                    </View>
                </View> 
                <View style={styles.row}>
                    <View style={styles.card1}>
                        <Text style={styles.subtitulo}>Localização</Text>
                    </View>
                    <View style={styles.card1}>
                        <Text style={styles.subtitulo}>Candidatos</Text>
                    </View>
                </View>
            </View>
                <View style={styles.card}>
                    <Text style={styles.titulo}>Formação</Text>
                    <Card
                    titulo="Bacharelado em Ciência da Computação"
                    subTitulo="Universidade Federal de Minas Gerais"
                    periodo="2021 - 2026"/>
                </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        height:180,
        backgroundColor: "#0A66C2",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 3,
    },
    welcome:{
        fontSize: 22,
        color: '#F3F2EF'
    },
    column:{
        flexDirection: 'column',
        paddingEnd:20,
        marginStart:20,
    },
    row:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingEnd:20,
        margin:20,
    },
    container1:{
        justifyContent: 'flex-start',
        marginTop: 25,
        marginBottom: 20,
        flexDirection: 'row',
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
        fontSize: 15,
        fontWeight: '300',
    },
    badge:{
        marginTop: 10,
        flexDirection:'row',
    },
    card:{
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15,
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 15,
        elevation: 10,
    },
    card1:{
        backgroundColor: "#ffffff",
    },
    titulo:{
        color:"#191919",
        fontSize:18,
        fontWeight: 'bold',
    },
    subtitulo:{
        color:"#191919",
        fontWeight: '300',
        fontSize: 16,
    }
})