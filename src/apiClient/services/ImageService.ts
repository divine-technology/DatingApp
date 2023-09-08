/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Image } from '../models/Image';
import type { Object } from '../models/Object';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ImageService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Upload image
     * @returns Image
     * @throws ApiError
     */
    public imageControllerUploadImage({
        requestBody,
    }: {
        requestBody: Object,
    }): CancelablePromise<Image> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/image/upload',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get uploaded images by id
     * @returns any
     * @throws ApiError
     */
    public imageControllerGetSignedUrl({
        imageId,
        dimensions,
    }: {
        imageId: string,
        dimensions: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/image/{imageId}',
            path: {
                'imageId': imageId,
            },
            query: {
                'dimensions': dimensions,
            },
        });
    }

}
