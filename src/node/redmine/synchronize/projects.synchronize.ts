import {Synchronize} from './synchronize';
import {Projects} from '../../models/projects.model';
import {ProjectsRedmine} from '../../models_redmine/projects.modelredmine';

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
                               newProject.isPublic = item.isPublic;
                               newProject.parentId = item.parentId;
                               newProject.createdOn = item.createdOn;
                               newProject.updatedOn = item.updatedOn;
                               newProject.identifier = item.identifier;
                               newProject.status = item.status;
                               newProject.lft = item.lft;
                               newProject.rgt = item.rgt;
                               newProject.inheritMembers = item.inheritMembers;
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