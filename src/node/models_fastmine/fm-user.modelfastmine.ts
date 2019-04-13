import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'fm_user'})
export class UserFastmine extends Model<UserFastmine> {
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

    @Column({field: 'redmine_id'})
    redmineId: number;
}
