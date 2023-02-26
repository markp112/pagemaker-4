<template>
  <ButtonPanel :button-data="uploadButtons" @on-button-click="onChange($event)"/>
  <TextInputButton :button-data="uploadImagebutton" placeholder="upload file" active-command-name="this"/>
  <TextInputButton :button-data="pasteImageUrl" placeholder="paste url" active-command-name="this"/>
  
  <UploadImage url-edited="" 
    :user-id="userId" 
    galleryLocation="right"
    @on-change="onChange($event)" 
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import uploadImage from '@/components/base/pickers/uploadImage/uploadImage.vue';
import { useAuthStore } from '@/stores/auth.store';
import type { UploadImage } from '@/components/base/pickers/uploadImage/model';
import { FileUploadService } from '@/services/fileUpload/fileUpload.service';
import type { CommandProperties } from '@/classes/command/model/command';
import buttonPanel from '../buttonPanel/buttonPanel.vue';
import { pasteImageUrl, uploadImage as uploadImagebutton, imageLibrary } from '../../model/borderButtonData';
import textInput from '../../components/textInputButton/textInput.vue';

export default defineComponent({
  name: 'imagesContainer',

  components: {
    UploadImage: uploadImage,
    ButtonPanel: buttonPanel,
    TextInputButton: textInput,
  },

  emits: ['onChange'],

  data() {
    return {
      userId: '',
      userStore: useAuthStore(),
      fileUploadService: FileUploadService(),
      uploadButtons: [imageLibrary],
      uploadImagebutton,
      pasteImageUrl
    }
  },

  mounted() {
    this.userId = this.userStore.user.uid;
  },

  methods: {
    async onChange(image: UploadImage) {
      if(image.type === 'file') {
        const url = await this.fileUploadService.uploadFile(image.image as File, this.userId);
        image.type = 'file';
        image.image = url;
      }
      const command: CommandProperties = {
        commandType: 'direct',
        commandName: 'set-image',
        payload: image.image as string,
      };
      this.$emit('onChange', command);
    }
  },

})

</script>