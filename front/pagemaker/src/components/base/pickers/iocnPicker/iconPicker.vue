<template>
  <div class="w-32 bg-gray-800 rounded-t-md z-40 h-72 absolute" v-if="show">
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

      buildIcon(icon: string) {
        const classDef = "transform cursor-pointer hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 hover:text-accent-1";
        return {
          icon: icon,
          classDef: classDef,
          id: icon,
          tooltip: '',
        }
      },

      buildIcons() {
        this.icons = [
          this.buildIcon('home-32.png'),
          this.buildIcon('faq-32.png'),
          this.buildIcon('help-32.png'),
          this.buildIcon('blog-32.png'),
          this.buildIcon('compass-32.png'),
          this.buildIcon('video_library-32.png'),
          this.buildIcon('camera-32.png'),
          this.buildIcon('camera_view-32.png'),
          this.buildIcon('gallery-32.png'),
          this.buildIcon('image-32.png'),
          this.buildIcon('id-32.png'),
          this.buildIcon('phone_vintage-32.png'),
          this.buildIcon('phone-32.png'),
          this.buildIcon('envelope-32.png'),
          this.buildIcon('icons8-page-32.png'),
          this.buildIcon('icons8-group-objects-32.png'),
          this.buildIcon('icons8-text-32.png'),
          this.buildIcon('edit-text.png'),
          this.buildIcon('elephant.png'),
          this.buildIcon('icons8-button-32.png'),
          this.buildIcon('check_mark-32.png'),
          this.buildIcon('send_container-32.png'),
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
  