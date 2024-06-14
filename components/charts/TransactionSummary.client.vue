<script setup lang="ts">
const props = defineProps<{
    series: number[]
}>()

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
                    },
                    total: {
                        showAlways: true,
                        show: true,
                        formatter: function (w) {
                            const totalSum = w.globals.seriesTotals.reduce(
                                (a: number, b: number) => {
                                    return a + b
                                },
                                0
                            )

                            return totalSum + '%'
                        },
                    },
                },
            },
        },
    },
    fill: {
        colors: ['#17B26A', '#231F20'],
    },
    dataLabels: {
        enabled: false,
    },
    legend: { show: false },
})

const series = computed<number[]>(() => props.series)
</script>

<template>
    <div>
        <apexchart type="donut" :options="options" :series="series"/>
    </div>
</template>
