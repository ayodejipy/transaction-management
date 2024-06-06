<script setup lang="ts">
const options = reactive({
    chart: {
        id: 'transaction-summary',
    },
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                labels: {
                    show: true,
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        fontSize: '24px',
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600,
                        color: '#101828',
                        offsetY: 10,
                        formatter: function (w: number) {
                            console.log({ w })
                            return w + '%'
                        },
                    },
                    total: {
                        showAlways: true,
                        show: true,
                    },
                },
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    legend: { show: false },
})

const series = ref([70, 30])
</script>

<template>
    <div>
        <apexchart type="donut" :options="options" :series="series"></apexchart>
    </div>
</template>
