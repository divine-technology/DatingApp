/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReactWithUserDto } from '../models/ReactWithUserDto';
import type { ResponsePaginateDto } from '../models/ResponsePaginateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class LikeService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all users that liked the user back
     * @returns ResponsePaginateDto
     * @throws ApiError
     */
    public likeControllerGetBothLikes({
        id,
        page,
        limit,
        sort,
        sortBy,
    }: {
        id: string,
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/likes/get-both-likes/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
        });
    }

    /**
     * Get all likes from user
     * @returns ResponsePaginateDto
     * @throws ApiError
     */
    public likeControllerGetLikes({
        id,
        page,
        limit,
        sort,
        sortBy,
    }: {
        id: string,
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/likes/get-likes/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
        });
    }

    /**
     * Get all dislikes from user
     * @returns ResponsePaginateDto
     * @throws ApiError
     */
    public likeControllerGetDislikes({
        id,
        page,
        limit,
        sort,
        sortBy,
    }: {
        id: string,
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/likes/get-dislikes/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
        });
    }

    /**
     * Get all like requests
     * @returns ResponsePaginateDto
     * @throws ApiError
     */
    public likeControllerGetLikeRequests({
        id,
        page,
        limit,
        sort,
        sortBy,
    }: {
        id: string,
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/likes/get-like-requests/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
        });
    }

    /**
     * Get all users that are blocked
     * @returns ResponsePaginateDto
     * @throws ApiError
     */
    public likeControllerGetBlocked({
        id,
        page,
        limit,
        sort,
        sortBy,
    }: {
        id: string,
        page?: number,
        limit?: number,
        sort?: number,
        sortBy?: string,
    }): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/likes/get-blocked/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
        });
    }

    /**
     * React with a user
     * @returns string
     * @throws ApiError
     */
    public likeControllerReactWithUser({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ReactWithUserDto,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/likes/react/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
