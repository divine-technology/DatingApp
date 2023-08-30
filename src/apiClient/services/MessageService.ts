/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { MessageDto } from '../models/MessageDto';
import type { MessageResponseDto } from '../models/MessageResponseDto';
import type { ResponsePaginateDto } from '../models/ResponsePaginateDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MessageService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Send message
     * @returns Message 
     * @throws ApiError
     */
    public messageControllerSendMessage({
likeId,
requestBody,
}: {
likeId: string,
requestBody: MessageDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/message/send-message/{likeId}',
            path: {
                'likeId': likeId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get messages between users
     * @returns ResponsePaginateDto 
     * @throws ApiError
     */
    public messageControllerGetConversation({
likeId,
page,
limit,
sort,
sortBy,
}: {
likeId: string,
page?: number,
limit?: number,
sort?: number,
sortBy?: string,
}): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/message/get-conversation/{likeId}',
            path: {
                'likeId': likeId,
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
     * Get all chats that a user has
     * @returns ResponsePaginateDto 
     * @throws ApiError
     */
    public messageControllerGetChat({
page,
limit,
sort,
sortBy,
}: {
page?: number,
limit?: number,
sort?: number,
sortBy?: string,
}): CancelablePromise<ResponsePaginateDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/message/get-chats',
            query: {
                'page': page,
                'limit': limit,
                'sort': sort,
                'sortBy': sortBy,
            },
        });
    }

    /**
     * Do not delete or use this! It was made just for getting the DTO for api client!
     * @returns MessageResponseDto 
     * @throws ApiError
     */
    public messageControllerTestDontUse(): CancelablePromise<MessageResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/message/test-dont-use',
        });
    }

}
