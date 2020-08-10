const jsonSchema = {
    definitions: {
        schema: {
            type: 'array',
            items: {
                anyOf: [
                    { $ref: '#/definitions/arraySchema' },
                    { $ref: '#/definitions/tabSchema' },
                    { $ref: '#/definitions/hiddenSchema' },
                ],
            },
        },
        arraySchema: {
            type: 'object',
            properties: {
                type: { enum: ['array'] },
                id: {
                    type: 'string',
                },
                label: {
                    type: 'string',
                },
                defaultCount: {
                    type: 'number',
                },
                entryLabel: {
                    type: 'string',
                },
                schema: {
                    $ref: '#/definitions/schema',
                },
                thumbnail: {
                    type: 'object',
                },
            },
            required: ['id', 'type', 'label', 'schema', 'entryLabel'],
            additionalProperties: false,
        },
        hiddenSchema: {
            type: 'object',
            properties: {
                type: { enum: ['hidden'] },
                settings: {
                    type: 'array',
                    items: { $ref: '#/definitions/baseSchemaSetting' },
                },
            },
            required: ['settings', 'type'],
            additionalProperties: false,
        },
        tabSchema: {
            type: 'object',
            properties: {
                type: { enum: ['tab'] },
                label: {
                    type: 'string',
                },
                sections: {
                    type: 'array',
                    items: { $ref: '#/definitions/schemaSection' },
                },
            },
            required: ['sections', 'label', 'type'],
            additionalProperties: false,
        },
        schemaSection: {
            type: 'object',
            properties: {
                label: {
                    type: 'string',
                },
                settings: {
                    type: 'array',
                    items: { $ref: '#/definitions/labeledSchemaSetting' },
                },
            },
            additionalProperties: false,
        },
        baseSchemaSetting: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                },
                default: {},
            },
            required: ['id'],
        },
        labeledSchemaSetting: {
            allOf: [
                { $ref: '#/definitions/baseSchemaSetting' },
            ],
            properties: {
                label: {
                    type: 'string',
                },
                conditional: {
                    $ref: '#/definitions/conditionalDisplay',
                },
            },
            oneOf: [
                { $ref: '#/definitions/alignmentSetting' },
                { $ref: '#/definitions/booleanSetting' },
                { $ref: '#/definitions/boxModelSetting' },
                { $ref: '#/definitions/codeSetting' },
                { $ref: '#/definitions/colorSetting' },
                { $ref: '#/definitions/elementSetting' },
                { $ref: '#/definitions/imageManagerSetting' },
                { $ref: '#/definitions/inputSetting' },
                { $ref: '#/definitions/numberSetting' },
                { $ref: '#/definitions/productIdSetting' },
                { $ref: '#/definitions/productImageSetting' },
                { $ref: '#/definitions/rangeSetting' },
                { $ref: '#/definitions/regexInputSetting' },
                { $ref: '#/definitions/selectSetting' },
                { $ref: '#/definitions/toggleSetting' },
                { $ref: '#/definitions/typographySetting' },
                { $ref: '#/definitions/visibilitySetting' },
            ],
        },
        conditionalDisplay: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                },
                operator: {
                    type: 'string',
                    enum: ['IN'],
                },
                value: {
                },
            },
            required: ['key', 'operator', 'value'],
        },
        alignmentSetting: {
            type: 'object',
            properties: {
                type: { enum: ['alignment'] },
                default: {
                    type: 'object',
                    properties: {
                        horizontal: {
                            type: 'string',
                            enum: ['left', 'right', 'center'],
                        },
                        vertical: {
                            type: 'string',
                            enum: ['top', 'bottom', 'middle'],
                        },
                    },
                    additionalProperties: false,
                },
                typeMeta: {
                    type: 'object',
                    properties: {
                        display: {
                            type: 'string',
                            enum: ['horizontal', 'vertical', 'both'],
                        },
                    },
                },
            },
        },
        booleanSetting: {
            type: 'object',
            properties: {
                type: { enum: ['boolean'] },
                default: {
                    type: 'boolean',
                },
            },
        },
        boxModelMeasurement: {
            type: 'object',
            properties: {
                value: {
                    type: 'string',
                },
                type: {
                    type: 'string',
                },
            },
            additionalProperties: false,
        },
        boxModelSetting: {
            type: 'object',
            properties: {
                type: { enum: ['boxModel'] },
                default: {
                    type: 'object',
                    properties: {
                        top: { $ref: '#/definitions/boxModelMeasurement' },
                        right: { $ref: '#/definitions/boxModelMeasurement' },
                        bottom: { $ref: '#/definitions/boxModelMeasurement' },
                        left: { $ref: '#/definitions/boxModelMeasurement' },
                    },
                    additionalProperties: false,
                },
            },
        },
        codeSetting: {
            type: 'object',
            properties: {
                type: { enum: ['code'] },
                default: {
                    type: 'string',
                },
                typeMeta: {
                    type: 'object',
                    properties: {
                        language: {
                            type: 'string',
                            enum: ['html'],
                        },
                    },
                },
            },
        },
        colorSetting: {
            type: 'object',
            properties: {
                type: { enum: ['color'] },
                default: {
                    type: 'string',
                },
            },
        },
        elementSetting: {
            type: 'object',
            properties: {
                type: { enum: ['element'] },
                typeMeta: {
                    type: 'object',
                    properties: {
                        controls: {
                            type: 'object',
                        },
                        advanced: {
                            type: 'object',
                        },
                    },
                },
            },
        },
        imageManagerSetting: {
            type: 'object',
            properties: {
                type: { enum: ['imageManager'] },
                default: {
                    type: 'object',
                    properties: {
                        src: {
                            type: 'string',
                        },
                        type: {
                            type: 'string',
                            enum: ['NONE', 'URL', 'IMAGE_MANAGER', 'PRODUCT_IMAGE'],
                        },
                    },
                },
            },
        },
        inputSetting: {
            type: 'object',
            properties: {
                type: { enum: ['input'] },
                default: {
                    type: 'string',
                },
            },
        },
        numberSetting: {
            type: 'object',
            properties: {
                type: { enum: ['number'] },
                default: {
                    type: 'object',
                    properties: {
                        value: {
                            type: 'number',
                        },
                        type: {
                            type: 'string',
                            enum: ['px'],
                        },
                    },
                },
                typeMeta: {
                    type: 'object',
                    properties: {
                        parseType: {
                            type: 'string',
                            enum: ['integer', 'float'],
                        },
                    },
                },
            },
        },
        productIdSetting: {
            type: 'object',
            properties: {
                type: { enum: ['productId'] },
            },
        },
        productImageSetting: {
            type: 'object',
            properties: {
                type: { enum: ['productImage'] },
                typeMeta: {
                    type: 'object',
                    properties: {
                        reference: {
                            type: 'string',
                        },
                    },
                },
            },
        },
        rangeSetting: {
            type: 'object',
            properties: {
                type: { enum: ['range'] },
                default: {
                    type: 'number',
                },
                typeMeta: {
                    type: 'object',
                    properties: {
                        rangeValues: {
                            type: 'object',
                            properties: {
                                min: {
                                    type: 'number',
                                },
                                max: {
                                    type: 'number',
                                },
                                step: {
                                    type: 'number',
                                },
                                unit: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
        regexInputSetting: {
            type: 'object',
            properties: {
                type: { enum: ['regexInput'] },
                default: {
                    type: 'string',
                },
                typeMeta: {
                    type: 'object',
                    properties: {
                        regExPatterns: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    pattern: {
                                        type: 'string',
                                    },
                                    matchIndex: {
                                        type: 'number',
                                    },
                                    configKey: {
                                        type: 'string',
                                    },
                                },
                                additionalProperties: false,
                            },
                        },
                    },
                },
            },
        },
        selectSetting: {
            type: 'object',
            properties: {
                type: { enum: ['select'] },
                default: {
                    type: 'string',
                },
                typeMeta: {
                    type: 'object',
                    properties: {
                        selectOptions: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    label: {
                                        type: 'string',
                                    },
                                    value: {
                                        type: 'string',
                                    },
                                },
                                additionalProperties: false,
                            },
                        },
                    },
                },
            },
        },
        textSetting: {
            type: 'object',
            properties: {
                type: { enum: ['text'] },
            },
        },
        toggleSetting: {
            type: 'object',
            properties: {
                type: { enum: ['toggle'] },
            },
        },
        typographySetting: {
            type: 'object',
            properties: {
                type: { enum: ['typography'] },
            },
        },
        visibilitySetting: {
            type: 'object',
            properties: {
                type: { enum: ['visibility'] },
                default: {
                    type: 'string',
                    enum: ['show', 'hide'],
                },
            },
        },
    },
    $ref: '#/definitions/schema',
};

export default jsonSchema;
