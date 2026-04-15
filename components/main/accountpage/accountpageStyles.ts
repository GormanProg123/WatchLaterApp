import { StyleSheet } from "react-native";

const CONTAINER_WIDTH = 305;

export const accountpageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: "#EFE7E7",
  },
  content: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 30,
    gap: 28,
  },
  card: {
    width: CONTAINER_WIDTH,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    fontFamily: "Inter_700Bold",
    fontSize: 26,
    color: "#fff",
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#EFE7E7",
  },
  profileEmail: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#C9C3C3",
  },
  profileJoined: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#C9C3C3",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 72,
    paddingHorizontal: 4,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuText: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: "#C9C3C3",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: -16,
  },
  switch: {
    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
    marginRight: -10,
  },
});
