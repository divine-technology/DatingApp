/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Message = {
    properties: {
        likeId: {
            type: 'ObjectId',
            isRequired: true,
        },
        from: {
            type: 'ObjectId',
            isRequired: true,
        },
        message: {
            type: 'string',
            isRequired: true,
        },
        image: {
            type: 'ObjectId',
            isRequired: true,
        },
    },
} as const;
