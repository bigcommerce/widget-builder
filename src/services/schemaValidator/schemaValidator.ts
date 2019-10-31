import {
    BaseSchemaSetting,
    HiddenSchemaElement,
    SchemaElement,
    SchemaElementType,
    SchemaSection,
} from '../schemaParser/schemaParser';

const SchemaProperties = {
    EntryLabel: 'entryLabel',
    Id: 'id',
    Label: 'label',
    Sections: 'sections',
    Settings: 'settings',
    Schema: 'schema',
};

const requiredArraySchemaProperties = [
    SchemaProperties.EntryLabel,
    SchemaProperties.Id,
    SchemaProperties.Label,
    SchemaProperties.Schema,
];

const requiredTabSchemaProperties = [
    SchemaProperties.Label,
    SchemaProperties.Sections,
];

const requiredSettingProperties = [
    SchemaProperties.Id,
];

function stringifySubject(subject: any) {
    const stringifiedSubject = JSON.stringify(subject);
    return `${stringifiedSubject.substring(0, 97)}${stringifiedSubject.length > 97 ? '...' : ''}`;
}

function validateArrayProperty(subject: any, propertyName: string) {
    if (!Array.isArray(subject)) {
        console.log(`${propertyName} needs to be an array for ${stringifySubject(subject)}`);
        return false;
    }

    return true;
}

function validateRequiredProperties(subject: BaseSchemaSetting | SchemaElement, requiredProperties: string[]): boolean {
    let result = true;
    requiredProperties.forEach((property: string) => {
        if (subject[property] === undefined) {
            console.log(`${property} is missing for ${stringifySubject(subject)}`);
            result = false;
        } else if (property === SchemaProperties.Schema) {
            if (!validateSchemaElements(subject[property])) {
                result = false;
            }
        } else if (property === SchemaProperties.Sections) {
            if (!validateSchemaSections(subject[property])) {
                result = false;
            }
        }
    });

    return result;
}

function validateSchemaSettings(settings: BaseSchemaSetting[]): boolean {
    let result = true;
    if (validateArrayProperty(settings, SchemaProperties.Settings)) {
        settings.forEach((setting: BaseSchemaSetting) => {
            if (!validateRequiredProperties(setting, requiredSettingProperties)) {
                result = false;
            }
        });
    } else {
        result = false;
    }

    return result;
}

function validateSchemaSection(section: SchemaSection): boolean {
    return validateSchemaSettings(section.settings);
}

function validateSchemaSections(sections: SchemaSection[]): boolean {
    let result = true;
    if (validateArrayProperty(sections, SchemaProperties.Sections)) {
        sections.forEach((section: SchemaSection) => {
            if (!validateSchemaSection(section)) {
                result = false;
            }
        });
    } else {
        result = false;
    }

    return result;
}

function validateSchemaElements(schema: SchemaElement[]): boolean {
    if (!validateArrayProperty(schema, SchemaProperties.Schema)) { return false; }

    let result = true;
    schema.forEach((schemaElement: SchemaElement) => {
        switch (schemaElement.type) {
            case SchemaElementType.ARRAY:
                if (!validateRequiredProperties(schemaElement, requiredArraySchemaProperties)) {
                    result = false;
                }
                break;
            case SchemaElementType.TAB:
                if (!validateRequiredProperties(schemaElement, requiredTabSchemaProperties)) {
                    result = false;
                }
                break;
            case SchemaElementType.HIDDEN:
                const { settings } = schemaElement as HiddenSchemaElement;
                if (!validateSchemaSettings(settings)) {
                    result = false;
                }
                break;
            default:
                console.log('type is missing or invalid for a Schema Element:', stringifySubject(schema));
                result = false;
        }
    });

    return result;
}

export default function validateSchema(schemaData: string): SchemaElement[] | false {
    const schema = JSON.parse(schemaData);
    if (validateSchemaElements(schema)) {
        return schema;
    }

    return false;
}
