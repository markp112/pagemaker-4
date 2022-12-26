<template>
    <div class="">
      <h3 class="text-3xl mb-8">
        Typography
      </h3>
      <p class="w-full flex flex-row justify-start mb-2">
        <label for="fontPicker" class="w-auto">Site Font:</label>
        <FontPicker @on-change="setSiteFont($event)"></FontPicker>
        <NumericDropDown 
          :listItems="getFontList()"
          :selectedItem="fontSettings.size"
          @onChange="fontSizeChange($event)"
        />
        <span class="flex flex-row justify-start w-1/3 ml-4 options">
          <template v-for="(fontUnit, index) in FontUnits">
            <label :for="fontUnit">{{fontUnit}}
            </label>
            <input type="radio" name="fontUnits" :id="fontUnit" :value="fontUnit" :checked="fontUnit === fontSettings.unit"
            @click="fontUnitChange(fontUnit)"
            >
          </template>
        </span>
      </p>
      <p class="standard-border h-96 p-2 overflow-hidden">
        <span :style="getStyle()">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </span>
      </p>
    </div>
</template>


<script lang="ts">
  import { defineComponent } from 'vue';
  import fontPickerVue from '../../../fontPicker/fontPicker.vue';
  import numericDropdownVue from '../../../dropDown/numericDropdown/numericDropdown.vue';
  
  

  export default defineComponent({
    name: "siteTypography",

    components: {
      FontPicker: fontPickerVue,
      NumericDropDown: numericDropdownVue,
    },

    data() {
      return {
        fontSettings: {
          fontFamily: 'calibri',
          size: '16',
          unit: 'px'
        },
        FontUnits: ['px', 'em', 'rem'],
      }
    },

    methods: {

      getFontList(): string[] {
        return ['6','8','9','10','11','12','14','16','20','24','28','32','36','40','48','56','64','72'];
      },

      setSiteFont(fontname: string) {
        this.fontSettings.fontFamily = fontname;
      },

      fontSizeChange(size: string) {
        this.fontSettings.size = `${size}`;
      },

      fontUnitChange(unit: string) {
        this.fontSettings.unit = unit;
      },

      getStyle() {
        return {
          fontFamily: this.fontSettings.fontFamily,
          fontSize: `${this.fontSettings.size}${this.fontSettings.unit}`
        };
      },
    }

    
  })
</script>
<style lang="css">
.options {
  color: rgb(56, 54, 54);
  padding: 3px;
  text-align: center;
}

.options input {
    display: none;
  }

.options > label {
  display: inline-block;
  position: relative;
  margin-right: 26px;
  padding-left: 20px;
  cursor: pointer;
}

.options > label:before {
    content: "";
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    left: 0;
    top: 50%;
    margin-top: -8px;
    border: 1px solid rgb(236, 231, 231);
    border-radius: 8px;
  }

  .options > label:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 8px;
    margin-top: 0;
    background: rgb(34, 32, 32);
    border-radius: 4px;
    transition: .2s ease-in-out;
  }

.options :checked + label:after {
    height: 8px;
    width: 8px;
    margin-top: -4px;
    left: 4px;
  }

</style>