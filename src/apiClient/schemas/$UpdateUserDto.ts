/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UpdateUserDto = {
    properties: {
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        role: {
            type: 'string',
        },
        forgotPasswordToken: {
            type: 'string',
        },
        forgotPasswordTimestamp: {
            type: 'string',
        },
        createdAccountTimestamp: {
            type: 'string',
        },
        location: {
            type: 'Location',
        },
        gender: {
            type: 'string',
        },
        preference: {
            type: 'string',
        },
        age: {
            type: 'number',
        },
        bio: {
            type: 'string',
        },
        hobbies: {
            type: 'array',
            contains: {
                type: 'string',
            },
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
        prefferedAgeTo: {
            type: 'number',
        },
        prefferedAgeFrom: {
            type: 'number',
        },
        prefferedRadius: {
            type: 'number',
        },
    },
} as const;
