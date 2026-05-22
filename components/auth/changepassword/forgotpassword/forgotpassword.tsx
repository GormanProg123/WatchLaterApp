import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Svg, Polygon } from "react-native-svg";
import { forgotPasswordStyles as styles } from "./forgotPasswordStyles";
import { forgotPasswordService } from "../../../../api/services/forgot.service";
import { authService } from "../../../../api/services/auth.service";
import { userService } from "../../../../api/services/user.service";

export const ForgotPasswordPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingPhone, setCheckingPhone] = useState(true);
  const [selectedCountry] = useState({ flag: "🇵🇱", phoneCode: "+48" });

  useEffect(() => {
    const checkPhone = async () => {
      try {
        const me = await authService.getMe();
        if (me.phoneNumber) {
          await forgotPasswordService.requestOtp(me.phoneNumber);
          router.replace({
            pathname: "/(auth)/verify-otp",
            params: { phone: me.phoneNumber },
          });
        }
      } catch (e: any) {
        Alert.alert(
          "Error",
          e?.response?.data?.message ?? "Something went wrong",
        );
      } finally {
        setCheckingPhone(false);
      }
    };

    checkPhone();
  }, []);

  const handleNext = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      const fullPhone = `${selectedCountry.phoneCode}${phoneNumber}`;
      await userService.updatePhoneNumber(fullPhone);
      await forgotPasswordService.requestOtp(fullPhone);
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { phone: fullPhone },
      });
    } catch (e: any) {
      Alert.alert("Error", e?.response?.data?.message ?? "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {checkingPhone ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="#FF4D37" size="large" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.logoBox}>
            <Svg width={40} height={40} viewBox="0 0 32 32">
              <Polygon points="11,7 27,16 11,25" fill="white" />
            </Svg>
          </View>

          <Text style={styles.title}>Change password</Text>
          <Text style={styles.subtitle}>Enter your phone number</Text>

          <View style={styles.phoneInputContainer}>
            <Pressable style={styles.countrySelector}>
              <Text style={styles.countrySelectorText}>
                {selectedCountry.flag} {selectedCountry.phoneCode}
              </Text>
              <Feather name="chevron-down" size={16} color="#FFFFFF" />
            </Pressable>

            <TextInput
              style={styles.phoneInput}
              placeholder="123456789"
              placeholderTextColor="#555"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={13}
              autoFocus
            />
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[styles.nextButton, loading && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.nextButtonText}>Next</Text>
            )}
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
