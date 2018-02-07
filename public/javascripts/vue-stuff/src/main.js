import Vue from 'vue'
import App from './App.vue'
import Filter from './Filter.vue'
import Flatpickr from './filterComponents/Flatpickr.vue'
import Stats from './Stats.vue'
import Report from './statsComponents/Report.vue'
import Chart from './statsComponents/Chart.vue'
import LineChart from './statsComponents/LineChart.vue'
import './main.sass'

Vue.component('flatpickr', Flatpickr);
Vue.component('app-report', Report);
Vue.component('app-filter', Filter);
Vue.component('app-stats', Stats);
Vue.component('app-chart', Chart);
Vue.component('line-chart', LineChart);

new Vue({
  el: '#app',
  render: h => h(App)
})
