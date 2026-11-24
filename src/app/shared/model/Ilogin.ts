export interface ILogin {
  email: string;
  password: string;
}


export interface IsignUp{
  name :string,
  email : string,
  password :string,
  userRole : 'buyer' | 'admin' |'superAdmin'
}