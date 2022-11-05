<template>
  <div
    class="snackbar-wrapper z-50 w-full snackbar-show "
    :class="{
      'snackbar-show': showSnackbar,
      'snackbar-hide': !showSnackbar
    }"
  >
    <div class="flex flex-row w-4/12 shadow-xl border-gray-500 border">
      <div class="w-2/12" :class="getIndicatorColour">
        .
      </div>
      <div class="w-8/12 p-2 flex flex-col">
        <div class="self-center font-semibold">
          {{ snackbarContent.title }}
        </div>
        <div class="self-start">
          {{ snackbarContent.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useSnackbarStore } from '@/stores/snackbar.store';
import { defineComponent } from 'vue';
import type { SnackbarTypes } from './models';

export default defineComponent({
  name:'snackbar',
  data() {
    return {
      store: useSnackbarStore(),
    }
  },
  
  mounted() {
  
  },

  computed: {
    snackbarContent(): SnackbarTypes {
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
    bottom: 10px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 10px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 10px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 10px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
