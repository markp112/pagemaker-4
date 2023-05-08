<template>
  <div class="ml-12 mt-2 flex-row flex justify-start w-full relative">
    <Scaler :slider="sliderSettings"
      @slider-change="sliderChange($event)"
    />
    <h2 class="col-span-2 font-semibold text-lg">
      {{ pageTitle }}
    </h2>
  </div>
  <div class="top-32 fixed z-50">
    <Toolbar/>
  </div>
  <div class="top-32 fixed z-50 -right-2">
    <SettingsPanelVue :toolbar-hidden="false" width="w-86">
      <span class="flex flex-row justify-end">
        <IconButton :iconImage="trashCan"
        @icon-click="deletePageElement()"
        />
      </span>
      <TabstripContainer :data="getTabsForElement"
        @onButtonClick="handleButtonClick($event)"/>
      </SettingsPanelVue>
  </div>
  <div class="flex flex-row justify-center w-100 relative">
    <div class="mt-4 bg-white w-full z-0" >
      <PageCanvas :zoom-page="zoomPage" :page-elements="getPageElements()"/>
    </div>

    <ImageGallery :image-details="getImagesForGallery" 
    @image-clicked="handleGalleryImageClicked($event)"
    @close-clicked="handleGalleryClose()"
    />
  </div>
</template>

<script lang="ts">
import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { defineComponent } from 'vue';
import toolbarPanelVue from '@/components/core/toolbar/toolbarPanel.vue';
import type { SliderSettings } from '@/components/canvas/scaler/model';
import Scaler from '@/components/canvas/scaler/scaler.vue';
import { usePageStore } from '@/stores/page.store';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import PageCanvas from '@/components/canvas/pageCanvas.vue';
import settingsPanelVue from '@/components/core/settingsPanel/settingsPanel.vue';
import tabstripContainer from '@/components/core/settingsPanel/tabStrip/tabStripContainer/tabstripContainer.vue';
import type { CommandProperties } from '@/classes/command/model/command';
import { PageBuilderService } from '@/services/pageBuilder/pageBuilder.service';
import { CommandHistory } from '@/classes/history/history';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import { CommandsService } from '@/services/commandButtons/commandButtons.service';
import type { TabPanel } from '@/components/core/settingsPanel/tabStrip/tabStripContainer/model';
import ImageGallery from '@/components/base/pickers/imageGallery/imageGallery.vue';
import icon from '@/components/utility/icon/icon.vue';
import type { Icon } from '@/components/utility/icon/model/model';

const scalerSettings: SliderSettings = {
  min: 0,
  max: 200,
  initialValue: 100,
  width: 400,
  label: 'Zoom',
};

const trashCan: Icon = {
  classDef: '',
  icon: 'trash_can_32.png',
  tooltip: 'delete element',
  id: 'deleteElement'
};

  export default defineComponent({
    name: 'pageBuilder',
    
    components: {
    PageCanvas,
    Toolbar: toolbarPanelVue,
    Scaler,
    SettingsPanelVue: settingsPanelVue,
    TabstripContainer: tabstripContainer,
    ImageGallery,
    IconButton: icon
},
    
    data() {
      return {
        store: useNavMenuItemStore(),
        pageStore: usePageStore(),
        pageBuilderService: PageBuilderService(),
        pageTitle: '',
        menuItems: [] as NavMenuItem[],
        toolbarHidden: false,
        sliderSettings: scalerSettings,
        zoomPage: 1,
        commandHistory: Object as unknown as  CommandHistory<CommandProperties>,
        editorSettingsService: new EditorSettingsService(),
        commandButtonService: CommandsService(),
        tabContent: [] as TabPanel[],
        trashCan,
      }
    },
    
    mounted() {
      this.commandHistory = new CommandHistory<CommandProperties>();
      this.pageTitle = <string>this.$route.params.pageName;
    },

    computed: {

      getTabsForElement() {
        return this.commandButtonService.getTabs() || [];
      },

      getImagesForGallery() {
        return this.editorSettingsService.getImagesForGallery();
      }
    },

    methods: {
      getTab(commandGroupId: string) {
        return commandGroupId;
      },

      sliderChange(newValue: number) {
        this.zoomPage = newValue / 100;;
      },

      getPageElements(): PageElement[] {
        return this.pageStore.pageElements as PageElement[];
      },

      handleButtonClick(payload: CommandProperties): void {
        this.pageBuilderService.processButtonCommand(payload, this.commandHistory as CommandHistory<CommandProperties>);
      },

      handleGalleryImageClicked(imageUrl: string) {
        const command: CommandProperties = {
          commandType: 'direct',
          commandName: 'set-image',
          payload: imageUrl,
        };
        this.handleButtonClick(command);
      },

      handleGalleryClose() {
        const payload: CommandProperties = {
          commandName: 'show-gallery',
          commandType: 'direct',
          payload: false,
        };
        this.handleButtonClick(payload);
      },

      handleClearCommand(payload: CommandProperties): void {
        this.pageBuilderService.clearButtonCommand(payload, this.commandHistory as CommandHistory<CommandProperties>);
      },

      deletePageElement() {
        const payload: CommandProperties = {
          commandName: 'delete-element',
          commandType: 'direct',
          payload: true,
        }
        this.handleButtonClick(payload);
      }


    },

  })
</script>

<style scoped>
  .slide {
    background: #fff;
    color: #000;   
    left:-80px;
    -webkit-animation: slide 0.5s forwards;
    -webkit-animation-delay: 2s;
    animation: slide 0.5s forwards;
    animation-delay: 2s;
}

@-webkit-keyframes slide {
    100% { left: 0; }
}

@keyframes slide {
    100% { left: 0; }
}
</style>