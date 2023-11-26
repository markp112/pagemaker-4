import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CloseButton from '../../baseButton/closeButton/closeButton.vue';

describe('Base button component', () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallowMount( CloseButton, {
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should emit an onClick Event when the button is clicked', async () => {
    wrapper.vm.$refs.BaseButton.$emit('onClick');
    expect(wrapper.emitted()).toHaveProperty('onClick');
  })
})