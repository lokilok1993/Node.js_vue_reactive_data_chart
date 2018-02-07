<script>
	import formatPrice from '../lib/formatPrice'
	import { Line, mixins } from 'vue-chartjs'
	const { reactiveProp } = mixins

	export default {
		data: function (){
			return {
				options: {
          scales: {
          	 yAxes: [{
			        id: 'A',
			        type: 'linear',
			        position: 'left',
			        ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return formatPrice( value ) ;
                }
              }
			      }, {
			        id: 'B',
			        type: 'linear',
			        position: 'right',
			      }]
          }
        }
			}
		},
	  extends: Line,
	  mixins: [reactiveProp],
	  mounted () {
	    // this.chartData is created in the mixin.
	    // If you want to pass options please create a local options object
	    this.renderChart(this.chartData, this.options)
	  }
	}
</script>
