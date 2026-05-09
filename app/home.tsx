import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function telaInicial(){

    const router = useRouter();

    return(
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.botao} onPress={() => router.push('/entrar')}>
                        <Text style={styles.sair}>Sair</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.column}>
                    <Text style={styles.welcome}>
                        Olá, Leonan! 👋
                    </Text>
                    <Text style={styles.welcome}>
                        Encontre sua próxima oportunidade
                    </Text>
                    <TextInput style={styles.input}
                    placeholder="Buscar vagas, empresas, áreas..."
                    autoCapitalize="none"/>
                </View>
            </View>
            <View style={styles.cardHome}>

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
    cardHome:{
        
    },
    welcome:{
        fontSize: 18,
        color: '#F3F2EF'
    },
    column:{
        flexDirection: 'column',
        paddingEnd:20,
        marginStart:20,
    },
    input:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 15,
        borderRadius: 20,
        marginTop:20,
        fontSize: 14,
    },
    container1:{
        justifyContent: 'flex-end',
        marginTop: 30,
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
        fontSize: 20,
    },
})
   
