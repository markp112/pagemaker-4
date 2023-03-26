<template>
  <ImageGallery :user-id="userId" 
    :image-details="images" 
    @image-clicked="emitCommand($event)"
    @close-clicked="emitCloseCommand()"
  />
  <ButtonPanel :button-data="commandButtons"
    @onButtonClick="handleButtonClick($event)"
  />
  <!-- <TextInputButton :button-data="uploadImagebutton" placeholder="upload file" active-command-name="this"/>
  <TextInputButton :button-data="pasteImageUrl" placeholder="paste url" active-command-name="this"/>
  <UploadButton :button-data="uploadImagebutton" @on-button-click=" onImageUpload($event)"></UploadButton> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { FileUploadService } from '@/services/fileUpload/fileUpload.service';
import type { CommandProperties } from '@/classes/command/model/command';
import buttonPanel from '../buttonPanel/buttonPanel.vue';
import { pasteImageUrl, uploadImage, imageLibrary } from '../../model/borderButtonData';
import textInput from '../../components/textInputButton/textInput.vue';
import { getSiteAndUser } from '@/classes/siteAndUser/siteAndUser';
import { userService } from '@/services/user/userService';
import type { ImageCardProps } from '@/components/base/pickers/imageGallery/types';
import { useImagesStore } from '@/stores/images.store';
import type { EditorButtonBase, EditorButtonContent } from '../../model';
import { imageCommandCollection  } from '../../model/borderButtonData';
import iconImageButton from '../../components/iconImageButton/iconImageButton.vue';
import imageGallery from '@/components/base/pickers/imageGallery/imageGallery.vue';
export default defineComponent({
  name: 'imagesContainer',

  components: {
    ButtonPanel: buttonPanel,
    TextInputButton: textInput,
    IconImageButton: iconImageButton,
    ImageGallery: imageGallery, 
  },

  emits: ['onButtonClick'],

  data() {
    return {
      userId: '',
      userStore: useAuthStore(),
      fileUploadService: FileUploadService(),
      uploadButtons: [imageLibrary],
      uploadImage,
      pasteImageUrl,
      getSiteAndUser,
      images: [] as ImageCardProps[],
      imageStore: useImagesStore(),
      imageCommandCollection,
      commandButtons: [imageLibrary, uploadImage, pasteImageUrl],
    }
  },

  async mounted() {
    this.userId = this.userStore.user.uid;
    await userService().retrieveImages(this.userId);
    this.images = this.imageStore.imageDisplayList;
  },

  methods: {

    handleButtonClick(buttonData: EditorButtonBase | EditorButtonContent) {
      this.$emit('onButtonClick', buttonData);
    },

    emitCommand(imageUrl: string) {
      const command: CommandProperties = {
        commandType: 'direct',
        commandName: 'set-image',
        payload: imageUrl,
      };
      this.$emit('onButtonClick', command);
    },

    emitCloseCommand() {
      const payload: CommandProperties = {
        commandName: 'show-gallery',
        commandType: 'direct',
        payload: false,
      };
      this.$emit('onButtonClick', payload);
    },

    onClick(imageUrl: string) {
      this.emitCommand(imageUrl);
    },

  
  },


})

</script>