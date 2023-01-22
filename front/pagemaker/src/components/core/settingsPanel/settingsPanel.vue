<template>
  <div class="h-100 bg-white shadow-lg shadow-gray-400 p-4 flex flex-col justify-start absolute top-0 right-2 border border-gray-400 rounded-md transition-all ease-in-out duration-1000 transform translate-x-0"
    :class="getWidth()"
  >
    <div class="nav-content" v-if="width==='w-full'">
      <slot></slot>
    </div>
    <span class="absolute -left-10 w-10 p-1 pr-0 bottom-40 border border-gray-400 rounded-l-full z-10 bg-white">
    <Icon-Image :icon-image="getActiveIcon" 
      @icon-click="toggleToolbar($event as string)" 
    />
    </span>
  </div>
</template>

<script lang="ts">
import iconVue from '@/components/utility/icon/icon.vue';
import { defineComponent } from 'vue';
import { LEFT_ARROW, RIGHT_ARROW } from '../common/models/showHideIcons';

const TOOLBAR_ICON_UNHIDE = LEFT_ARROW;
const TOOLBAR_ICON_HIDE = RIGHT_ARROW;
type WIDTHS = 'w-full' | 'w-1';

export default defineComponent({
  name: 'settingsPanel',
  emits: ['toggleClicked'],

  components: {
    "Icon-Image": iconVue,
  },

  props: {
    toolbarHidden: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      activeIcon: TOOLBAR_ICON_HIDE,
      showToolbar: true,
      width: 'w-full' as WIDTHS,
    }
  },

  mounted() {
    TOOLBAR_ICON_HIDE.tooltip = 'Hide panel';
    TOOLBAR_ICON_HIDE.id = 'hideToolbar';
    TOOLBAR_ICON_UNHIDE.tooltip = 'Show Panel';
    TOOLBAR_ICON_UNHIDE.id = 'showToolbar';
  },

  computed: {
    getActiveIcon() {
      return this.activeIcon;
    }
  },

  methods: {
    toggleToolbar(event: string): void {
      this.activeIcon = event === 'hideToolbar' ? TOOLBAR_ICON_UNHIDE : TOOLBAR_ICON_HIDE;
      this.width = this.width === 'w-full' ? 'w-1' : 'w-full';
      this.$emit('toggleClicked');
    },

    getWidth() {
      return this.width;
    }
  },

});
</script>

<style lang="css">

#nav-container {
  position: fixed;
  height: 100%;
  width: 100%;
  pointer-events: none;
}

#nav-container .bg {
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100% - 70px);
  visibility: hidden;
  opacity: 0;
  transition: .3s;
  background: #000;
}
#nav-container:focus-within .bg {
  visibility: visible;
  opacity: .6;
}
#nav-container * {
  visibility: visible;
}




#nav-container:focus-within .button {
  pointer-events: none;
}
#nav-container:focus-within .icon-bar:nth-of-type(1) {
  transform: translate3d(0,8px,0) rotate(45deg);
}
#nav-container:focus-within .icon-bar:nth-of-type(2) {
  opacity: 0;
}
#nav-container:focus-within .icon-bar:nth-of-type(3) {
  transform: translate3d(0,-8px,0) rotate(-45deg);
}

#nav-content {
  padding: 20px;
  width: 90%;
  max-width: 300px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #ececec;
  pointer-events: auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transform: translateX(-100%);
  transition: transform .3s;
  will-change: transform;
  contain: paint;
}

#nav-content ul {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#nav-content li a {
  padding: 10px 5px;
  display: block;
  text-transform: uppercase;
  transition: color .1s;
}

#nav-content li a:hover {
  color: #BF7497;
}

#nav-content li:not(.small) + .small {
  margin-top: auto;
}

.small {
  display: flex;
  align-self: center;
}

.small a {
  font-size: 12px;
  font-weight: 400;
  color: #888;
}
.small a + a {
  margin-left: 15px;
}

#nav-container:focus-within #nav-content {
  transform: none;
}

</style>