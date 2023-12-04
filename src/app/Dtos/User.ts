export class User {
  constructor(
    public Pein: string,
    public Name: string,
    public Email: string,
    public Roles: string[],
    public IsImpersonate: boolean,
    public RealUser: User,
    public Street: string,
    public City: string,
    public Province: string,
    public PostalCode: string
  ) {}
}
