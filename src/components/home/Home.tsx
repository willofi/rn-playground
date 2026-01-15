import { ScrollView, Text, View } from 'react-native';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4 gap-6">
        {/* Welcome Section */}
        <View className="gap-2">
          <Text className="text-3xl font-bold text-gray-900">Welcome Back!</Text>
          <Text className="text-gray-600">Here's what's happening today</Text>
        </View>

        {/* Stats Cards */}
        <View className="flex-row gap-4">
          <Card className="flex-1">
            <CardHeader className="gap-2">
              <CardTitle className="text-lg">Messages</CardTitle>
              <Text className="text-3xl font-bold text-blue-600">24</Text>
            </CardHeader>
          </Card>
          <Card className="flex-1">
            <CardHeader className="gap-2">
              <CardTitle className="text-lg">Active</CardTitle>
              <Text className="text-3xl font-bold text-green-600">12</Text>
            </CardHeader>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="gap-1">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Shortcuts to your most used features</CardDescription>
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
        <Card>
          <CardHeader className="gap-1">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions</CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="font-medium text-gray-900">New message received</Text>
                <Text className="text-sm text-gray-500">2 minutes ago</Text>
              </View>
              <Badge>New</Badge>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="font-medium text-gray-900">Search completed</Text>
                <Text className="text-sm text-gray-500">15 minutes ago</Text>
              </View>
              <Badge variant="success">Done</Badge>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="font-medium text-gray-900">Settings updated</Text>
                <Text className="text-sm text-gray-500">1 hour ago</Text>
              </View>
              <Badge variant="secondary">Updated</Badge>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}
