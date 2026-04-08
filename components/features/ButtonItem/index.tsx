import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

export const AddButtonItem = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FF4D37",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  plus: {
    fontSize: 28,
    color: "#fff",
    lineHeight: 32,
  },
});
