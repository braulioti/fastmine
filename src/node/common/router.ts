import * as restify from 'restify';
import {Sequelize} from 'sequelize-typescript';
import * as sequelize from 'sequelize';
import {NotFoundError, InternalServerError} from 'restify-errors';

export abstract class Router {
    abstract applyRoutes(application: restify.Server, sequelize: Sequelize);

    private itemPost: any;

    public basePath: string;
    public modelName: string;
    public model: any;
    public includes: any[] = [];

    pageSize: number = 10;

    envelope(document: any): any {
        let resource = Object.assign({_links: {}}, document.toJSON());
        resource._links.self = `${this.basePath}/${resource.id}`;
        return resource;
    }

    envelopeAll(documents: any[], options: any = {}): any {
        const resource: any = {
            _links: {
                self: `${options.url}`
            },
            _metadata: {
                count: `${options.count}`
            },
            items: documents
        };

        if (options.page && options.count && options.pageSize) {
            if (options.page > 1) {
                resource._links.previous = `${this.basePath}?_page=${options.page-1}`;
            }
            const remaining = options.count - (options.page * options.pageSize);
            if (remaining > 0) {
                resource._links.next = `${this.basePath}?_page=${options.page+1}`;
            }
        }

        return resource;
    }

    render(response: restify.Response, next: restify.Next) {
        return (document) => {
            if (document) {
                response.json(this.envelope(document));
            } else {
                throw new NotFoundError('Documento não encontrado');
            }

            return next(false);
        }
    }

    renderAll(response: restify.Response, next: restify.Next, options: any = {}) {
        return (itens: any[]) => {
            if (itens) {
                itens.forEach((item, index, array) => {
                    array[index] = this.envelope(item);
                });

                response.json(this.envelopeAll(itens, options));
            } else {
                response.json(this.envelopeAll([]));
            }

            return next();
        };
    }

    findAll = (req, resp, next) => {
        let page = parseInt(req.query._page || 1);
        page = page > 0 ? page : 1;

        const skip = (page - 1) * this.pageSize;

        this.model.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('id')), 'count']
            ]
        }).then(resCount => {
            const count = resCount[0].dataValues.count;
            this.model.findAll({
                offset: skip,
                limit: this.pageSize
            }).then(
                this.renderAll(resp, next, {
                    page,
                    count,
                    pageSize: this.pageSize,
                    url: req.url
                })
            );
        }).catch(next);
    };

    findById = (req, resp, next) => {
        this.model.findOne({
            where: {
                id: req.params.id
            },
            include: this.includes
        }).then(this.render(resp, next)).catch(next);
    };

    setItemPost(item: any) {
        this.itemPost = item;
    };

    getItemPost(): any {
        return this.itemPost;
    };

    save = (req, resp, next) => {
        this.itemPost.save().then(
            this.render(resp, next)
        ).catch((err) => {
            return next(new InternalServerError(`error while saving: ${err.message}`));
        });
    };

    update = (req, resp, next) => {
        this.model.findOne({
            where: {
                id: req.params.id
            },
            include: this.includes
        }).then((objUpdate) => {
            objUpdate.update(req.body).then(this.render(resp, next));
        }).catch((err) => {
            return next(new InternalServerError(`error while update: ${err.message}`));
        });
    };
}