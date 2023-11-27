<template>
  <div class="relative">
    <p class="m-4 text-site-primary text-3xl text-center mb-8">Site Editor</p>
    <div class="flex flex-row items-center flex-wrap justify-evenly">
      <form
        @submit.prevent="saveClicked"
        class="w-6/12 border-2 p-6 bg-site-primary-dark h-2/3 relative shadow-2xl text-site-background font-medium"
      >
        <div class="field-wrapper">
          <label for="name">Site Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="site.name"
            placeholder="The name of your site"
            required
          />
        </div>
        <div class="field-wrapper">
          <label for="description">Description</label>
          <textarea
            rows="4"
            name="name"
            id="name"
            v-model="site.description"
            placeholder="Description of your site"
          ></textarea>
        </div>
        <div class="field-wrapper">
          <label for="image">Site Image</label>
          <div class="w-10/12">
            <UploadImage
              :url-edited="site.image"
              :user-id="userId"
              gallery-location="left"
              class="mt-4 mb-2"
              @on-change="updateFileRef($event)"
            />
          </div>
        </div>
        <div class="field-wrapper">
          <label for="created">Created:</label>
          <input type="date" name="created" id="created" v-model="dateCreated" @change="site.created = new Date(dateCreated)" />
        </div>
        <div class="field-wrapper">
          <label for="Url">Url:</label>
          <input
            type="text"
            name="Url"
            id="url"
            v-model="site.url"
            placeholder="url for website"
          />
        </div>
        <div class="field-wrapper">
          <label for="published">Published:</label>
          <input
            type="date"
            name="published"
            id="published"
            v-model="datePublished"
            placeholder="date site was last published"
            @change="site.published = new Date(datePublished)"
          />
        </div>
        <div class="field-wrapper">
          <label for="host-repo">Host URL:</label>
          <input
            type="text"
            name="host-repo"
            id="host-repo"
            v-model="site.hostingDetails?.defaultUrl"
            placeholder="url for website"
          />
        </div>
        <div class="flex justify-between flex-row mt-8">
          <p class="w-16">
            <BaseButton
              buttonType="primary"
              variant="outline"
              size="small"
              @onClick="cancelClicked()"
            >
                Cancel
            </BaseButton>
          </p>
          <p class="w-16">
            <SaveButton :is-enabled="isFormCompletedCorrectly(validateForm())" @on-click="saveClicked()"/>
          </p>
        </div>
      </form>
    </div>
    <settingsPanelVue width="w-4/12">
      <TabstripContainerEditor :labels="['Palette Editor', 'Material colours', 'Typography']">
        <template v-slot:tab-0>
          <ColourPalettes :sitePalette="colourSwatches"
            :save-enabled="isNewSite"
            @reset-clicked="resetColourSwatches"
            @save-clicked="saveColourSwatches($event)"
            @on-change="updateSwatches($event)"
            @on-saturation-change="updateSaturation($event)"
          /> 
        </template>
        <template v-slot:tab-1>
          <MaterialColours :materialColours="getMaterialColours()" 
            :siteSwatches="getSitePalette" 
            :save-enabled="isNewSite"
            @save-clicked="saveMaterialColours($event)"
            @on-change="updateMaterialColours($event)"
          />
        </template>
        <template v-slot:tab-2>
          <Typography :save-enabled="isNewSite"
            :site-typography="getSiteTypography()"
            @saveClicked="saveSiteTypography($event)" 
            @on-change="updateTypography($event)"
          />
        </template>
      </TabstripContainerEditor>
    </settingsPanelVue>
</div>
</template>

<script lang="ts">
import type { SiteEntity, SiteData } from '@/classes/sites/site';
import { useSiteStore } from '@/stores/site.store';
import { defineComponent } from 'vue';
import baseButtonVue from '@/components/base/baseButton/baseButton.vue';
import ImagePicker from '@/components/base/pickers/uploadImage/uploadImage.vue';
import { useAuthStore } from '@/stores/auth.store';
import { siteService } from '@/services/site/site.service';
import settingsPanelVue from '@/components/core/settingsPanel/settingsPanel.vue';
import SiteMaterialColour from '@/components/base/pickers/colour/sidePanel/materialColours/siteMaterialColour.vue';
import ColourPalettes from '@/components/base/pickers/colour/sidePanel/colourPlatettes/colourPalettes.vue';
import { getSiteAndUser, } from '@/classes/siteAndUser/siteAndUser';
import type { ColourSwatches } from '@/classes/sites/siteColours/colour/colourPalette';
import type { MaterialColours } from '@/classes/sites/siteColours/models/colours.model';
import typographyVue from '@/components/base/pickers/colour/sidePanel/typography/typography.vue';
import type { SiteTypography } from '@/classes/sites/typography/model';
import SaveButton from '@/components/base/baseButton/saveButton/saveButton.vue';
import type { UploadImage } from '@/components/base/pickers/uploadImage/model';
import { swatchesService } from '@/services/swatches/swatches.service';
import TabstripContainerEditor from '@/components/core/settingsPanel/tabStripContainerEditor/tabStripContainerEditor.vue'

const NEW_SITE = -1;

export default defineComponent({
  name: 'SiteEditor',

  components: {
    BaseButton: baseButtonVue,
    UploadImage: ImagePicker,
    settingsPanelVue,
    MaterialColours: SiteMaterialColour,
    ColourPalettes,
    TabstripContainerEditor,
    Typography: typographyVue,
    SaveButton
},

  data() {
    return {
      formErrors: [] as string[],
      pageTitle: "Site Editor",
      userId: useAuthStore().user.uid,
      store: useSiteStore(),
      siteService: siteService(),
      site: Object as unknown as SiteEntity,
      sidePanelWidth: 'w-3/12',
      colourSwatches: Object as unknown as ColourSwatches,
      typography: Object as unknown as SiteTypography,
      materialColours: Object as unknown as MaterialColours,
      fileImage: Object as unknown as File | undefined,
      dateCreated: '',
      datePublished: '',
    };
  },

  created() {
    this.formErrors = [];
    this.pageTitle = this.$route.params.title as string;
    this.site = this.store.site;
    this.dateCreated = this.site.created.toString().split('T')[0];
    if(this.site.published) {
      this.datePublished = this.site.published?.toString().split('T')[0];
    }
    this.colourSwatches = this.store.getColourSwatches;
    this.materialColours = this.store.getMaterialColours;
    this.typography = this.store.getTypography;
  },

  computed: {
    isNewSite(): boolean {
      return this.site.siteId === NEW_SITE;
    },

    getSitePalette(): ColourSwatches {
      return this.store.getColourSwatches;
    },
  },


  methods: {

    getMaterialColours() {
      return this.store.getMaterialColours;
    },


    getSiteTypography(): SiteTypography {
      return this.store.getTypography;
    },

    updateFileRef(uploadedImage: UploadImage): void {
      if(uploadedImage.type === 'file') {
        this.fileImage = uploadedImage.image as File;
        this.site.image = '';
      } else {
        this.site.image = uploadedImage.image as string;
        this.fileImage = undefined;
      }
    },

    cancelClicked() {
      this.$router.push("/sites");
    },

    async resetColourSwatches() {
      await this.siteService.getSiteColourPalette(getSiteAndUser());
    },

    resizePanel() {
      this.sidePanelWidth=this.sidePanelWidth === 'w-1' ? 'w-3/12' : 'w-1';
    },
    
    async saveClicked() {
      if (!this.isFormCompletedCorrectly(this.validateForm())) {
        return;
      }
      if (this.isNewSite) {
        await this.saveNewSite();
      } else {
        const siteData: SiteData = {
          site: this.site,
          isSiteSaved: false,
        }
        await siteService().saveSite(siteData);
      }
    },

    async saveNewSite() {
      const siteData: SiteData = {
        site: this.site,
        imageFile: this.fileImage,
        materialColours: this.materialColours,
        colourSwatches: this.colourSwatches,
        typography: this.typography,
        isSiteSaved: false,
      };
      await siteService().saveSite(siteData);
    },

    async saveColourSwatches(colourSwatches: ColourSwatches): Promise<void> {
      const siteData: SiteData = {
        site: this.site,
        isSiteSaved: true,
        colourSwatches: colourSwatches,
      };
      await siteService().saveSite(siteData);
    },
  
    async saveMaterialColours(materialColours: MaterialColours) {
      const siteData: SiteData = {
        site: this.site,
        isSiteSaved: true,
        materialColours: materialColours,
      };
      await siteService().saveSite(siteData);
    },

    async saveSiteTypography(siteTypeography: SiteTypography): Promise<void> {
      const siteData: SiteData = {
        site: this.site,
        isSiteSaved: true,
        typography: siteTypeography,
      };
      await siteService().saveSite(siteData);
    },

    async updateSwatches(colourSwatches: ColourSwatches) {
      const newSwatches = await swatchesService().getNewSwatchesFromColour(colourSwatches);
      this.store.setColourPalette(newSwatches);
      this.colourSwatches = newSwatches;
    },

    updateSaturation(colourSwatches: ColourSwatches) {
      this.store.setColourPalette(colourSwatches);
      this.colourSwatches = colourSwatches;
    },

    updateTypography(typography: SiteTypography) {
      this.typography = typography;
    },

    updateMaterialColours(materialColours: MaterialColours) {
      this.materialColours = materialColours;
    },

    isFormCompletedCorrectly(errors: string[]): boolean {
      if (errors.length > 0) {
        this.formErrors = errors;
        return false;
      }
      return true
    },

    validateForm(): string[] {
      const errors: string[] = [];
      if (this.site.name.length < 5) {
          errors.push("Site name must be more than 5 characters");
      }
      return errors;
    },
  },
})
</script>

<style lang="css">
label {
  @apply text-sm self-start inline-block w-2/12;
}

input,
textarea {
  @apply w-10/12 self-end;
  @apply bg-site-primary;
  @apply leading-6;
}

.field-wrapper {
  @apply flex flex-row justify-start mb-2 ml-1;
}

input[type="text"],
input[type="date"]
{
  @apply p-2;
}
</style>
