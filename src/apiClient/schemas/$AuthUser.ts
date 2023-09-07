/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AuthUser = {
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
        createdAccountTimeStamp: {
            type: 'string',
            isRequired: true,
        },
        location: {
            type: 'Location',
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
        bio: {
            type: 'string',
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
