import '@/styles/global.css';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.setOptions({
  duration: 10000,
  fade: true,
});

export default function RootLayout() {
  const router = useRouter();

  const renderContent = () => (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="info"
        options={{
          presentation: 'pageSheet',
          headerTitle: '앱 정보',
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} className="px-2 opacity-70 active:opacity-30">
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {Platform.OS === 'web' ? (
        // 2. 웹 브라우저일 때: 회색 배경 중앙에 좁은 화면 배치
        <View className="flex-1 items-center justify-center bg-gray-200">
          <View
            style={styles.webContainer}
            className="h-full w-full overflow-hidden bg-white shadow-2xl">
            {renderContent()}
          </View>
        </View>
      ) : (
        renderContent()
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    ...Platform.select({
      web: {
        maxWidth: 450, // 모바일처럼 보일 최대 너비
        maxHeight: 900, // 선택 사항: 높이도 제한하고 싶을 때
        borderRadius: 20, // 웹에서 모서리를 둥글게 하면 더 앱 같습니다
        marginVertical: 20,
      },
    }),
  },
});
