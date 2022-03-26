<template>
  <my-header :links="links"/>
  <div class="root">
    <router-view/>
  </div>
  <my-footer :images="images"/>
</template>

<script>
import { onMounted, reactive } from 'vue'
import keygen from '@/modules/keygen.js'
import MyHeader from '@/components/MyHeader'
import MyFooter from '@/components/MyFooter'

export default {
  components: {
    MyHeader,
    MyFooter
  },
  setup() {
    const links = reactive([
      {
        key: '',
        path: '/',
        name: 'Home'
      },
      {
        key: '',
        path: '/todos',
        name: 'Todos'
      }
    ]);
    const images = reactive([
      {
        key: '',
        name: 'fi_1.jpg'
      },
      {
        key: '',
        name: 'fi_2.jpg'
      },
      {
        key: '',
        name: 'fi_3.jpeg'
      },
      {
        key: '',
        name: 'fi_4.jpg'
      },
      {
        key: '',
        name: 'fi_5.jpg'
      },
      {
        key: '',
        name: 'fi_6.jpg'
      }
    ]);
    
    onMounted(() => {
      const { assignKeysToList } = keygen();
      assignKeysToList(links);
      assignKeysToList(images);
    })
    
    return {
      links,
      images
    }
  }
}
</script>

<style>
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.root h1, .root h2, .root p:not(.alert p), .root ul li {
  color: #c71585;
}

.root a, .root a:visited {
  color: deeppink !important;
  transition: all 0.5s ease-in-out;
}

.root a:hover, .root a:active {
  color: red !important;
  text-shadow: 0px 0px 5px pink, 0px 0px 10px hotpink;
}

.root ul {
  list-style-image: url('./assets/images/list-style-image.png');
}

.root ul li p {
  font-size: 1.5em;
}
</style>