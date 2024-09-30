import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSectionStateStore = defineStore('sectionState', () => {
  const componentRef = ref(null);

  function setComponentRef(ref) {
    componentRef.value = ref;
  }

  return {
    componentRef,
    setComponentRef
  };
});
