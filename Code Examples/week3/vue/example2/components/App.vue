<template>
  <div id="app">
    <h2>Project Timelines</h2>
    <Timeline :projects="projects"></Timeline>
  </div>
</template>

<style scoped>
  h2 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>

<script>
import Timeline from './Timeline.vue';

const teamsApiUrl = 'https://quiet-wave-16481.herokuapp.com';

export default {
  name: 'App',
  components: {
    Timeline
  },
  data: function() {
    return {
      projects: []
    };
  },
  created: function() {
    this.getProjects();
  },
  methods: {
    getProjects: function() {
      fetch(`${teamsApiUrl}/projects`)
        .then(res => res.json())
        .then(projects => {
          this.projects = projects.map(project => {
            // convert to an array of 3 items: [name, start, end]
            return [
              project.ProjectName,
              new Date(project.ProjectStartDate),
              new Date()
            ];
          })
        });
    }
  }
}
</script>
