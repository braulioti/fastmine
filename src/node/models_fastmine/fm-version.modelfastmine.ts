import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {ProjectFastmine} from './fm-project.modelfastmine';

@Table({tableName: 'fm_version'})
export class VersionFastmine extends Model<VersionFastmine> {
    @ForeignKey(() => ProjectFastmine)
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

    @Column({field: 'redmine_id'})
    redmineId: number;
}
