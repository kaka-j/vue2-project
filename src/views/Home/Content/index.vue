<template>
  <div class="content">
    <span>echarts</span>
    <div style="width: auto; height: 400px" id="main"></div>
  </div>
</template>

<script>
// import * as echarts from 'echarts'
export default {
  name: "HomeContentView",
  data() {
    return {
        
    }
  },
  mounted() {
    this.echartsInit();
  },
//   methods: {
//     //初始化echarts
//     echartsInit() {
//       //柱形图
//       //因为初始化echarts 的时候，需要指定的容器 id='main'
//       echarts.init(document.getElementById("main")).setOption({
//         xAxis: {
//           type: "category",
//           data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         },
//         yAxis: {
//           type: "value",
//         },
//         series: [
//           {
//             data: [120, 200, 150, 80, 70, 110, 130],
//             type: "bar",
//             showBackground: true,
//             backgroundStyle: {
//               color: "rgba(220, 220, 220, 0.8)",
//             },
//           },
//         ],
//       });
//     },
//   },
};
</script>

<style>
</style>