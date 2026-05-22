import { StyleSheet, Platform, StatusBar } from "react-native";

export const splachScreenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#141414",
  },
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 24) : 0,
    paddingHorizontal: 16,
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: "#FF0707",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textAlign: "center",
    includeFontPadding: false,
  },
});
