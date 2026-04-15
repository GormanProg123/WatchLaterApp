import { StyleSheet } from "react-native";

export const homepageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF0707",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitles: {
    flexDirection: "column",
    gap: 2,
  },
  appName: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#fff",
  },
  watchedCount: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#616264",
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#D9D9D9",
    padding: 0,
    fontFamily: "Inter_400Regular",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    gap: 12,
  },
  filtersWrap: {
    marginBottom: 13,
  },
  flatList: {
    marginTop: 0,
  },
});
