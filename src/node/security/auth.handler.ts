import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import {NotAuthorizedError} from 'restify-errors';
import {environment} from '../common/environments';
import * as bcrypt from 'bcrypt';
//
// export const authenticate: restify.RequestHandler = (
//     req: restify.Request, resp: restify.Response, next) => {
//         Usuario.findOne({
//             where: { login: req.body.login }
//         }).then((user: Usuario) => {
//             if (user && bcrypt.compareSync(req.body.senha, user.senha)) {
//                 const token = jwt.sign({
//                     sub: user.email,
//                     iss: 'milhas-plus'
//                 }, environment.security.apiSecret);
//                 resp.json({
//                     id: user.id,
//                     nome: user.nome,
//                     email: user.email,
//                     accessToken: token
//                 });
//                 return next(false);
//             } else {
//                 return next(new NotAuthorizedError('Login ou senha inválida'));
//             }
//         }).catch(next);
//     };
