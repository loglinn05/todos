<template>
  <footer>
    <div class="container-fluid">
      <section class="">
        <div class="row">
          <div
            class="footer-image-container mb-4 col-xl-2 col-md-3 col-sm-4"
            :class="[col_6 ? 'col-6' : 'col-12']"
            v-for="image in images"
            :image="image"
            :key="image.key"
          >
            <div
              class="bg-image hover-overlay ripple shadow-1-strong rounded"
              data-ripple-color="light"
            >
              <img
                :src="require('../assets/images/' + image.name)"
                class="w-100"
              />
              <a href="#!">
                <div class="mask"></div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="copyright text-center p-3">
      © 2020 Copyright:
      <router-link class="text-white" to="/">ToDos</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'my-footer',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      col_6: true
    }
  },
  mounted() {
    if (window.screen.width < 425) {
      this.col_6 = false;
    }
  }
}
</script>

<style>
.row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mask {
  background-color: rgba(251, 251, 251, 0.2);
}

.copyright {
  background-color: rgba(0, 0, 0, 0.2);
}

.copyright a, .copyright a:visited {
  color: white !important;
}

.copyright a:hover, .copyright a:active {
  color: deeppink !important;
  text-shadow: 0px 0px 5px white;
}
</style>