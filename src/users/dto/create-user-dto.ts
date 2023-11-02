export class CreateUserDto {
  firstName: string;
  lastName: string;
  readonly passsword: string;
  email: string;
  isActive: boolean;
}
