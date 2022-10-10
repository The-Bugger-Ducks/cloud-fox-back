import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateParameterTypeTable1661959458848 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "parameterType",
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: "increment"
      },
      {
        name: "name",
        type: "varchar"
      },
      {
        name: "unit",
        type: "varchar"
      },
      {
        name: "factor",
        type: 'float'
      },
      {
        name: "type",
        type: 'varchar'
      }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('parameterType');
  }

}
