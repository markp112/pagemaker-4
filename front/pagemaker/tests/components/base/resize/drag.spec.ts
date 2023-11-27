import { describe, it, expect, beforeEach } from 'vitest';
import { Location } from '@/classes/location';
import { useDrag } from '../../../../src/components/base/resize/useDrag';
import { fireEvent } from '@testing-library/dom';



describe('useDrag', () => {

  let location: Location;

  beforeEach(() => {
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
    };
    location = {
      left,
      top,
    };
  });

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

it('should set the initial values for left and top in setInitialLocation', () => {
  const currentLocation = location;
  const { setInitialLocation, left, top } = useDrag(currentLocation);
  currentLocation.left.value.value = '30';
  currentLocation.top.value.value = '40';
  setInitialLocation();
  expect(left.value).toBe('30px');
  expect(top.value).toBe('40px');
});

it('should update left and top with new values when handleDrag is called', () => {
  const currentLocation = location;
  const { setInitialLocation, dragStart, left, top } = useDrag(currentLocation);
  setInitialLocation();
  dragStart(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
  fireEvent.mouseMove(document, { clientX: 10, clientY: 20 });
  expect(left.value).toBe('10px');
  expect(top.value).toBe('20px');
});

it('should not update left and top with new values when mouseUp is called before handleDrag is called', () => {
  const currentLocation = location;
  const { setInitialLocation, dragStart, left, top } = useDrag(currentLocation);
  setInitialLocation();
  dragStart(new MouseEvent('mousedown', { clientX: 0, clientY: 0 }));
  fireEvent.mouseUp(document);
  fireEvent.mouseMove(document, { clientX: 10, clientY: 20 });
  expect(left.value).toBe('0px');
  expect(top.value).toBe('0px');
});

});