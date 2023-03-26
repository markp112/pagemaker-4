<template>
  <div v-for="panel in tabContent">
    <ButtonPanel :buttonData="panel.commands"
      @onButtonClick="handleButtonClick($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CommandProperties } from '@/classes/command/model/command';
import ButtonPanel from '@/components/base/editorButtons/editorContainers/buttonPanel/buttonPanel.vue';
import type { TabPanel } from '../tabStripContainer/model';

  defineProps<{
    tabContent: TabPanel[],
  }>();
  
  const emits = defineEmits(['onButtonClick'])

  const handleButtonClick = (command: CommandProperties) => {
    emits('onButtonClick', command);
  } 
    


</script>