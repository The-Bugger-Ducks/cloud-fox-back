import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateParameterTable1661959458849 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "parameter",
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment"
      },
      {
        name: "parameterTypeId",
        type: 'int'
      },
      {
        name: "stationId",
        type: "varchar"
      }
      ]
    }));

    await queryRunner.createForeignKey(
      "parameter",
      new TableForeignKey({
        columnNames: ["stationId"],
        referencedColumnNames: ["id"],
        referencedTableName: "station",
        onDelete: "CASCADE",
      }),
    )

    await queryRunner.createForeignKey(
      "parameter",
      new TableForeignKey({
        columnNames: ["parameterTypeId"],
        referencedColumnNames: ["id"],
        referencedTableName: "parameterType",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parameter');
  }

}
