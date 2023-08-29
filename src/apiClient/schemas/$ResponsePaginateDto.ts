/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ResponsePaginateDto = {
    properties: {
        count: {
    type: 'number',
    isRequired: true,
},
        page: {
    type: 'number',
    isRequired: true,
},
        data: {
    type: 'array',
    contains: {
    type: 'string',
},
    isRequired: true,
},
    },
} as const;
