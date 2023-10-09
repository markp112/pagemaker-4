import type { ButtonElement, ImageElement, TextElement } from '@/components/page/model/imageElement/imageElement';
import { reactive } from 'vue';
import { useMouseDelta } from './useMouseDelta';
import { Location } from '@/classes/location';
import { PageContainerInterface } from '../../model/pageContainer/container';

type DragableElements = TextElement | ButtonElement | PageContainerInterface | ImageElement;
type NotImageElement =  TextElement | ButtonElement | PageContainerInterface ;

function useDrag() {
  let activeComponent = reactive<DragableElements>(null);
  const mouseDelta = useMouseDelta();

  function onEnableMove(component: DragableElements, event: MouseEvent) {
    activeComponent = component;
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDisableMove);

    mouseDelta.calcDelta(event);
  }

  function onDisableMove() {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDisableMove);
  }

  const onDrag = (event: MouseEvent) => {
    const { deltaX, deltaY } = mouseDelta.calcDelta(event);
    const top = getLocationValue('top') + deltaY.value;
    const left = getLocationValue('left') + deltaX.value;
    setLocation('top', top);
    setLocation('left', left);
  };

  const getLocation = () => {
    if (isImageElement(activeComponent)) {
      return activeComponent.container.location;
    }
    return (activeComponent as NotImageElement).location
  } 

  const getLocationValue = (whichLocation: 'top' | 'left') => {
    const location: Location = getLocation();
    if (whichLocation === 'top') {
      return parseInt(location.top.value.value);
    } 
    return parseInt(location.left.value.value);
  }

  const setLocation = (whichLocation: 'top' | 'left', newValue: number) => {
    const location = getLocation();
    if (whichLocation === 'top') {
      location.top.value.value = newValue.toString();
    }
    location.left.value.value = newValue.toString()
  }

  const isImageElement = (element: ImageElement | NotImageElement ): element is ImageElement => {
      return 'container' in element;
  }

  return {
    onEnableMove,
    onDisableMove
  }
}

export { useDrag };
