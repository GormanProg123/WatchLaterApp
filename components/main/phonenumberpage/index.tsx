import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import { forgotPasswordStyles as styles } from "../../auth/changepassword/forgotpassword/forgotPasswordStyles";
import { Feather } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";
import { userService } from "../../../api/serviсes/user.service";
import { ApiErrorResponse } from "../../../api/types/api-error.types";
import axios from "axios";

export const AddPhoneScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCountry] = useState({
    flag: "🇵🇱",
    phoneCode: "+48",
  });

  const handleSave = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      await userService.updatePhoneNumber(phoneNumber);
      Alert.alert("Success", "Phone number saved", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(e)) {
        const message = e.response?.data?.message ?? "Update phone failed";
        Alert.alert("Error", message);
      } else {
        Alert.alert("Error", "Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>Phone Number</Text>
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
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextButtonText}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
