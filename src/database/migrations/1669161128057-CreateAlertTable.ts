import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateAlertTable1669161128057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "alert",
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"
            },
            {
                name: "maxMeasurement",
                type: 'float'
            },
            {
                name: "mediumMeasurement",
                type: 'float'
            },
            {
                name: "minMeasurement",
                type: 'float'
            },
            {
                name: "created_at",
                type: 'int'
            },
            {
                name: "updated_at",
                type: 'int'
            },
            ]
        }));

        await queryRunner.query(`ALTER TABLE "parameter" ADD COLUMN "alertId" int`,)

        await queryRunner.createForeignKey(
            "parameter",
            new TableForeignKey({
                columnNames: ["alertId"],
                referencedColumnNames: ["id"],
                referencedTableName: "alert",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameter" DROP COLUMN "alertId"`,)
        await queryRunner.dropTable('alert');
    }

}

