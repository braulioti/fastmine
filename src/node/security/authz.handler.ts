import * as restify from 'restify'
import {ForbiddenError} from 'restify-errors'

export const authorize: (...profiles: string[])=> restify.RequestHandler = (...profiles)=>{
    return (req, resp, next) => {
        // TODO: validar permissões de acesso
        //if ((req as any).authenticated !== undefined && (req as any).authenticated.hasAny(...profiles)){
        if ((req as any).authenticated !== undefined) {
            next();
        } else {
            next(new ForbiddenError('Permissão Negada'));
        }
    }
};