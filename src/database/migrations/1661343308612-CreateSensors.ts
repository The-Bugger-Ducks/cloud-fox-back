import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSensors1661343308612 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: "sensors",
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "uuid"
      },
      {
        name: "name",
        type: "varchar"
      },]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
