/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MessageService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Send message
     * @returns any 
     * @throws ApiError
     */
    public messageControllerSendMessage({
likeId,
requestBody,
}: {
likeId: string,
requestBody: any,
}): CancelablePromise<any> {
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
     * @returns any 
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
}): CancelablePromise<any> {
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

}
