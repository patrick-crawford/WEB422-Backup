<template>
  <div>
    <h3>Table {{ tableNumber }}</h3>

    <ul class="employee-list">
      <EmployeeInfo
        v-for="employee in table"
        :key="`${employee._id}`"
        :employee="employee">
      </EmployeeInfo>
    </ul>
  </div>
</template>

<style scoped>
  .employee-list {
    border: solid 1px black;
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: #201c29;
    color: #c5c5cc;
    font-size: 1.1em;
  }

  h3 {
    text-align: center;
    margin: 3px;
  }
</style>

<script>
import EmployeeInfo from './EmployeeInfo.vue';

export default {
  name: 'TableInfo',
  props: ['table', 'tableNumber'],
  components: {
    EmployeeInfo
  }
}
</script>
