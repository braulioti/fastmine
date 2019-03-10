import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'rt_user'})
export class UserRedTrench extends Model<UserRedTrench> {
    @Column
    login: string;

    @Column({field: 'hashed_password'})
    hashedPassword: string;

    @Column
    firstname: string;

    @Column
    lastname: string;

    @Column
    status: number;

    @Column({field: 'last_login_on'})
    lastLoginOn: Date;

    @Column
    language: string;

    @Column({field: 'created_on'})
    createdOn: Date;

    @Column({field: 'updated_on'})
    updatedOn: Date;

    @Column({field: 'passwd_changed_on'})
    passwdChangedOn: Date;
}