import { describe, it, expect } from 'vitest';
import IconImage from '../../../../src/components/utility/icon/icon.vue';
import { ButtonShape, ButtonSize, sizeMap } from '../../../../src/components/base/basebutton/model/model';
import {  ButtonProps, circularButton, defaultProps, largeButton, mediumButton, rectangularButton, smallButton } from './constants';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { combineShapeAndSize } from './baseButton.helper';
import BaseButton from '../../../../src/components/base/basebutton/baseButton.vue';

const createButtonWrapper = (props: ButtonProps) => {
  return shallowMount(BaseButton, { 
    propsData: props,
    slots: {
      default: 'Click me',
    }
  });
} 

describe('Base button component', () => {

  it('initializes with correct elements', () => {
    const wrapper = createButtonWrapper(defaultProps);
    expect(wrapper).toBeDefined();
    expect(wrapper.findAll('button').length).equal(1);
    expect(wrapper.findComponent(IconImage).exists()).toBe(true);
  })

  it('should not render the iconImage element when iconName is empty', () => {
    const props = { ...defaultProps, iconName: '' };
    const wrapper = createButtonWrapper(props);
    expect(wrapper).toBeDefined();
    expect(wrapper.findComponent(IconImage).exists()).toBe(false);
  })

  it('should emit an onClick Event when the button is clicked', () => {
    const wrapper = createButtonWrapper(defaultProps);
    wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('onClick');
    expect(wrapper.emitted().onClick).toBeTruthy();
  })

  it('should render content in the slot', () => {
    const wrapper = createButtonWrapper(defaultProps);
    expect(wrapper.html()).toContain('Click me');
  })

  it('should disable the button when disabled is true', async () => {
    const wrapper = createButtonWrapper(defaultProps);
    await wrapper.setProps({ disabled: true });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.element.disabled).toBe(true);
  })

  it('should not be disabled when disabled is false', async () => {
    const wrapper = createButtonWrapper(defaultProps);
    await wrapper.setProps({ disabled: false });
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.element.disabled).toBe(false);
  })

  describe('button props size and shape', () => {
    const checkButtonSizeAndShape = async (size: ButtonSize , buttonShape: ButtonShape ) => {
      const wrapper = createButtonWrapper(defaultProps);
      await wrapper.setProps({ size, buttonShape });
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      const classList = sizeMap[combineShapeAndSize(size, buttonShape)].split(' ');
      classList.forEach(classItem => expect(button.element.classList.contains(classItem)).toBe(true));
    }

    it('should render a small rectangular button when size is small and the shape is rectangular', async () => {
      checkButtonSizeAndShape(smallButton, rectangularButton);
    })

    it('should render a medieum rectangular button when size is medium and the shape is rectangular', async () => {
      checkButtonSizeAndShape(mediumButton, rectangularButton);
    })

    it('should render a large rectangular button when size is large and the shape is rectangular', async () => {
      checkButtonSizeAndShape(largeButton, rectangularButton);
    })
    it('should render a small circular button when size is small and the shape is circle', async () => {
      checkButtonSizeAndShape(smallButton, circularButton);
    })

    it('should render a medium circular button when size is medium and the shape is circle', async () => {
      checkButtonSizeAndShape(mediumButton, circularButton);
    })

    it('should render a large circular button when size is large and the shape is circle', async () => {
      checkButtonSizeAndShape(largeButton, circularButton);
    })
  })

  describe('button props variant', () => {
    it('should render a solid button when variant is solid', async () => {
      const wrapper = createButtonWrapper({ ...defaultProps, variant: 'solid' });
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.element.classList.contains('bg-site-primary')).toBe(true);
      expect(button.element.classList.contains('text-site-surface')).toBe(true);
    })

    it('should render an outline button when variant is outline', async () => {
      const wrapper = createButtonWrapper({ ...defaultProps, variant: 'outline' });
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.element.classList.contains('border-site-primary')).toBe(true);
      expect(button.element.classList.contains('text-on-surface')).toBe(true);
      expect(button.element.classList.contains('hover:bg-site-primary-light')).toBe(true);
    })

    it('should render a text button when variant is text', async () => {
      const wrapper = createButtonWrapper({ ...defaultProps, variant: 'text' });
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.element.classList.contains('text-site-primary')).toBe(true);
    })

    it('should render a default button when variant is default', async () => {
      const wrapper = createButtonWrapper({ ...defaultProps, variant: 'default' });
      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(button.element.classList.contains('bg-site-primary')).toBe(true);
      expect(button.element.classList.contains('text-site-surface')).toBe(true);
    })
  })
})