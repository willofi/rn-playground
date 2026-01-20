/**
 * Supabase 실시간 구독 시뮬레이션
 * 실제 Supabase 연결 전에 테스트할 수 있는 Mock 구현
 */

type SupabaseEvent = {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  data: any;
};

type SubscriptionCallback = (event: SupabaseEvent) => void;

class SupabaseMock {
  private subscriptions: Map<string, SubscriptionCallback[]> = new Map();
  private mockData: Map<string, any[]> = new Map();

  constructor() {
    // 초기 Mock 데이터
    this.mockData.set('messages', [
      { id: 1, text: '안녕하세요!', created_at: new Date().toISOString() },
    ]);
    
    this.mockData.set('notifications', [
      { id: 1, title: '환영합니다', body: '앱에 오신 것을 환영합니다!', created_at: new Date().toISOString() },
    ]);
  }

  /**
   * 실시간 구독 (Supabase의 subscribe와 유사)
   */
  subscribe(table: string, callback: SubscriptionCallback) {
    if (!this.subscriptions.has(table)) {
      this.subscriptions.set(table, []);
    }
    this.subscriptions.get(table)!.push(callback);

    console.log(`✅ ${table} 테이블 구독 시작`);

    // 구독 해제 함수 반환
    return {
      unsubscribe: () => {
        const callbacks = this.subscriptions.get(table);
        if (callbacks) {
          const index = callbacks.indexOf(callback);
          if (index > -1) {
            callbacks.splice(index, 1);
          }
        }
        console.log(`❌ ${table} 테이블 구독 해제`);
      },
    };
  }

  /**
   * 데이터 삽입 시뮬레이션 (테스트용)
   */
  async simulateInsert(table: string, data: any) {
    const event: SupabaseEvent = {
      type: 'INSERT',
      table,
      data,
    };

    // Mock 데이터에 추가
    if (!this.mockData.has(table)) {
      this.mockData.set(table, []);
    }
    this.mockData.get(table)!.push(data);

    // 구독자들에게 알림
    const callbacks = this.subscriptions.get(table);
    if (callbacks) {
      callbacks.forEach((callback) => callback(event));
    }

    console.log(`📝 ${table}에 데이터 추가:`, data);
  }

  /**
   * 데이터 업데이트 시뮬레이션 (테스트용)
   */
  async simulateUpdate(table: string, data: any) {
    const event: SupabaseEvent = {
      type: 'UPDATE',
      table,
      data,
    };

    // 구독자들에게 알림
    const callbacks = this.subscriptions.get(table);
    if (callbacks) {
      callbacks.forEach((callback) => callback(event));
    }

    console.log(`✏️ ${table} 데이터 업데이트:`, data);
  }

  /**
   * 현재 데이터 가져오기
   */
  getData(table: string) {
    return this.mockData.get(table) || [];
  }
}

// 싱글톤 인스턴스
export const supabaseMock = new SupabaseMock();

/**
 * 실제 Supabase 연결 시 사용할 설정 타입
 */
export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

/**
 * 실제 Supabase 클라이언트 생성 함수 (나중에 사용)
 */
export function createSupabaseClient(config: SupabaseConfig) {
  // 실제 구현 시:
  // import { createClient } from '@supabase/supabase-js'
  // return createClient(config.url, config.anonKey)
  
  console.log('⚠️ Mock 모드로 실행 중입니다. 실제 Supabase 연결을 원하면 설정이 필요합니다.');
  return null;
}
