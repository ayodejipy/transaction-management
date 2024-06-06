<script setup lang="ts">
const options = reactive({
    chart: {
        id: 'analytics-example',
        toolbar: {
            show: false,
        },
    },
    xaxis: {
        title: {
            text: 'Month',
        },
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
    },
    yaxis: {
        title: {
            text: 'Amount',
        },
    },
    fill: {
        colors: ['#17B26A', '#E91E63', '#9C27B0'],
    },
    plotOptions: {
        bar: {
            borderRadius: 7,
            borderRadiusApplication: 'end'
        },
    },
    dataLabels: { enabled: false },
    tooltip: {
        y: {
            formatter: function (val: number) {
                return '$' + val
            },
        },
    },
})

const series = ref([
    {
        name: 'Transactions',
        data: [
            '2436',
            '14855',
            '19563',
            '7456',
            '2173',
            '5801',
            '6297',
            '16742',
            '14282',
            '2341',
            '12983',
            '8775',
        ],
    },
])
</script>

<template>
    <apexchart
        type="bar"
        height="350"
        :options="options"
        :series="series"
    ></apexchart>
</template>
