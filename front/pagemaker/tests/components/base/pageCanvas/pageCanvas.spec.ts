import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount, } from '@vue/test-utils';
import PageCanvas from '../../../../src/components/canvas/pageCanvas.vue';
import { Page } from '../../../../src/components/page/model/pageElement/pageElement';
import PageComponent  from '../../../../src/components/page/page.vue'

const testPage: Page = {
  pageId: '1234',
  siteId: 'test',
  name: 'test',
  backgroundColour: 'test',
  colour: 'test',
  created: new Date(),
  edited: new Date(),
  lastPublished: new Date(),
  icon: 'test',
  elements: [],
  styles: [],
  isContainer: false,
  classDefinition: '',
  componentHTMLTag: 'Root',
  dimension: {
    width: { style: 'width', value: {value: '100', unit: 'px'}},
    height: { style: 'height', value: {value: '100', unit: 'px'}}
  },
  parentRef: 'Root',
  ref: '1',
  type: 'rootContainer',
  };

describe('PageCanvas.vue Implementation Test', () => {
  let wrapper = null;
  const ZOOM_PAGE = 1;

  beforeEach(() => {
    wrapper = shallowMount(PageCanvas, {
      propsData: {
        zoomPage: ZOOM_PAGE,
        page: testPage,
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct elements', () => { 
    expect(wrapper).toBeDefined();
    expect(wrapper.findAll('div').length).equal(1);
    expect(wrapper.findComponent(PageComponent).exists()).toBe(true);
  })

  it('processes valid props data', () => {
    expect(wrapper.vm.zoomPage).equal(ZOOM_PAGE);
    expect(wrapper.vm.page.pageId).equal(testPage.pageId);
    expect(wrapper.vm.page.siteId).equal(testPage.siteId);
  })

  it('passes the page props to the child component page', () => {
    const pageComponent = wrapper.findComponent(PageComponent);
    expect(pageComponent.vm.page.pageId).equal(testPage.pageId);
  })


})