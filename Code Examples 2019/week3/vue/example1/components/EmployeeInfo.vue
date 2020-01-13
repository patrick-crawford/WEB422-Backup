<template>
  <li :title="`Employeed for ${employee.yearsWorked} years`">
    {{ employee.FirstName }} {{ employee.LastName }}
  </li>
</template>

<script>
  export default {
    name: 'EmployeeInfo',
    props: ['employee']
  };
</script>

<style scoped>
  li {
    list-style-type: none;
  }
</style>
