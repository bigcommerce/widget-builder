export const starterSchema = JSON.stringify(
    [
        {
            type: 'tab',
            label: 'Design',
            sections: [
                {
                    label: 'Sample Text',
                    settings: [
                        {
                            type: 'input',
                            id: 'content',
                            label: 'Content',
                            default: 'I am a sample text',
                        },
                        {
                            type: 'input',
                            id: 'color',
                            label: 'Text Color',
                            default: '#FFFFFF',
                        },
                        {
                            type: 'input',
                            id: 'background_color',
                            label: 'Background Color',
                            default: '#3C1F8C',
                        },
                        {
                            type: 'number',
                            id: 'font_size',
                            label: 'Font Size',
                            default: {
                                value: 24,
                                type: 'px',
                            },
                        },
                        {
                            type: 'select',
                            id: 'font_weight',
                            label: 'Font Weight',
                            default: '500',
                            typeMeta: {
                                selectOptions: [
                                    {
                                        label: 'Thin',
                                        value: '100',
                                    },
                                    {
                                        label: 'Extra Light (Ultra Light)',
                                        value: '200',
                                    },
                                    {
                                        label: 'Light',
                                        value: '300',
                                    },
                                    {
                                        label: 'Normal',
                                        value: '400',
                                    },
                                    {
                                        label: 'Medium',
                                        value: '500',
                                    },
                                    {
                                        label: 'Semi Bold (Demi Bold)',
                                        value: '600',
                                    },
                                    {
                                        label: 'Bold',
                                        value: '700',
                                    },
                                    {
                                        label: 'Extra Bold (Ultra Bold)',
                                        value: '800',
                                    },
                                    {
                                        label: 'Black (Heavy)',
                                        value: '900',
                                    },
                                ],
                            },
                        },
                        {
                            type: 'alignment',
                            label: 'Text Alignment',
                            id: 'text_align',
                            default: {
                                horizontal: 'center',
                                vertical: 'middle',
                            },
                            typeMeta: {
                                display: 'horizontal',
                            },
                        },
                        {
                            type: 'boxModel',
                            label: 'Margin',
                            id: 'margin',
                            default: {
                                top: {
                                    value: '0',
                                    type: 'px',
                                },
                                right: {
                                    value: '0',
                                    type: 'px',
                                },
                                bottom: {
                                    value: '0',
                                    type: 'px',
                                },
                                left: {
                                    value: '0',
                                    type: 'px',
                                },
                            },
                        },
                        {
                            type: 'boxModel',
                            label: 'Padding',
                            id: 'padding',
                            default: {
                                top: {
                                    value: '8',
                                    type: 'px',
                                },
                                right: {
                                    value: '24',
                                    type: 'px',
                                },
                                bottom: {
                                    value: '8',
                                    type: 'px',
                                },
                                left: {
                                    value: '24',
                                    type: 'px',
                                },
                            },
                        },
                    ],
                },
            ],
        },
    ], null, 2,
);

export const starterConfiguration = JSON.stringify(
    {
        text: 'Simple Text with Styling',
        '_.id': '1',
        color: 'white',
        background_color: '#3C1F8C',
        font_size: { value: 24, type: 'px' },
        font_weight: 'bold',
        text_align: { horizontal: 'center' },
        margin: {
            top: {
                value: '0',
                type: 'px',
            },
            right: {
                value: '0',
                type: 'px',
            },
            bottom: {
                value: '0',
                type: 'px',
            },
            left: {
                value: '0',
                type: 'px',
            },
        },
        padding: {
            top: {
                value: '8',
                type: 'px',
            },
            right: {
                value: '24',
                type: 'px',
            },
            bottom: {
                value: '8',
                type: 'px',
            },
            left: {
                value: '24',
                type: 'px',
            },
        },
        content: 'I am a sample text',
    },
    null, 2,
).trim();


export const starterHtmlTemplate = (widgetTemplateName: string) => `
<style>
        #bc-simple-text-{{_.id}} {
            color: {{color}};
            background: {{background_color}};
            font-size: {{font_size.value}}{{font_size.type}};
            font-weight: {{font_weight}};
            text-align: {{text_align.horizontal}};
            padding-top: {{padding.top.value}}{{padding.top.type}};
            padding-right: {{padding.right.value}}{{padding.right.type}};
            padding-bottom: {{padding.bottom.value}}{{padding.bottom.type}};
            padding-left: {{padding.left.value}}{{padding.left.type}};
            margin-top: {{margin.top.value}}{{margin.top.type}};
            margin-right: {{margin.right.value}}{{margin.right.type}};
            margin-bottom: {{margin.bottom.value}}{{margin.bottom.type}};
            margin-left: {{margin.left.value}}{{margin.left.type}};
        }
        
        #widget-template-title {
            text-transform: capitalize;
            text-align: center;
        }
    </style>
    
    <h1 id='widget-template-title'>${widgetTemplateName.replace('-', ' ')}</h1>
    <p id='bc-simple-text-{{_.id}}'>{{content}}</p>

`;
