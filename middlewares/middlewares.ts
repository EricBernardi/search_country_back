import basicAuth from 'express-basic-auth';
import { checkCredentials } from '../utils/utils';

const basicAuthMiddleware = basicAuth({
  authorizer: (id: string, password: string) => checkCredentials(id, password),
  unauthorizedResponse: () => 'Acesso não autorizado',
});

export { basicAuthMiddleware };
