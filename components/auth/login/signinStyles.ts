import { StyleSheet } from "react-native";

export const signinStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: "#FF0707",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 30,
    color: "#FBF8F8",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#616264",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#D9D9D9",
    marginBottom: 8,
  },
  inputWrap: {
    height: 48,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#D9D9D9",
    padding: 0,
  },
  button: {
    height: 56,
    backgroundColor: "#FF4D37",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Inter_700Bold",
  },
  signupRow: {
    flexDirection: "row",
    marginTop: 28,
  },
  signupText: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: "#888",
  },
  signupLink: {
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    color: "#FF4D37",
  },
});
