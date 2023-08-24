/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponsePaginateDto } from '../models/ResponsePaginateDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { UserRadiusDto } from '../models/UserRadiusDto';
import type { UserWithId } from '../models/UserWithId';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all users pagination
     * @returns ResponsePaginateDto 
     * @throws ApiError
     */
    public usersControllerGetAllUsers({
page,
limit,
sort,
sortBy,
firstName,
lastName,
email,
role,
forgotPasswordToken,
forgotPasswordTimestamp,
createdAccountTimestamp,
gender,
preference,
age,
hobbies,
}: {
page?: number,
limit?: number,
sort?: number,
sortBy?: string,
firstName?: string,
lastName?: string,
email?: string,
role?: string,
forgotPasswordToken?: string,
forgotPasswordTimestamp?: string,
createdAccountTimestamp?: string,
gender?: string,
preference?: string,
age?: number,
hobbies?: Array<string>,
}): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'role': role,
                'forgotPasswordToken': forgotPasswordToken,
                'forgotPasswordTimestamp': forgotPasswordTimestamp,
                'createdAccountTimestamp': createdAccountTimestamp,
                'gender': gender,
                'preference': preference,
                'age': age,
                'hobbies': hobbies,
            },
        });
    }

    /**
     * Get all users in radius
     * @returns UserWithId 
     * @throws ApiError
     */
    public usersControllerGetRadius({
requestBody,
}: {
requestBody: UserRadiusDto,
}): CancelablePromise<Array<UserWithId>> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/radius',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get user by id
     * @returns User 
     * @throws ApiError
     */
    public usersControllerGetOneUser({
id,
}: {
id: string,
}): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/get/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Update user
     * @returns User 
     * @throws ApiError
     */
    public usersControllerUpdateUser({
id,
requestBody,
}: {
id: string,
requestBody: UpdateUserDto,
}): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/update/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Delete user
     * @returns User 
     * @throws ApiError
     */
    public usersControllerDeleteUser({
id,
}: {
id: string,
}): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/delete/{id}',
            path: {
                'id': id,
            },
        });
    }

}
