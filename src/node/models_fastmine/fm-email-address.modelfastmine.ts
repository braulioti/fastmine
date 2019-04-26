import {Column, ForeignKey, Model, Table, BelongsTo} from 'sequelize-typescript';
import {UserFastmine} from './fm-user.modelfastmine';

@Table({tableName: 'fm_email_address'})
export class EmailAddressFastmine extends Model<EmailAddressFastmine> {
    @ForeignKey(() => UserFastmine)
    @Column({field: 'user_id'})
    userId: number;

    @BelongsTo(() => UserFastmine)
    user: UserFastmine;

    @Column
    address: string;

    @Column({field: 'is_default'})
    isDefault: number;

    @Column
    notify: number;

    @Column({field: 'created_on'})
    createdOn: Date;

    @Column({field: 'updated_on'})
    updatedOn: Date;

    @Column({field: 'redmine_id'})
    redmineId: number;
}
