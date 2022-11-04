import * as express from 'express'

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                administrador: boolean;
                cod_registro: string;
            }
        }
    }
}
