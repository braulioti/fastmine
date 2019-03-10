import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'users'})
export class Users extends Model<Users> {
    @Column
    login: string;

    @Column({field: 'hashed_password'})
    hashedPassword: string;

    @Column
    firstname: string;

    @Column
    lastname: string;

    @Column
    admin: number;

    @Column
    status: number;

    @Column({field: 'last_login_on'})
    lastLoginOn: Date;

    @Column
    language: string;

    @Column({field: 'auth_source_id'})
    authSourceId: number;

    @Column({field: 'created_on'})
    createdOn: Date;

    @Column({field: 'updated_on'})
    updatedOn: Date;

    @Column
    type: string;

    @Column({field: 'identity_url'})
    identityUrl: string;

    @Column({field: 'mail_notification'})
    mailNotification: string;

    @Column
    salt: string;

    @Column({field: 'must_change_passwd'})
    mustChangePasswd: number;

    @Column({field: 'passwd_changed_on'})
    passwdChangedOn: Date;
}