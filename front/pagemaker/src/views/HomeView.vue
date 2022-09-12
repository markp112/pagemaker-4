

<template>
  <main class="w-full flex flex-col drop-shadow-lg">
    <Navbar :nav-menu-items="menuItems"/>
    <div class="flex flex-row justify-center w-100 relative ">
      <div class="h-screen mr-4 absolute left-0 top-2 slide" :class="getToolbarClasses" >
        <Toolbar @toggle-clicked="toolbarToggleClicked"/>
      </div>
      <div class="mt-4 bg-white" >
        <Canvas />
      </div>

    </div>
  </main>
</template>

<script lang="ts">
import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { defineComponent } from 'vue';
import Navbar from "../components/core/navbar/navbar.vue";
import Canvas from '@/components/canvas/canvas.vue';
import Toolbar from '../components/core/toolbar/toolbar.vue';

  export default defineComponent({
    name: 'main',
    
    components: {
    Navbar,
    Canvas,
    Toolbar
},
    
    data() {
      return {
        store: useNavMenuItemStore(),
        menuItems: [] as NavMenuItem[],
        toolbarWidth: 'w-2/12',
        toolbarHidden: false,
      }
    },

    computed: {
      getToolbarClasses(): string {
        let classDef = '';

        if (this.toolbarHidden) {
          classDef = `${this.toolbarWidth}`
        } else {
          classDef = `${this.toolbarWidth}`

        }
        return classDef 
      }
    },

    methods: {
      toolbarToggleClicked() {
        if (this.toolbarHidden) {
          this.toolbarWidth = 'w-2/12';
        }  else {
          this.toolbarWidth = 'w-2';
        }
        this.toolbarHidden = !this.toolbarHidden;
      }
    },

    async mounted() {
      await this.store.fetchMenuItems(true);
      this.menuItems = this.store.getMenuItems;
    },

  })
</script>

<style scoped>
  .slide {
    background: #fff;
    color: #000;   
    left:-80px;
    -webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;
}

@-webkit-keyframes slide {
    100% { left: 0; }
}

@keyframes slide {
    100% { left: 0; }
}
</style>