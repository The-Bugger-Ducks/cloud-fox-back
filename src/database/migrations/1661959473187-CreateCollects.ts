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
          name: "pluvValue",
          type: "float"
        },

        {
          name: "pluvUnit",
          type: "varchar"
        },

        {
          name: "heatValue",
          type: "float"
        },

        {
          name: "heatUnit",
          type: "varchar"
        },

        {
          name: "atmPresValue",
          type: "float"
        },

        {
          name: "atmPresUnit",
          type: "varchar"
        },
        {
          name: "humidityValue",
          type: "float"
        },
        {
          name: "humidityUnit",
          type: "varchar"
        },
        {
          name: "WindDirection",
          type: "float"
        },
        {
          name: "WindVelocity",
          type: "float"
        }
      ]
    }));


    await queryRunner.addColumn(
      "collects",
      new TableColumn({
        name: "stationId",
        type: "varchar",
      }),
    )

    await queryRunner.createForeignKey(
      "collects",
      new TableForeignKey({
        columnNames: ["stationId"],
        referencedColumnNames: ["id"],
        referencedTableName: "stations",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('collects');
  }

}
