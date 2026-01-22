import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/hooks/useNotifications';
import { useColorScheme } from '@/lib/color-scheme';
import { scheduleLocalNotification, sendLocalNotification } from '@/lib/notifications';
import { supabaseMock } from '@/lib/supabase-mock';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabSettingsMain() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const insets = useSafeAreaInsets();

  // 푸시 알림 훅 사용
  const { expoPushToken, notification } = useNotifications();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // 웹 환경 체크
  const isWeb = Platform.OS === 'web';

  // 알림이 수신되면 로그 출력
  useEffect(() => {
    if (notification) {
      console.log('새 알림:', notification.request.content);
    }
  }, [notification]);

  // 알림 토글 변경 시
  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    if (value) {
      Alert.alert(
        '알림 활성화됨',
        '푸시 알림을 받을 수 있습니다.\n토큰: ' + (expoPushToken?.substring(0, 20) || 'N/A') + '...'
      );
    }
  };

  // 테스트 알림 보내기
  const handleTestNotification = async () => {
    await sendLocalNotification('테스트 알림', '이것은 로컬 푸시 알림 테스트입니다!');
  };

  // Supabase 변경 시뮬레이션 (운영자가 메시지를 보내는 상황)
  const handleSimulateDbChange = async () => {
    // DB에 새 알림 데이터 추가 시뮬레이션
    await supabaseMock.simulateInsert('notifications', {
      id: Date.now(),
      title: '🎉 운영자 메시지',
      body: '새로운 이벤트가 시작되었습니다! 지금 확인해보세요.',
      created_at: new Date().toISOString(),
    });

    Alert.alert('시뮬레이션 완료', 'DB 변경이 감지되어 푸시 알림이 전송되었습니다!');
  };

  // 예약 알림 테스트
  const handleScheduledNotification = async () => {
    await scheduleLocalNotification('⏰ 예약된 알림', '5초 후에 이 알림이 표시됩니다.', 5);
    Alert.alert('알림 예약됨', '5초 후에 알림이 도착합니다.');
  };

  const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      paddingBottom: 12,
      backgroundColor: isDark ? '#242830' : '#fff',
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#3a3f4b' : '#e5e5e5',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#fff' : '#1a1a1a',
      marginBottom: 2,
    },
  });

  return (
    <View className={isDark ? 'flex-1 bg-[#1a1d23]' : 'flex-1 bg-gray-50'}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="gap-4 p-4">
          {/* Profile Section */}
          <View className="flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-blue-600">
                <Text className="text-xl font-bold text-white">ME</Text>
              </AvatarFallback>
            </Avatar>
            <View className="flex-1 gap-1">
              <Text
                className={
                  isDark
                    ? 'text-lg font-semibold text-white'
                    : 'text-lg font-semibold text-gray-900'
                }>
                My Account
              </Text>
              <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                myemail@example.com
              </Text>
            </View>
            <Badge>Pro</Badge>
          </View>
          {/* Account Settings */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Account Settings</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Pressable
                onPress={() => router.push('/settings/profile')}
                className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                  Edit Profile
                </Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                  Change Password
                </Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                  Privacy & Security
                </Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Preferences</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    Push Notifications
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    Receive alerts and updates
                  </Text>
                </View>
                <Switch value={notificationsEnabled} onValueChange={handleNotificationToggle} />
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    Dark Mode
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    Switch to dark theme
                  </Text>
                </View>
                <Switch value={isDark} onValueChange={toggleColorScheme} />
              </View>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Support</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>
                Get help and information
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Pressable
                onPress={() => router.push('/info')}
                className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                  Help Center
                </Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                  Contact Support
                </Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push('/info')}
                className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                  About
                </Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* 푸시 알림 테스트 섹션 - 웹 환경에서는 숨김 */}
          {!isWeb && (
            <Card
              className={
                isDark ? 'border-blue-800/50 bg-blue-900/30' : 'border-blue-200 bg-blue-50'
              }>
              <CardHeader className="gap-1">
                <CardTitle className={isDark ? 'text-blue-300' : 'text-blue-900'}>
                  🔔 푸시 알림 테스트
                </CardTitle>
                <CardDescription className={isDark ? 'text-blue-200/70' : ''}>
                  다양한 알림 시나리오를 테스트해보세요
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-3">
                <Button onPress={handleTestNotification} className="bg-blue-600">
                  <Text className="font-medium text-white">즉시 알림 보내기</Text>
                </Button>

                <Button onPress={handleScheduledNotification} className="bg-purple-600">
                  <Text className="font-medium text-white">5초 후 알림 예약</Text>
                </Button>

                <Button onPress={handleSimulateDbChange} className="bg-green-600">
                  <Text className="font-medium text-white">DB 변경 시뮬레이션</Text>
                </Button>

                <View
                  className={
                    isDark
                      ? 'mt-2 rounded-lg border border-[#3a3f4b] bg-[#242830] p-3'
                      : 'mt-2 rounded-lg bg-white p-3'
                  }>
                  <Text
                    className={
                      isDark ? 'mb-1 text-xs text-gray-400' : 'mb-1 text-xs text-gray-600'
                    }>
                    푸시 토큰:
                  </Text>
                  <Text
                    className={
                      isDark ? 'font-mono text-xs text-gray-200' : 'font-mono text-xs text-gray-800'
                    }>
                    {expoPushToken?.substring(0, 40) || '로딩 중...'}...
                  </Text>
                </View>
              </CardContent>
            </Card>
          )}

          {/* Danger Zone */}
          <Card className={isDark ? 'border-red-900/50 bg-[#242830]' : 'border-red-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-red-400' : 'text-red-600'}>
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <Button variant="outline" className={isDark ? 'border-red-900/50' : 'border-red-300'}>
                <Text className={isDark ? 'text-red-400' : 'text-red-600'}>Clear All Data</Text>
              </Button>
              <Button variant="outline" className={isDark ? 'border-red-900/50' : 'border-red-300'}>
                <Text className={isDark ? 'text-red-400' : 'text-red-600'}>Log Out</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
