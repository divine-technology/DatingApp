/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';

export type AuthUser = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    createdAccountTimeStamp: string;
    location: Location;
    gender: string;
    preference: string;
    age: number;
    bio: string;
    hobbies: Array<string>;
    profilePicture?: string;
    gallery?: Array<string>;
    lastPictureTaken?: string;
    prefferedAgeFrom?: number;
    prefferedAgeTo?: number;
    prefferedRadius?: number;
};

