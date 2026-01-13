import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: '설정 메인' }} />
      <Stack.Screen name="profile" options={{ title: '내 정보', headerBackTitle: '뒤로' }} />
    </Stack>
  );
}
