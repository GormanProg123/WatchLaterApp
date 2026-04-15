import { StyleSheet } from "react-native";

export const statusListStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 2,
    gap: 12,
  },
  cell: {
    width: 110,
    height: 36,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 10,
  },
  cellSelected: {
    backgroundColor: "#FF0707",
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#616264",
  },
  labelSelected: {
    color: "#fff",
  },
  countBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  countBadgeSelected: {
    backgroundColor: "#F66B6B",
    borderRadius: 11,
  },
  countBadgeAll: {
    marginLeft: 5,
  },
  countText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#616264",
  },
  countTextSelected: {
    color: "#fff",
  },
});
