import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BaseButton from '../../basebutton/baseButton.vue';
import IconImage from '../../../../components/utility/icon/icon.vue';

describe('Base button component', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount( BaseButton, {
      propsData: {
        buttonType: 'primary',
        size: 'small',
  
        variant: 'solid',
        buttonShape: 'rectangular',
        iconName: 'test',
      },
      slots: {
        default: 'Click me',
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('initializes with correct elements', () => { 
    expect(wrapper).toBeDefined();
    expect(wrapper.findAll('button').length).equal(1);
    expect(wrapper.findComponent(IconImage).exists()).toBe(true);
  })

  it('should emit an onClick Event when the button is clicked', () => {
    wrapper.trigger('click');
    expect(wrapper.emitted().onClick).toBeTruthy();
  })

  it('should render content in the slot', () => {
    expect(wrapper.html()).toContain('Click me');
  })

  it('should render the correct button type', () => {
    expect(wrapper.html()).toContain('primary');
  })

  it('should disable the button when disabled is true', async () => {
    await wrapper.setProps({ disabled: true });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.element.disabled).toBe(true);
  })

  it('should render the correct size of button based on the button size and shape', async () => {
    await wrapper.setProps({ size: 'small', buttonShape: 'rectangular' });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.element.classList.contains('h-6')).toBe(true);
  })
})