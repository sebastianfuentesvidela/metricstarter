export class User {
  constructor(
    public _id: string,
    public name: string,
    public surname: string,
    public email: string,
    public phone: string,
    public password: string,
    public role: string,
    public active: number,
    public image: string
      ) {}
}
