<template>
  <span
    class="snackbar-wrapper z-50 w-80 snackbar-show bg-site-surface h-24 grid grid-cols-8 grid-rows-4 gap-1 shadow-xl border-gray-500 border rounded-md"
    :class="{
      'snackbar-show': showSnackbar,
      'snackbar-hide': !showSnackbar
    ,getIndicatorColour}"
  >
      <span class="col-start-1 col-span-2 row-start-1 row-span-4 h-full m-0 p-0" :class="getIndicatorColour">
      </span>
      <span class="col-start-5 row-start-1 col-span-4 font-semibold">
        {{ snackbarContent.title }}
      </span>
      <span class="row-start-2 col-start-3 col-span-4">
        {{ snackbarContent.message }}
      </span>
    </span>
</template>

<script lang="ts">
import { useSnackbarStore } from '@/stores/snackbar.store';
import { defineComponent } from 'vue';

export default defineComponent({
  name:'snackbar',
  data() {
    return {
      store: useSnackbarStore(),
    }
  },

  computed: {

    snackbarContent() {
      return this.store.getSnackbarMessage;
    },

    showSnackbar(): boolean {
      return this.store.isShowSnackBar;
    },
  
    getIndicatorColour(): string {
      return this.store.getSnackbarMessage.type;
    },
  
  },
})
</script>

<style lang="css">
.snackbar-wrapper {
  position: fixed;
  bottom: 10%;
  left: 50%;
  z-index: 10;
}

.snackbar-show {
  opacity: 1;
  visibility: visible;
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}

.snackbar-hide {
  opacity: 0;
  visibility: hidden;
  -webkit-animation: fadeout 1s;
  animation: fadeout 1s;
}

.error {
  background-color: rgb(184, 65, 65);
}

.success {
  background-color: rgb(51, 117, 51);
}

.warning {
  background-color: rgb(196, 134, 21);
}

.info {
  background-color: rgb(54, 54, 151);
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 10%;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 10%;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 10%;
    opacity: 1;
  }
  to {
    bottom: 0%;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 10%;
    opacity: 1;
  }
  to {
    bottom: 0%;
    opacity: 0;
  }
}
</style>
