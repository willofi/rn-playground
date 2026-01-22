import { useColorScheme } from '@/lib/color-scheme';
import React from 'react';
import { Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

// 웹 환경에서는 차트 너비를 제한
const getChartWidth = () => {
  if (Platform.OS === 'web') {
    // 웹에서는 최대 600px로 제한 (모바일과 유사한 크기)
    return Math.min(screenWidth, 600);
  }
  return screenWidth;
};

const chartWidth = getChartWidth();

// 파이 차트 크기 계산
const getPieChartSize = () => {
  if (Platform.OS === 'web') {
    // 웹: 차트 너비의 70% (여백 고려)
    return chartWidth * 0.7;
  }
  // 모바일: 화면 너비의 90% (더 크게)
  return screenWidth * 0.9;
};

// 커스텀 파이 차트 컴포넌트
interface PieSlice {
  name: string;
  value: number;
  color: string;
}

interface CustomPieChartProps {
  data: PieSlice[];
  size: number;
  formatValue: (value: number) => string;
  formatPercentage: (percentage: number) => string;
  isDark: boolean;
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  size,
  formatValue,
  formatPercentage,
  isDark,
}) => {
  // 더 큰 차트를 위한 설정
  const padding = 40;
  const chartSize = size - padding * 2;
  const radius = chartSize / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // 플랫폼별 폰트 크기
  const isWeb = Platform.OS === 'web';
  const categoryFontSize = isWeb ? '14' : '11';
  const percentageFontSize = isWeb ? '16' : '13';
  const amountFontSize = isWeb ? '12' : '10';
  const centerLabelFontSize = isWeb ? '13' : '11';
  const centerValueFontSize = isWeb ? '18' : '15';

  // 각도 계산
  let currentAngle = -Math.PI / 2; // 12시 방향부터 시작
  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    const middleAngle = currentAngle + angle / 2;

    currentAngle = endAngle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
      middleAngle,
    };
  });

  // SVG Path 생성
  const createArc = (startAngle: number, endAngle: number) => {
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <Svg width={size} height={size + 20}>
      <G>
        {/* 파이 슬라이스 */}
        {slices.map((slice, index) => (
          <Path
            key={`slice-${index}`}
            d={createArc(slice.startAngle, slice.endAngle)}
            fill={slice.color}
            stroke={isDark ? '#242830' : '#fff'}
            strokeWidth={3}
          />
        ))}

        {/* 각 슬라이스 위에 레이블 직접 표시 */}
        {slices.map((slice, index) => {
          const angle = slice.middleAngle;

          // 레이블을 파이 슬라이스 위에 배치 (radius의 70% 지점)
          const labelRadius = radius * 0.7;
          const labelX = cx + labelRadius * Math.cos(angle);
          const labelY = cy + labelRadius * Math.sin(angle);

          // 미디엄-다크 그레이 (중간톤)
          const textColor = '#4B5563';

          // 퍼센티지가 작으면 텍스트 표시 안함 (가독성 위해)
          if (slice.percentage < 8) {
            return null;
          }

          return (
            <G key={`label-${index}`}>
              {/* 카테고리명 */}
              <SvgText
                x={labelX}
                y={labelY - 12}
                fontSize={categoryFontSize}
                fontWeight="700"
                fill={textColor}
                textAnchor="middle">
                {slice.name}
              </SvgText>

              {/* 퍼센티지 */}
              <SvgText
                x={labelX}
                y={labelY + 3}
                fontSize={percentageFontSize}
                fontWeight="700"
                fill={textColor}
                textAnchor="middle">
                {formatPercentage(slice.percentage)}
              </SvgText>

              {/* 금액 */}
              <SvgText
                x={labelX}
                y={labelY + 18}
                fontSize={amountFontSize}
                fill={textColor}
                textAnchor="middle">
                {formatValue(slice.value)}
              </SvgText>
            </G>
          );
        })}

        {/* 중앙 원 (배경) - 작게 */}
        <Circle cx={cx} cy={cy} r={radius * 0.3} fill={isDark ? '#1a1d23' : '#fff'} />

        {/* 중앙 텍스트 */}
        <SvgText
          x={cx}
          y={cy - 8}
          fontSize={centerLabelFontSize}
          fill={isDark ? '#9ca3af' : '#999'}
          textAnchor="middle">
          총 지출
        </SvgText>
        <SvgText
          x={cx}
          y={cy + 10}
          fontSize={centerValueFontSize}
          fontWeight="700"
          fill={isDark ? '#fff' : '#1a1a1a'}
          textAnchor="middle">
          {formatValue(total)}
        </SvgText>
      </G>
    </Svg>
  );
};

export default function StatsScreen() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  // 1년 간의 금액 데이터 (월별)
  const monthlyData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        data: [450, 520, 480, 630, 580, 720, 680, 590, 710, 650, 780, 820],
      },
    ],
  };

  // 이번 달 사용 비중 데이터 - 모던한 파스텔톤
  const categoryData: PieSlice[] = [
    { name: '식비', value: 280000, color: '#FF9AA2' }, // 소프트 코랄 핑크
    { name: '교통', value: 150000, color: '#B5EAD7' }, // 민트 그린
    { name: '쇼핑', value: 200000, color: '#FFD97D' }, // 소프트 골드
    { name: '문화', value: 120000, color: '#C7CEEA' }, // 라벤더 블루
    { name: '기타', value: 70000, color: '#E2A0FF' }, // 소프트 퍼플
  ];

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

  // 숫자에 콤마 추가
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatCurrency = (amount: number) => {
    return `${formatNumber(amount)}원`;
  };

  const formatCurrencyShort = (amount: number) => {
    return `${formatNumber(Math.floor(amount / 10000))}만원`;
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const chartConfig = {
    backgroundColor: isDark ? '#242830' : '#ffffff',
    backgroundGradientFrom: isDark ? '#242830' : '#ffffff',
    backgroundGradientTo: isDark ? '#242830' : '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 118, 117, ${opacity})`, // 코랄 핑크
    labelColor: (opacity = 1) =>
      isDark ? `rgba(200, 200, 200, ${opacity})` : `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#FF7675', // 코랄 핑크
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: isDark ? '#3a3f4b' : '#e0e0e0',
      strokeWidth: 1,
    },
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1a1d23' : '#F5F7FA',
    },
    scrollView: {
      flex: 1,
    },
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
    card: {
      backgroundColor: isDark ? '#242830' : '#fff',
      marginTop: 12,
      paddingVertical: 20,
      // 웹 환경에서 최대 너비 제한 및 중앙 정렬
      ...(Platform.OS === 'web' && {
        maxWidth: 600,
        marginHorizontal: 'auto' as any,
        width: '100%',
      }),
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#fff' : '#1a1a1a',
    },
    cardSubtitle: {
      fontSize: 13,
      color: isDark ? '#9ca3af' : '#999',
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
      marginLeft: 10,
    },
    statsRow: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingTop: 20,
      justifyContent: 'space-around',
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statLabel: {
      fontSize: 13,
      color: isDark ? '#9ca3af' : '#999',
      marginBottom: 4,
    },
    statValue: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#fff' : '#1a1a1a',
    },
    statDivider: {
      width: 1,
      backgroundColor: isDark ? '#3a3f4b' : '#e0e0e0',
      marginHorizontal: 10,
    },
    pieChartWrapper: {
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 10,
    },
    metricsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
    },
    metricCard: {
      width: '50%',
      padding: 10,
    },
    metricLabel: {
      fontSize: 13,
      color: isDark ? '#9ca3af' : '#999',
      marginBottom: 8,
    },
    metricValue: {
      fontSize: 20,
      fontWeight: '700',
      color: isDark ? '#fff' : '#1a1a1a',
      marginBottom: 4,
    },
    metricChange: {
      fontSize: 13,
      color: '#FF6B6B',
    },
    positive: {
      color: '#4ECDC4',
    },
    bottomPadding: {
      height: 20,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* 헤더 */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Statistics</Text>
        <Text style={styles.headerSubtitle}>Your spending analysis</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 월별 지출 추이 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>연간 지출 추이</Text>
            <Text style={styles.cardSubtitle}>최근 12개월 (단위: 만원)</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={monthlyData}
              width={chartWidth * 1.8}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withDots={true}
              withInnerLines={true}
              withOuterLines={true}
              withVerticalLines={false}
              withHorizontalLines={true}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              fromZero={false}
              segments={4}
            />
          </ScrollView>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>평균</Text>
              <Text style={styles.statValue}>{formatNumber(630000)}원</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>최고</Text>
              <Text style={styles.statValue}>{formatNumber(820000)}원</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>최저</Text>
              <Text style={styles.statValue}>{formatNumber(450000)}원</Text>
            </View>
          </View>
        </View>

        {/* 이번 달 카테고리별 지출 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>이번 달 지출 비중</Text>
            <Text style={styles.cardSubtitle}>총 {formatCurrency(totalAmount)}</Text>
          </View>

          <View style={styles.pieChartWrapper}>
            <CustomPieChart
              data={categoryData}
              size={getPieChartSize()}
              formatValue={formatCurrencyShort}
              formatPercentage={formatPercentage}
              isDark={isDark}
            />
          </View>
        </View>

        {/* 주요 지표 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>주요 지표</Text>
            <Text style={styles.cardSubtitle}>이번 달 기준</Text>
          </View>

          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>일평균 지출</Text>
              <Text style={styles.metricValue}>{formatNumber(27333)}원</Text>
              <Text style={styles.metricChange}>↑ 5.2%</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>예산 대비</Text>
              <Text style={styles.metricValue}>82%</Text>
              <Text style={[styles.metricChange, styles.positive]}>양호</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>최다 지출일</Text>
              <Text style={styles.metricValue}>금요일</Text>
              <Text style={styles.metricChange}>평균 {formatNumber(45000)}원</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>거래 건수</Text>
              <Text style={styles.metricValue}>156건</Text>
              <Text style={styles.metricChange}>↑ 12건</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}
