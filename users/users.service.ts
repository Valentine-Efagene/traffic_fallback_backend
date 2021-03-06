import { CreateUserDto, PatchUserDto, PutUserDto } from './users.dto'
import UsersDao from './users.dao';
import { CRUD } from '../common/interface/crud.interface';


class UsersService implements CRUD {
    async create(resource: CreateUserDto) {
        return UsersDao.addUser(resource);
    }

    async deleteById(id: string): Promise<any> {
        return UsersDao.removeUserById(id);
    }

    async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    }

    async patchById(id: string, resource: PatchUserDto): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    async putById(id: string, resource: PutUserDto) {
        return UsersDao.updateUserById(id, resource);
    }

    async getUserByEmail(email: string): Promise<any> {
        return UsersDao.getUserByEmail(email);
    }

    async getUserByEmailWithPassword(email: string) {
        return UsersDao.getUserByEmailWithPassword(email);
    }
}

export default new UsersService();