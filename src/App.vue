<template>
  <div id="app">
    <div id="nav">
      <Menu></Menu>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Menu from './components/Menu.vue';

export default {
  components: {
    Menu,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

#nav {
  padding: 0.5rem 0rem;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media all and (min-width: 1280px) {
    #app {
      padding: 0rem 10rem;
    }
}

@media all and (min-width: 760px) and (max-width: 1280px) {
    #app {
      padding: 0rem 3rem;
    }
}

@media all and (max-width: 760px) {
    #app {
      padding: 0rem 0rem;
    }
}
</style>
