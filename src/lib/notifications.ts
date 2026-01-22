import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 알림이 수신되었을 때 표시 방법 설정
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * 푸시 알림 권한 요청 및 토큰 가져오기
 */
export async function registerForPushNotificationsAsync() {
  // 웹 환경에서는 푸시 알림을 지원하지 않음
  if (Platform.OS === 'web') {
    console.log('웹 환경에서는 푸시 알림이 지원되지 않습니다.');
    return undefined;
  }

  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('푸시 알림 권한이 거부되었습니다.');
    return;
  }

  // Expo 푸시 토큰 가져오기
  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('푸시 토큰:', token);

  return token;
}

/**
 * 로컬 알림 예약 (테스트용)
 */
export async function scheduleLocalNotification(title: string, body: string, seconds: number = 2) {
  // 웹 환경에서는 실행하지 않음
  if (Platform.OS === 'web') {
    console.log('웹 환경에서는 알림 예약이 지원되지 않습니다.');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { timestamp: Date.now() },
    },
    trigger: { seconds },
  });
}

/**
 * 즉시 로컬 알림 보내기
 */
export async function sendLocalNotification(title: string, body: string) {
  // 웹 환경에서는 실행하지 않음
  if (Platform.OS === 'web') {
    console.log('웹 환경에서는 로컬 알림이 지원되지 않습니다.');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { timestamp: Date.now() },
    },
    trigger: null, // 즉시 실행
  });
}
