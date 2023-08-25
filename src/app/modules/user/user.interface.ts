/*steps to create a mongoose modules*/

/*
1. create necessary interface on seperate interface file
2. create model file and define schemaType for user
3. create a class-oriented Model for future function-class features to call
4. create a model
*/

/* step one */

export type IUser = {
  name: string
  email: string
  role?: 'user' | 'admin'
  password: string
}
