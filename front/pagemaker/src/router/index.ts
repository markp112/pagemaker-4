import loginVue from '@/views/auth/login.vue';
import { createRouter, createWebHistory } from 'vue-router';
import sitesVue from '@/views/sites/sites.vue';
import SiteEditor from '@/views/sites/site-editor/siteEditor.vue';
import pageListVue from '@/views/pageList/pageList.vue';
import pageEditor from '@/views/pageList/page-editor/page-editor.vue';
import commandEditor from '@/views/admin/commandEditor/commandEditor.vue';
import commandStructure from '@/views/admin/commandEditor/commandStructure/commandStructure.vue';
import PlainLayout from '@/layouts/plain.vue';
import componentEditor from '@/views/admin/componentEditor/componentEditor.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pagebuilder/:pageName',
      name: 'pagebuilder',
      component:() => import('../views/pageBuilder/pageBuilder.vue'),
      meta: {
        breadcrumb: [{ name: 'sites', link: 'sites' }, 
        { name: 'pages', link: '/pagelist'},
        { name: 'page-builder'}],
      }
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
        breadcrumb: [{ name: 'sites' }],
        layout: PlainLayout,
      }
    },
    {
      path: '/site-editor',
      name: 'site-editor',
      component: SiteEditor, 
      meta: {
        breadcrumb: [{ name: 'sites', link: 'sites' }, {name: 'site-editor'}],
        layout: PlainLayout,
      }
    },
    {
      path: '/component-editor',
      name: 'component-editor',
      component: componentEditor,
      meta: {
        breadcrumb: [{ name: 'sites', link:'sites'}, {name: 'component-editor'}]
      }
    },
    {
      path: '/pagelist',
      name: 'pageList',
      component: pageListVue,
      meta: {
        breadcrumb: [{ name: 'sites', link: 'sites' }],
        layout: PlainLayout,
      }
    },
    {
      path: '/page-editor',
      name: 'page-editor',
      component: pageEditor,
      meta: {
        breadcrumb:  [{ name: 'sites', link: 'sites' }, 
          {name: 'pages', link: '/pagelist'},
          {name: 'page-editor'}
        ],
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
