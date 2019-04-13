import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'fm_project'})
export class ProjectFastmine extends Model<ProjectFastmine> {
    @Column
    name: string;

    @Column
    description: string;

    @Column
    homepage: string;

    @Column({field: 'parent_id'})
    parentId: number;

    @Column({field: 'created_on'})
    createdOn: Date;

    @Column({field: 'updated_on'})
    updatedOn: Date;

    @Column
    identifier: string;

    @Column
    status: number;

    @Column({field: 'redmine_id'})
    redmineId: number;
}
