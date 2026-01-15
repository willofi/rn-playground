import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export default function Chat() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 bg-white border-b border-gray-200 gap-2">
        <Text className="text-2xl font-bold text-gray-900">Messages</Text>
        <Text className="text-gray-600">12 active conversations</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4 gap-3">
          {/* Chat Item 1 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card className="bg-blue-50">
              <CardContent className="p-4">
                <View className="flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600">
                      <Text className="text-white font-semibold">JD</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-semibold text-gray-900">John Doe</Text>
                      <Text className="text-xs text-gray-500">2m ago</Text>
                    </View>
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                      Hey! How are you doing today?
                    </Text>
                  </View>
                  <Badge>3</Badge>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>

          {/* Chat Item 2 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-purple-600">
                      <Text className="text-white font-semibold">SM</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-semibold text-gray-900">Sarah Miller</Text>
                      <Text className="text-xs text-gray-500">1h ago</Text>
                    </View>
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                      Can you review the latest design?
                    </Text>
                  </View>
                  <Badge variant="secondary">1</Badge>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>

          {/* Chat Item 3 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-600">
                      <Text className="text-white font-semibold">TP</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-semibold text-gray-900">Team Project</Text>
                      <Text className="text-xs text-gray-500">3h ago</Text>
                    </View>
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                      Meeting scheduled for tomorrow
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>

          {/* Chat Item 4 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-orange-600">
                      <Text className="text-white font-semibold">MW</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-semibold text-gray-900">Mike Wilson</Text>
                      <Text className="text-xs text-gray-500">Yesterday</Text>
                    </View>
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                      Thanks for your help!
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>

          {/* Chat Item 5 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-pink-600">
                      <Text className="text-white font-semibold">EJ</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text className="font-semibold text-gray-900">Emma Johnson</Text>
                      <Text className="text-xs text-gray-500">2 days ago</Text>
                    </View>
                    <Text className="text-sm text-gray-600" numberOfLines={1}>
                      Let's catch up sometime!
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
