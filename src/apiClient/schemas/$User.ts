/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $User = {
    properties: {
        name: {
    type: 'string',
    isRequired: true,
},
        email: {
    type: 'string',
    isRequired: true,
},
        password: {
    type: 'string',
    isRequired: true,
},
        role: {
    type: 'string',
    isRequired: true,
},
        forgotPasswordToken: {
    type: 'string',
    isRequired: true,
},
        forgotPasswordTimestamp: {
    type: 'string',
    isRequired: true,
},
        createdAccountTimestamp: {
    type: 'string',
    isRequired: true,
},
        location: {
    type: 'Location',
    isRequired: true,
},
    },
} as const;
