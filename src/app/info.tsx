import { View, Text, TouchableOpacity } from 'react-native';

export default function InfoModal() {
  return (
    <View className="flex-1 justify-between bg-white px-6 py-10">
      <View className="mt-16 items-center">
        <View className="mb-4 h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 shadow-sm">
          <Text className="text-3xl">🚀</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800">My Native App</Text>
        <Text className="mt-1 font-medium text-gray-400">Version 1.0.0</Text>
      </View>

      <View className="items-center">
        <Text className="text-center leading-5 text-gray-600">안녕하세요.</Text>
      </View>

      <View className="items-center pb-4">
        <View className="mb-4 h-px w-10 bg-gray-200" />
        <Text className="text-[10px] tracking-widest text-gray-400 uppercase">
          © 2026. All rights reserved.
        </Text>
        <Text className="mt-1 text-[11px] font-semibold text-gray-500">Made by willofi</Text>
      </View>
    </View>
  );
}
