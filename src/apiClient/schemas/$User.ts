/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $User = {
    properties: {
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
            isRequired: true,
        },
        gallery: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        lastPictureTaken: {
            type: 'string',
            isRequired: true,
        },
        prefferedAgeFrom: {
            type: 'number',
            isRequired: true,
        },
        prefferedAgeTo: {
            type: 'number',
            isRequired: true,
        },
        prefferedRadius: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
