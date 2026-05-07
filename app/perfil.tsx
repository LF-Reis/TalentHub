import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function telaPerfil(){

    const router = useRouter();



    return(
        
        <ScrollView >
            <View style={styles.header}> 
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.botao} onPress={() => router.push('/entrar')}>
                        <Text style={styles.sair}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} onPress={() => router.push('/entrar')}>
                        <Text style={styles.sair}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.card}>
                    <Image style={styles.image} source={{uri: "https://i.pinimg.com/1200x/36/03/b3/3603b3e22904f3ddda3271fda9e4e8d9.jpg",}}></Image>
                    <View style = {styles.direction}>
                        <Text style={styles.nome}>Luiz Felipe</Text>
                        <Text style={styles.email}>Luiz@gmail.com</Text>
                        <View style={styles.tag}>
                            <Text style={styles.tagName}>Candidato</Text>
                        </View>
                    </View>
                </View>

                <View style = {styles.card}>
                    <View style={styles.direction}>
                        <Text style={styles.nome}>Sobre mim</Text>
                        <Text>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Facere nobis, impedit eos ex laborum facilis, in ea corrupti cumque ab esse!
                            Eveniet quas porro maiores quo ducimus numquam natus atque?
                        </Text>
                    </View>
                </View>
                <View style = {styles.card}>
                    <View style={styles.direction}>
                        <Text style={styles.nome}>Habilidades</Text>
                        <View style={styles.badge}>
                            <View style={styles.tag}>
                                <Text style={styles.tagName}>React</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tagName}>TypeScript</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tagName}>Node.js</Text>
                            </View>
                            <View style={styles.tag}>
                                <Text style={styles.tagName}>Figma</Text>
                            </View>
                        </View>
                    </View>
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
    card:{
        flexDirection:'row',
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
    direction:{
        marginLeft: 5,
        justifyContent: 'center',
    },
    tag:{
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#0A66C2',
        borderRadius: 20,
        backgroundColor: '#0a66c21d',
        alignItems: 'center',
        margin: 5,
    },
    tagName:{
        fontSize: 12,
        color: '#0A66C2'
    },
    image:{
        flexDirection: 'row',
        borderRadius: 30,
        borderColor:'red',
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