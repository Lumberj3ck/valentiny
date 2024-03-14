import { defineStore } from "pinia";

export const useSectionStore = defineStore('section_store',
    {
        state: () => ({
            sections: {
                start_section: {
                    index: 1, background_color: '#000000', text_color: '#f9d0d7', render: true, image_inputs:
                    {
                        1: { link: null },
                        2: { link: null },
                    },
                    text_inputs:
                    {
                        1: { content: null },
                        2: { content: null },
                    }
                },
                reasons_like_you_section: {
                    index: 2, background_color: '#ffffff', text_color: '#000000', render: true,
                    image_inputs:
                    {
                        1: { link: null },
                        2: { link: null },
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
                    index: 3, background_color: '#5e0dab', text_color: '#7cf278', render: true,
                    image_inputs:
                    {
                        1: { link: null },
                        2: { link: null },
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
                    index: 4, background_color: '#123681', text_color: '#D9CAE3', render: true,
                    image_inputs:
                    {
                        1: { link: null },
                        2: { link: null },
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
                    index: 5, background_color: '#ffffff', text_color: '#000000', render: true,
                    image_inputs:
                    {
                        1: { link: null },
                        2: { link: null },
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
            },
            resetColors(sectionName) {
                this.sections[sectionName].background_color = null
                this.sections[sectionName].text_color = null
            },
            setBgColor(sectionName, background_color) {
                // alert('Setting bg color')
                this.sections[sectionName].background_color = background_color
            },
            setColor(sectionName, color) {
                // alert('Setting text color')
                this.sections[sectionName].text_color = color
            },
            setInputData(sectionName, input_id, data) {
                this.sections[sectionName].text_inputs[input_id].content = data
            },
            updateSectionState(sections_data) {
                // this.sections = sections_data;
                // console.log(sections_data, this.sections)
                for (const section_name in sections_data) {
                    this.sections[section_name] = sections_data[section_name];
                }
            }
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
    }
)