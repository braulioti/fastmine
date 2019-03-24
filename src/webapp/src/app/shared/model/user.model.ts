export class UserModel {
  constructor(
    public id?: number,
    public login?: string,
    public hashedPassword?: string,
    public firstname?: string,
    public lastname?: string,
    public status?: number,
    public lastLoginOn?: Date,
    public language?: string,
    public createdOn?: Date,
    public updatedOn?: Date,
    public passwordChangedOn?: Date
  ) {
  }
}