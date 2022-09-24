import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { UserRole } from "../../app/enums/UserRoleEnum"; "../../app/enums/UserRoleEnum";

export class CreateUsersTable1621197196787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid"
        },
        {
          name: "username",
          type: "varchar"
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false,
          isUnique: true
        },
        {
          name: "imgSrc",
          type: "varchar"
        },
        {
          name: "role",
          type: "enum",
          enumName: 'roleEnum',
          enum: [UserRole.ADMIN, UserRole.SIMPLE, UserRole.ADVANCED],
          default: `'${UserRole.SIMPLE}'`
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

}
