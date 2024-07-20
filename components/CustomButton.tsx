import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

export default function CustomButton({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white rounded-xl justify-center items-center min-h-[62px] ${containerStyles}`}
      onPress={onPress}
    >
      <Text className={` ${textStyles} text-lg font-semibold `}> {title}</Text>
    </TouchableOpacity>
  );
}
