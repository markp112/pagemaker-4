<template>
  <div class="w-44 bg-gray-800 rounded-t-md" v-if="showMe">

    <ul class="w-44 bg-gray-800 p-2 flex flex-row flex-wrap justify-start shadow-lg rounded-b-md absolute z-20">
      <CloseButton
        @click="closeMe()"
        class="bg-site-surface text-site-primary mt-2 h-10 w-10/12 ml-4"
      />
      <li v-for="(icon, idx) in icons" :key="idx" class="w-6/12 text-lg text-accent-2 p-2">
        <IconVue
          :iconImage="icon"
          classes="w-10"
          @iconClick="iconClicked($event)"
        />
      </li>
    </ul>
    </div>
  </template>
  
  <script lang="ts" setup>
  import CloseButton from '../../baseButton/closeButton/closeButton.vue';
  import { onMounted, ref } from 'vue';
  import { getImageUrl } from '@/common/getIcon';
  import IconVue from '@/components/utility/icon/icon.vue';
  import type { Icon } from '@/components/utility/icon/model/model';

  defineProps<{
      showMe: boolean
    }>();
    
    const emits = defineEmits(['onCloseClick', 'iconClick']);

    const icons = ref<Icon[]>([]);

    onMounted(() => {
      buildIcons();
    });
  
    const buildIcons = () => {
        const classDef = "transform cursor-pointer hover:shadow-xl hover:-translate-x-1 hover:-translate-y-1 hover:text-accent-1";
        icons.value = [
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
    };
    
    const getPath = (image: string): string => {
      return getImageUrl(image);
    };
    
    const iconClicked = (icon: string) => {
      emits('iconClick', icon);
    };
    
    const closeMe = () => {
      emits('onCloseClick')
    };
</script>
  