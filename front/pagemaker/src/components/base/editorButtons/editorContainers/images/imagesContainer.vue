<template>
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


export default defineComponent({
  name: 'imagesContainer',

  components: {
    UploadImage: uploadImage,
  },

  emits: ['onChange'],

  data() {
    return {
      userId: '',
      userStore: useAuthStore(),
      fileUploadService: FileUploadService(), 
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