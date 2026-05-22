import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import axios from "axios";
import { ApiErrorResponse } from "../../../../api/types/api-error.types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Svg, Polygon } from "react-native-svg";
import { verifyOtpStyles as styles } from "./verifyotpStyles";
import { forgotPasswordService } from "../../../../api/services/forgot.service";

const OTP_LENGTH = 6;
const RESEND_TIMEOUT = 60;

export const VerifyOtpPage = () => {
  const router = useRouter();
  const { phone } = useLocalSearchParams();

  const phoneNumber =
    typeof phone === "string" ? phone : Array.isArray(phone) ? phone[0] : "";

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(RESEND_TIMEOUT);
  const otpInputRefs = useRef<(TextInput | null)[]>(
    Array(OTP_LENGTH).fill(null),
  );

  useEffect(() => {
    if (canResend) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return RESEND_TIMEOUT;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [canResend]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < OTP_LENGTH - 1)
      otpInputRefs.current[index + 1]?.focus();
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((d) => d !== "");

  const handleVerify = async () => {
    if (!isOtpComplete) {
      Alert.alert("Error", "Please enter all 6 digits");
      return;
    }

    try {
      setLoading(true);
      const code = otp.join("");

      await forgotPasswordService.verifyOtpOnly(phoneNumber, code);

      router.push({
        pathname: "/(auth)/reset-password",
        params: { phone: phoneNumber, code },
      });
    } catch (e: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(e))
        Alert.alert(
          "Error",
          e?.response?.data?.message ?? "Invalid or expired OTP",
        );
      else Alert.alert("Error", "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || !phoneNumber) return;
    try {
      setResendLoading(true);
      setCanResend(false);
      setTimer(RESEND_TIMEOUT);
      await forgotPasswordService.requestOtp(phoneNumber);
      Alert.alert("Success", "OTP resent");
    } catch (e: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(e)) {
        Alert.alert(
          "Error",
          e?.response?.data?.message ?? "Failed to resend OTP",
        );
      } else {
        Alert.alert("Error", "Unexpected error");
      }
      setCanResend(true);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.logoBox}>
        <Svg width={40} height={40} viewBox="0 0 32 32">
          <Polygon points="11,7 27,16 11,25" fill="white" />
        </Svg>
      </View>

      <Text style={styles.title}>Enter PIN Code</Text>
      <Text style={styles.subtitle}>We sent a code to {phoneNumber}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              otpInputRefs.current[index] = ref;
            }}
            style={styles.otpInput}
            value={digit}
            onChangeText={(v) => handleOtpChange(index, v)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      <View style={styles.resendContainer}>
        <TouchableOpacity
          onPress={handleResend}
          disabled={!canResend || resendLoading}
        >
          <Text style={[styles.resendLink, !canResend && { opacity: 0.4 }]}>
            {resendLoading ? "Sending..." : "Resend code"}
          </Text>
        </TouchableOpacity>
        {!canResend && <Text style={styles.timerText}>Resend in {timer}s</Text>}
      </View>

      <View style={{ flex: 1 }} />

      <TouchableOpacity
        style={[
          styles.nextButton,
          (!isOtpComplete || loading) && styles.nextButtonDisabled,
        ]}
        onPress={handleVerify}
        disabled={!isOtpComplete || loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextButtonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
