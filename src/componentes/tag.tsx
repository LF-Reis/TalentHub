import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { TagProps } from "../types";

export default function Tag({ nomeTag }: TagProps) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagName}>{nomeTag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#E8F4FF', 
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start', 
  },
  tagName: {
    fontSize: 12,
    color: '#0A66C2', 
    fontWeight: 'bold',
  },
});