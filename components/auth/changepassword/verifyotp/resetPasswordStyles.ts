import { StyleSheet } from "react-native";

export const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },

  headerSpacer: {
    width: 40,
  },

  logoBox: {
    width: 80,
    height: 80,
    backgroundColor: "#FF0707",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    alignSelf: "center",
  },

  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#616264",
    textAlign: "center",
    marginBottom: 32,
  },

  passwordInputContainer: {
    marginTop: 20,
  },

  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#D9D9D9",
    marginBottom: 8,
  },

  passwordInputWrap: {
    height: 48,
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
    color: "#D9D9D9",
    padding: 0,
  },

  nextButton: {
    width: 324,
    height: 48,
    backgroundColor: "#FF4D37",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 48,
    marginTop: "auto",
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
    fontSize: 17,
  },

  nextButtonDisabled: {
    opacity: 0.5,
  },
});
