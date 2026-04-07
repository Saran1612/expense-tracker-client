<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  xAxis: {
    type: Array,
    default: () => []
  },
  height: {
    type: [String, Number],
    default: '400px'
  },
  showArea: {
    type: Boolean,
    default: false
  },
  seriesName: {
    type: String,
    default: 'Spending'
  }
})

const chartRef = ref(null)
let chartInstance = null

// Get CSS variable value
const getCSSVariable = (variableName) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim()
}

const primaryColor = computed(() => getCSSVariable('--color-primary'))

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  // const defaultXAxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // const defaultData = [1200, 1320, 1010, 1340, 1290, 1330, 1320, 1400, 1350, 1234, 1450, 1500]
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const param = params[0]
        return `${param.name}<br/>${param.seriesName}: $${param.value}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xAxis.length > 0 ? props.xAxis : [],
      axisLine: {
        lineStyle: {
          color: '#E5E7EB'
        }
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#E5E7EB'
        }
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 12,
        formatter: (value) => `$${value}`
      },
      splitLine: {
        lineStyle: {
          color: '#F3F4F6'
        }
      }
    },
    series: [
      {
        name: props.seriesName,
        type: 'line',
        smooth: true,
        data: props.data.length > 0 ? props.data : [],
        itemStyle: {
          color: primaryColor.value
        },
        ...(props.showArea ? {
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: primaryColor.value },
                { offset: 1, color: primaryColor.value }
              ]
            }
          }
        } : {})
      }
    ]
  }
  
  chartInstance.setOption(option)
}

const updateChart = () => {
  if (!chartInstance) return
  
  const option = {
    xAxis: {
      data: props.xAxis.length > 0 ? props.xAxis : []
    },
    series: [{
      data: props.data.length > 0 ? props.data : []
    }]
  }
  
  chartInstance.setOption(option)
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  })
})

watch(() => [props.data, props.xAxis], () => {
  updateChart()
}, { deep: true })
</script>

<template>
  <div ref="chartRef" class="chart-container" :style="{ height: typeof height === 'number' ? `${height}px` : height }"></div>
</template>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  min-height: 300px;
}
</style>

