<template>
  <div class="w-32 bg-gray-800 rounded-t-md z-40 h-72 absolute" v-if="show.valueOf()">
    <p class="flex flex-row justify-end">
      <CloseButton
        @click="closeMe()"
        class="bg-site-surface text-site-primary"
      />

    </p>
    <ul
      class="bg-gray-800 p-2 z-50 flex flex-row flex-wrap justify-start shadow-lg rounded-b-md absolute "
    >
      <li v-for="(icon, idx) in icons" :key="idx" class="w-6/12 text-lg text-accent-2 p-2">
        <IconImage
          :iconImage="icon"
          @iconClick="iconClicked($event)"
        />
      </li>
    </ul>
  </div>
</template>
  
  <script lang="ts">
  import closeButtonVue from '../../baseButton/closeButton/closeButton.vue';
  import { defineComponent } from 'vue';
  import { getImageUrl } from '@/common/getIcon';
  import iconVue from '@/components/utility/icon/icon.vue';
  import type { Icon } from '@/components/utility/icon/model/model';
  
  export default defineComponent ({
    name: 'icon-Picker',

    props: {
      show: {
        type: Boolean,
        default: false,
      } 
    },
    
    emits: [ 'onCloseClick', 'iconClick' ],

    data() {
      return {
        icons: [] as Icon[],
      }
    },

    components: {
      CloseButton: closeButtonVue,
      IconImage: iconVue,
    },
  
    created() {
      this.buildIcons();
    },
  
    methods: {

      buildIcons() {
        const classDef = "transform cursor-pointer hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 hover:text-accent-1";
        this.icons = [
          {
            icon: `home-32.png`,
            classDef: classDef,
            id: `home-32.png`,
            tooltip: '',
          },
          {
            icon: `faq-32.png`,
            classDef: classDef,
            id: `faq-32.png`,
            tooltip: '',
          },
          {
            icon: `help-32.png`,
            classDef: classDef,
            id: `help-32.png`,
            tooltip: '',
          },
          {
            icon: `blog-32.png`,
            classDef: classDef,
            id: `blog-32.png`,
            tooltip: '',
          },
          {
            icon: `compass-32.png`,
            classDef: classDef,
            id: `compass-32.png`,
            tooltip: '',
          },
          {
            icon: `video_library2-32.png`,
            classDef: classDef,
            id: `video_library2-32.png`,
            tooltip: '',
          },
          {
            icon:  `camera-32.png`,
            classDef: classDef,
            id:  `camera-32.png`,
            tooltip: '',
          },
          {
            icon:  `camera_view-32.png`,
            classDef: classDef,
            id:  `camera_view-32.png`,
            tooltip: '',
          },
          {
            icon: `gallery-32.png`,
            classDef: classDef,
            id: `gallery-32.png`,
            tooltip: '',
          },
          
          {
            icon: `image-32.png`,
            classDef: classDef,
            id: `image-32.png`,
            tooltip: '',
          },
          {
            icon: `id-32.png`,
            classDef: classDef,
            id: `id-32.png`,
            tooltip: '',
          },
          {
            icon: `phone_vintage-32.png`,
            classDef: classDef,
            id: `phone_vintage-32.png`,
            tooltip: '',
          },
          {
            icon: `phone-32.png`,
            classDef: classDef,
            id: `phone-32.png`,
            tooltip: '',
          },
          {
            icon: `envelope-32.png`,
            classDef: classDef,
            id: `envelope-32.png`,
            tooltip: '',
          },
          {
            icon: `icons8-page-32.png`,
            classDef: classDef,
            id: `icons8-page-32.png`,
            tooltip: '',
          },
          {
            icon: `icons8-group-objects-32.png`,
            classDef: classDef,
            id: `icons8-group-objects-32.png`,
            tooltip: '',
          },
          {
            icon: `icons8-text-32.png`,
            classDef: classDef,
            id: `icons8-text-32.png`,
            tooltip: '',
          },
          {
            icon: `edit-text.png`,
            classDef: classDef,
            id: `edit-text.png`,
            tooltip: '',
          },
          {
            icon: `elephant.png`,
            classDef: classDef,
            id: `elephant.png`,
            tooltip: '',
          },
          {
            icon: `icons8-button-36.png`,
            classDef: classDef,
            id: `icons8-button-36.png`,
            tooltip: '',
          },
          {
            icon: `check_mark-32.png`,
            classDef: classDef,
            id: `check_mark-32.png`,
            tooltip: '',
          },
          {
            icon: `send_container-32.png`,
            classDef: classDef,
            id: `send_container-32.png`,
            tooltip: '',
          },
      ];
    },
    
    getPath(image: string): string {
      return getImageUrl(image);
    },
    
    iconClicked(icon: string) {
      this.$emit('iconClick' ,icon);
    },
    
    closeMe() {
      this.$emit('onCloseClick')
    },
  },
})
</script>
  