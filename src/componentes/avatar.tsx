import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AvatarProps } from "../types";

export default function Avatar({image}:AvatarProps){
    return(
      <View style={styles.container}>
        <Image
          style={styles.imagem}
          source={{
            uri:image,
          }}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
    borderWidth: 3,
    borderColor: "#0080ff",
    borderRadius: 50,
    width: 60,
    height: 60,
    overflow: "hidden",
    },
    imagem:{
        width: 55,
        height: 55,
        resizeMode: "contain",

    },
})