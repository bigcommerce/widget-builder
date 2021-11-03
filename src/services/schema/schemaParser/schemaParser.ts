/* eslint-disable @typescript-eslint/no-explicit-any */

export enum SchemaElementType {
    ARRAY = 'array',
    TAB = 'tab',
    HIDDEN = 'hidden',
}

export enum SettingType {
    ALIGNMENT = 'alignment',
    BOOLEAN = 'boolean',
    BOX_MODEL = 'boxModel',
    CODE = 'code',
    COLOR = 'color',
    IMAGE_MANAGER = 'imageManager',
    INPUT = 'input',
    NUMBER = 'number',
    PRODUCT_ID = 'productId',
    PRODUCT_IMAGE = 'productImage',
    RANGE = 'range',
    REGEX_INPUT = 'regexInput',
    SELECT = 'select',
    TEXT = 'text',
    TOGGLE = 'toggle',
}

export enum ParseType {
    Int = 'integer',
    Float = 'float',
}

export const enum ThumbnailType {
    IMAGE = 'image',
    COLOR = 'color',
    UNKNOWN = 'unknown',
}

export type SchemaElement = TabSchemaElement | ArraySchemaElement | HiddenSchemaElement;

export interface WidgetConfiguration {
    [key: string]: any;
}

export type Thumbnail = ConditionalThumbnail | SimpleThumbnail;

export interface ConditionalThumbnail {
    conditionKey: string; // background.type
    thumbnailConditions: {
        [conditionValue: string]: SimpleThumbnail; // image: {valueKey: 'background.imageUrl.src', type: 'image'}
    };
}

export interface SimpleThumbnail {
    valueKey: string; // 'background.imageUrl.src'
    type: ThumbnailType;
}

export interface ArraySchemaElement {
    type: SchemaElementType.ARRAY;
    label: string;
    id: string; //  ex: slides
    defaultCount?: number;
    entryLabel: string;
    thumbnail?: Thumbnail;
    schema: (TabSchemaElement|ArraySchemaElement)[];
}

export interface HiddenSchemaElement {
    type: SchemaElementType.HIDDEN | string;
    settings: BaseSchemaSetting[];
}

export interface TabSchemaElement {
    type: SchemaElementType.TAB | string;
    label: string;
    sections: SchemaSection[];
}

export interface AdvancedControlType {
    label: string;
    settings: LabeledSchemaSetting[];
}

export interface VisibilityControlType {
    default: 'show' | 'hide';
}

export interface ElementControlType {
    advanced?: AdvancedControlType;
    visibility?: VisibilityControlType;
}

export interface SchemaSection {
    label?: string; // the label for the group of settings, ex. "Text Styles"
    settings: LabeledSchemaSetting[]; // the settings which belong in group
}

export interface LabeledSchemaSetting extends BaseSchemaSetting {
    label: string;
}

export interface ConditionalSetting {
    key: string;
    operator: string;
    value: any;
}
export interface BaseSchemaSetting {
    id: string;
    default?: any;
    type?: SettingType | string;
    typeMeta?: SchemaSettingTypeMetaData;
    conditional?: ConditionalSetting;
}

export interface SelectOptionValue {
    label: string;
    value: string;
}

export interface ConditionalSettingsValue {
    condition: string;
    settings: LabeledSchemaSetting[];
}

enum SchemaSettingTag {
    ADVANCED = 'advanced',
}

export enum AlignmentSettingDisplay {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical',
    BOTH = 'both',
}

enum CodeSyntaxHighlightLanguage {
    HTML = 'html',
}

export interface RangeValues {
    max?: number;
    min?: number;
    sliderMax?: number;
    sliderMin?: number;
    step: number;
    unit?: string;
}

export interface RegExPattern {
    configKey: string;
    matchIndex: number;
    pattern: string;
}

export interface SchemaSettingTypeMetaData {
    controls?: ElementControlType;
    reference?: string;
    regExPatterns?: RegExPattern[];
    conditionalSettings?: ConditionalSettingsValue[];
    tags?: SchemaSettingTag[];
    selectOptions?: SelectOptionValue[]; // applicable for select type
    settings?: LabeledSchemaSetting[]; // applicable for array type
    display?: AlignmentSettingDisplay; // applicable for alignment type
    helpInfo?: string; // show a help text bubble next to the setting with additional info
    language?: CodeSyntaxHighlightLanguage; // applicable for the code type
    placeholder?: string;
    rangeValues?: RangeValues; // applicable for range type
    maxLength?: number; // Applicable to type text
    parseType?: ParseType;
}

export interface StorefrontApiQueryParams {
    [key: string]: any;
}

export interface QueryParamBuilder {
    [key: string]: any;
}

export interface WidgetTemplateEntry {
    icon_name: string;
    uuid: string;
    name: string;
    schema: (TabSchemaElement|ArraySchemaElement)[];
    template: string;
    kind: string;
    storefront_api_query: string;
}

export interface CategoryEntry {
    uuid: string;
    name: string;
    key: string;
    widget_templates: WidgetTemplateEntry[];
}

function parseRegExPatternsDefaults(id: string, defaultValue = '', regExPatterns: RegExPattern[]) {
    const regExPatternConfigurations: WidgetConfiguration = {};
    const config: WidgetConfiguration = {};
    const partsConfig: WidgetConfiguration = {};
    const value = 'value';
    const parts = 'parts';

    regExPatterns.forEach((regExPattern) => {
        const { pattern, matchIndex = 0, configKey } = regExPattern;
        const re = new RegExp(pattern);
        const matchResult = defaultValue.match(re);
        partsConfig[configKey] = matchResult ? matchResult[matchIndex] : null;
    });

    config[value] = defaultValue;
    config[parts] = partsConfig;
    regExPatternConfigurations[id] = config;

    return regExPatternConfigurations;
}

function parseConditionalDefaults(selectOptions: ConditionalSettingsValue[]) {
    const conditionalConfigurations: WidgetConfiguration = {};
    selectOptions.forEach((option) => {
        if (option && option.settings) {
            option.settings.forEach((conditionalSetting) => {
                conditionalConfigurations[conditionalSetting.id] = conditionalSetting.default;
            });
        }
    });

    return conditionalConfigurations;
}

function parseElementDefaults(controls: ElementControlType) {
    const elementConfigurations = {};
    Object.keys(controls).forEach((control) => {
        const content = controls[control];
        if (content && content.settings) {
            content.settings.forEach((setting: BaseSchemaSetting) => {
                elementConfigurations[setting.id] = setting.default;
            });
        } else {
            elementConfigurations[control] = content.default;
        }
    });

    return elementConfigurations;
}

function buildSettingsDefaults(settings: BaseSchemaSetting[]) {
    let configuration: WidgetConfiguration = {};

    settings.forEach((setting: BaseSchemaSetting) => {
        if (setting.typeMeta) {
            if (setting.typeMeta.conditionalSettings) {
                const parsedDefaults = parseConditionalDefaults(setting.typeMeta.conditionalSettings);

                configuration = {
                    ...configuration,
                    ...parsedDefaults,
                };
            }

            if (setting.typeMeta.controls) {
                const parsedDefaults = parseElementDefaults(setting.typeMeta.controls);

                configuration = {
                    ...configuration,
                    ...{
                        [setting.id]: parsedDefaults,
                    },
                };
            }

            if (setting.typeMeta.regExPatterns) {
                const parsedDefaults = parseRegExPatternsDefaults(
                    setting.id,
                    setting.default,
                    setting.typeMeta.regExPatterns,
                );

                configuration = {
                    ...configuration,
                    ...parsedDefaults,
                };
            }
        }

        if (setting.default) {
            configuration[`${setting.id}`] = setting.default;
        }
    });

    return configuration;
}

function parseTabSchemaDefaults(tabSections: SchemaSection[]) {
    let configuration = {};

    tabSections.forEach((section: SchemaSection) => {
        const settingsDefaults = buildSettingsDefaults(section.settings);
        configuration = {
            ...configuration,
            ...settingsDefaults,
        };
    });

    return configuration;
}

export function parseArraySchemaDefaults(arraySchemaElement: ArraySchemaElement) {
    let configuration: WidgetConfiguration = {};

    const defaultCount = arraySchemaElement.defaultCount || 1;
    const arraySchema = arraySchemaElement.schema;
    const arraySchemaId = arraySchemaElement.id;
    configuration[`${arraySchemaId}`] = [];
    let arrayElementConfiguration: WidgetConfiguration = {};
    arraySchema.forEach((schemaElement: SchemaElement) => {
        if (schemaElement.type === SchemaElementType.TAB) {
            const tabSchemaElement = schemaElement as TabSchemaElement;
            const tabSettingDefaults = parseTabSchemaDefaults(tabSchemaElement.sections);
            arrayElementConfiguration = {
                ...arrayElementConfiguration,
                ...tabSettingDefaults,
            };
        }

        if (schemaElement.type === SchemaElementType.HIDDEN) {
            const hiddenSchemaElement = schemaElement as HiddenSchemaElement;
            const hiddenSettingDefaults = buildSettingsDefaults(hiddenSchemaElement.settings);

            arrayElementConfiguration = {
                ...arrayElementConfiguration,
                ...hiddenSettingDefaults,
            };
        }
    });

    for (let i = 1; i <= defaultCount; i++) {
        configuration[`${arraySchemaId}`].push({ ...arrayElementConfiguration });
    }

    arraySchema.forEach((schemaElement: TabSchemaElement | ArraySchemaElement) => {
        if (schemaElement.type === SchemaElementType.ARRAY) {
            const subArraySchemaElement = schemaElement as ArraySchemaElement;
            const arrayConfiguration = parseArraySchemaDefaults(subArraySchemaElement);
            configuration = {
                ...configuration,
                ...arrayConfiguration,
            };
        }
    });

    return configuration;
}

export function generateWidgetConfiguration(schema: (TabSchemaElement|ArraySchemaElement|HiddenSchemaElement)[]) {
    let configuration: WidgetConfiguration = {};
    schema.forEach((schemaElement: SchemaElement) => {
        if (schemaElement.type === SchemaElementType.TAB) {
            const tabSchemaElement = schemaElement as TabSchemaElement;
            const tabSectionDefaults = parseTabSchemaDefaults(tabSchemaElement.sections);
            configuration = {
                ...configuration,
                ...tabSectionDefaults,
            };
        }

        if (schemaElement.type === SchemaElementType.ARRAY) {
            const arraySchemaElement = schemaElement as ArraySchemaElement;
            const arraySectionDefaults = parseArraySchemaDefaults(arraySchemaElement);

            configuration = {
                ...configuration,
                ...arraySectionDefaults,
            };
        }

        if (schemaElement.type === SchemaElementType.HIDDEN) {
            const hiddenSchemaElement = schemaElement as HiddenSchemaElement;
            const hiddenSettingDefaults = buildSettingsDefaults(hiddenSchemaElement.settings);

            configuration = {
                ...configuration,
                ...hiddenSettingDefaults,
            };
        }
    });

    return { ...configuration };
}
