/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';

export type UpdateUserDto = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    forgotPasswordToken?: string;
    forgotPasswordTimestamp?: string;
    createdAccountTimestamp?: string;
    location?: Location;
    gender?: string;
    preference?: string;
    age?: number;
    bio?: string;
    hobbies?: Array<string>;
    profilePicture?: string;
    gallery?: Array<string>;
    lastPictureTaken?: string;
    prefferedAgeTo?: number;
    prefferedAgeFrom?: number;
    prefferedRadius?: number;
};

