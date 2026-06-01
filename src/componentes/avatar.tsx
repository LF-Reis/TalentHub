import { Image, StyleSheet, View } from "react-native";
import { AvatarProps } from "../types";

export default function Avatar({ image }: AvatarProps) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={{ uri: image }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 28, 
    borderWidth: 2,
    borderColor: "#0A66C2",
    overflow: "hidden",
    backgroundColor: '#E0E0E0', 
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
});