<template>
  <div id="app">
    <div id="nav">
      <Menu></Menu>
    </div>
    <router-view class="container-fluid" />
    <div id="footer" class="bg-primary navbar-fixed-bottom">
      <span class="font-weight-normal">
        This is a demo app presented by <b>Tri Thong, Tran</b>
        <br />2020
      </span>
    </div>
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
  color: #33b474;
}

#nav a#title.router-link-exact-active {
  color: #ffffff;
}

#footer {
  height: 50px;
  margin-top: 20px;
  color: #ffffff;
  text-align: center;
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

.card-img-top {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}

.more-button-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
