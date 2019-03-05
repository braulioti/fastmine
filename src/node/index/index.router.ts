import * as restify from 'restify';
import {Router} from '../common/router';

export class ListRouter {
    list: any[];

    constructor() {
        this.list = [];
    }

    addObjRouter (name: string, value: string) {
        let aux = {
            name: '',
            value: ''
        };
        aux.name = name;
        aux.value = value;

        this.list.push(aux);
    }

    toJSON() {
        let strAux = '{';

        this.list.forEach((item: any, index) => {
            if (index !== 0) {
                strAux = `${strAux},`;
            }
            strAux = `${strAux}"${item.name}":"${item.value}"`;
        });
        strAux = `${strAux}}`;

        return JSON.parse(strAux);
    }
}

class IndexRouter extends Router {
    resources: any[];
    resourceObj: ListRouter;

    constructor() {
        super();
        this.resources = [];
        this.resourceObj = new ListRouter();
    }

    addRouter(router: Router) {
        this.resourceObj.addObjRouter(router.modelName, router.basePath);
    }

    findAllLinks = (req, resp, next) => {
        let resource = {
            _links: this.resourceObj.toJSON()
        };

        resp.json(resource);
        return next();
    };

    applyRoutes(application: restify.Server) {
        // TODO: alterar todas as rotas de API para /api
        // application.get('/', this.findAllLinks);
    }
}

export const indexRouter = new IndexRouter();