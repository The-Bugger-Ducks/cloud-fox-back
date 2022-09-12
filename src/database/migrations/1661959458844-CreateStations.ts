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
          isGenerated: true,
          generationStrategy: "uuid"
        },
        {
          name: "lat",
          type: "float",
        },
        {
          name: "lon",
          type: "float"
        },
        {
          name: "name",
          type: "varchar"
        },
        {
          name: "startdate",
          type: "timestamp",
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stations');
  }

}
