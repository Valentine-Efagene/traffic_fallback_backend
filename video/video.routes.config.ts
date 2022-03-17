import express from 'express'
import { body } from 'express-validator'

import { CommonRoutesConfig } from '../common/common.routes.config'
import videoController from './video.controller'
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'

import jwtMiddleware from '../auth/jwt.middleware';
import videoMiddleware from './video.middleware'

export class VideoRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'VideoRoutes')
    }

    configureRoutes() {
        this.app.route(`/videos`)
            .get(
                jwtMiddleware.validJWTNeeded,
                videoController.listVideos
            )
            .post(
                body('autoResponder').isString().optional({ nullable: true }),
                body('message'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                videoController.createVideo)

        this.app.route(`/videos/:videoId`)
            .all(
                videoMiddleware.validateAdExists,
                jwtMiddleware.validJWTNeeded
            )
            .get(videoController.getVideoById)
            .delete(videoController.removeVideo)

        this.app.patch(`/videos/:videoId`, [
            body('autoResponder').isString().optional({ nullable: true }),
            body('message').isString().optional({ nullable: true }),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            videoController.patch
        ])

        return this.app;
    }
}