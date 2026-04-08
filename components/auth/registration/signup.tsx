import { useState } from "react";
import { useRouter } from "expo-router";
import { authService } from "../../../api/servises/auth.service";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { signUpStyles as styles } from "./signUpStyles";
import { Svg, Polygon } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.88;
const INPUT_WIDTH = CARD_WIDTH - 48;

export const SignUpScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await authService.signUp({ email, password, displayName: username });
      router.replace("/(app)/home");
    } catch (e: any) {
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Svg width={40} height={40} viewBox="0 0 32 32">
          <Polygon points="11,7 27,16 11,25" fill="white" />
        </Svg>
      </View>

      <Text style={styles.title}>Welcome to WatchLater</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <View style={[styles.field, { width: INPUT_WIDTH }]}>
          <Text style={styles.label}>Username</Text>
          <View style={[styles.inputWrap, { width: INPUT_WIDTH }]}>
            <Feather name="user" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Your username"
              placeholderTextColor="#555"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={[styles.field, { width: INPUT_WIDTH }]}>
          <Text style={styles.label}>Email</Text>
          <View style={[styles.inputWrap, { width: INPUT_WIDTH }]}>
            <Feather name="mail" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="your@email.com"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={[styles.field, { width: INPUT_WIDTH }]}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWrap, { width: INPUT_WIDTH }]}>
            <Feather name="lock" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#555"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color="#888"
              />
            </Pressable>
          </View>
        </View>

        <View style={[styles.field, { width: INPUT_WIDTH, marginBottom: 28 }]}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={[styles.inputWrap, { width: INPUT_WIDTH }]}>
            <Feather name="lock" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Repeat Password"
              placeholderTextColor="#555"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirm}
            />
            <Pressable onPress={() => setShowConfirm(!showConfirm)}>
              <Feather
                name={showConfirm ? "eye-off" : "eye"}
                size={18}
                color="#888"
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { width: INPUT_WIDTH }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.signinRow}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
          <Text style={styles.signinLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
