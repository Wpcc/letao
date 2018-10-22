var myChart = echarts.init(document.getElementById('tableBar'));

 // 指定图表的配置项和数据
 var option = {
     title: {
         text: '2017年注册人数'
     },
     tooltip: {},
     legend: {
         data:['人数']
     },
     xAxis: {
         data: ["1月","2月","3月","4月","5月","6月"]
     },
     yAxis: {},
     series: [{
         name: '销量',
         type: 'bar',
         data: [1000, 2000, 3000, 4000]
     }]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
