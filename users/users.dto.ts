export interface CreateUserDto {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  // permissionLevel?: number;
}

export interface PutUserDto {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  // permissionLevel: number;
  permissionFlags?: number;
}

export interface UserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionFlags?: number;
}

export interface PatchUserDto extends Partial<PutUserDto> { }