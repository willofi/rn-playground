import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function TabSettingsMain() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="mb-6 text-2xl font-bold">설정</Text>

        <Pressable
          onPress={() => router.push('/settings/profile')}
          className="flex-row items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <Text className="text-lg">내 정보 수정</Text>
        </Pressable>

        <View className="mt-10 flex-row gap-4 p-4">
          <Pressable onPress={() => router.push('/info')} className="flex-1">
            <Text>애플리케이션 정보 보기</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/info')} className="flex-1">
            <Text>로그아웃</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
