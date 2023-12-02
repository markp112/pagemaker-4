import { describe, it, expect } from 'vitest';
import { shallowMount, } from '@vue/test-utils';
import PageCanvas from '../../../../src/components/canvas/pageCanvas.vue';
import PageComponent  from '../../../../src/components/page/page.vue'
import { PageCanvasProps, ZOOM_PAGE, testPage } from './constants';

const createPageCanvasWrapper = (props: PageCanvasProps) => {
  return shallowMount(PageCanvas, { 
    propsData: props,

  });
} 
describe('PageCanvas.vue Implementation Test', () => {

  it('initializes with correct elements', () => {
    const wrapper = createPageCanvasWrapper({ scale: ZOOM_PAGE, page: testPage });
    expect(wrapper).toBeDefined();
    expect(wrapper.findAll('div').length).equal(1);
    expect(wrapper.findComponent(PageComponent).exists()).toBe(true);
  })

  it('processes valid props data', () => {
    const wrapper = createPageCanvasWrapper({ scale: ZOOM_PAGE, page: testPage });
    expect(wrapper.vm.scale).equal(ZOOM_PAGE);
    expect(wrapper.vm.page.pageId).equal(testPage.pageId);
    expect(wrapper.vm.page.siteId).equal(testPage.siteId);
  })

  it('passes the page props to the child component page', () => {
    const wrapper = createPageCanvasWrapper({ scale: ZOOM_PAGE, page: testPage });
    const pageComponent = wrapper.findComponent(PageComponent);
    expect(pageComponent.vm.page.pageId).equal(testPage.pageId);
    expect(pageComponent.vm.scale).equal(ZOOM_PAGE);
  })


})