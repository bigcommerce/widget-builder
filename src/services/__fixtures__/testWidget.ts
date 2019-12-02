const htmlData = `{
  "buttonText": "Button text",
  "buttonLink": "",
  "fontFamily": "inherit",
  "fontWeight": "400",
  "textSize": "14px",
  "textDecoration": "none",
  "buttonStyle": true,
  "buttonBorder": 1,
  "borderRadius": 4,
  "alignment": {
    "horizontal": "center"
  },
  "buttonMargin": {
    "top": {
      "value": "0",
      "type": "px"
    },
    "right": {
      "value": "0",
      "type": "px"
    },
    "bottom": {
      "value": "0",
      "type": "px"
    },
    "left": {
      "value": "0",
      "type": "px"
    }
  },
  "buttonPadding": {
    "top": {
      "value": "10",
      "type": "px"
    },
    "right": {
      "value": "20",
      "type": "px"
    },
    "bottom": {
      "value": "10",
      "type": "px"
    },
    "left": {
      "value": "20",
      "type": "px"
    }
  },
  "backgroundColor": "#444444",
  "textColor": "#FFFFFF",
  "borderColor": "#444444",
  "backgroundColorHover": "#444444",
  "textColorHover": "#FFFFFF",
  "borderColorHover": "#FFFFFF",
  "buttonToggle": "normal"
}C02QR7TTG8WN:sd-simple-button david.huynh (MERC-5782): clear

C02QR7TTG8WN:sd-simple-button david.huynh (MERC-5782): ll
total 48
-rw-r--r--  1 david.huynh  staff  1019 Nov 26 11:13 config.json
-rw-r--r--  1 david.huynh  staff  9053 Nov 19 11:38 schema.json
-rw-r--r--  1 david.huynh  staff  1834 Jul 30 16:34 widget.html
-rw-r--r--  1 david.huynh  staff    93 Nov 11 13:13 widget.yaml
C02QR7TTG8WN:sd-simple-button david.huynh (MERC-5782): cat widget.html
<style>
  .sd-button-{{_.id}} {
    display: flex;
    align-items: center;
      {{#if alignment.horizontal '===' 'center'}}
        justify-content: center;
      {{else if alignment.horizontal '===' 'left'}}
        justify-content: flex-start;
      {{else if alignment.horizontal '===' 'right'}}
        justify-content: flex-end;
      {{/if}}
  }

  .sd-button-{{_.id}} a {
    color: {{textColor}};
    font-size: {{textSize}};
    font-family: {{fontFamily}};
    font-weight: {{fontWeight}};
    padding-top: {{buttonPadding.top.value}}{{buttonPadding.top.type}};
    padding-right: {{buttonPadding.right.value}}{{buttonPadding.right.type}};
    padding-bottom: {{buttonPadding.bottom.value}}{{buttonPadding.bottom.type}};
    padding-left: {{buttonPadding.left.value}}{{buttonPadding.left.type}};
    margin-top: {{buttonMargin.top.value}}{{buttonMargin.top.type}};
    margin-right: {{buttonMargin.right.value}}{{buttonMargin.right.type}};
    margin-bottom: {{buttonMargin.bottom.value}}{{buttonMargin.bottom.type}};
    margin-left: {{buttonMargin.left.value}}{{buttonMargin.left.type}};
    text-align: center;
    text-decoration: {{textDecoration}};
  }

  {{#if buttonStyle '===' true}}
    .sd-button-{{_.id}} a {
      background-color: {{backgroundColor}};
      border: {{buttonBorder}}px solid {{borderColor}};
      border-radius: {{borderRadius}}px;
    }

    .sd-button-{{_.id}} a:hover {
      background-color: {{backgroundColorHover}};
      border-color: {{borderColorHover}};
      color: {{textColorHover}};
    }
  {{/if}}

  @media only screen and (max-width: 700px) {
    .sd-button-{{_.id}} { }
  }
</style>

<div class="sd-button-widget sd-button-{{_.id}}">
    <a href="{{buttonLink}}"
       {{#if buttonStyle '===' true}}
           role="button"
       {{/if}}
    >{{buttonText}}</a>
</div>`;

export default htmlData;
