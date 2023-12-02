<template>
  <div class="field-wrapper">
    <div class="grid grid-cols-5">
      <span class="col-span-1 col-start-1">
        <slot name="label" ></slot>
      </span>
      <span class="col-span-3 col-start-2 f-full">
        <slot name="field" >
        </slot>
      </span>
    </div>
  </div>
</template>

<style scoped>

.field-wrapper {
    @apply mb-3;
    @apply w-auto;
    @apply h-auto;
  }
</style>