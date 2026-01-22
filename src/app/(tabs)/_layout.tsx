import { useColorScheme } from '@/lib/color-scheme';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#FF7675' : '#3b82f6', // 활성화된 탭 색상
        tabBarInactiveTintColor: isDark ? '#6B7280' : '#999',
        tabBarStyle: {
          backgroundColor: isDark ? '#242830' : '#fff',
          borderTopColor: isDark ? '#3a3f4b' : '#e5e5e5',
        },
        headerShown: false, // 모든 탭에서 헤더 숨김
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="home" color={color} />,
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="search/index"
        options={{
          title: '검색',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="search" color={color} />,
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="stats/index"
        options={{
          title: '통계',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="bar-chart" color={color} />,
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          title: '채팅',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="comment" color={color} />,
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <View>
              <FontAwesome size={20} name="ellipsis-h" color={color} />
              <View
                style={{
                  position: 'absolute',
                  right: -8,
                  top: -2,
                  backgroundColor: '#f97316',
                  width: 6,
                  height: 6,
                  borderRadius: 3.5,
                  borderWidth: 1,
                  borderColor: isDark ? '#242830' : 'white',
                }}
              />
            </View>
          ),
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      />
    </Tabs>
  );
}
