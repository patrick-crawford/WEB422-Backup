<template>
  <main>
    <h1>Seating Plan ({{ tables.length }} Tables)</h1>

    <!-- Optional settings we an tweak on the components -->
    <details>
      <summary>Options</summary>

      <fieldset>
        <label for="years">Minimum Years of Service</label>
        <input
          id="years"
          v-model="yearsOfService"
          type="number"
        >

        <label for="seats">Number of Seats</label>
        <input
          id="seats"
          v-model="seats"
          type="number"
        >
        
        <label for="shuffle">Randomize Tables</label>
        <input
          id="shuffle"
          v-model="shuffle"
          type="checkbox"
        >  
      </fieldset>
    </details>

    <!-- Our tables will get built here using components -->
    <div id="tables">
      <TableInfo
        v-for="(table, index) in tables"
        :key="`table-${index}`"
        :table="table"
        :table-number="index">
      </TableInfo>
    </div>

  </main>
</template>

<style scoped>
/* We'll style our tables div above as a grid of 4 columns */
#tables {
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}
</style>

<script>
import { filter, shuffle, chunk, map, pick } from 'lodash-es';
import moment from 'moment';
import TableInfo from './TableInfo.vue'

const teamsApiUrl = 'https://quiet-wave-16481.herokuapp.com';

export default {
  data: function() {
    return {
      // We'll download the employees below, start with an empty list
      employees: [],
      // 5 Seats per table
      seats: 5,
      // Shuffle people at tables?
      shuffle: true,
      // Years of Service
      yearsOfService: 8
    };
  },
  components: {
    TableInfo
  },
  computed: {
    // The `.tables` property will work like other data properties,
    // but be calculated based on `.employees`.
    tables: function() {
      return this.createTables();
    }
  },
  // When this component is done being created, load all Employees
  created() {
    this.getEmployees();
  },
  methods: {
    /**
     * Do a GET request to the Teams API to get our Employees
     * as JSON, and use this data to build a new array of
     * Employees, with only a subset of the data on the JSON.
     */
    getEmployees: function() {
      fetch(`${teamsApiUrl}/employees`)
        .then(response => response.json())
        .then(employees => {
          this.employees = map(employees, employee => {
            const modifiedEmployee = pick(employee, [
              '_id','FirstName', 'LastName', 'HireDate'
            ]);
            modifiedEmployee.yearsWorked = moment().diff(employee.HireDate, 'years');

            return modifiedEmployee;
          });
        });
    },
    /**
     * Filter the downloaded Employees according to how long they've
     * been with the company, shuffle them (if necessary), and group
     * into tables (i.e., arrays of arrays).
     */
    createTables: function() {
      // Build a new list of employees, who have been at the company for
      // the given period of time.
      let filtered = filter(this.employees, employee =>
        employee.yearsWorked >= this.yearsOfService);
      
      // If requested, shuffle the list of filtered employees
      if(this.shuffle) {
        filtered = shuffle(filtered);
      }

      // Break the list of filtered into tables of seats
      return chunk(filtered, this.seats);
    }
  }
}
</script>
