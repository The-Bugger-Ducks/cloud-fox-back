import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class CreateMeasurementTable1661959473187 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "measurement",
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "moment",
          type: "bigInt"
        },
        {
          name: "value",
          type: "float"
        },
        {
          name: "parameterId",
          type: "int"
        }
      ]
    }));

    await queryRunner.createForeignKey(
      "measurement",
      new TableForeignKey({
        columnNames: ["parameterId"],
        referencedColumnNames: ["id"],
        referencedTableName: "parameter",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('measurement');
  }

}
