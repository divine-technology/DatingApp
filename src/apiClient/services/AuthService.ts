/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeForgotPasswordDto } from '../models/ChangeForgotPasswordDto';
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { ForgotPasswordResponseDto } from '../models/ForgotPasswordResponseDto';
import type { LoginResponseDto } from '../models/LoginResponseDto';
import type { LoginUserDto } from '../models/LoginUserDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Login user
     * @returns LoginResponseDto 
     * @throws ApiError
     */
    public authControllerLoginUser({
requestBody,
}: {
requestBody: LoginUserDto,
}): CancelablePromise<LoginResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Forgot password
     * @returns ForgotPasswordResponseDto 
     * @throws ApiError
     */
    public authControllerForgotPassword({
requestBody,
}: {
requestBody: ForgotPasswordDto,
}): CancelablePromise<ForgotPasswordResponseDto> {
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
requestBody: ChangeForgotPasswordDto,
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
requestBody: ChangePasswordDto,
}): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
