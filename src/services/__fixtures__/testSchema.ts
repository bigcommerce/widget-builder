const schemaData = `[
  {
    "type": "tab",
    "label": "Content",
    "sections": [
      {
        "settings": [
          {
            "type": "input",
            "id": "buttonText",
            "label": "Button label",
            "default": "Button text"
          },
          {
            "type": "input",
            "id": "buttonLink",
            "label": "Button link",
            "default": "",
            "typeMeta": {
              "placeholder": "https://"
            }
          }
        ]
      }
    ]
  },
  {
    "type": "tab",
    "label": "Design",
    "sections": [
      {
        "label": "Button label",
        "settings": [
          {
            "type": "select",
            "label": "Font family",
            "id": "fontFamily",
            "default": "inherit",
            "typeMeta": {
              "selectOptions" : [
                {
                  "label": "Default",
                  "value": "inherit"
                },
                {
                  "label": "Arial",
                  "value": "Arial"
                },
                {
                  "label": "Times New Roman",
                  "value": "Times New Roman"
                },
                {
                  "label": "Karla",
                  "value": "Karla"
                },
                {
                  "label": "Roboto",
                  "value": "Roboto"
                },
                {
                  "label": "Source Sans Pro",
                  "value": "Source Sans Pro"
                },
                {
                  "label": "Montserrat",
                  "value": "Montserrat"
                },
                {
                  "label": "Open Sans",
                  "value": "Open Sans"
                },
                {
                  "label": "Volkhov",
                  "value": "Volkhov"
                }
              ]
            }
          },
          {
            "type": "select",
            "label": "Font Weight",
            "id": "fontWeight",
            "default": "400",
            "typeMeta": {
              "selectOptions" : [
                {
                  "label": "Thin",
                  "value": "100"
                },
                {
                  "label": "Extra Light (Ultra Light)",
                  "value": "200"
                },
                {
                  "label": "Light",
                  "value": "300"
                },
                {
                  "label": "Normal",
                  "value": "400"
                },
                {
                  "label": "Medium",
                  "value": "500"
                },
                {
                  "label": "Semi Bold (Demi Bold)",
                  "value": "600"
                },
                {
                  "label": "Bold",
                  "value": "700"
                },
                {
                  "label": "Extra Bold (Ultra Bold)",
                  "value": "800"
                },
                {
                  "label": "Black (Heavy)",
                  "value": "900"
                }
              ]
            }
          },
          {
            "type": "select",
            "label": "Font size",
            "id": "textSize",
            "default": "14px",
            "typeMeta": {
              "selectOptions" : [
                {
                  "label": "14px",
                  "value": "14px"
                },
                {
                  "label": "16px",
                  "value": "16px"
                },
                {
                  "label": "18px",
                  "value": "18px"
                },
                {
                  "label": "20px",
                  "value": "20px"
                },
                {
                  "label": "24px",
                  "value": "24px"
                },
                {
                  "label": "28px",
                  "value": "28px"
                }
              ]
            }
          },
          {
            "type": "select",
            "label": "Text decoration",
            "id": "textDecoration",
            "default": "none",
            "typeMeta": {
              "selectOptions": [
                {
                  "label": "None",
                  "value": "none"
                },
                {
                  "label": "Underline",
                  "value": "underline"
                }
              ]
            }
          }
        ]
      },
      {
        "label": "Button appearance",
        "settings": [{
            "type": "boolean",
            "label": "Toggle button appearance",
            "id": "buttonStyle",
            "default": true
        }]
      },
      {
        "label": "Button style",
        "settings": [
          {
            "type": "range",
            "label": "Border thickness",
            "id": "buttonBorder",
            "default": 1,
            "typeMeta": {
              "rangeValues": {
                "min": 0,
                "max": 10,
                "step": 1,
                "unit": "px"
              }
            }
          },
          {
            "type": "range",
            "label": "Border radius",
            "id": "borderRadius",
            "default": 4,
            "typeMeta": {
              "rangeValues": {
                "min": 0,
                "max": 100,
                "step": 1,
                "unit": "px"
              }
            }
          },
          {
            "type": "alignment",
            "label": "Button alignment",
            "id": "alignment",
            "default": {
              "horizontal": "center"
            },
            "typeMeta": {
              "display": "horizontal"
            }
          },
          {
            "type": "boxModel",
            "label": "Margin",
            "id": "buttonMargin",
            "default": {
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
            }
          },
          {
            "type": "boxModel",
            "label": "Padding",
            "id": "buttonPadding",
            "default": {
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
            }
          },
          {
            "type" : "toggle",
            "id": "buttonToggle",
            "default": "normal",
            "typeMeta": {
              "selectOptions": [
                {
                  "label": "Normal",
                  "value": "normal"
                },
                {
                  "label": "Hover",
                  "value": "hover"
                }
              ],
              "conditionalSettings": [
                {
                  "condition": "normal",
                  "settings": [
                    {
                      "type": "color",
                      "label": "Background color",
                      "id": "backgroundColor",
                      "default": "#444444"
                    },
                    {
                      "type": "color",
                      "label": "Text color",
                      "id": "textColor",
                      "default": "#FFFFFF"
                    },
                    {
                      "type": "color",
                      "label": "Border color",
                      "id": "borderColor",
                      "default": "#444444"
                    }
                  ]
                },
                {
                  "condition": "hover",
                  "settings": [
                    {
                      "type": "color",
                      "label": "Background color",
                      "id": "backgroundColorHover",
                      "default": "#444444"
                    },
                    {
                      "type": "color",
                      "label": "Text color",
                      "id": "textColorHover",
                      "default": "#FFFFFF"
                    },
                    {
                      "type": "color",
                      "label": "Border color",
                      "id": "borderColorHover",
                      "default": "#FFFFFF"
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ]
  }
]`;

export default schemaData;
