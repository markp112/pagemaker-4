import loginVue from '@/views/auth/login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import sitesVue from '@/views/sites/sites.vue';
import SiteEditor from '@/views/sites/site-editor/siteEditor.vue';
import pageListVue from '@/views/pageList/pageList.vue';
import pageEditor from '@/views/pageList/page-editor/page-editor.vue';
import commandEditor from '@/views/admin/commandEditor/commandEditor.vue';
import commandStructure from '@/views/admin/commandEditor/commandStructure/commandStructure.vue';
import PlainLayout from '@/layouts/plain.vue';
import site from '@/views/site/site.vue';
import renderHtml from '@/components/page/renderHtml/renderHtml.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pagebuilder/:pageName',
      name: 'pagebuilder',
      component:() => import('../views/pageBuilder/pageBuilder.vue'),
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
      meta: {
        layout: PlainLayout,
      }
    },
    {
      path: '/site-editor',
      name: 'site-editor',
      component: SiteEditor, 
      meta: {
        layout: PlainLayout,
      }
    },
    {
      path: '/site',
      name: 'site',
      component: site, 
      meta: {
        layout: PlainLayout,
      }
    },
    {
      path: '/renderPage',
      name: 'renderPage',
      component: renderHtml,
      meta: {
        layout: PlainLayout,
      }
    },
    {
      path: '/pagelist',
      name: 'pageList',
      component: pageListVue,
      meta: {
        layout: PlainLayout,
      }
    },
    {
      path: '/page-editor',
      name: 'page-editor',
      component: pageEditor,
      meta: {
        layout: PlainLayout,
      }
    },
    { 
      path: '/command-editor',
      name: 'commandEditor',
      component: commandEditor,
    },
    { 
      path: '/command-structure',
      name: 'commandStructure',
      component: commandStructure,
    },

  ],
});

export default router;
