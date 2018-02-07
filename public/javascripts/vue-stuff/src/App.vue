<template>
  <div id="app">
  	<div class="horizontally">
  		<app-filter @filterChanged="collectData($event)"></app-filter>
  	</div>
		<div class="horizontally data" v-if="id == 'haveData'">
			<app-stats :reportData="reportData" :chartData="chartData" ></app-stats>
		</div>
    <div class="horizontally message" v-if="id == 'haveUser'">
      <h2>Для этого пользователя нет данных на выбранный период</h2>
    </div>
    <div class="horizontally message" v-if="id == 0">
      <h2>Введите id пользователя</h2>
    </div>
  </div>
</template>




<script>
// Библиотека для XMLHttpRequest
import axios from 'axios';

// Корневой компонент
export default {
  data () {
    return {

      // id партнёра и дата
      id: '',

      // данные для сводки
    	reportData: {
        regs: 0,
        link_visitors: 0,
        sum: 0
      },

      // данные для графика
      chartData: {
        fromDate: null,
        toDate: null,
        profitInDays: {},
        eventsInDays: {}
      }

    }
  },
  methods: {


    // Метод для сбора данных
  	collectData(e){

      
      // Установка периода
      if(e.date == null){
        var fromDate =  new Date(Date.now() - (1000*60*60*24*30)).toISOString().substring(0, 10);
        var toDate = new Date(Date.now()).toISOString().substring(0, 10);
      }else{
        var arr = e.date.split(' to ');
        var fromDate = arr[0];
        var toDate = arr[1];
      }

      this.chartData.fromDate = fromDate
      this.chartData.toDate = toDate

      
      // Проверка пользователя по id
      axios.get('http://localhost:8080/check/'+e.id)
      .then(response => {
        console.log(response)
        if(response.data.length)
          this.id = 'haveUser'
        else
          this.id = 0
      })
      .catch(err => {
        console.log(err);
      })


      // Проверка данных пользователя на данный приод
      axios.get('http://localhost:8080/checkdata/'+e.id+'/'+fromDate+'/'+ toDate)
      .then(response => {
        console.log(response)
        if(response.data.length)
          this.id = 'haveData'
      })
      .catch(err => {
        console.log(err);
      })



      // Посылаем запросы только в случае валидного id
      if(e.id != 0 && !isNaN(e.id * 1) ){
        
        // Запрос количества регистраций
        axios.get('http://localhost:8080/getEvent/'+e.id+'/REGISTRATION/'+fromDate+'/'+ toDate)
        .then(response => {
          this.reportData.regs = response.data[0]['count(event)']
        })
        .catch(err => {
          console.log(err);
        })

        // запрос количества переходов
        axios.get('http://localhost:8080/getEvent/'+e.id+'/LINK_VISITOR/'+fromDate+'/'+ toDate)
        .then(response => {
          this.reportData.link_visitors = response.data[0]['count(event)']
        })
        .catch(err => {
          console.log(err);
        })

        // запрос суммы оплат
        axios.get('http://localhost:8080/sumEvent/' + e.id+ '/'+fromDate+'/'+ toDate)
        .then(response => {
          if(response.data[0]['sum(event_value)'] != null){
            this.reportData.sum = response.data[0]['sum(event_value)']
          }else{
            this.reportData.sum = 0;
          }
        })
        .catch(err => {
          console.log(err);
        })

        // Запрос данных ( Прибыль ) для графика 
        axios.get('http://localhost:8080/profit/'+ e.id+'/'+fromDate+'/'+ toDate)
        .then(res => {
          var chartDataObj = {};
          var toTimestamp = new Date(toDate).getTime()
          var countDays = ( toTimestamp - new Date(fromDate).getTime() ) / (1000*60*60*24)
          var dates = []
          for(var i = 0; i<countDays; i++){
            var d = new Date( toTimestamp - (1000*60*60*24)*i )
            dates.push(d);
            chartDataObj[d.getDate()] = 0
          };
          
          res.data.map( (ItemObject, index) =>{
            for( var i = 0; i<dates.length; i++ ){
              if(dates[i].toISOString().substring(0, 10) == new Date(ItemObject.date).toISOString().substring(0, 10) ){
                if(chartDataObj[dates[i].getDate()] != undefined){
                  chartDataObj[dates[i].getDate()] += ItemObject['sum(event_value)']
                }else{
                  chartDataObj[dates[i].getDate()] = ItemObject['sum(event_value)']
                }
              }
            }
          })
          this.chartData.profitInDays = chartDataObj;
        })
        .catch(err =>{
          console.log(err)
        })

        // Запрос данных ( События ) для графика 
        axios.get('http://localhost:8080/events/'+ e.id+'/'+fromDate+'/'+ toDate)
        .then(res => {
          var chartDataObj = {};
          var toTimestamp = new Date(toDate).getTime()
          var countDays = ( toTimestamp - new Date(fromDate).getTime() ) / (1000*60*60*24)
          var dates = []
          for(var i = 0; i<countDays; i++){
            var d = new Date( toTimestamp - (1000*60*60*24)*i )
            dates.push(d);
            chartDataObj[d.getDate()] = 0
          };
          res.data.map( (ItemObject, index) =>{
            for( var i = 0; i<dates.length; i++ ){
              if(dates[i].toISOString().substring(0, 10) == new Date(ItemObject.date).toISOString().substring(0, 10) ){
                if(chartDataObj[dates[i].getDate()] != undefined){
                  chartDataObj[dates[i].getDate()] += ItemObject['count(event)']
                }else{
                  chartDataObj[dates[i].getDate()] = ItemObject['count(event)']
                }
              }
            }
          })
          this.chartData.eventsInDays = chartDataObj;
        })
        .catch(err =>{
          console.log(err)
        })



      }

  	}
  }
}
</script>
