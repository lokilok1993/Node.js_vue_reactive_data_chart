<template>
<div id="flatpickrBox">
	<div>
    <span class="calendarIcon" @click="clearDate"></span>
	</div>
	<div class="absoluteCalendar" >
		<flat-pickr v-model="date" :config="config" class="hidden" v-if="open" @on-value-update="setDate" ></flat-pickr>
	</div>
</div>
	

</template>

<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  
  export default {  
    
    data () {
      return {
        
        open: false,
        date: null,
        
        config: {
		      altFormat: "F j, Y",
		      altInput: true,
		      mode: 'range',
		      inline: true,
          maxDate: new Date(Date.now())
     		}

      }
    },
    methods:{
    	clearDate(){
    		this.open = !this.open
    		this.date = null;
    	},
    	setDate(selectedDates, dateStr, instance){
    		if(selectedDates.length > 1){
    			this.open = !this.open
    			this.$emit('passDate', dateStr)
    		};
    	}
    },
    components: {
      flatPickr
    }
  }
</script>



