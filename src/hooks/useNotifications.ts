import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendLocalNotification } from '@/lib/notifications';
import { supabaseMock } from '@/lib/supabase-mock';

/**
 * 푸시 알림과 Supabase 실시간 구독을 관리하는 커스텀 훅
 */
export function useNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // 1. 푸시 알림 권한 요청 및 토큰 가져오기
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      // 실제로는 이 토큰을 백엔드에 저장해야 합니다
      console.log('토큰 저장 필요:', token);
    });

    // 2. 알림 수신 리스너
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('📬 알림 수신:', notification);
      setNotification(notification);
    });

    // 3. 알림 응답 리스너 (사용자가 알림을 탭했을 때)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('👆 알림 탭:', response);
    });

    // 4. Supabase 실시간 구독 (Mock)
    const subscription = supabaseMock.subscribe('notifications', (event) => {
      if (event.type === 'INSERT') {
        // 새로운 알림이 DB에 추가되면 푸시 알림 보내기
        sendLocalNotification(
          event.data.title || '새 알림',
          event.data.body || '새로운 메시지가 도착했습니다.'
        );
      }
    });

    // Cleanup
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
      subscription.unsubscribe();
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
}

/**
 * 특정 테이블의 변화를 구독하는 훅
 */
export function useSupabaseSubscription(
  tableName: string,
  onEvent: (eventType: 'INSERT' | 'UPDATE' | 'DELETE', data: any) => void
) {
  useEffect(() => {
    const subscription = supabaseMock.subscribe(tableName, (event) => {
      onEvent(event.type, event.data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [tableName, onEvent]);
}
