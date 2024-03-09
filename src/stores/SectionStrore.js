import { defineStore } from "pinia";
// import { markRaw } from "vue";

export const useSectionStore = defineStore('section_store',
    {
        state: () => ({
            sections: {
                start_section: {
                    background_color: '#somecolor', text_color: '#somecolor', render: true, image_input: 'image_path', text_inputs:
                    {
                        1: { content: null},
                        2: { content: null},
                    }
                },
                reasons_like_you_section: {
                    background_color: '#somecolor', text_color: '#somecolor', render: true,image_input: 'image_path', text_inputs:
                    {
                        1: { content: null},
                        2: { content: null},
                        3: { content: null},
                        4: { content: null},
                        5: { content: null},
                        6: { content: null},
                        7: { content: null},
                        8: { content: null},
                    }
                },
                like_you_section: {
                    background_color: '#somecolor', text_color: '#somecolor', render: true, image_input: 'image_path', text_inputs:
                    {
                        1: { content: null },
                        2: { content: null },
                        3: { content: null },
                        4: { content: null }
                    }
                },
                love_potion_section: {
                    background_color: '#somecolor', text_color: '#somecolor', render: true, image_input: 'image_path', text_inputs:
                    {
                        1: { content: null},
                        2: { content: null},
                        3: { content: null},
                        4: { content: null},
                        5: { content: null},
                        6: { content: null},
                        7: { content: null},
                        8: { content: null}
                    }
                },
                favorite_artists: {
                    background_color: '#somecolor', text_color: '#somecolor', render: true, image_input: 'image_path', text_inputs:
                    {
                        1: { content: 'some text' },
                        2: { content: 'some text' },
                        3: { content: 'some text' }
                    }
                }
            }
        }),
        actions:{
            toggleRendering(sectionName){
                this.sections[sectionName].render = !this.sections[sectionName].render
            },
            resetColors(sectionName){
                this.sections[sectionName].background_color = null 
                this.sections[sectionName].text_color = null
            },
            setBgColor(sectionName, background_color){
                this.sections[sectionName].background_color = background_color
            },
            setColor(sectionName, color){
                this.sections[sectionName].text_color = color 
            },
            setInputData(sectionName, input_id, data){
                this.sections[sectionName].text_inputs[input_id].content = data
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
            }

        }
    }
)