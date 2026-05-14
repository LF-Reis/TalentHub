import Avatar from "@/src/componentes/avatar";
import Card from "@/src/componentes/cardInfo";
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
            <Text style={styles.titulo}>
                5 Vagas disponíveis
            </Text>
            <View style={styles.cardHome}>

                    <TouchableOpacity style={styles.card} onPress={() => router.push('/jobInfo')} >
                    <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
                    <Card 
                    titulo="Desenvolvedor Front-end júnior"
                    subTitulo="TechCorp"
                    cidade="Almenara - MG"
                    quantidade="15 candidatos"
                    pagamento="R$ 1.500,00 - R$ 3.000,00"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                    <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
                    <Card 
                    titulo="Desenvolvedor Front-end júnior"
                    subTitulo="TechCorp"
                    cidade="Almenara - MG"
                    quantidade="15 candidatos"
                    pagamento="R$ 1.500,00 - R$ 3.000,00"/>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.card}>
                    <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
                    <Card 
                    titulo="Desenvolvedor Front-end júnior"
                    subTitulo="TechCorp"
                    cidade="Almenara - MG"
                    quantidade="15 candidatos"
                    pagamento="R$ 1.500,00 - R$ 3.000,00"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                    <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
                    <Card 
                    titulo="Desenvolvedor Front-end júnior"
                    subTitulo="TechCorp"
                    cidade="Almenara - MG"
                    quantidade="15 candidatos"
                    pagamento="R$ 1.500,00 - R$ 3.000,00"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                    <Avatar image="https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg"/>
                    <Card 
                    titulo="Desenvolvedor Front-end júnior"
                    subTitulo="TechCorp"
                    cidade="Almenara - MG"
                    quantidade="15 candidatos"
                    pagamento="R$ 1.500,00 - R$ 3.000,00"/>
                    </TouchableOpacity>
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
    titulo:{
        padding:10,
        marginLeft:13,
        fontWeight: 'bold',
        fontSize: 16,  
    },
    cardHome:{
        marginBottom:10,
    },
    card:{
        backgroundColor: "#ffffff",
        borderRadius: 15,
        padding: 15,
        marginHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
        elevation: 10,
        flexDirection: 'row',
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
   
