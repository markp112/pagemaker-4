<template>
  <div v-for="panel in tabContent">
    <ButtonPanel :buttonData="getCommandButtons(panel)"
      @onButtonClick="handleButtonClick($event)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CommandProperties } from '@/classes/command/model/command';
import type { CommandButtonTypes } from '@/classes/commandButtons/model';
import ButtonPanel from '@/components/base/editorButtons/editorContainers/buttonPanel/buttonPanel.vue';
import type { TabPanel } from '../tabStripContainer/model';

  const props = defineProps<{
    tabContent: TabPanel[],
  }>();
  
  const emits = defineEmits(['onButtonClick']);

  const handleButtonClick = (command: CommandProperties) => {
    emits('onButtonClick', command);
  };

const getCommandButtons = (panel: TabPanel) => {
  const key = Object.keys(panel)[0];
  return panel[key];
}


</script>