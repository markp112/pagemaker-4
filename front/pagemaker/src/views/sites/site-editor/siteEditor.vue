<template>
  <div class="mt-24 grid grid-cols-4">
    <p class="m-4 text-site-primary text-3xl col-start-2">Site Editor</p>
  </div>
    <div class="flex flex-row justify-center">
      <form
        @submit.prevent="saveClicked"
        class="w-5/12 border-2 p-4 text-site-primary-dark h-2/3 shadow-2xl bg-site-background font-medium"
      >
        <FieldWrapper>
          <template #label>
            <label  for="pageName">Site Name:</label>
          </template>
          <template #field>
            <TextInput 
              :value="site.name"
              place-holder="The name of your site"
              :disabled="false"
              :validationProperties="{ type: 'string', required: true }"
              name="site name"
              id="siteName"
              @onFieldChange="($event) => site.name = $event"
            />
          </template>
        </FieldWrapper>
        <FieldWrapper>
          <template #label>
            <label for="description">Description</label>
          </template>
          <template #field>
            <textarea
              rows="4"
              name="name"
              id="name"
              v-model="site.description"
              placeholder="Description of your site"
            ></textarea>
          </template>
        </FieldWrapper>
        <FieldWrapper>
          <template #label>
            <label for="image">Site Image</label>
          </template>
          <template #field>
            <UploadImage
              :url-edited="site.image"
              :user-id="userId"
              gallery-location="left"
              class="mt-4 mb-2"
              @on-change="updateFileRef($event)"
            />
          </template>
        </FieldWrapper>
        <FieldWrapper>
          <template #label>
            <label for="created" >Created:</label>
          </template>
            <template #field>
              <input type="date" name="created" id="created" v-model="dateCreated" @change="site.created = new Date(dateCreated)" />
            </template>
        </FieldWrapper>
        <FieldWrapper>
          <template #label>
            <label for="siteUrl">Url:</label>
          </template>
          <template #field>
            <TextInput 
              :value="site.url"
              place-holder="Site url - www.example.com"
              :disabled="false"
              name="site url"
              id="siteUrl"
              @onFieldChange="($event) => site.url = $event"
              class="bg-site-primary"
            />
          </template>
        </FieldWrapper>
        <FieldWrapper>
          <template #label>
            <label for="published">Published:</label>
          </template>
          <template #field>
            <input
              type="date"
              name="published"
              id="published"
              v-model="datePublished"
              placeholder="date site was last published"
              @change="site.published = new Date(datePublished)"
            />
          </template>
        </FieldWrapper>
        <FieldWrapper>
          <template #label>
            <label for="host-repo">Host URL:</label>
          </template>
          <template #field>
            <TextInput 
              :value="site.hostingDetails.defaultUrl "
              place-holder="url for website"
              :disabled="false"
              name="host-repo"
              id="host-repo"
              @onFieldChange="($event) => site.hostingDetails.defaultUrl = $event"
              class="bg-site-primary"
            />
          </template>

        </FieldWrapper>
        <hr/>
        <div class="flex justify-between flex-row mt-8">
          <p class="w-16">
            <BaseButton
              buttonType="primary"
              variant="outline"
              size="medium"
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
    <settingsPanelVue width="w-6/12">
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
import inputTextVue from '@/components/base/formFields/inputText/inputText.vue';
import FieldWrapper from '@/components/base/fieldWrapper/fieldWrapper.vue';

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
    SaveButton,
    TextInput: inputTextVue,
    FieldWrapper
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


textarea {
  @apply border disabled:bg-gray-200 disabled:border-gray-400 rounded-sm;
  @apply w-full;
}

input[type="date"]
{
  @apply p-2;
  @apply border disabled:bg-gray-200 disabled:border-gray-400 rounded-sm;
}
</style>
