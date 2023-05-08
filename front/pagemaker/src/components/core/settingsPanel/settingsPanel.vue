<template>
  <div class="h-100 bg-white 
    shadow-lg p-4 flex flex-col
    justify-start absolute
    top-12 right-2 border border-gray-400 rounded-md
    transition-all ease-out-in duration-1000 transform translate-x-0
    "
    :class="getWidth()"
  >
    <div class="nav-content" v-if="!isHidden">
      <slot></slot>
    </div>
    <span class="absolute -left-10 w-10 p-1 pr-0 border border-gray-400 rounded-l-full z-10 bg-white">
      <Icon-Image :icon-image="getActiveIcon" 
        @icon-click="toggleToolbar()" 
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

export default defineComponent({
  name: 'settingsPanel',

  components: {
    "Icon-Image": iconVue,
  },

  props: {
    width: String,
  },

  data() {
    return {
      activeIcon: TOOLBAR_ICON_HIDE,
      showToolbar: true,
      width: 'w-full',
      isHidden: false,
    }
  },

  mounted() {
    TOOLBAR_ICON_HIDE.tooltip = 'Hide panel';
    TOOLBAR_ICON_HIDE.id = 'hideToolbar';
    TOOLBAR_ICON_UNHIDE.tooltip = 'Show Panel';
    TOOLBAR_ICON_UNHIDE.id = 'showToolbar';
    this.width = <string>this.$props.width;
  },

  computed: {
    getActiveIcon() {
      return this.activeIcon;
    }
  },

  methods: {
    toggleToolbar() {
      this.isHidden = !this.isHidden;
      this.width = this.isHidden ? 'w-0 -right-6' : <string>this.$props.width;
      this.activeIcon = this.isHidden ? TOOLBAR_ICON_UNHIDE : TOOLBAR_ICON_HIDE;
    },

    getWidth() {
      return this.width;
    }
  },

});
</script>

<style lang="css">

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