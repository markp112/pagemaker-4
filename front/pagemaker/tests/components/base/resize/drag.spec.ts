import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Location } from '@/classes/location';
import { useDrag } from '@/components/base/resize/drag';

const left = {
  style: 'left',
  value: {
    value: '0',
    unit: 'px'
  }
};
const top = {
  style: 'top',
  value: {
    value: '0',
    unit: 'px'
  }
}

describe('useDrag', () => {

  let location: Location;

  beforeEach(() => {
    location = {
      left,
      top,
    };

  })

it('should return an object with the correct properties', () => {
  const currentLocation = location;
  const result = useDrag(currentLocation);

  expect(result).toHaveProperty('dragStart');
  expect(result).toHaveProperty('setInitialLocation');
  expect(result).toHaveProperty('isDragging');
  expect(result).toHaveProperty('left');
  expect(result).toHaveProperty('top');
});

it('should set isDragging to true when dragStart is called', () => {
  const currentLocation = location;
  const result = useDrag(currentLocation);

  expect(result.isDragging.value).toBe(false);

  const event = new MouseEvent('mousedown');
  result.dragStart(event);

  expect(result.isDragging.value).toBe(true);
});


});