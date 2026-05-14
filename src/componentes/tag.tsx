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
        borderColor: '#004182',
        borderRadius: 20,
        backgroundColor: '#004182bd',
        alignItems: 'center',
        margin: 5,
    },
    tagName:{
        fontSize: 15,
        color: '#e0e0e0'
    },
})