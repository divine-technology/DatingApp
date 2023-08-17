/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponsePaginateDto } from '../models/ResponsePaginateDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { UserRadiusDto } from '../models/UserRadiusDto';

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
name,
email,
role,
forgotPasswordToken,
forgotPasswordTimestamp,
createdAccountTimestamp,
}: {
page?: number,
limit?: number,
sort?: number,
sortBy?: string,
name?: string,
email?: string,
role?: string,
forgotPasswordToken?: string,
forgotPasswordTimestamp?: string,
createdAccountTimestamp?: string,
}): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
                'name': name,
                'email': email,
                'role': role,
                'forgotPasswordToken': forgotPasswordToken,
                'forgotPasswordTimestamp': forgotPasswordTimestamp,
                'createdAccountTimestamp': createdAccountTimestamp,
            },
        });
    }

    /**
     * Get all users in radius
     * @returns User 
     * @throws ApiError
     */
    public usersControllerGetRadius({
requestBody,
}: {
requestBody: UserRadiusDto,
}): CancelablePromise<User> {
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
