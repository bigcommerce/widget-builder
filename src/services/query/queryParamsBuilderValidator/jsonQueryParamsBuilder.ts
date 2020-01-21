const jsonQueryParamsBuilder = {
    type: 'object',
    patternProperties: {
        '.': {
            type: 'object',
            properties: {
                reads: {
                    type: 'string',
                },
                type: {
                    type: 'string',
                    enum: [
                        'Int',
                        'Int!',
                        'Boolean',
                        'Boolean!',
                        'Float',
                        'Float!',
                        'String',
                        'String!',
                    ],
                },
            },
            required: ['reads', 'type'],
            additionalProperties: false,
        },
    },
};

export default jsonQueryParamsBuilder;
