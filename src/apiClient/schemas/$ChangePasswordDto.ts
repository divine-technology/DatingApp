/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ChangePasswordDto = {
    properties: {
        email: {
    type: 'string',
    isRequired: true,
},
        oldPassword: {
    type: 'string',
    isRequired: true,
},
        newPassword: {
    type: 'string',
    isRequired: true,
},
        confirmNewPassword: {
    type: 'string',
    isRequired: true,
},
    },
} as const;
