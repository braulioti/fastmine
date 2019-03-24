import {Synchronize} from './synchronize';
import {UsersRedmine} from '../../models_redmine_mysql/users.modelredmine';
import {Users} from '../../models/users.model';
import {UserRedTrench} from '../../models_redtrench/rt-user.modelredtrench';
import {Sequelize} from 'sequelize-typescript';
import {environment} from '../../common/environments';

export class SynchronizeUsers extends Synchronize {
    synchronize(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelizeOrigin.addModels([UsersRedmine]);
                this.sequelizeDestiny.addModels([Users, UserRedTrench]);

                UsersRedmine.findAll({}).then(resultRedmine => {
                    Users.findAll({}).then(resultRedtrench => {
                        resultRedmine.forEach((item: UsersRedmine) => {
                           const user = resultRedtrench.find((p: Users) => p.id === item.id);
                           if (!user) {
                               let newUser = new Users();
                               let newUserRedTrench = new UserRedTrench();

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
                                       newUserRedTrench.id = res[0].nextval;
                                       newUserRedTrench.login = item.login;
                                       newUserRedTrench.hashedPassword = item.hashedPassword;
                                       newUserRedTrench.firstname = item.firstname;
                                       newUserRedTrench.lastname = item.lastname;
                                       newUserRedTrench.status = item.status;
                                       newUserRedTrench.lastLoginOn = item.lastLoginOn;
                                       newUserRedTrench.language = item.language;
                                       newUserRedTrench.createdOn = item.createdOn;
                                       newUserRedTrench.updatedOn = item.updatedOn;
                                       newUserRedTrench.passwdChangedOn = item.passwdChangedOn;

                                       newUserRedTrench.save();
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


