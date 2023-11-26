<template>
  <div class="field-wrapper">
    <div class="grid grid-cols-5 w-full">
      <slot />
    </div>
  </div>
</template>

<style>

.field-wrapper {
    @apply mb-3;
    @apply w-4/5;
    @apply h-10;
  }
</style>