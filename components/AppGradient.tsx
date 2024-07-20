import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const AppGradient = ({
  colors, 
  children,
}: {
  colors: string[];
  children: any;
}) => {
  return (
    <LinearGradient className="flex-1" colors={colors}>
      <SafeAreaView className="flex-1 justify-between mx-5 my-12">
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AppGradient;
