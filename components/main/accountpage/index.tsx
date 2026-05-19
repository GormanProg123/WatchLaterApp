import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { authService } from "../../../api/servises/auth.service";
import { ItemService } from "../../../api/servises/item.service";
import { accountpageStyles as styles } from "./accountpageStyles";
import { User } from "../../../api/types/user.types";

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

  return `Joined ${date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  })}`;
};

export const AccountPageScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          return;
        }

        const me = await authService.getMe();

        setUser(me);
        setNotifications(me.notificationsEnabled);
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

  const displayName = user?.displayName ?? user?.email ?? "User";

  const firstLetter = displayName?.[0]?.toUpperCase() ?? "?";

  const avatarColor = getAvatarColor(displayName);

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
        <View style={[styles.card, { height: 100 }]}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarLetter}>{firstLetter}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.displayName ?? "—"}</Text>
              <Text style={styles.profileEmail}>{user?.email ?? "—"}</Text>
              <Text style={styles.profileJoined}>
                {user ? formatJoinDate(user.createdAt) : "—"}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { height: 320 }]}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Feather name="bell" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={async (value) => {
                setNotifications(value);

                try {
                  await ItemService.toggleNotifications(value);
                } catch (e) {
                  setNotifications(!value);
                }
              }}
              trackColor={{ false: "#333", true: "#FF4D37" }}
              thumbColor="#0F1216"
              style={styles.switch}
            />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/(app)/change-email")}
          >
            <View style={styles.menuLeft}>
              <Feather name="mail" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Change Email</Text>
            </View>
            <Feather name="chevron-right" size={14} color="#C9C3C3" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() =>
              router.push({
                pathname: "/(auth)/forgot-password",
                params: { email: user?.email },
              })
            }
          >
            <View style={styles.menuLeft}>
              <Feather name="shield" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>Change Password</Text>
            </View>
            <Feather name="chevron-right" size={14} color="#C9C3C3" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => router.push("/(app)/add-phone")}
          >
            <View style={styles.menuLeft}>
              <Feather name="phone" size={14} color="#C9C3C3" />
              <Text style={styles.menuText}>
                {user?.phoneNumber ? "Change Phone Number" : "Add Phone Number"}
              </Text>
            </View>
            <Feather name="chevron-right" size={14} color="#C9C3C3" />
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { height: 80 }]}>
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
