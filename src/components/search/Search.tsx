import { useColorScheme } from '@/lib/color-scheme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

export default function Search() {
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
      marginBottom: 12,
    },
  });

  return (
    <View className={isDark ? 'flex-1 bg-[#1a1d23]' : 'flex-1 bg-gray-50'}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Search</Text>
        <Input placeholder="Search messages, people, or topics..." />
      </View>

      <ScrollView className="flex-1">
        <View className="gap-6 p-4">
          {/* Recent Searches */}
          <View className="gap-3">
            <Text
              className={
                isDark ? 'text-lg font-semibold text-white' : 'text-lg font-semibold text-gray-900'
              }>
              Recent Searches
            </Text>
            <View className="flex-row flex-wrap gap-2">
              <Badge variant="secondary">React Native</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Design Patterns</Badge>
            </View>
          </View>

          {/* Suggested Topics */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader className="gap-1">
              <CardTitle className={isDark ? 'text-white' : ''}>Suggested Topics</CardTitle>
              <CardDescription className={isDark ? 'text-gray-400' : ''}>
                Popular searches right now
              </CardDescription>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    Mobile Development
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    142 results
                  </Text>
                </View>
                <Badge>Trending</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    UI Components
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    89 results
                  </Text>
                </View>
                <Badge variant="secondary">Popular</Badge>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-1 gap-1">
                  <Text className={isDark ? 'font-medium text-white' : 'font-medium text-gray-900'}>
                    State Management
                  </Text>
                  <Text className={isDark ? 'text-sm text-gray-400' : 'text-sm text-gray-500'}>
                    56 results
                  </Text>
                </View>
                <Badge variant="secondary">Popular</Badge>
              </View>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className={isDark ? 'border-[#3a3f4b] bg-[#242830]' : ''}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : ''}>Browse by Category</CardTitle>
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
