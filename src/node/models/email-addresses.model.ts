import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'email_addresses'})
export class EmailAddresses extends Model<EmailAddresses> {
    @Column({field: 'user_id'})
    userId: number;

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
}
