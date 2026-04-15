import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const itemLayoutStyles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 130,
    backgroundColor: "#0F1216",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 12,
  },
  leftCol: {
    gap: 6,
    alignItems: "flex-start",
  },
  platformBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    borderWidth: 1,
  },
  platformText: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
  },
  thumbnail: {
    width: 114,
    height: 72,
    borderRadius: 6,
  },
  thumbnailPlaceholder: {
    width: 114,
    height: 72,
    backgroundColor: "#1E1E1E",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FFFFFF",
    lineHeight: 16,
    marginTop: 14,
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#888",
    marginTop: 5,
  },
  dateWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },
  dateText: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#616264",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 10,
  },
  markDoneBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  markDoneText: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    color: "#fff",
  },
  restoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  restoreText: {
    fontFamily: "Inter_400Regular",
    fontSize: 9,
    color: "#fff",
  },
  doneContainer: {
    opacity: 0.5,
  },
  doneTitle: {
    textDecorationLine: "line-through",
  },
});
