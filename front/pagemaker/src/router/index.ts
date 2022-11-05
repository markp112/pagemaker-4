import loginVue from '@/views/auth/login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import sitesVue from '@/views/sites/sites.vue';
import pageListVue from '@/views/pageList/pageList.vue';
import SiteEditor from '@/views/sites/site-editor/siteEditor.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: loginVue,
    },
    {
      path: '/sites',
      name: 'sites',
      component: sitesVue,
    },
    {
      path: '/editsite',
      name: 'editSite',
      component: SiteEditor,
    },
    {
      path: '/pagelist',
      name: 'pageList',
      component: pageListVue, 

    },
  ],
});

export default router;
