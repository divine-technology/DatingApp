/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponsePaginateDto } from '../models/ResponsePaginateDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';
import type { UserRadiusDto } from '../models/UserRadiusDto';
import type { UserResponse } from '../models/UserResponse';

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
        id,
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
        profilePicture,
        gallery,
        lastPictureTaken,
    }: {
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
        id?: string,
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
        profilePicture?: string,
        gallery?: Array<string>,
        lastPictureTaken?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
                '_id': id,
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
                'profilePicture': profilePicture,
                'gallery': gallery,
                'lastPictureTaken': lastPictureTaken,
            },
        });
    }

    /**
     * Get all users in radius
     * @returns ResponsePaginateDto
     * @throws ApiError
     */
    public usersControllerGetRadius({
        requestBody,
        page,
        limit,
        sort,
        sortBy,
    }: {
        requestBody: UserRadiusDto,
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/radius',
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get user by id
     * @returns UserResponse
     * @throws ApiError
     */
    public usersControllerGetOneUser({
        id,
    }: {
        id: string,
    }): CancelablePromise<UserResponse> {
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
    public usersControllerDeleteUser(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/delete/{id}',
        });
    }

}
