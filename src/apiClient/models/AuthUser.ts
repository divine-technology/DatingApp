/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';
import type { ObjectId } from './ObjectId';

export type AuthUser = {
    _id: ObjectId;
    name: string;
    email: string;
    role: string;
    createdAccountTimeStamp: string;
    location: Location;
};
