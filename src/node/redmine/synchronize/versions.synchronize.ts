import {Synchronize} from './synchronize';
import {Sequelize} from 'sequelize-typescript';
import {VersionsRedmine} from '../../models_redmine_mysql/versions.modelredmine.mysql';
import {Versions} from '../../models/versions.model';
import {VersionFastmine} from '../../models_fastmine/fm-version.modelfastmine';
import {ProjectFastmine} from '../../models_fastmine/fm-project.modelfastmine';

export class SynchronizeVersions extends Synchronize {
    synchronize(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelizeOrigin.addModels([VersionsRedmine]);
                this.sequelizeDestiny.addModels([Versions, VersionFastmine]);

                VersionsRedmine.findAll({}).then(resultRedmine => {
                    Versions.findAll({}).then(resultFastmine => {
                        resultRedmine.forEach((item: VersionsRedmine) => {
                           const version = resultFastmine.find((p: Versions) => p.id === item.id);
                           if (!version) {
                               let newVersion = new Versions();
                               let newVersionFastmine = new VersionFastmine();

                               newVersion.id = item.id;
                               newVersion.projectId = item.projectId;
                               newVersion.name = item.name;
                               newVersion.description = item.description;
                               newVersion.effectiveDate = item.effectiveDate;
                               newVersion.createdOn = item.createdOn;
                               newVersion.updatedOn = item.updatedOn;
                               newVersion.wikiPageTitle = item.wikiPageTitle;
                               newVersion.status = item.status;
                               newVersion.sharing = item.sharing;

                               newVersion.save();

                               ProjectFastmine.findOne({
                                   where: {
                                       redmineId: newVersion.projectId
                                   }
                               }).then(resProject => {
                                   this.sequelizeDestiny.query("SELECT nextval('sq_version')", {
                                       type: Sequelize.QueryTypes.SELECT
                                   }).then(res => {
                                       newVersionFastmine.id = res[0].nextval;
                                       newVersionFastmine.projectId = resProject.id;
                                       newVersionFastmine.name = item.name;
                                       newVersionFastmine.description = item.description;
                                       newVersionFastmine.effectiveDate = item.effectiveDate;
                                       newVersionFastmine.createdOn = item.createdOn;
                                       newVersionFastmine.updatedOn = item.updatedOn;
                                       newVersionFastmine.wikiPageTitle = item.wikiPageTitle;
                                       newVersionFastmine.status = item.status;
                                       newVersionFastmine.sharing = item.sharing;
                                       newVersionFastmine.redmineId = item.id;

                                       newVersionFastmine.save();
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


