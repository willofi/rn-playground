import { useRouter } from 'expo-router';
import { Pressable, Text, View, ScrollView, Switch } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function TabSettingsMain() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

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
                  onValueChange={setNotificationsEnabled}
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
