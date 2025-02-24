<template>
    <div class="device_status">
        <div class="device_operation_bar">
            <div class="devInput">
                <el-input v-model="input" style="width: 400px ;height: 40px;" placeholder="Please input" />
                <a href="#" class="searchBtn">查询</a>
            </div>
            <div class="devTable">
                <el-table :data="tableData" style="width: 100%;height: 100%;">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </div>
        </div>
        <div class="device_status_content">
            <div class="content">
                <span>设备ID:</span>
                <span>设备名称:</span>
                <span>设备位置:</span>
                <span>设备状态:</span>
                <span>设备管理员:</span>
                <span>设备日志:</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const input = ref('')


const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

</script>
<style lang="less" scoped>
@search-btn-height: 40px;

.device_status {
    width: 100%;
    height: 100%;
    display: flex;

    .device_operation_bar {
        width: 40%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;

        .devInput {
            height: auto;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            column-gap: 10px;

            .searchBtn {
                background-color: #027efb;
                width: 100px;
                height: @search-btn-height;
                text-align: center;
                font-size: 14px;
                text-decoration: none;
                line-height: @search-btn-height;
                border-radius: 20px;
                color: #e9e9e9
            }
        }

        .devTable {
            width: 100%;
            height: 95%
        }
    }

    .device_status_content {
        width: 50%;
        /* 使用百分比宽度 */
        height: auto;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        position: relative;

        .content {
            width: 100%;
            height: 100%;
            position: absolute;
            transform: translateX(100px);
            border: red 1px solid;
            display: flex;
            align-items: start;
            flex-direction: column;

            span {
                margin: 30px;
                font-size: 18px;
                font-weight: 20px;
            }
        }
    }
}

@media (max-width: 768px) {
    .device_status {
        flex-direction: column;
    }

    .device_operation_bar {
        width: 100%;
    }

    .devInput {
        flex-direction: column;
        align-items: flex-start;
        row-gap: 10px;
    }

    .searchBtn {
        margin-top: 10px;
    }
}
</style>
