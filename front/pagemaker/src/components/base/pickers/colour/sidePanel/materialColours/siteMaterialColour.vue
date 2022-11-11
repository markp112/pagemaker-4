<template>
  <div class="flex flex-col justify-start w-full">
    <div class="flex flex-row justify-start w-full mt-6">
      <div class="flex flex-col justify-start w-6/12">
        <div
          class="section-wrapper"
          :style="{ backgroundColor: materialColours.primary }"
        >
          <p
            class="w-full p-1"
            :style="{
              color: materialColours.textOnPrimary,
              backgroundColor: materialColours.primaryDark,
            }"
          >
            Primary Dark
          </p>
          <p
            class="w-full p-1"
            :style="{ color: materialColours.textOnPrimary }"
          >
            Primary
          </p>
          <p
            class="self-end w-full p-1"
            :style="{
              color: materialColours.textOnPrimary,
              backgroundColor: materialColours.primaryLight,
            }"
          >
            Primary Light
          </p>
        </div>
        <div
          class="section-wrapper"
          :style="{ backgroundColor: materialColours.secondary }"
        >
          <p
            class="w-full p-1"
            :style="{
              color: materialColours.textOnSecondary,
              backgroundColor: materialColours.secondaryDark,
            }"
          >
            Secondary Dark
          </p>
          <p
            class="w-full p-1"
            :style="{ color: materialColours.textOnSecondary }"
          >
            Secondary
          </p>
          <p
            class="self-end w-full p-1"
            :style="{
              color: materialColours.textOnSecondary,
              backgroundColor: materialColours.secondaryLight,
            }"
          >
            Secondary Light
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-start w-6/12">
        <div
          class="section-wrapper section-wrapper-short"
          :style="{ backgroundColor: materialColours.error }"
        >
          <p
            class="w-full p-1"
            :style="{
              color: materialColours.textOnError,
              backgroundColor: materialColours.error,
            }"
          >
            Error
          </p>
        </div>
        <div class="section-wrapper section-wrapper-long">
          <div
            class="h-84"
            :style="{
              backgroundColor: materialColours.background,
            }"
          >
            <p
              class="p-1"
              :style="{
                color: materialColours.textOnBackground,
              }"
            >
              Text on background
            </p>
            <div class="p-5 flex flex-row justify-center">
              <div class="w-8/12 shadow-lg">
                <div
                  class="p-1"
                  :style="{
                    backgroundColor: materialColours.primary,
                  }"
                >
                  <h2
                    :style="{
                      color: materialColours.textOnPrimary,
                    }">
                    Text on primary
                  </h2>
                </div> 
                <div
                  class="h-32 p-1 relative"
                  :style="{
                    backgroundColor: materialColours.surface,
                    color: materialColours.textOnSurface,
                  }"
                >
                  Text on surface
                  <div
                    class="absolute bottom-1 left-1/3 h-16 w-16 rounded-full ml-2"
                    :style="{
                      backgroundColor: materialColours.surface
                    }"
                  >
                    <p
                      class="absolute bottom-0 ml-2 mb-1 rounded-full h-12 w-12 flex items-center justify-center shadow-lg"
                      :style="{
                        backgroundColor: materialColours.accent,
                        color: materialColours.textOnSurface,
                      }"
                    >
                      accent
                    </p>
                  </div>
                </div>
                <div
                  class="p-1"
                  :style="{
                    backgroundColor: materialColours.secondary,
                    color: materialColours.textOnSecondary,
                  }"
                >
                  Text on secondary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { MaterialColoursInterface } from '@/classes/sites/siteColours/models/colours.model';
import { defineComponent, type PropType } from 'vue';


export default defineComponent({
  name: 'siteMaterialColours',

  props: {
    materialColours: {
      type: Object as PropType<MaterialColoursInterface>,
      required: true,
    },
    
  },

})
</script>

<style lang="postcss" scoped>
.section-wrapper {
  @apply w-full;
  @apply h-48;
  @apply overflow-hidden;
  @apply flex;
  @apply flex-col;
  @apply justify-between;
  @apply text-sm;
}

.section-wrapper-short {
  @apply h-16;
}

.section-wrapper-long {
  @apply h-80;
}
</style>
