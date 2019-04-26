import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'email_addresses'})
export class EmailAddressesRedmine extends Model<EmailAddressesRedmine> {
    @Column({field: 'user_id'})
    userId: number;

    @Column
    address: string;

    @Column({field: 'is_default'})
    isDefault: boolean;

    @Column
    notify: boolean;

    @Column({field: 'created_on'})
    createdOn: Date;

    @Column({field: 'updated_on'})
    updatedOn: Date;
}
