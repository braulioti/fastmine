import {Sequelize} from 'sequelize-typescript';
import {environment} from '../common/environments';
import * as sequelize from 'sequelize';
import {SynchronizeProjects} from './synchronize/projects.synchronize';

export class Redmine {
    sequelize: Sequelize;
    sequelizeRedTrench: Sequelize;

    constructor() {
        var schedule = require('node-schedule');

        var rule = new schedule.RecurrenceRule();

        rule.minute = new schedule.Range(0, 59, 5);

        this.initializeDb().then(() => {
            schedule.scheduleJob(rule, () => {
                console.log('works!!');
                this.synchronizeAll();
            });
        });
    }

    initializeDb(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelize =  new Sequelize({
                    database: environment.redmineDB.database,
                    dialect: 'mysql',
                    username: environment.redmineDB.user,
                    password: environment.redmineDB.password,
                    host: environment.redmineDB.host,
                    port: environment.redmineDB.port,
                    logging: console.log,
                    //logging: false,
                    storage: ':memory:',
                    modelPaths: [__dirname + '/**/*.model.ts']
                });

                this.sequelize.authenticate().then(() => {
                    resolve(this.sequelize);
                });
            } catch(e) {
                reject(e);
            }
        });
    }

    synchronizeAll() {
        let synchronizeProjects: SynchronizeProjects;

        synchronizeProjects = new SynchronizeProjects(this.sequelize, this.sequelizeRedTrench);

        synchronizeProjects.synchronize().then(result => {});
    }

    getSequelizeRedtrench(): Sequelize {
        return this.sequelizeRedTrench;
    }

    setSequelizeRedtrench(value: Sequelize) {
        this.sequelizeRedTrench = value;
    }
}