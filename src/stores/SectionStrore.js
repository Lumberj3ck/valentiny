import { defineStore } from "pinia";
import { transformData } from '@/js/transform_data'
import { save_sections } from '@/js/api'
import { isAuthenticated } from '@/js/utils'

export const useSectionStore = defineStore('section_store', {
    state: () => ({
        sections: {
            start_section: {
                index: 1, background_color: '', text_color: '', render: true, image_inputs:
                {
                    1: { link: null},
                },
                text_inputs:
                {
                    1: { content: null },
                    2: { content: null },
                }
            },
            reasons_like_you_section: {
                index: 2, background_color: '', text_color: '', render: true,
                image_inputs:
                {
                    1: { link: null },
                },
                text_inputs:
                {
                    1: { content: null },
                    2: { content: null },
                    3: { content: null },
                    4: { content: null },
                    5: { content: null },
                    6: { content: null },
                    7: { content: null },
                    8: { content: null },
                }
            },
            like_you_section: {
                index: 3, background_color: '', text_color: '', render: true,
                image_inputs:
                {
                    1: { link: null },
                },
                text_inputs:
                {
                    1: { content: null },
                    2: { content: null },
                    3: { content: null },
                    4: { content: null }
                }
            },
            love_potion_section: {
                index: 4, background_color: '', text_color: '', render: true,
                image_inputs:
                {
                    1: { link: null },
                },
                text_inputs:
                {
                    1: { content: null },
                    2: { content: null },
                    3: { content: null },
                    4: { content: null },
                    5: { content: null },
                    6: { content: null },
                    7: { content: null },
                    8: { content: null }
                }
            },
            favorite_artists: {
                index: 5, background_color: '', text_color: '', render: true,
                image_inputs:
                {
                    1: { link: null },
                    2: { link: null },
                    3: { link: null },
                    4: { link: null }
                },
                text_inputs:
                {
                    1: { content: null },
                    2: { content: null },
                    3: { content: null },
                    4: { content: null },
                    5: { content: null },
                    6: { content: null }
                }
            }
        }
    }),
    actions: {
        toggleRendering(sectionName) {
            this.sections[sectionName].render = !this.sections[sectionName].render
            this.autoSave()
        },
        resetColors(sectionName) {
            this.sections[sectionName].background_color = null
            this.sections[sectionName].text_color = null
            this.autoSave()
        },
        setBgColor(sectionName, background_color) {
            this.sections[sectionName].background_color = background_color
            this.autoSave()
        },
        setColor(sectionName, color) {
            this.sections[sectionName].text_color = color
            this.autoSave()
        },
        setInputData(sectionName, input_id, data) { 
            this.sections[sectionName].text_inputs[input_id].content = data
            this.autoSave()
        },
        setImageLink(sectionName, image_input_id, link) {
            this.sections[sectionName].image_inputs[image_input_id].link = link 
            this.autoSave()
        },
        updateSectionState(sections_data) {
            for (const section_name in sections_data) {
                this.sections[section_name] = sections_data[section_name];
            }
            this.autoSave()
        },
        autoSave() {
            console.log('auto save called')
            if (!this.saveTimeout && isAuthenticated()) {
                this.saveTimeout = setTimeout(() => {
                    this.debouncedSave();
                    this.saveTimeout = null;
                }, 5000);
            }
        },
        debouncedSave() {
            const rearanged_data = transformData(this.sections)
            save_sections(rearanged_data)
                .then(() => {
                    console.log('Auto-saved successfully')
                })
                .catch((error) => {
                    console.error('Error during auto-save:', error)
                })
        },
    },
    getters: {
        getColors: (state) => (sectionName) => {
            return {
                'background-color': state.sections[sectionName].background_color,
                'color': state.sections[sectionName].text_color
            }
        },
        getBgColor: (state) => (sectionName) => {
            return state.sections[sectionName].background_color
        },
        getTextColor: (state) => (sectionName) => {
            return state.sections[sectionName].text_color
        },
        getImageLink: (state) => (sectionName, image_input_id) => {
            return state.sections[sectionName].image_inputs[image_input_id].link
        },
        getInputData: (state) => (sectionName, input_id) => {
            return state.sections[sectionName].text_inputs[input_id].content
        },
        allSectionsSaved() {
            for (const key in this.sections) {
                if (!this.sections[key].id) {
                    return false;
                }
            }
            return true;
        }
    }
})