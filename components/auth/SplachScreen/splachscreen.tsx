import { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { useRouter } from "expo-router";
import { Svg, Polygon } from "react-native-svg";
import { splachScreenStyles as styles } from "./splachScreenStyles";
import { authService } from "../../../api/services/auth.service";
export const SplashScreen = () => {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    startAnimation();
    checkAuth();
  }, []);

  const startAnimation = () => {
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const checkAuth = async () => {
    try {
      const token = await authService.getToken();

      if (!token) {
        return navigateToSignIn();
      }

      await authService.getMe();

      setTimeout(() => {
        router.replace("/(app)/home");
      }, 2200);
    } catch (error) {
      await authService.logout();

      navigateToSignIn();
    }
  };

  const navigateToSignIn = () => {
    setTimeout(() => {
      router.replace("/(auth)/sign-in");
    }, 2200);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoBox,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Svg width={40} height={40} viewBox="0 0 32 32">
          <Polygon points="11,7 27,16 11,25" fill="white" />
        </Svg>
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslate }],
          },
        ]}
      >
        WatchLater
      </Animated.Text>
    </View>
  );
};
