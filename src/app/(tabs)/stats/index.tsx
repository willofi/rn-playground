import React from 'react';
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function StatsScreen() {
  // 1년 간의 금액 데이터 (월별)
  const monthlyData = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    datasets: [
      {
        data: [450, 520, 480, 630, 580, 720, 680, 590, 710, 650, 780, 820],
      },
    ],
  };

  // 이번 달 사용 비중 데이터
  const categoryData = [
    {
      name: '식비',
      population: 280000,
      color: '#FF6B6B',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: '교통',
      population: 150000,
      color: '#4ECDC4',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: '쇼핑',
      population: 200000,
      color: '#FFE66D',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: '문화',
      population: 120000,
      color: '#A8E6CF',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: '기타',
      population: 70000,
      color: '#B4A7D6',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  const totalAmount = categoryData.reduce((sum, item) => sum + item.population, 0);

  const formatCurrency = (amount: number) => {
    return `${(amount / 10000).toFixed(0)}만원`;
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4A90E2',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e0e0e0',
      strokeWidth: 1,
    },
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>통계</Text>
          <Text style={styles.headerSubtitle}>나의 소비 분석</Text>
        </View>

        {/* 월별 지출 추이 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>연간 지출 추이</Text>
            <Text style={styles.cardSubtitle}>최근 12개월 (단위: 만원)</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <LineChart
              data={monthlyData}
              width={screenWidth * 1.8}
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
              <Text style={styles.statValue}>63만원</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>최고</Text>
              <Text style={styles.statValue}>82만원</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>최저</Text>
              <Text style={styles.statValue}>45만원</Text>
            </View>
          </View>
        </View>

        {/* 이번 달 카테고리별 지출 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>이번 달 지출 비중</Text>
            <Text style={styles.cardSubtitle}>총 {formatCurrency(totalAmount)}</Text>
          </View>

          <View style={styles.pieChartContainer}>
            <PieChart
              data={categoryData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          <View style={styles.legendContainer}>
            {categoryData.map((item, index) => {
              const percentage = ((item.population / totalAmount) * 100).toFixed(1);
              return (
                <View key={index} style={styles.legendItem}>
                  <View style={styles.legendLeft}>
                    <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                    <Text style={styles.legendName}>{item.name}</Text>
                  </View>
                  <View style={styles.legendRight}>
                    <Text style={styles.legendAmount}>{formatCurrency(item.population)}</Text>
                    <Text style={styles.legendPercentage}>{percentage}%</Text>
                  </View>
                </View>
              );
            })}
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
              <Text style={styles.metricValue}>27,333원</Text>
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
              <Text style={styles.metricChange}>평균 45,000원</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: 12,
    paddingVertical: 20,
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
    color: '#1a1a1a',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#999',
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
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  pieChartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  legendContainer: {
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendName: {
    fontSize: 15,
    color: '#333',
  },
  legendRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendAmount: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 8,
  },
  legendPercentage: {
    fontSize: 13,
    color: '#999',
    minWidth: 45,
    textAlign: 'right',
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
    color: '#999',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
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
