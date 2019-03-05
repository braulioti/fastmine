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
                        console.log('Find and save projects here!');
                    });
                });
            } catch(e) {
                reject(e);
            }
        });
    };
}