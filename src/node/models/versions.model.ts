import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'versions'})
export class Versions extends Model<Versions> {
    @Column({field: 'project_id'})
    projectId: number;

    @Column
    name: string;

    @Column
    description: string;

    @Column({field: 'effective_date'})
    effectiveDate: Date;

    @Column({field: 'created_on'})
    createdOn: Date;

    @Column({field: 'updated_on'})
    updatedOn: Date;

    @Column({field: 'wiki_page_title'})
    wikiPageTitle: string;

    @Column
    status: string;

    @Column
    sharing: string;
}