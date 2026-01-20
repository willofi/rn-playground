# 푸시 알림 가이드

## 📋 개요
이 프로젝트에는 Supabase와 연동할 수 있는 푸시 알림 시스템이 구현되어 있습니다.
현재는 Mock 모드로 실행되며, 실제 Supabase 연결 없이도 테스트할 수 있습니다.

## 🚀 설치 및 실행

### 1. 패키지 설치
```bash
npm install
# 또는
npx expo install expo-notifications expo-device
```

### 2. 앱 실행
```bash
npm start
```

### 3. 네이티브 빌드 (선택사항)
푸시 알림은 실제 기기나 네이티브 빌드에서 가장 잘 작동합니다:
```bash
npx expo prebuild
npx expo run:android
# 또는
npx expo run:ios
```

## 🎯 기능

### 현재 구현된 기능

1. **즉시 알림 보내기**
   - 로컬 푸시 알림을 즉시 전송
   - 테스트용으로 유용

2. **예약 알림**
   - 특정 시간(초) 후에 알림 전송
   - 지연된 알림 테스트에 유용

3. **DB 변경 시뮬레이션**
   - Supabase 실시간 구독을 시뮬레이션
   - 운영자가 메시지를 보내는 시나리오 테스트

## 🏗️ 아키텍처

```
┌─────────────┐
│   앱(클라이언트)   │
│  - 푸시 토큰 등록  │
│  - 알림 수신      │
└───────┬─────┘
        │
        ↓
┌─────────────┐
│ Supabase DB  │
│ (Mock/Real)  │
│  - 실시간 구독  │
└───────┬─────┘
        │
        ↓
┌─────────────┐
│  백엔드 서버    │
│ - 이벤트 감지  │
│ - 푸시 전송    │
└───────┬─────┘
        │
        ↓
┌─────────────┐
│   FCM/APNs   │
│ - 실제 푸시 전달│
└─────────────┘
```

## 📁 파일 구조

```
src/
├── lib/
│   ├── notifications.ts      # 푸시 알림 핵심 로직
│   └── supabase-mock.ts      # Supabase Mock 구현
├── hooks/
│   └── useNotifications.ts   # 알림 관리 커스텀 훅
└── app/
    └── (tabs)/
        └── settings/
            └── index.tsx      # 테스트 UI
```

## 🔧 실제 Supabase 연결하기

### 1. Supabase 클라이언트 설치
```bash
npm install @supabase/supabase-js
```

### 2. 환경 변수 설정
`.env` 파일 생성:
```
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 실제 클라이언트로 교체
`src/lib/supabase-mock.ts` 대신 실제 Supabase 클라이언트 사용:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

// 실시간 구독
supabase
  .channel('notifications')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'notifications' },
    (payload) => {
      sendLocalNotification(
        payload.new.title,
        payload.new.body
      );
    }
  )
  .subscribe();
```

## 💡 사용 시나리오

### 시나리오 1: 운영자가 공지사항 발송
```typescript
// 백엔드 또는 Supabase Function에서
await supabase
  .from('notifications')
  .insert({
    title: '긴급 공지',
    body: '서비스 점검이 예정되어 있습니다.',
    user_id: 'target-user-id'
  });

// → 해당 유저의 앱에 자동으로 푸시 알림 전송
```

### 시나리오 2: 새 메시지 도착
```typescript
// 채팅 메시지가 DB에 추가될 때
supabase
  .channel('messages')
  .on('postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    async (payload) => {
      // 수신자의 푸시 토큰 가져오기
      const { data: user } = await supabase
        .from('users')
        .select('push_token')
        .eq('id', payload.new.recipient_id)
        .single();
      
      // FCM/APNs로 푸시 전송
      await sendPushNotification(user.push_token, {
        title: '새 메시지',
        body: payload.new.content
      });
    }
  )
  .subscribe();
```

## 📱 테스트 방법

1. **Settings 탭으로 이동**
2. **Push Notifications 토글 활성화**
3. **"푸시 알림 테스트" 섹션에서 버튼 클릭**:
   - "즉시 알림 보내기": 바로 알림 수신
   - "5초 후 알림 예약": 5초 후 알림 수신
   - "DB 변경 시뮬레이션": Supabase 이벤트 시뮬레이션

## 🔐 보안 고려사항

1. **푸시 토큰 저장**
   - 사용자의 푸시 토큰을 안전하게 백엔드 DB에 저장
   - 로그아웃 시 토큰 삭제

2. **권한 관리**
   - 민감한 알림은 적절한 권한 체크 후 전송
   - RLS(Row Level Security) 정책 활용

3. **개인정보**
   - 알림 내용에 민감한 정보 포함 지양
   - 필요시 암호화 고려

## 📚 추가 리소스

- [Expo Notifications 공식 문서](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Supabase Realtime 가이드](https://supabase.com/docs/guides/realtime)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

## ❓ 문제 해결

### 알림이 오지 않을 때
1. 권한이 허용되어 있는지 확인
2. 앱이 포그라운드에 있는지 확인 (백그라운드에서는 다르게 동작)
3. 실제 기기에서 테스트 (시뮬레이터는 제한적)

### 토큰이 undefined일 때
1. `expo-device`가 설치되어 있는지 확인
2. 실제 기기 또는 네이티브 빌드에서 실행
3. 권한이 거부되지 않았는지 확인

## 🚀 다음 단계

- [ ] 실제 Supabase 프로젝트 생성 및 연결
- [ ] 백엔드에 푸시 토큰 저장 기능 구현
- [ ] FCM/APNs 설정 및 연동
- [ ] 알림 히스토리 UI 구현
- [ ] 알림 카테고리 및 액션 추가
