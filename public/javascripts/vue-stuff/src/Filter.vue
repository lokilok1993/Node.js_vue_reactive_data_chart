<template>
 	<div id="filter">
    <input type="text" class="partner_id" v-model="partnerId" @input="updateId" placeholder="Введите id">
    <flatpickr @passDate="updateDate($event)" ></flatpickr>
  </div>
</template>


<script>

export default {
  data () {
    return {
      
      partnerId: '',
      
      filterData: {
        date: null,
        id: this.partnerId
      }
		};
	},
  methods: {

    updateId(e){
      this.filterData.id = e.target.value;
      this.$emit('filterChanged', this.filterData)
    },

    updateDate(e){
      this.filterData.date = e;
      this.$emit('filterChanged', this.filterData)
    }

  },
}
</script>


