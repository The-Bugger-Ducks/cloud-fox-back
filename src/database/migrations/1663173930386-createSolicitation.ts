import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm"

export class createSolicitation1663173930386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
          name: "solicitations",
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "uuid"
            },
            {
              name: "roleReq",
              type: "varchar"
            },
            
          ],
        }));

        await queryRunner.addColumn(
            "solicitations",
            new TableColumn({
              name: "userId",
              type: "uuid",
            }),
          )

        await queryRunner.createForeignKey(
            "solicitations",
            new TableForeignKey({
              columnNames: ["userId"],
              referencedColumnNames: ["id"],
              referencedTableName: "users",
              onDelete: "CASCADE",
            }),
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('solicitations');
    }

}
