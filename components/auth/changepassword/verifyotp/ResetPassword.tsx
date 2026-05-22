import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Svg, Polygon } from "react-native-svg";
import { Feather } from "@expo/vector-icons";

import { forgotPasswordService } from "../../../../api/services/forgot.service";
import { validatePassword } from "../../../utils/validators";
import { resetPasswordStyles as styles } from "./resetPasswordStyles";

export const ResetPasswordPage = () => {
  const router = useRouter();
  const { phone, code } = useLocalSearchParams();

  const phoneNumber =
    typeof phone === "string" ? phone : Array.isArray(phone) ? phone[0] : "";
  const otpCode =
    typeof code === "string" ? code : Array.isArray(code) ? code[0] : "";

  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleReset = async () => {
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      Alert.alert("Error", passwordValidationError);
      return;
    }

    try {
      setLoading(true);

      await forgotPasswordService.verifyOtpAndResetPassword(
        phoneNumber,
        otpCode,
        newPassword,
      );

      Alert.alert("Success", "Password changed", [
        { text: "OK", onPress: () => router.replace("/(auth)/sign-in") },
      ]);
    } catch (e: any) {
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Failed to reset password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.logoBox}>
        <Svg width={40} height={40} viewBox="0 0 32 32">
          <Polygon points="11,7 27,16 11,25" fill="white" />
        </Svg>
      </View>

      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Enter your new password</Text>

      <View style={styles.passwordInputContainer}>
        <Text style={styles.label}>New password</Text>
        <View style={styles.passwordInputWrap}>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={handleNewPasswordChange}
            secureTextEntry={!showPassword}
            placeholder="Enter new password"
            placeholderTextColor="#666"
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

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[styles.nextButton, loading && styles.nextButtonDisabled]}
        onPress={handleReset}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextButtonText}>Reset password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
