import {Sequelize} from 'sequelize-typescript';
import {environment} from '../common/environments';
import * as sequelize from 'sequelize';
import {SynchronizeProjects} from './synchronize/projects.synchronize';
import {SynchronizeUsers} from './synchronize/users.synchronize';

export class Redmine {
    sequelize: Sequelize;
    sequelizeRedTrench: Sequelize;

    constructor() {
        var schedule = require('node-schedule');

        var ruleHour = new schedule.RecurrenceRule();
        var ruleFiveMinutes = new schedule.RecurrenceRule();

        ruleHour.minute = new schedule.Range(0, 59, 60);
        ruleFiveMinutes.minute = new schedule.Range(0, 59, 5);

        this.initializeDb().then(() => {
            schedule.scheduleJob(ruleHour, () => {
                this.synchronizeHour();
            });

            schedule.scheduleJob(ruleFiveMinutes, () => {
                this.synchronizeFiveMinutes();
            });
        });
    }

    initializeDb(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelize =  new Sequelize({
                    database: environment.redmineDB.database,
                    dialect: environment.redmineDB.connection,
                    username: environment.redmineDB.user,
                    password: environment.redmineDB.password,
                    host: environment.redmineDB.host,
                    port: environment.redmineDB.port,
                    logging: console.log,
                    //logging: false,
                    storage: ':memory:',
                    modelPaths: [__dirname + '/**/*.model.' + environment.redmineDB.connection + '.ts']
                });

                this.sequelize.authenticate().then(() => {
                    resolve(this.sequelize);
                });
            } catch(e) {
                reject(e);
            }
        });
    }

    synchronizeHour() {
        let synchronizeProjects: SynchronizeProjects;
        let synchronizeUsers: SynchronizeUsers;

        synchronizeProjects = new SynchronizeProjects(this.sequelize, this.sequelizeRedTrench);
        synchronizeUsers = new SynchronizeUsers(this.sequelize, this.sequelizeRedTrench);

        synchronizeProjects.synchronize().then(result => {});
        synchronizeUsers.synchronize().then(result => {});
    }

    synchronizeFiveMinutes() {
        // TODO: Call synchronize in five minutes
    }

    getSequelizeRedtrench(): Sequelize {
        return this.sequelizeRedTrench;
    }

    setSequelizeRedtrench(value: Sequelize) {
        this.sequelizeRedTrench = value;
    }
}