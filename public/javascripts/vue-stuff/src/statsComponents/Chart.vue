<template>
  <div class="small">
    <line-chart :chart-data="datacollection" width="1000" height="500"></line-chart>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        datacollection: null,
        cartDataToWatch: this.chartData
      }
    },
    props: [
      'chartData'
    ],
    mounted () {
      this.fillData()
      //setTimeout(()=>{ console.log('hi'); this.drowNew(1) }, 4000)
    },
    watch: {
      cartDataToWatch: {
        handler: function (val, oldVal) { this.drowNew() },
        deep: true
      }
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.datesArr( this.chartData.fromDate, this.chartData.toDate ),
          datasets: [
            {
              label: 'Доход',
              yAxisID: 'A',
              backgroundColor: 'transparent',
              borderColor: 'red',
              data: Object.values(this.chartData.profitInDays)
            }, {
              label: 'Действия',
              yAxisID: 'B',
              backgroundColor: 'transparent',
              borderColor: 'green',
              data: Object.values(this.chartData.eventsInDays)
            }
          ]
        }
      },
      datesArr(from, to){
        var toTimestamp = new Date(to).getTime()
        var countDays = ( toTimestamp - new Date(from).getTime() ) / (1000*60*60*24)
        var dates = []
        for(var i = 0; i<countDays; i++){
          var d = new Date( toTimestamp - (1000*60*60*24)*i )
          dates.push(d.getDate());
        }
        return dates.reverse();
      },
      drowNew(){
        this.datacollection = {
          labels: this.datesArr( this.chartData.fromDate, this.chartData.toDate ),
          datasets: [
            {
              label: 'Доход',
              backgroundColor: 'transparent',
              borderColor: 'red',
              data: Object.values(this.chartData.profitInDays)
            }, {
              label: 'Действия',
              backgroundColor: 'transparent',
              borderColor: 'green',
              data: Object.values(this.chartData.eventsInDays)
            }
          ]
        }
      }

    },
  }
</script>