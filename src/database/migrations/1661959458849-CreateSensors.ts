import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateSensors1661959458849 implements MigrationInterface {

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
        name: "model",
        type: "varchar"
      },
      {
        name: "minRange",
        type: 'float',
      },
      {
        name: "maxRange",
        type: 'float'
      },
      {
        name: "factor",
        type: 'float'
      },
      {
        name: "startDate",
        type: "bigInt"
      },
      {
        name: "endDate",
        type: "bigInt",
        isNullable: true
      },
      {
        name: "unit",
        type: 'varchar'
      },
      {
        name: "stationId",
        type: "uuid"
      }
      ]
    }));

    await queryRunner.createForeignKey(
      "sensors",
      new TableForeignKey({
        columnNames: ["stationId"],
        referencedColumnNames: ["id"],
        referencedTableName: "stations",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sensors');
  }

}
