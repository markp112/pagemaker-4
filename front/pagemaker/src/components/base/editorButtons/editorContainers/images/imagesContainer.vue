<template>
  <ImageGallery :user-id="getSiteAndUser().userId" :image-details="images" @image-clicked="onClick($event)"></ImageGallery>
  <TextInputButton :button-data="uploadImagebutton" placeholder="upload file" active-command-name="this"/>
  <TextInputButton :button-data="pasteImageUrl" placeholder="paste url" active-command-name="this"/>
  <UploadButton :button-data="uploadImagebutton" @on-button-click="onImageUpload($event)"></UploadButton>
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
import imageGallery from '@/components/base/pickers/imageGallery/imageGallery.vue';
import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import { userService } from '@/services/user/userService';
import type { ImageCardProps } from '@/components/base/pickers/imageGallery/types';
import { useImagesStore } from '@/stores/images.store';
import uploadButton from '../../components/uploadButton/uploadButton.vue';
import type { EditorButtonContent } from '../../model';

export default defineComponent({
  name: 'imagesContainer',

  components: {
    UploadImage: uploadImage,
    ButtonPanel: buttonPanel,
    TextInputButton: textInput,
    ImageGallery: imageGallery,
    UploadButton: uploadButton,
  },

  emits: ['onChange'],

  data() {
    return {
      userId: '',
      userStore: useAuthStore(),
      fileUploadService: FileUploadService(),
      uploadButtons: [imageLibrary],
      uploadImagebutton,
      pasteImageUrl,
      getSiteAndUser,
      images: [] as ImageCardProps[],
      imageStore: useImagesStore(),
    }
  },

  async mounted() {
    this.userId = this.userStore.user.uid;
    await userService().retrieveImages(this.userId);
    this.images = this.imageStore.imageDisplayList;
  },

  methods: {
    async onImageUpload(image: EditorButtonContent) {
        const url = await this.fileUploadService.uploadFile(image.content as File, this.userId);
        this.emitCommand(url);
    },

    emitCommand(imageUrl: string) {
      const command: CommandProperties = {
        commandType: 'direct',
        commandName: 'set-image',
        payload: imageUrl,
      };
      this.$emit('onChange', command);
    },

    onClick(imageUrl: string) {
      this.emitCommand(imageUrl);
    },
  },


})

</script>