<template>
  <div class="relative">
    <Scaler :slider="sliderSettings"
      :position="sliderPosition"
    @slider-change="sliderChange($event)"
    />
  </div>
  <div class="flex flex-row justify-center w-100 relative">
    <div class="mt-8 w-full">
      <div class="h-full absolute left-0 top-4 border-r border-gray-400 mr-2 z-50 shadow-lg" :class="getToolbarClasses" >
        <Toolbar @toggle-clicked="toolbarToggleClicked"
          :toolbarHidden="toolbarHidden"
        /> 
      </div>
      <div class="mt-4 bg-white w-full z-0" >
        <PageCanvas :zoom-page="zoomPage" :page-elements="getPageElements()"/>
      </div>
    </div>
    <SettingsPanelVue :toolbar-hidden="false" 
      class="h-full"
      :class="sidePanelWidth"
      @toggle-clicked="resizePanel()"
    >
      <span class="flex flex-row justify-end">
        <IconButton :iconImage="trashCan"
          @icon-click="deletePageElement()"
        />
      </span>
      <TabstripContainer :data="getTabsForElement"
        @onClick="tabClicked($event)"
        @onButtonClick="handleButtonClick($event)"/>
    </SettingsPanelVue>
    <ImageGallery :image-details="getImagesForGallery" 
      @image-clicked="handleGalleryImageClicked($event)"
      @close-clicked="handleGalleryClose()"
    />
    />
  </div>
</template>

<script lang="ts">
import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { useNavMenuItemStore } from '@/stores/navMenuItems.store';
import { defineComponent } from 'vue';
import toolbarPanelVue from '@/components/core/toolbar/toolbarPanel.vue';
import type { SliderPosition, SliderSettings } from '@/components/canvas/scaler/model';
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

const sliderPosition: SliderPosition = {
  left: 'left-64',
  top: 'top-0',
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
        menuItems: [] as NavMenuItem[],
        toolbarWidth: 'w-64',
        toolbarHidden: false,
        sliderSettings: scalerSettings,
        sliderPosition: sliderPosition,
        zoomPage: 1,
        sidePanelWidth: 'w-2/12',
        commandHistory: Object as unknown as  CommandHistory<CommandProperties>,
        editorSettingsService: new EditorSettingsService(),
        commandButtonService: CommandsService(),
        tabContent: [] as TabPanel[],
        trashCan,
      }
    },
    
    mounted() {
      this.commandHistory = new CommandHistory<CommandProperties>();
    },

    computed: {
      getToolbarClasses(): string {
        let classDef = '';
        if (this.toolbarHidden) {
          classDef = `${this.toolbarWidth}`
        } else {
          classDef = `${this.toolbarWidth}`
        }
        return classDef 
      },

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

      toolbarToggleClicked() {
        if (this.toolbarHidden) {
          this.toolbarWidth = 'w-64';
        }  else {
          this.toolbarWidth = 'w-2';
        }
        this.toolbarHidden = !this.toolbarHidden;
      },

      sliderChange(newValue: number) {
        this.zoomPage = newValue / 100;;
      },

      getPageElements(): PageElement[] {
        return this.pageStore.pageElements as PageElement[];
      },

      resizePanel() {
        this.sidePanelWidth=this.sidePanelWidth === 'w-1' ? 'w-2/12' : 'w-1';
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

      tabClicked(commandGroupId: string) {
      console.log('%c⧭', 'color: #00a3cc', commandGroupId)
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