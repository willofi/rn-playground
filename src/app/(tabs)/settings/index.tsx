import { useRouter } from 'expo-router';
import { Pressable, Text, View, ScrollView, Switch, Alert } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { sendLocalNotification, scheduleLocalNotification } from '@/lib/notifications';
import { supabaseMock } from '@/lib/supabase-mock';

export default function TabSettingsMain() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // 푸시 알림 훅 사용
  const { expoPushToken, notification } = useNotifications();

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
    await sendLocalNotification(
      '테스트 알림',
      '이것은 로컬 푸시 알림 테스트입니다!'
    );
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
    await scheduleLocalNotification(
      '⏰ 예약된 알림',
      '5초 후에 이 알림이 표시됩니다.',
      5
    );
    Alert.alert('알림 예약됨', '5초 후에 알림이 도착합니다.');
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Profile */}
      <View className="p-4 bg-white border-b border-gray-200 gap-4">
        <Text className="text-2xl font-bold text-gray-900">Settings</Text>

        <View className="flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-600">
              <Text className="text-white font-bold text-xl">ME</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1 gap-1">
            <Text className="text-lg font-semibold text-gray-900">My Account</Text>
            <Text className="text-sm text-gray-500">myemail@example.com</Text>
          </View>
          <Badge>Pro</Badge>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4 gap-4">
          {/* Account Settings */}
          <Card>
            <CardHeader className="gap-1">
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Pressable
                onPress={() => router.push('/settings/profile')}
                className="flex-row items-center justify-between py-3">
                <Text className="text-gray-900 font-medium">Edit Profile</Text>
                <Text className="text-gray-400">›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className="text-gray-900 font-medium">Change Password</Text>
                <Text className="text-gray-400">›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className="text-gray-900 font-medium">Privacy & Security</Text>
                <Text className="text-gray-400">›</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader className="gap-1">
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className="text-gray-900 font-medium">Push Notifications</Text>
                  <Text className="text-sm text-gray-500">Receive alerts and updates</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={handleNotificationToggle}
                />
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className="text-gray-900 font-medium">Dark Mode</Text>
                  <Text className="text-sm text-gray-500">Switch to dark theme</Text>
                </View>
                <Switch value={darkModeEnabled} onValueChange={setDarkModeEnabled} />
              </View>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader className="gap-1">
              <CardTitle>Support</CardTitle>
              <CardDescription>Get help and information</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Pressable
                onPress={() => router.push('/info')}
                className="flex-row items-center justify-between py-3">
                <Text className="text-gray-900 font-medium">Help Center</Text>
                <Text className="text-gray-400">›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className="text-gray-900 font-medium">Contact Support</Text>
                <Text className="text-gray-400">›</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push('/info')}
                className="flex-row items-center justify-between py-3">
                <Text className="text-gray-900 font-medium">About</Text>
                <Text className="text-gray-400">›</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* 푸시 알림 테스트 섹션 */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="gap-1">
              <CardTitle className="text-blue-900">🔔 푸시 알림 테스트</CardTitle>
              <CardDescription>다양한 알림 시나리오를 테스트해보세요</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Button 
                onPress={handleTestNotification}
                className="bg-blue-600">
                <Text className="text-white font-medium">즉시 알림 보내기</Text>
              </Button>
              
              <Button 
                onPress={handleScheduledNotification}
                className="bg-purple-600">
                <Text className="text-white font-medium">5초 후 알림 예약</Text>
              </Button>
              
              <Button 
                onPress={handleSimulateDbChange}
                className="bg-green-600">
                <Text className="text-white font-medium">DB 변경 시뮬레이션</Text>
              </Button>

              <View className="mt-2 p-3 bg-white rounded-lg">
                <Text className="text-xs text-gray-600 mb-1">푸시 토큰:</Text>
                <Text className="text-xs text-gray-800 font-mono">
                  {expoPushToken?.substring(0, 40) || '로딩 중...'}...
                </Text>
              </View>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <Button variant="outline" className="border-red-300">
                <Text className="text-red-600">Clear All Data</Text>
              </Button>
              <Button variant="outline" className="border-red-300">
                <Text className="text-red-600">Log Out</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
