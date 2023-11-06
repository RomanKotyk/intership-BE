import { User } from '../../src/users/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestData1699089890834 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.create<User>(User, {
        firstName: 'Test Name',
        lastName: 'Last Name',
        password: '12345',
        email: 'test@gmail.com',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
