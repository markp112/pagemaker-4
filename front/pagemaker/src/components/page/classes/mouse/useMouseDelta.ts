import { ref } from 'vue';

function useMouseDelta() {
  const lastX = ref(0);
  const lastY = ref(0);
  const deltaX = ref(0);
  const deltaY = ref(0);

  function calcDelta(event: MouseEvent) {
    deltaX.value = event.pageX - lastX.value;
    deltaY.value = event.pageY - lastY.value;
    lastX.value = event.pageX;
    lastY.value = event.pageY;
    return {deltaX, deltaY};
  }
  return { calcDelta };
}

export { useMouseDelta };