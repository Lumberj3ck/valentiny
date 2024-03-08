import { defineStore } from "pinia";

export const useSectionStore = defineStore('section_store',
    {
        state: () => ({
            sections: {
                start_section: {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        1: { content: null},
                        2: { content: null},
                    }
                },
                reasons_like_you_section: {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        1: { content: 'some text' },
                        2: { content: 'some text' },
                        3: { content: 'some text' }
                    }
                },
                like_you_section: {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        1: { content: 'some text' },
                        2: { content: 'some text' },
                        3: { content: 'some text' }
                    }
                },
                love_potion_section: {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        1: { content: 'some text' },
                        2: { content: 'some text' },
                        3: { content: 'some text' }
                    }
                },
                favorite_artists: {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        1: { content: 'some text' },
                        2: { content: 'some text' },
                        3: { content: 'some text' }
                    }
                }
            }
        }),
        actions:{
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
            getTextColor: (state) => (sectionName) => {
                return state.sections[sectionName].text_color
            },
            getInputData: (state) => (sectionName, input_id) => {
                return state.sections[sectionName].text_inputs[input_id].content
            }

        }
    }
)