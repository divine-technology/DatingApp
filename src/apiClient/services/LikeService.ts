/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Like } from '../models/Like';
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
     * @returns Like
     * @throws ApiError
     */
    public likeControllerGetAllLikes({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<Like>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/likes/get-all-likes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * Get likes from user
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
        requestBody,
    }: {
        requestBody: ReactWithUserDto,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/likes/react',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Block a user
     * @returns string
     * @throws ApiError
     */
    public likeControllerBlockByLikeId({
        likeId,
    }: {
        likeId: string,
    }): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/likes/block/{likeId}',
            path: {
                'likeId': likeId,
            },
        });
    }

}
