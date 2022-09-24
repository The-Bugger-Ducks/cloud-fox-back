import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateStations1661959458844 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: "stations",
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: true
        },
        {
          name: "lat",
          type: "float",
          isNullable: true
        },
        {
          name: "lon",
          type: "float",
          isNullable: true
        },
        {
          name: "description",
          type: "varchar",
          isNullable: true
        },
        {
          name: "startdate",
          type: "bigInt",
          isNullable: true
        },
        {
          name: "isActive",
          type: "boolean",
          default: false
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stations');
  }

}
