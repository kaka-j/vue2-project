<template>
    <div class="echarts">
        <!-- echarts图表 -->
        <div id="mian" ref="echatrsDemo"></div>
        <div id="mian-pie" ref="echatrsList"></div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { getSimpleDataAPI, getkDataAPI } from "@/api/plugins";
export default {
    name: "EchartsView",
    data() {
        return {
            options: {
                title: {
                    text: "商品数据图",
                },
                tooltip: {},
                xAxis: {
                    data: [],
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        // type: "bar",//柱状图
                        type: 'line', //折线图
                        // type:'pie',//饼状图
                        data: [],
                    },
                    {
                        name: "原价",
                        type: 'line', 
                        data: [],
                    },
                    {
                        name: "现价",
                        type: 'line', 
                        data: [],
                    },
                    {
                        name: "库存",
                        type: 'line', 
                        data: [],
                    },
                ],
            },
            optionsPie: {
                color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3'],
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,

                },
                legend: {
                    type: "scroll",
                    orient: 'vertical',
                    left: '10%',
                    align: 'left',
                    top: 'middle',
                    textStyle: {
                        color: '#8C8C8C'
                    },
                    height: 180
                },
                series: [
                    {
                        name:'总销量',
                        type: 'pie',
                        radius: [0, 150],


                        data: [

                        ]
                    }
                ]
            },
            myEchatrs: null,
        };
    },
    methods: {
        initEcharts() {
            //初始化echatrs实列
            this.myEchatrs = echarts.init(this.$refs.echatrsDemo);

            //绘制图表
            this.myEchatrs.setOption(this.options)
        },
        initEchartsPie() {
            //初始化echatrs实列
            this.myEchatrs = echarts.init(this.$refs.echatrsList);

            //绘制图表
            this.myEchatrs.setOption(this.optionsPie)
        },
        getSimpleData() {
            getSimpleDataAPI().then(res => {
                res.data.forEach(item => {
                    // this.optionsPie.xAxis.data.push( item.x) ;
                    // this.optionsPie.series[0].data.name.push(item.x);
                    this.optionsPie.series[0].data.push({ value: item.val, name: item.x });
                });
                this.initEchartsPie();
            }).catch(err => {
                this.$message.error(err.message)
            })
        },
        getkData() {
            getkDataAPI().then(res => {
                let { data } = res;
                this.options.xAxis.data = data.x;
                data.val.forEach(item => {
                    this.options.series[0].data.push(item[0]);
                    this.options.series[1].data.push(item[1]);
                    this.options.series[2].data.push(item[2]);
                    this.options.series[3].data.push(item[3]);
                });
                this.initEcharts();
            }).catch(err => {
                this.$message.error(err.message)
            })
        }
    },
    mounted() {
        this.initEchartsPie();
        this.initEcharts();
        this.getSimpleData();
        this.getkData()
    },
};
</script>

<style>
.echarts {
    display: flex;
}

#mian {
    width: 600px;
    height: 400px;
}

#mian-pie {
    width: 860px;
    height: 400px;
}
</style>