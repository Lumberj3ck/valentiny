import { defineStore } from "pinia";

export const useSectionStore = defineStore('section_store',
    {
        state: () => ({
            sections: {
                'start_section': {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        'start_section_header_input': { content: 'some text' },
                        'start_section_paragraph_input': { content: 'some text' },
                        'start_section_paragraph_2_input': { content: 'some text' }
                    }
                },
                'reasons_like_section': {
                    background_color: '#somecolor', text_color: '#somecolor', image_input: 'image_path', text_inputs:
                    {
                        'reasons_header_input': { content: 'some text' },
                        'reasons_paragraph_input': { content: 'some text' },
                        'reasons_paragraph_2_input': { content: 'some text' }
                    }
                }
            }
        })
    }
)