import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { authService } from "../../../api/servises/auth.service";

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = 305;

const AVATAR_COLORS = [
  "#E74C3C",
  "#8E44AD",
  "#2980B9",
  "#27AE60",
  "#F39C12",
  "#16A085",
  "#D35400",
  "#C0392B",
];

const getAvatarColor = (name: string): string => {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

const formatJoinDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `Joined ${date.toLocaleString("en-US", { month: "long", year: "numeric" })}`;
};

interface TokenPayload {
  sub: string;
  email: string;
  displayName?: string;
  iat: number;
}

export const AccountPageScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    joinedAt: string;
  } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          return;
        }

        const payload = jwtDecode<TokenPayload>(token);

        setUser({
          name: payload.displayName ?? payload.email.split("@")[0],
          email: payload.email,
          joinedAt: new Date(payload.iat * 1000).toISOString(),
        });
      } catch (error) {
        // Error loading user
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      router.replace("/(auth)/sign-in");
    }
  };

  const firstLetter = user?.name?.[0]?.toUpperCase() ?? "?";
  const avatarColor = user ? getAvatarColor(user.name) : "#888";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="#EFE7E7" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { height: 200 }]}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarLetter}>{firstLetter}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name ?? "—"}</Text>
              <Text style={styles.profileEmail}>{user?.email ?? "—"}</Text>
              <Text style={styles.profileJoined}>
                {user ? formatJoinDate(user.joinedAt) : "—"}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { height: 240 }]}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Feather name="user" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <Feather name="chevron-right" size={14} color="#C9C3C3" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Feather name="mail" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Change Email</Text>
            </View>
            <Feather name="chevron-right" size={14} color="#C9C3C3" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Feather name="shield" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Change Password</Text>
            </View>
            <Feather name="chevron-right" size={14} color="#C9C3C3" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { height: 130 }]}>
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Feather name="bell" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#333", true: "#FF4D37" }}
              thumbColor="#0F1216"
              style={styles.switch}
            />
          </View>
        </View>

        <View style={[styles.card, { height: 130 }]}>
          <TouchableOpacity style={styles.menuRow} onPress={handleLogout}>
            <View style={styles.menuLeft}>
              <Feather name="log-out" size={14} color="#FF0000" />
              <Text style={[styles.menuText, { color: "#FF0000" }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});
