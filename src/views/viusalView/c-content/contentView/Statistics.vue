<template>
    <div class="statistics">
        <div class="statistics_box">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="98500">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    Daily active users
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day"
                                        placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>than yesterday</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="98500">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    Daily active users
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day"
                                        placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>than yesterday</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="98500">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    Daily active users
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day"
                                        placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>than yesterday</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="statistic-card">
                        <el-statistic :value="98500">
                            <template #title>
                                <div style="display: inline-flex; align-items: center">
                                    Daily active users
                                    <el-tooltip effect="dark"
                                        content="Number of users who logged into the product in one day"
                                        placement="top">
                                        <el-icon style="margin-left: 4px" :size="12">
                                            <Warning />
                                        </el-icon>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-statistic>
                        <div class="statistic-footer">
                            <div class="footer-item">
                                <span>than yesterday</span>
                                <span class="green">
                                    24%
                                    <el-icon>
                                        <CaretTop />
                                    </el-icon>
                                </span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="chart_box">
            <div ref="chartBoxChild1" style="width: 600px; height: 400px;" class="chartBoxChild1"></div>
        </div>

        <div class="table_box">统计表在这里</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartBoxChild1 = ref(null);
let chartInstance: echarts.ECharts

onMounted(() => {
    chartInstance = echarts.init(chartBoxChild1.value);
    const option = {
        // 这里是ECharts的配置项，可以根据需要绘制不同类型的图表
        title: {
            text: '设备报警数'
        },
        tooltip: {},
        xAxis: {
            data: ["2024年10月", "2024年11月", "2024年12月", "2025年1月", "2025年2月"]
        },
        yAxis: {},
        series: [{
            name: '报警数',
            type: 'line', // 这里可以是'line'、'bar'、'pie'等，根据图表类型选择
            data: [120, 200, 150, 80, 70]
        }]
    };
    chartInstance.setOption(option);
});

// 销毁ECharts实例
onUnmounted(() => {
    if (chartInstance != null && chartInstance.dispose) {
        chartInstance.dispose();
    }
})

</script>

<style lang="less" scoped>
.statistics {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-around;
}

.chart_box {
    width: 100%;
}

.el-row {
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: start;
}

.el-col {
    text-align: center;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: #f1f1f1;
}

.statistic-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>
