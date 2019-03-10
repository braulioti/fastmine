import * as restify from 'restify';
import {environment} from '../common/environments';
import {Router} from '../common/router';
import {indexRouter} from '../index/index.router';
import {mergePatchBodyParser} from './merge-patch.parser';
import {handleError} from './error.handler';
import * as fs from 'fs';
import {Sequelize} from 'sequelize-typescript';
import * as corsMiddleware from 'restify-cors-middleware';
import {tokenParser} from '../security/token.parser';
import {Redmine} from '../redmine/redmine';

export class Server {
    application: restify.Server;
    sequelize: Sequelize;
    redmine: Redmine;

    initializeDb(): Promise<any> {

        return new Promise((resolve, reject) => {
            try {
                this.sequelize =  new Sequelize({
                    database: environment.db.database,
                    dialect: 'postgres',
                    username: environment.db.user,
                    password: environment.db.password,
                    host: environment.db.host,
                    port: environment.db.port,
                    //logging: console.log,
                    logging: false,
                    storage: ':memory:',
                    modelPaths: [__dirname + '/**/*.model.ts', __dirname + '/**/*.modelredtrench.ts']
                });

                this.sequelize.authenticate().then(() => {
                    resolve(this.sequelize);
                });
            } catch(e) {
                reject(e);
            }
        });
    }

    runLiquibase(): Promise<any> {
        const liquibase = require('liquibase');

        return new Promise( (resolve, reject) => liquibase({
            liquibase: 'lib/liquibase-core-3.5.3.jar',
            driver: 'org.postgresql.Driver',
            classpath: 'lib/postgresql-9.4-1202.jdbc4.jar',
            changeLogFile: 'resources/liquibase/db.changelog.xml',
            url: `jdbc:postgresql://${environment.db.host}:${environment.db.port}/${environment.db.database}`,
            username: environment.db.user,
            password: environment.db.password
        })
        .run('update')
        .then(() => {
            resolve(liquibase);
        })
        .catch((err) => {
            reject(err);
        });
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const options: restify.ServerOptions = {
                    name: 'redtrench',
                    version: '1.0.0-beta.1'
                };

                this.redmine = new Redmine();
                this.redmine.setSequelizeRedtrench(this.sequelize);

                if (environment.security.enableHTTPS) {
                    options.certificate = fs.readFileSync(environment.security.certificate);
                    options.key = fs.readFileSync(environment.security.key);
                }

                // this.application = restify.createServer(options);
                //
                // const corsOptions: corsMiddleware.Options = {
                //     preflightMaxAge: 10,
                //     origins: ['*'],
                //     allowHeaders: ['authorization'],
                //     exposeHeaders: []
                // };
                // const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions);
                //
                // this.application.pre(cors.preflight);
                //
                // this.application.use(cors.actual);
                // this.application.use(restify.plugins.queryParser());
                // this.application.use(restify.plugins.bodyParser());
                // this.application.use(mergePatchBodyParser);
                // this.application.use(tokenParser);
                //
                // // routes
                // // for (let router of routers) {
                // //     router.applyRoutes(this.application, this.sequelize);
                // //     indexRouter.addRouter(router);
                // // }
                // // indexRouter.applyRoutes(this.application);
                //
                // this.application.listen(environment.server.port, () => {
                //     resolve(this.application);
                // });
                //
                // this.application.on('restifyError', handleError);
            } catch (error) {
                reject(error);
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.runLiquibase().then(() =>
                this.initRoutes(routers).then(() => this)
            )
        );
    }

    shutdown() {
        return this.sequelize.close().then(() => {
            this.application.close();
        })
    }
}