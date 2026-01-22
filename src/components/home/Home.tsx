import { useColorScheme } from '@/lib/color-scheme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function Home() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

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
    headerSubtitle: {
      fontSize: 14,
      color: isDark ? '#9ca3af' : '#666',
    },
  });

  return (
    <View className={isDark ? 'flex-1 bg-[#1a1d23]' : 'flex-1 bg-gray-50'}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Home</Text>
        <Text style={styles.headerSubtitle}>Welcome back! Here's what's happening</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="gap-6 p-4">
          {/* Welcome Section */}
          <View className="gap-2">
            <Text
              className={
                isDark ? 'text-xl font-bold text-white' : 'text-xl font-bold text-gray-900'
              }>
              Quick Overview
            </Text>
            <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-600'}>
              Your daily summary
            </Text>
          </View>

          {/* Stats Cards */}
          <View className="flex-row gap-4">
            <Card className={isDark ? 'flex-1 border-[#3a3f4b] bg-[#242830]' : 'flex-1'}>
              <CardHeader className="gap-2">
                <CardTitle className={isDark ? 'text-lg text-white' : 'text-lg'}>
                  Messages
                </CardTitle>
                <Text className="text-3xl font-bold text-blue-600">24</Text>
              </CardHeader>
            </Card>
            <Card className={isDark ? 'flex-1 border-[#3a3f4b] bg-[#242830]' : 'flex-1'}>
              <CardHeader className="gap-2">
                <CardTitle className={isDark ? 'text-lg text-white' : 'text-lg'}>Active</CardTitle>
                <Text className="text-3xl font-bold text-green-600">12</Text>
              </CardHeader>
            </Card>
          </View>

          {/* Quick Actions */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Quick Actions</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>
                Shortcuts to your most used features
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <Button>
                <Text>Start New Chat</Text>
              </Button>
              <Button variant="outline">
                <Text>Search Conversations</Text>
              </Button>
              <Button variant="ghost">
                <Text>View All Chats</Text>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Recent Activity</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>
                Your latest interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    New message received
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    2 minutes ago
                  </Text>
                </View>
                <Badge>New</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    Search completed
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    15 minutes ago
                  </Text>
                </View>
                <Badge variant="success">Done</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    Settings updated
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    1 hour ago
                  </Text>
                </View>
                <Badge variant="secondary">Updated</Badge>
              </View>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
