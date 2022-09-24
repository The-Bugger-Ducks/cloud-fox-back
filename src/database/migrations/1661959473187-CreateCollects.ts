import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateCollects1661959473187 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: "collects",
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "uuid"
        },
        {
          name: "moment",
          type: "bigInt",
          isUnique: true
        },
        {
          name: "value",
          type: "float"
        },
        {
          name: "sensorId",
          type: "uuid"
        }
      ]
    }));

    await queryRunner.createForeignKey(
      "collects",
      new TableForeignKey({
        columnNames: ["sensorId"],
        referencedColumnNames: ["id"],
        referencedTableName: "sensors",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('collects');
  }

}
