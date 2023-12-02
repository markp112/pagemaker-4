import { describe, it, expect, beforeEach } from 'vitest';
import { useDrag } from '../../../../src/components/base/resize/useDrag';
import { fireEvent } from '@testing-library/dom';
import { Location } from '@/classes/location';
import { CLIENT_X_MOVE, CLIENT_X_ZERO, CLIENT_Y_MOVE, CLIENT_Y_ZERO, INITIAL_LEFT, INITIAL_TOP, MOVE_LEFT, MOVE_TOP, ZERO_LEFT, ZERO_TOP } from './constants';

describe('useDrag', () => {
  let location: Location;

  beforeEach(() => {
    location = {
      left: {
        style: 'left',
        value: {
          value: ZERO_LEFT,
          unit: 'px'
        }
      },
      top: {
        style: 'top',
        value: {
          value: ZERO_TOP,
          unit: 'px'
        }
      }
    };
  })

  it('should return an object with the correct properties', () => {
    const result = useDrag(location);
    expect(result).toHaveProperty('dragStart');
    expect(result).toHaveProperty('setInitialLocation');
    expect(result).toHaveProperty('isDragging');
    expect(result).toHaveProperty('left');
    expect(result).toHaveProperty('top');
  });

  it('should set isDragging to true when dragStart is called', () => {
    const result = useDrag(location);
    expect(result.isDragging.value).toBe(false);
    const event = new MouseEvent('mousedown');
    result.dragStart(event);
    expect(result.isDragging.value).toBe(true);
  });

  it('should set the initial values for left and top in setInitialLocation', () => {
    const {setInitialLocation, left, top } = useDrag(location);
    location.left.value.value = INITIAL_LEFT;
    location.top.value.value = INITIAL_TOP;
    setInitialLocation();
    expect(left.value).toBe(`${INITIAL_LEFT}px`);
    expect(top.value).toBe(`${INITIAL_TOP}px`);
  });

  it('should update left and top with new values when handleDrag is called', () => {
    const { left, top,  dragStart } = useDrag(location);
    dragStart(new MouseEvent('mousedown', { clientX: CLIENT_X_ZERO, clientY: CLIENT_Y_ZERO }));
    fireEvent.mouseMove(document, { clientX: MOVE_LEFT, clientY: MOVE_TOP });
    expect(left.value).toBe(`${CLIENT_X_MOVE}px`);
    expect(top.value).toBe(`${CLIENT_Y_MOVE}px`);
  });

  it('should not update left and top with new values when mouseUp is called before handleDrag is called', () => {
    const { left, top, setInitialLocation, dragStart } = useDrag(location);
    location.left.value.value = INITIAL_LEFT;
    location.top.value.value = INITIAL_TOP;
    setInitialLocation();
    dragStart(new MouseEvent('mousedown', { clientX: CLIENT_X_ZERO, clientY: CLIENT_Y_ZERO }));
    fireEvent.mouseUp(document);
    fireEvent.mouseMove(document, { clientX: MOVE_LEFT, clientY: MOVE_TOP });
    expect(left.value).toBe(`${INITIAL_LEFT}px`);
    expect(top.value).toBe(`${INITIAL_TOP}px`);
  });

});