import { ref, onMounted, onUnmounted } from 'vue';

function useMouse() {
  const x = ref(0);
  const y = ref(0);
  const prevX = ref(0);
  const prevY = ref(0);
  const deltaX= ref(0);
  const deltaY = ref(0);

  function updatePosition(event: MouseEvent) {
    prevX.value = x.value;
    prevY.value = y.value; 
    x.value = event.pageX;
    y.value = event.pageY;
    deltaX.value = x.value - prevX.value;
    deltaY.value = y.value - prevY.value;
  }
  
  onMounted(() => window.addEventListener('mousemove', updatePosition));
  onUnmounted(() => window.removeEventListener('mousemove', updatePosition));

  return { x, y };
}

export { useMouse };