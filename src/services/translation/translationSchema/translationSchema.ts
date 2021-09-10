const translationSchema = {
    type: 'object',
    additionalProperties: false,
    patternProperties: {
        '^i18n\\.\\w+$': {
            type: 'object',
            required: ['default'],
            patternProperties: {
                '^[a-z]{2}(-[a-zA-Z0-9]{2,})?$': { type: 'string' },
            },
            additionalProperties: true,
        },
    },
};

export default translationSchema;
