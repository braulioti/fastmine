import {Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'projects'})
export class ProjectsRedmine extends Model<ProjectsRedmine> {
    @Column
    name: string;

    @Column
    description: string;

    @Column
    homepage: string;

    @Column({field: 'is_public'})
    isPublic: number;

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

    @Column
    lft: number;

    @Column
    rgt: number;

    @Column({field: 'inherit_members'})
    inheritMembers: number;

    @Column({field: 'default_version_id'})
    defaultVersionId: number;

    @Column({field: 'default_assigned_to_id'})
    defaultAssignedToId: number;
}