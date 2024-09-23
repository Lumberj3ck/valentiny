import { defineStore } from 'pinia';

export const useImageUploadStore = defineStore('imageUpload', {
  state: () => ({
    uploadingResources: []
  }),
  actions: {
    addResource(resource) {
      this.uploadingResources.push(resource);
      console.log(this.uploadingResources)
    },
    removeResource(resource) {
      this.uploadingResources = this.uploadingResources.filter(r => r !== resource);
    }
  }
});
