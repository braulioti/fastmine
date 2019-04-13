import {Synchronize} from './synchronize';
import {Projects} from '../../models/projects.model';
import {Sequelize} from 'sequelize-typescript';
import {environment} from '../../common/environments';
import {ProjectsRedmine} from '../../models_redmine_mysql/projects.modelredmine.mysql';
import {ProjectFastmine} from '../../models_fastmine/fm-project.modelfastmine';

export class SynchronizeProjects extends Synchronize {
    synchronize(): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.sequelizeOrigin.addModels([ProjectsRedmine]);
                this.sequelizeDestiny.addModels([Projects, ProjectFastmine]);

                // TODO: Identify appropriate model (mysql or postgres) to use into sequelizeOrigin
                // TODO: Issue #36
                ProjectsRedmine.findAll({}).then(resultRedmine => {
                    Projects.findAll({}).then(resultFastmine => {
                        resultRedmine.forEach((item: ProjectsRedmine) => {
                           const project = resultFastmine.find((p: Projects) => p.id === item.id);
                           if (!project) {
                               let newProject = new Projects();
                               let newProjectFastmine = new ProjectFastmine();

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

                               this.sequelizeDestiny.query("SELECT nextval('sq_project')", {
                                   type: Sequelize.QueryTypes.SELECT
                               }).then(res => {
                                   newProjectFastmine.id = res[0].nextval;
                                   newProjectFastmine.name = item.name;
                                   newProjectFastmine.description = item.description;
                                   newProjectFastmine.homepage = item.homepage;
                                   newProjectFastmine.parentId = item.parentId;
                                   newProjectFastmine.createdOn = item.createdOn;
                                   newProjectFastmine.updatedOn = item.updatedOn;
                                   newProjectFastmine.identifier = item.identifier;
                                   newProjectFastmine.status = item.status;
                                   newProjectFastmine.redmineId = item.id;

                                   newProjectFastmine.save();
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
