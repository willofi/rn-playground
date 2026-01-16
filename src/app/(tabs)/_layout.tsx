import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000', // 활성화된 탭 색상
        headerShown: true,
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
          headerTitle: 'Home',
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
          headerTitle: 'Search',
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
          headerTitle: 'Stats',
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
          headerTitle: 'Chat',
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
                  backgroundColor: 'orange',
                  width: 6,
                  height: 6,
                  borderRadius: 3.5,
                  borderWidth: 1, // 배경과 분리되어 보이게 흰색 테두리를 살짝 주면 더 깔끔해요
                  borderColor: 'white',
                }}
              />
            </View>
          ),
          tabBarIconStyle: {
            marginTop: 4,
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
