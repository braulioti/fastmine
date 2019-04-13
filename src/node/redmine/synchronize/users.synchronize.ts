import {Synchronize} from './synchronize';
import {Users} from '../../models/users.model';
import {Sequelize} from 'sequelize-typescript';
import {environment} from '../../common/environments';
import {UsersRedmine} from '../../models_redmine_mysql/users.modelredmine.mysql';
import {UserFastmine} from '../../models_fastmine/fm-user.modelfastmine';

export class SynchronizeUsers extends Synchronize {
    synchronize(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelizeOrigin.addModels([UsersRedmine]);
                this.sequelizeDestiny.addModels([Users, UserFastmine]);

                UsersRedmine.findAll({}).then(resultRedmine => {
                    Users.findAll({}).then(resultFastmine => {
                        resultRedmine.forEach((item: UsersRedmine) => {
                           const user = resultFastmine.find((p: Users) => p.id === item.id);
                           if (!user) {
                               let newUser = new Users();
                               let newUserFastmine = new UserFastmine();

                               newUser.id = item.id;
                               newUser.login = item.login;
                               newUser.hashedPassword = item.hashedPassword;
                               newUser.firstname = item.firstname;
                               newUser.lastname = item.lastname;
                               if (environment.redmineDB.connection === 'mysql') {
                                   newUser.admin = item.admin;
                               } else {
                                   newUser.admin = item.admin ? 1 : 0;
                               }
                               newUser.status = item.status;
                               newUser.lastLoginOn = item.lastLoginOn;
                               newUser.language = item.language;
                               newUser.authSourceId = item.authSourceId;
                               newUser.createdOn = item.createdOn;
                               newUser.updatedOn = item.updatedOn;
                               newUser.type = item.type;
                               newUser.identityUrl = item.identityUrl;
                               newUser.mailNotification = item.mailNotification;
                               newUser.salt = item.salt;
                               if (environment.redmineDB.connection === 'mysql') {
                                   newUser.mustChangePasswd = item.mustChangePasswd;
                               } else {
                                   newUser.mustChangePasswd = item.mustChangePasswd ? 1 : 0;
                               }
                               newUser.passwdChangedOn = item.passwdChangedOn;

                               newUser.save();

                               if (item.login && item.login != '') {
                                   this.sequelizeDestiny.query("SELECT nextval('sq_user')", {
                                       type: Sequelize.QueryTypes.SELECT
                                   }).then(res => {
                                       newUserFastmine.id = res[0].nextval;
                                       newUserFastmine.login = item.login;
                                       newUserFastmine.hashedPassword = item.hashedPassword;
                                       newUserFastmine.firstname = item.firstname;
                                       newUserFastmine.lastname = item.lastname;
                                       newUserFastmine.status = item.status;
                                       newUserFastmine.lastLoginOn = item.lastLoginOn;
                                       newUserFastmine.language = item.language;
                                       newUserFastmine.createdOn = item.createdOn;
                                       newUserFastmine.updatedOn = item.updatedOn;
                                       newUserFastmine.passwdChangedOn = item.passwdChangedOn;
                                       newUserFastmine.redmineId = item.id;

                                       newUserFastmine.save();
                                   });
                               }
                           }
                        });
                    });
                });
            } catch(e) {
                reject(e);
            }
        });
    };
}


