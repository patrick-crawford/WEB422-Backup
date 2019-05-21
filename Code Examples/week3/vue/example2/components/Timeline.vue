<template>
  <div id="timeline"></div>
</template>

<style>
  #timeline {
    height: 100%;
  }
</style>

<script>
// Use a Google Chart Timeline to draw our projects via:
// https://www.npmjs.com/package/google-charts
import { GoogleCharts } from 'google-charts';

export default {
  name: 'Timeline',
  props: ['projects'],
  created() {
    // Give the browser a chance to set the height of our element (we depend on it)
    this.$nextTick(() => 
      GoogleCharts.load(this.drawChart, {
        'packages': ['timeline']
      })
    );
  },
  // When the component mounts, add a resize listener on the window
  mounted: function () {
    window.addEventListener('resize', this.drawChart)
  },
  // And remove this listener when the component gets destroyed
  beforeDestroy: function () {
    window.removeEventListener('resize', this.drawChart)
  },
  methods: {
    drawChart: function() {
      const container = this.$el;
      const chart = new GoogleCharts.api.visualization.Timeline(container);
      const dataTable = new GoogleCharts.api.visualization.DataTable();

      // Define our table layout
      dataTable.addColumn({ type: 'string', id: 'Project' });
      dataTable.addColumn({ type: 'date', id: 'Start' });
      dataTable.addColumn({ type: 'date', id: 'End' });

      // Use the projects we got via props
      dataTable.addRows(this.projects);

      // Clear any existing chart before we (re)draw
      chart.clearChart();

      // Draw the timeline
      chart.draw(dataTable);
    }
  }
}
</script>
