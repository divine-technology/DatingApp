/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DefaultService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns any
     * @throws ApiError
     */
    public appControllerGetHello(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/test',
        });
    }

    /**
     * @returns any
     * @throws ApiError
     */
    public appControllerPostHello(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/test',
        });
    }

}
