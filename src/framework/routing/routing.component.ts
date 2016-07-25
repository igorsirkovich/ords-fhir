import {HandlerOptions}                     from './models/handler-options';
import {Router}                             from './models/router';
import {RequestHandler}                     from './models/request-handler';
import {HookableComponent, HookableModels}  from '../../lib/hookable';
import {Request, Response}                  from 'express';
import * as parser                          from 'body-parser';
import * as cors                            from 'cors';

export class RoutingComponent {
    /**
     * Exectued before all handlers
     */
    public preHandler: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Parse the HTTP body of the request
     */
    public bodyParse: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Exectued after all handlers
     */
    public postHandler: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Authentication handlers
     */
    public authenticate: HookableModels.Argumentable<Request, Response> = HookableComponent.argumentable();
    /**
     * Reference to express application instance
     */
    private systemRouter: Router = Router();
    /**
     * Reference to express application instance
     */
    private resourceRouter: Router = Router();
    /**
     * Add a handler to handle system interactions
     */
    public addToSystem(options: HandlerOptions, handler: RequestHandler): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandler.pre;
        stack.post = this.postHandler.post;

        // push actual handler handler
        stack.actor.push(handler);

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this.systemRouter.get(options.path, stack);
                break;
            case 'POST':
                this.systemRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.systemRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.systemRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.systemRouter.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * Add a handler to handle resource interactions
     */
    public addToResources(options: HandlerOptions, handler: RequestHandler): void {

        // prepare a stack
        let stack: HookableModels.ArgumentableAll<Request, Response> = HookableComponent.argumentableAll();

        // bind hookables
        stack.pre = this.preHandler.pre;
        stack.post = this.postHandler.post;

        // push actual handler handler
        stack.actor.push(handler);

        // set correct path
        options.path = '/:resource' + options.path;

        // prepare and add stack to router
        switch (options.httpmethod) {
            case 'GET':
                this.resourceRouter.get(options.path, stack);
                break;
            case 'POST':
                this.resourceRouter.post(options.path, this.bodyParse, stack);
                break;
            case 'PUT':
                this.resourceRouter.put(options.path, this.bodyParse, stack);
                break;
            case 'DELETE':
                this.resourceRouter.delete(options.path, stack);
                break;
            case 'OPTIONS':
                this.resourceRouter.options(options.path, stack);
                break;
            default:
                throw new Error('Unsupported HTTP method');

        }
    }
    /**
     * Binds default functions to router and create a new instance
     */
    constructor() {

        // cors
        this.addCors(this.resourceRouter);
        this.addCors(this.systemRouter);

        // bind default resource parsing
        this.resourceRouter.use(rh.getResourceFromParams);

        // bind auth parsing
        this.resourceRouter.use(this.authenticate); // do something else now
        this.systemRouter.use(this.authenticate);

       // parse body application/x-www-form-urlencoded
        this.bodyParse.actor.push(parser.urlencoded({
            extended: false,
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

        // parse application/json
        this.bodyParse.actor.push(parser.json({
            limit: process.env.LIMIT_UPLOAD_MB ? process.env.LIMIT_UPLOAD_MB + 'mb' : 0.1 + 'mb'
        }));

    }
    /**
     * Adds cors 
     */
     private addCors(router: any): void {

        // calculate whitelist array and set as empty is not specified
        if (process.env.WHITELIST === undefined) {
            process.env.WHITELIST = '';
        }
        let whitelist: Array<string> = process.env.WHITELIST;

        // setup the usage of the whitelist
        router.use(cors({
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'Authentication'],
            credentials: true,
            origin: function (origin: string, callback: Function): void {
                callback(undefined, whitelist.indexOf(origin) !== -1);
            }
        }));
    }
    /**
     * Check that a user is actually present
     */
}

