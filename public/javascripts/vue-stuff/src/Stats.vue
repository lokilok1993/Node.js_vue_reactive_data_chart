<template>
	<div>
		<div class="horizontally report" >
			<app-report cssClass="odd" title="Доход" :value="formatPrice(reportData.sum)"></app-report>
			<app-report cssClass="even" title="Регистрации" :value="reportData.regs"></app-report>
			<app-report cssClass="odd last" title="Переходы" :value="reportData.link_visitors"></app-report>
			<div class="dataNow" >{{chartData.fromDate}} - {{chartData.toDate}}</div>
		</div>
		<div class="horizontally" >
			<app-chart :chartData='chartData'></app-chart>
		</div>
	</div>

</template>

<script>
import formatPrice from './lib/formatPrice.js'
	export default{
		data(){
			return{

			}
  	},
		props:[
		'reportData',
		'chartData'
		],
		methods:{
			formatPrice: formatPrice
		}
  }
	
</script>
