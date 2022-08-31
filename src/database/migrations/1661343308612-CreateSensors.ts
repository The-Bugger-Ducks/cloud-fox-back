import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

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
        name: "accuracy",
        type: 'float'
      },
      {
        name: "startDate",
        type: "timestamp"
      },
      {
        name: "endDate",
        type: "timestamp"
      },
      {
        name: "unit",
        type: 'varchar'
      },
      ]
    }));

    await queryRunner.addColumn(
      "sensors",
      new TableColumn({
        name: "stationId",
        type: "uuid",
      }),
    )

    await queryRunner.createForeignKey(
      "sensors",
      new TableForeignKey({
        columnNames: ["stationId"],
        referencedColumnNames: ["id"],
        referencedTableName: "sensors",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sensors');
  }

}
