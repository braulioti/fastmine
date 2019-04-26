import {Synchronize} from './synchronize';
import {Sequelize} from 'sequelize-typescript';
import {UserFastmine} from '../../models_fastmine/fm-user.modelfastmine';
import {EmailAddressesRedmine} from '../../models_redmine_mysql/email-addresses.modelredmine.mysql';
import {EmailAddresses} from '../../models/email-addresses.model';
import {EmailAddressFastmine} from '../../models_fastmine/fm-email-address.modelfastmine';
import {environment} from '../../common/environments';

export class SynchronizeEmailAdresses extends Synchronize {
    synchronize(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelizeOrigin.addModels([EmailAddressesRedmine]);
                this.sequelizeDestiny.addModels([EmailAddresses, EmailAddressFastmine]);

                EmailAddressesRedmine.findAll({}).then(resultRedmine => {
                    EmailAddresses.findAll({}).then(resultFastmine => {
                        resultRedmine.forEach((item: EmailAddressesRedmine) => {
                           const user = resultFastmine.find((p: EmailAddresses) => p.id === item.id);
                           if (!user) {
                               let newEmailAddress = new EmailAddresses();
                               let newEmailAddressFastmine = new EmailAddressFastmine();

                               newEmailAddress.id = item.id;
                               newEmailAddress.address = item.address;
                               newEmailAddress.createdOn = item.createdOn;
                               if (environment.redmineDB.connection === 'mysql') {
                                   newEmailAddress.isDefault = item.isDefault;
                               } else {
                                   newEmailAddress.isDefault = item.isDefault ? 1 : 0;
                               }
                               newEmailAddress.userId = item.userId;
                               if (environment.redmineDB.connection === 'mysql') {
                                   newEmailAddress.notify = item.notify;
                               } else {
                                   newEmailAddress.notify = item.notify ? 1 : 0;
                               }
                               newEmailAddress.updatedOn = item.updatedOn;

                               newEmailAddress.save();

                               UserFastmine.findOne({
                                   where: {
                                       redmineId: newEmailAddress.userId
                                   }
                               }).then(resUser => {
                                   this.sequelizeDestiny.query("SELECT nextval('sq_email_address')", {
                                       type: Sequelize.QueryTypes.SELECT
                                   }).then(res => {
                                       newEmailAddressFastmine.id = res[0].nextval;
                                       newEmailAddressFastmine.address = item.address;
                                       newEmailAddressFastmine.createdOn = item.createdOn;
                                       if (environment.redmineDB.connection === 'mysql') {
                                           newEmailAddressFastmine.isDefault = item.isDefault;
                                       } else {
                                           newEmailAddressFastmine.isDefault = item.isDefault ? 1 : 0;
                                       }
                                       newEmailAddressFastmine.userId = resUser.id;
                                       if (environment.redmineDB.connection === 'mysql') {
                                           newEmailAddressFastmine.notify = item.notify;
                                       } else {
                                           newEmailAddressFastmine.notify = item.notify ? 1 : 0;
                                       }
                                       newEmailAddressFastmine.updatedOn = item.updatedOn;
                                       newEmailAddressFastmine.redmineId = item.id;

                                       newEmailAddressFastmine.save();
                                   });
                               });
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


