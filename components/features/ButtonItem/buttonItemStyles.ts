import { StyleSheet } from "react-native";
export const buttonItemStyles = StyleSheet.create({
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
