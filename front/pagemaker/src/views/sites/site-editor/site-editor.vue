<template>
  <div class="form-page-wrapper mt-16 w-full flex-wrap">
    <div class="w-7/12 bg-secondary-100 text-accent1 text-3xl flex flex-row">
      <img
        src="@/assets/images/website-building.png"
        alt="picture of lined paper"
      />
      <p class="mt-4">{{ pageTitle }}</p>
    </div>
    <form
      @submit.prevent="saveClicked"
      class="w-7/12 border-2 p-5 bg-secondary-900"
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
            url-edited=""
            :user-id="userId"
            class="mt-4 mb-2"
            v-on:image-url="updateImageUrl"
          ></UploadImage>
        </div>
      </div>
      <div class="field-wrapper">
        <label for="created">Created:</label>
        <input type="date" name="created" id="created" v-model="site.created" />
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
          v-model="site.published"
          placeholder="url for website"
        />
      </div>
      <div class="field-wrapper">
        <label for="host-repo">Host URL:</label>
        <input
          type="text"
          name="host-repo"
          id="host-repo"
          v-model="site.hostRepo"
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
          <BaseButton
            buttonType="primary"
            variant="solid"
            size="small"
            @onClick="saveClicked()"
          >
            Save
          </BaseButton>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import type { Site } from '@/classes/sites';
import { useSiteStore } from '@/stores/site.store';
import { defineComponent } from 'vue';
import baseButtonVue from '@/components/base/baseButton/baseButton.vue';
import UploadImage from '@/components/base/pickers/uploadImage/uploadImage.vue';
import { useAuthStore } from '@/stores/auth.store';


export default defineComponent({
    name: 'SiteEditor',

    components: {
      BaseButton: baseButtonVue,
      UploadImage,
    },

    data() {
        return {
            formErrors: [] as string[],
            pageTitle: "",
            userId: useAuthStore().user.uid,
            store: useSiteStore(),
            site: Object as unknown as Site,
        };
    },

    created() {
        this.formErrors = [];
        this.pageTitle = this.$route.params.title as string;
        const siteId = this.store.site.siteId;
        if (siteId !== undefined && siteId !== "") {
            this.site = this.store.site;
        }
    },

    methods: {
        updateImageUrl(url: string): void {
            this.site.image = url;
        },
        cancelClicked() {
            this.$router.push("/sites");
        },
        saveClicked() {
            this.formErrors = [];
            const errors: string[] = this.validateForm();
            // if (errors.length === 0) {
            //   // this.store.dispatch(AllActionTypes.SAVE_SITE, this.site)
            //   // .then(() => {
            //   //   showTheSnackbar('Site Record Saved',  `The site ${this.site.name} has been created`, 'success');
            //   // })
            //   // .catch((err: Notification) => {
            //   //   showTheSnackbar('Error', err.message, 'error');
            //   // })
            //   // ;
            // } else {
            //   this.formErrors = errors;
            // }
        },
        validateForm(): string[] {
            const errors: string[] = [];
            if (this.site.name.length < 5) {
                errors.push("Site name must be more than 5 characters");
            }
            return errors;
        }
    },
})
</script>

<style lang="postcss">
label {
  @apply text-sm self-start inline-block w-2/12;
}

input,
textarea {
  @apply w-10/12 border-solid border self-end;
  @apply bg-accent-2;
}

.field-wrapper {
  @apply flex flex-row justify-start mb-2  ml-1;
}
</style>
