import {Sequelize} from 'sequelize-typescript';

export abstract class Synchronize {
    abstract synchronize(): Promise<any>;

    sequelizeOrigin: Sequelize;
    sequelizeDestiny: Sequelize;

    constructor (
        origin: Sequelize,
        destiny: Sequelize
    ) {
        this.sequelizeOrigin = origin;
        this.sequelizeDestiny = destiny;
    }
}