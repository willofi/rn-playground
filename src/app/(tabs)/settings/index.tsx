import { useRouter } from 'expo-router';
import { Pressable, Text, View, ScrollView, Switch } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useColorScheme } from '@/lib/color-scheme';

export default function TabSettingsMain() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className={isDark ? 'flex-1 bg-[#1a1d23]' : 'flex-1 bg-gray-50'}>
      {/* Header with Profile */}
      <View className={isDark ? 'p-4 bg-[#242830] border-b border-[#3a3f4b] gap-4' : 'p-4 bg-white border-b border-gray-200 gap-4'}>
        <Text className={isDark ? 'text-2xl font-bold text-white' : 'text-2xl font-bold text-gray-900'}>Settings</Text>

        <View className="flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-600">
              <Text className="text-white font-bold text-xl">ME</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1 gap-1">
            <Text className={isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'}>My Account</Text>
            <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>myemail@example.com</Text>
          </View>
          <Badge>Pro</Badge>
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4 gap-4">
          {/* Account Settings */}
          <Card className={isDark ? 'bg-[#242830] border-[#3a3f4b]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Account Settings</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Pressable
                onPress={() => router.push('/settings/profile')}
                className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Edit Profile</Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Change Password</Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Privacy & Security</Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className={isDark ? 'bg-[#242830] border-[#3a3f4b]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Preferences</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>Customize your experience</CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Push Notifications</Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>Receive alerts and updates</Text>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Dark Mode</Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>Switch to dark theme</Text>
                </View>
                <Switch value={isDark} onValueChange={toggleColorScheme} />
              </View>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className={isDark ? 'bg-[#242830] border-[#3a3f4b]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Support</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>Get help and information</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Pressable
                onPress={() => router.push('/info')}
                className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Help Center</Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>Contact Support</Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
              <Pressable
                onPress={() => router.push('/info')}
                className="flex-row items-center justify-between py-3">
                <Text className={isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'}>About</Text>
                <Text className={isDark ? 'text-gray-500' : 'text-gray-400'}>›</Text>
              </Pressable>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className={isDark ? 'bg-[#242830] border-red-900/50' : 'border-red-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-red-400' : 'text-red-600'}>Danger Zone</CardTitle>
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
