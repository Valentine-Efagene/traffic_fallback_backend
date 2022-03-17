import express from 'express'
import { body } from 'express-validator'

import { CommonRoutesConfig } from '../common/common.routes.config'
import adController from './ad.controller'
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware'

import jwtMiddleware from '../auth/jwt.middleware';
import adMiddleware from './ad.middleware'

export class AdRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AdRoutes')
    }

    configureRoutes() {
        this.app.route(`/ads`)
            .get(
                jwtMiddleware.validJWTNeeded,
                adController.listAds
            )
            .post(
                body('autoResponder').isString().optional({ nullable: true }),
                body('message'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                adController.createAd);

        this.app.route(`/ads/:adId`)
            .all(
                adMiddleware.validateAdExists,
                jwtMiddleware.validJWTNeeded
            )
            .get(adController.getAdById)
            .delete(adController.removeAd)

        this.app.patch(`/ads/:adId`, [
            body('autoResponder').isString().optional({ nullable: true }),
            body('message').isString().optional({ nullable: true }),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            adController.patch
        ])

        return this.app;
    }
}