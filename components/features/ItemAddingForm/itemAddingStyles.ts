import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const itemAddingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    alignItems: "flex-start",
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#D9D9D9",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#616264",
    marginBottom: 20,
  },
  fieldWrap: {
    width: width - 48,
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#616264",
    marginBottom: 6,
  },
  inputRow: {
    width: width - 48,
    height: 40,
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 8,
  },
  inputMultiline: {
    height: 100,
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: "#D9D9D9",
    padding: 0,
    fontFamily: "Inter_400Regular",
  },
  categoryRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 8,
  },
  categoryBtn: {
    width: (width - 48 - 6 * 3) / 4,
    height: 60,
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryBtnSelected: {
    backgroundColor: "#3E171C",
    borderColor: "#FF0000",
  },
  categoryText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#616264",
  },
  categoryTextSelected: {
    color: "#FF0000",
  },
  submitBtn: {
    width: width - 50,
    height: 40,
    backgroundColor: "#FF4D37",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  submitText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#fff",
  },
});
