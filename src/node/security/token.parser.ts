import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import {environment} from '../common/environments';

// export const tokenParser: restify.RequestHandler = (
//     req: restify.Request, resp: restify.Response, next) => {
//     const token = extractToken(req);
//     if (token) {
//         jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
//     } else {
//         next();
//     }
// };

function extractToken(req: restify.Request) {
    // Authorization: Bearer TOKEN
    let token = undefined;
    const authtorization = req.header('authorization');
    if (authtorization) {
        const parts: string[] = authtorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }

    return token;
}

// function applyBearer(req, next): (error, decoded) => void {
//     return (error, decoded) => {
//         if (decoded) {
//             Usuario.findOne({
//                 where: { email: decoded.sub }
//             }).then((user: Usuario) => {
//                 // associar o usuário no request
//                 if (user) {
//                     req.authenticated = user;
//                 }
//                 next();
//             }).catch(next);
//         } else {
//             next()
//         }
//     }
// }