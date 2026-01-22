import { useColorScheme } from '@/lib/color-scheme';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export default function Chat() {
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
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>12 active conversations</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="gap-3 p-4">
          {/* Chat Item 1 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card className={isDark ? 'border-blue-800/50 bg-blue-900/40' : 'bg-blue-50'}>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600">
                      <Text className="font-semibold text-white">JD</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={
                          isDark ? 'font-semibold text-white' : 'font-semibold text-gray-900'
                        }>
                        John Doe
                      </Text>
                      <Text className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}>
                        2m ago
                      </Text>
                    </View>
                    <Text
                      className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}
                      numberOfLines={1}>
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
            <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-purple-600">
                      <Text className="font-semibold text-white">SM</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={
                          isDark ? 'font-semibold text-white' : 'font-semibold text-gray-900'
                        }>
                        Sarah Miller
                      </Text>
                      <Text className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}>
                        1h ago
                      </Text>
                    </View>
                    <Text
                      className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}
                      numberOfLines={1}>
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
            <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-600">
                      <Text className="font-semibold text-white">TP</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={
                          isDark ? 'font-semibold text-white' : 'font-semibold text-gray-900'
                        }>
                        Team Project
                      </Text>
                      <Text className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}>
                        3h ago
                      </Text>
                    </View>
                    <Text
                      className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}
                      numberOfLines={1}>
                      Meeting scheduled for tomorrow
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>

          {/* Chat Item 4 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-orange-600">
                      <Text className="font-semibold text-white">MW</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={
                          isDark ? 'font-semibold text-white' : 'font-semibold text-gray-900'
                        }>
                        Mike Wilson
                      </Text>
                      <Text className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}>
                        Yesterday
                      </Text>
                    </View>
                    <Text
                      className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}
                      numberOfLines={1}>
                      Thanks for your help!
                    </Text>
                  </View>
                </View>
              </CardContent>
            </Card>
          </TouchableOpacity>

          {/* Chat Item 5 */}
          <TouchableOpacity activeOpacity={0.7}>
            <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
              <CardContent className="p-4">
                <View className="flex-row items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-pink-600">
                      <Text className="font-semibold text-white">EJ</Text>
                    </AvatarFallback>
                  </Avatar>
                  <View className="flex-1 gap-1">
                    <View className="flex-row items-center justify-between">
                      <Text
                        className={
                          isDark ? 'font-semibold text-white' : 'font-semibold text-gray-900'
                        }>
                        Emma Johnson
                      </Text>
                      <Text className={isDark ? 'text-xs text-gray-400' : 'text-xs text-gray-500'}>
                        2 days ago
                      </Text>
                    </View>
                    <Text
                      className={isDark ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}
                      numberOfLines={1}>
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
