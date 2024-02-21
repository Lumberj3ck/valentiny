import { ref, computed } from 'vue';

export default function useComponentColor() {
  const background_color = ref('');
  const text_color = ref('');
  const is_render = ref(true);

  const primary_color = computed(() => ({
    'background-color': background_color.value,
    'color': text_color.value
  }));

  function resetColors() {
    background_color.value = '';
    text_color.value = '';
  }

  return {
    background_color,
    text_color,
    is_render,
    primary_color,
    resetColors
  };
}