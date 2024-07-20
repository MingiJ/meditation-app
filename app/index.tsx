import { ImageBackground, Text, View } from "react-native";
import beachImage from "@/assets/meditation-images/beach.webp";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import AppGradient from "@/components/AppGradient";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        resizeMode="cover"
        source={beachImage}
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <View>
            <Text className="text-center text-white font-bold text-4xl">
              Simple Meditation App
            </Text>
            <Text className="text-center text-white font-regular text-2xl mt-3">
              Simplifying Meditation for Everyone
            </Text>
          </View>

          <View>
            <CustomButton
              onPress={() => router.push("/nature-meditate")}
              title="Get Started"
            />
          </View>
          <StatusBar style="light" />
        </AppGradient>
      </ImageBackground>
    </View>
  );
}
