<template>
  <div class="flex flex-row justify-between">
    <h3 class="text-3xl mb-8">
      Typography
    </h3>
    <SaveButton @onClick="saveTypography()" :is-enabled="saveEnabled"/>
  </div>
  <p class="w-full flex flex-row justify-start place-items-center h-10 mb-4">
    <label for="fontPicker" class="w-auto pt-2">Site Font:</label>
    <FontPicker @on-change="setSiteFont($event)"></FontPicker>
    <NumericDropDown 
      :listItems="getFontList()"
      :selectedItem="fontSettings.size"
      @onChange="fontSizeChange($event)"
    />
    <span class="w-1/3 ml-3 flex flex-row">
        <label class="form-control" v-for="(fontUnit) in FontUnits">
          {{fontUnit}}
          <input type="radio" name="fontUnits" :id="fontUnit" :value="fontUnit" :checked="fontUnit === fontSettings.unit"
          @click="fontUnitChange(fontUnit as HtmlUnits)"
        >
        </label>
    </span>
  </p>
  <p class="standard-border h-96 p-2 overflow-hidden">
    <span :style="getStyle()">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </span>
      </p>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import fontPickerVue from '../../../fontPicker/fontPicker.vue';
  import numericDropdownVue from '../../../dropDown/numericDropdown/numericDropdown.vue';
  import SaveButton from '@/components/base/baseButton/saveButton/saveButton.vue';
  import type { HtmlUnits, SiteTypography } from '@/classes/sites/typography/model';

  const DEFAULT_TYPOGRAPHY = {
          fontFamily: 'calibri',
          size: '16',
          unit: 'px'
        };

  export default defineComponent({
    name: "siteTypography",

    components: {
      FontPicker: fontPickerVue,
      NumericDropDown: numericDropdownVue,
      SaveButton,
    },

    emits: ['saveClicked', 'onChange'],

    props: {
      siteTypography: {
        type: Object as PropType<SiteTypography>
      },
      saveEnabled: Boolean,
    },

    data() {
      return {
        fontSettings: DEFAULT_TYPOGRAPHY as SiteTypography,
        FontUnits: ['px', 'em', 'rem'],
      }
    },

    mounted() {
      if(this.siteTypography) {
        this.fontSettings = this.siteTypography
      }
    },

    methods: {

      getFontList(): string[] {
        return ['6','8','9','10','11','12','14','16','20','24','28','32','36','40','48','56','64','72'];
      },

      setSiteFont(fontname: string) {
        this.fontSettings.fontFamily = fontname;
        this.$emit('onChange', this.fontSettings);
      },

      fontSizeChange(size: string) {
        this.fontSettings.size = size;
        this.$emit('onChange', this.fontSettings);
      },

      fontUnitChange(unit: HtmlUnits) {
        this.fontSettings.unit = unit;
        this.$emit('onChange', this.fontSettings);
      },

      getStyle() {
        return {
          fontFamily: this.fontSettings.fontFamily,
          fontSize: `${this.fontSettings.size}${this.fontSettings.unit}`
        };
      },

      saveTypography() {
        this.$emit('saveClicked', this.fontSettings)
      }
    }

    
  })
</script>
<style lang="css" scoped>

.form-control {
  font-family: inherit;
  font-size: 1rem;
  line-height: 1;
  margin-right: 26px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.8em;
  padding: 2px;
  margin-left: 0.6em;
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: #ffeeee;
  margin: 0;
  font: inherit;
  color: #4a3d94;
  width: 1em;
  height: 1em;
  border: 0.15em solid #4a3d94;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  }

input[type="radio"]::before {
    content: "";
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 0.4em 1em #4a3d94;
    background-color: aliceblue;
  }

  input[type="radio"]:checked::before {
    transform: scale(1);
  }

  input[type="radio"]:focus {
  outline: max(2px, 0.15em) solid #4a3d94;
  outline-offset: max(2px, 0.15em);
}

</style>