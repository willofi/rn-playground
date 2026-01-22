import { useColorScheme } from '@/lib/color-scheme';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerShown: false, // 헤더를 숨기고 각 페이지에서 자체 헤더 사용
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'Profile',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: isDark ? '#242830' : '#fff',
          },
          headerTintColor: isDark ? '#fff' : '#1a1a1a',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      />
    </Stack>
  );
}
