/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthUser = {
    properties: {
        _id: {
    type: 'ObjectId',
    isRequired: true,
},
        name: {
    type: 'string',
    isRequired: true,
},
        email: {
    type: 'string',
    isRequired: true,
},
        role: {
    type: 'string',
    isRequired: true,
},
        createdAccountTimeStamp: {
    type: 'string',
    isRequired: true,
},
        location: {
    type: 'Location',
    isRequired: true,
},
    },
} as const;
