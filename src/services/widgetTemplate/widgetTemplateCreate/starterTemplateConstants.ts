export const starterSchema = JSON.stringify(
    {
        contentSet: [
            {
                text: 'Sample with without styling',
                id: 'without-styling',
            },
            {
                text: 'Simple Text with Styling',
                id: 'with-styling',
                style: {
                    color: 'white',
                    background_color: '#3C1F8C',
                    font_size: '45px',
                    font_weight: 'bold',
                    font_family: '\'Palatino Linotype\', \'Book Antiqua\', Palatino, serif',
                    text_align: 'center',
                    margin_right: '50px',
                    margin_left: '50px',
                    padding_top: '25px',
                    padding_bottom: '25px',
                },
            }],
    },
    null, 2,
).trim();


export const starterHtmlTemplate = (widgetTemplateName: string) => `
<style>
        {{#each contentSet}}
            {{#if style}}
                #bc-simple-text-{{id}} {
                    color: {{style.color}};
                    background: {{style.background_color}};
                    font-size: {{style.font_size}};
                    font-style: {{style.font_style}};
                    font-weight: {{style.font_weight}};
                    font-family: {{style.font_family}};
                    text-align: {{style.text_align}};
                    margin-top: {{style.margin_top}};
                    margin-bottom: {{style.margin_bottom}};
                    margin-left: {{style.margin_left}};
                    margin-right: {{style.margin_right}};
                    padding-top: {{style.padding_top}};
                    padding-bottom: {{style.padding_bottom}};
                }
            {{/if}}
        {{/each}}
        
        #widget-template-title {
            text-transform: capitalize;
        }
    </style>
    
    <h1 id="widget-template-title">${widgetTemplateName.replace('-', ' ')}</h1>
    {{#each contentSet}}
        <p id='bc-simple-text-{{id}}'>{{text}}</p>
    {{/each}}

`.trim();
