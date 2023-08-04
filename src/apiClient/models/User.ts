/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';

export type User = {
    name: string;
    email: string;
    password: string;
    role: string;
    forgotPasswordToken: string;
    forgotPasswordTimestamp: string;
    createdAccountTimestamp: string;
    location: Location;
};
