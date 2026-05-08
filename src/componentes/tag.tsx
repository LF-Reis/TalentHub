import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TagProps, } from "../types";

export default function Tag({nomeTag}: TagProps){
    return(
         <View style={styles.tag}>
            <Text style={styles.tagName}>{nomeTag}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
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
})