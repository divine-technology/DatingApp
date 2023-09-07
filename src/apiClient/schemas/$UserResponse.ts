/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserResponse = {
    properties: {
        _id: {
            type: 'string',
            isRequired: true,
        },
        firstName: {
            type: 'string',
            isRequired: true,
        },
        lastName: {
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
        gender: {
            type: 'string',
            isRequired: true,
        },
        preference: {
            type: 'string',
            isRequired: true,
        },
        age: {
            type: 'number',
            isRequired: true,
        },
        hobbies: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        profilePicture: {
            type: 'string',
        },
        gallery: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        lastPictureTaken: {
            type: 'string',
        },
    },
} as const;
