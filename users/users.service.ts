import { UserDto } from './users.dto';
import UsersDao from './users.dao';
import { CRUD } from '../common/interface/crud.interface';

class UsersService implements CRUD {

  async create(resource: UserDto) {
      return UsersDao.addUser(resource);
  }

  async deleteById(resourceId: string) {
      return UsersDao.removeUserById(resourceId);
  };

  async list(limit: number, page: number) {
      return UsersDao.getUsers();
  };

  async patchById(resource: UserDto) {
      return UsersDao.patchUserById(resource)
  };

  async readById(resourceId: string) {
      return UsersDao.getUserById(resourceId);
  };

  async updateById(resource: UserDto) {
      return UsersDao.putUserById(resource);
  };

  async getUserByEmail(email: string) {
      return UsersDao.getUserByEmail(email);
  }
}

export default new UsersService();