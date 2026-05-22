import { useState } from "react";
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
import { signinStyles as styles } from "./signinStyles";
import { useRouter } from "expo-router";
import { authService } from "../../../api/services/auth.service";
import { validatePassword, validateEmail } from "../../utils/validators";
import { Svg, Polygon } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { ApiErrorResponse } from "../../../api/types/api-error.types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.88;
const INPUT_WIDTH = CARD_WIDTH - 48;

export const SignInScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleSignIn = async () => {
    const emailValidation = validateEmail(email);

    setEmailError(emailValidation);

    if (emailValidation || !password) {
      return;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      Alert.alert("Error", passwordValidationError);
      return;
    }

    try {
      setLoading(true);
      await authService.signIn({ email, password });
      router.replace("/(app)/home");
    } catch (e: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(e)) {
        const message = e.response?.data?.message ?? "Authentication failed";

        Alert.alert("Error", message);
      } else {
        Alert.alert("Error", "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Svg width={40} height={40} viewBox="0 0 32 32">
          <Polygon points="11,7 27,16 11,25" fill="white" />
        </Svg>
      </View>

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <View style={[styles.field, { width: INPUT_WIDTH }]}>
          <Text style={styles.label}>Email</Text>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
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

        <View style={[styles.field, { width: INPUT_WIDTH, marginBottom: 28 }]}>
          <Text style={styles.label}>Password</Text>
          <View style={[styles.inputWrap, { width: INPUT_WIDTH }]}>
            <Feather name="lock" size={18} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#555"
              value={password}
              onChangeText={handlePasswordChange}
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
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { width: INPUT_WIDTH }]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
