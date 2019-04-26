import {Sequelize} from 'sequelize-typescript';
import {environment} from '../common/environments';
import * as sequelize from 'sequelize';
import {SynchronizeProjects} from './synchronize/projects.synchronize';
import {SynchronizeUsers} from './synchronize/users.synchronize';
import {SynchronizeVersions} from './synchronize/versions.synchronize';
import {SynchronizeEmailAdresses} from './synchronize/email-addresses.synchronize';

export class Redmine {
    sequelize: Sequelize;
    sequelizeFastmine: Sequelize;

    constructor() {
        var schedule = require('node-schedule');

        var ruleHour = new schedule.RecurrenceRule();
        var ruleFiveMinutes = new schedule.RecurrenceRule();

        ruleHour.minute = new schedule.Range(0, 59, 1);
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
                    //logging: console.log,
                    logging: false,
                    storage: ':memory:',
                    modelPaths: [__dirname + '/../**/*.modelredmine.' + environment.redmineDB.connection + '.ts']
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
        let synchronizeVersions: SynchronizeVersions;
        let synchronizeEmailAdresses: SynchronizeEmailAdresses;

        synchronizeUsers = new SynchronizeUsers(this.sequelize, this.sequelizeFastmine);
        synchronizeProjects = new SynchronizeProjects(this.sequelize, this.sequelizeFastmine);
        synchronizeVersions = new SynchronizeVersions(this.sequelize, this.sequelizeFastmine);
        synchronizeEmailAdresses = new SynchronizeEmailAdresses(this.sequelize, this.sequelizeFastmine);

        synchronizeUsers.synchronize().then(resultUsers => {});
        synchronizeEmailAdresses.synchronize().then(resultAddresses => {});
        synchronizeProjects.synchronize().then(resultProjects => {});
        synchronizeVersions.synchronize().then(resultVersions => {});
    }

    synchronizeFiveMinutes() {
        // TODO: Call synchronize in five minutes
    }

    getSequelizeFastime(): Sequelize {
        return this.sequelizeFastmine;
    }

    setSequelizeFastime(value: Sequelize) {
        this.sequelizeFastmine = value;
    }
}
