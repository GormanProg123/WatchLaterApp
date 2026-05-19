import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { forgotPasswordService } from "../../../api/servises/forgot.service";
import { forgotPasswordStyles as styles } from "../changepassword/forgotpassword/forgotPasswordStyles";
import { Feather } from "@expo/vector-icons";
import Svg, { Polygon } from "react-native-svg";

export const ChangeEmailScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      await forgotPasswordService.updateEmail(email);
      Alert.alert("Success", "Email updated", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e: any) {
      Alert.alert(
        "Error",
        e?.response?.data?.message ?? "Failed to update email",
      );
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

      <Text style={styles.title}>Change Email</Text>
      <Text style={styles.subtitle}>Enter your new email address</Text>

      <View style={styles.phoneInputContainer}>
        <TextInput
          style={[styles.phoneInput, { flex: 1 }]}
          placeholder="your@email.com"
          placeholderTextColor="#555"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
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
