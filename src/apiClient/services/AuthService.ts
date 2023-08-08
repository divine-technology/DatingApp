/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Login user
     * @returns string 
     * @throws ApiError
     */
    public authControllerLoginUser({
requestBody,
}: {
requestBody: any,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Forgot password
     * @returns string 
     * @throws ApiError
     */
    public authControllerForgotPassword({
requestBody,
}: {
requestBody: any,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Change forgot password
     * @returns string 
     * @throws ApiError
     */
    public authControllerChangeForgotPassword({
requestBody,
}: {
requestBody: any,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/change-forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Change password
     * @returns string 
     * @throws ApiError
     */
    public authControllerUpdatePassword({
requestBody,
}: {
requestBody: any,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
