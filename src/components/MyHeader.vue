<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        to="/"
      >
        <img src="../assets/images/navbar-brand.png"/>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li
            class="nav-item"
            v-for="link in links"
            :link="link"
            :key="link.key"
          >
            <router-link class="nav-link" :to="link.path">{{ link.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="p-5 text-center bg-image">
    <div class="mask">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="text-white">
          <h1>To-Dos</h1>
          <h2 class="mb-3">Arrange your day. Save time for important things!</h2>
          <my-button
            :colorClass="'light'"
            :outline="true"
            :anotherClasses="['btn-lg', 'call-to-action']"
            @click="$router.push('/todos')"
          >Create your ToDo list!</my-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var myNavbar = document.getElementsByTagName('nav');
window.onscroll = function () {
  "use strict";
  if (window.scrollY > 250) {
    myNavbar[0].classList.add("scrolled");
  } else {
    myNavbar[0].classList.remove("scrolled");
  }
};

export default {
  name: 'my-header',
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('../assets/images/header.jpg');
  height: 100vh;
}

.mask {
  padding-left: 1em;
  padding-right: 1em;
  background-color: rgba(150, 0, 150, 0.2);
}

nav.scrolled {
  background: rgba(230, 160,  228, 95%);
}

.navbar-brand img {
  height: 3em;
}

.router-link-active.router-link-exact-active:not(.navbar-brand) {
  background-color: rgba(255, 255, 255, 0.15);
}

.nav-link, .nav-link:visited {
  color: white !important;
}

.nav-link:hover, .nav-link:active {
  color: deeppink !important;
  text-shadow: 0px 0px 5px white;
}

.navbar-toggler i {
  font-size: 2em;
  color: mediumorchid;
}

h1, h2 {
  text-shadow: 0px 0px 10px black;
}

.call-to-action, .call-to-action:visited {
  background: rgba(218, 112, 214, 0.75);
}

.call-to-action:hover, .call-to-action:active {
  background: rgba(237, 66, 181, 0.75);
  box-shadow: 0px 0px 20px black;
}

@media screen and (max-width: 991px) {
  .nav-link {
    padding-left: 2em;
  }
}

@media screen and (max-width: 840px) {
  .navbar-collapse {
    background: rgba(218, 112, 214, 0.85);
  }
}

@media screen and (max-width: 375px) {
  .mask {
    padding-left: 0.5em;
    padding-right: 0.5em;
  }
  .call-to-action {
    padding: 0.25em 0.5em;
  }
}
</style>