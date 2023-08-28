/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type {Location} from './Location';
import type {ObjectId} from './ObjectId';

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
};
