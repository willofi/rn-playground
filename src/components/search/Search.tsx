import { ScrollView, Text, View } from 'react-native';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export default function Search() {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white border-b border-gray-200 gap-4">
        <Text className="text-2xl font-bold text-gray-900">Search</Text>
        <Input placeholder="Search messages, people, or topics..." />
      </View>

      <ScrollView className="flex-1">
        <View className="p-4 gap-6">
          {/* Recent Searches */}
          <View className="gap-3">
            <Text className="text-lg font-semibold text-gray-900">Recent Searches</Text>
            <View className="flex-row flex-wrap gap-2">
              <Badge variant="secondary">React Native</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Design Patterns</Badge>
            </View>
          </View>

          {/* Suggested Topics */}
          <Card>
            <CardHeader className="gap-1">
              <CardTitle>Suggested Topics</CardTitle>
              <CardDescription>Popular searches right now</CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className="font-medium text-gray-900">Mobile Development</Text>
                  <Text className="text-sm text-gray-500">142 results</Text>
                </View>
                <Badge>Trending</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className="font-medium text-gray-900">UI Components</Text>
                  <Text className="text-sm text-gray-500">89 results</Text>
                </View>
                <Badge variant="secondary">Popular</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className="font-medium text-gray-900">State Management</Text>
                  <Text className="text-sm text-gray-500">56 results</Text>
                </View>
                <Badge variant="secondary">Popular</Badge>
              </View>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Browse by Category</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <Button variant="outline">
                <Text>All Conversations</Text>
              </Button>
              <Button variant="outline">
                <Text>People</Text>
              </Button>
              <Button variant="outline">
                <Text>Groups</Text>
              </Button>
              <Button variant="outline">
                <Text>Files & Media</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
