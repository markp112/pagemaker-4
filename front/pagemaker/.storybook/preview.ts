import {type Preview, setup } from "@storybook/vue3";
import '../src/index.css';
import { createPinia } from 'pinia';
import { App } from 'vue';

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
