<template>
  <InputBase input-type="number"
    :value="value.toString()"
    :place-holder="placeHolder"
    :validation-properties="validationProperties"
    :disabled="disabled"
    :name="name"
    @on-field-change="onFieldChange($event)"
    @validate-field="validateField($event)"
  />
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import type { ValidationProperties } from '../inputText/model';
  import InputBase from '../inputBase/inputBase.vue';



  const props = defineProps<{
    value: number,
    placeHolder: string,
    name: string,
    disabled: boolean,
    validationProperties?: ValidationProperties
  }>();

  const emits = defineEmits(['onFieldChange', 'validateField']);
  
  let validationProperties: ValidationProperties;
  
  onMounted(() => {
    if (!props.validationProperties) {
      validationProperties = {
        type: 'number',
      }
    } else {
      validationProperties = props.validationProperties;
      validationProperties.type = 'number';
    }
  });

  const onFieldChange = (value: number) => {
    emits('onFieldChange', value);
  };

  const validateField = (value: number) => {
    emits('validateField', value);
  };

</script>