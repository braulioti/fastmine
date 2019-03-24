import {Synchronize} from './synchronize';
import {Projects} from '../../models/projects.model';
import {ProjectsRedmine} from '../../models_redmine_mysql/projects.modelredmine';
import {Sequelize} from 'sequelize-typescript';
import {environment} from '../../common/environments';

export class SynchronizeProjects extends Synchronize {
    synchronize(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelizeOrigin.addModels([ProjectsRedmine]);
                this.sequelizeDestiny.addModels([Projects]);

                ProjectsRedmine.findAll({}).then(resultRedmine => {
                    Projects.findAll({}).then(resultRedtrench => {
                        resultRedmine.forEach((item: ProjectsRedmine) => {
                           const project = resultRedtrench.find((p: Projects) => p.id === item.id);
                           if (!project) {
                               let newProject = new Projects();

                               newProject.id = item.id;
                               newProject.name = item.name;
                               newProject.description = item.description;
                               newProject.homepage = item.homepage;
                               if (environment.redmineDB.connection === 'mysql') {
                                   newProject.isPublic = item.isPublic;
                               } else {
                                   newProject.isPublic = item.isPublic ? 1 : 0;
                               }
                               newProject.parentId = item.parentId;
                               newProject.createdOn = item.createdOn;
                               newProject.updatedOn = item.updatedOn;
                               newProject.identifier = item.identifier;
                               newProject.status = item.status;
                               newProject.lft = item.lft;
                               newProject.rgt = item.rgt;
                               if (environment.redmineDB.connection === 'mysql') {
                                   newProject.inheritMembers = item.inheritMembers;
                               } else {
                                   newProject.inheritMembers = item.inheritMembers ? 1 : 0;
                               }
                               newProject.defaultVersionId = item.defaultVersionId;
                               newProject.defaultAssignedToId = item.defaultAssignedToId;

                               newProject.save();
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