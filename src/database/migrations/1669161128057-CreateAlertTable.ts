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
                name: "minLowAlert",
                type: 'float'
            },
            {
                name: "maxLowAlert",
                type: 'float'
            },

            {
                name: "minMediumAlert",
                type: 'float'
            },
            {
                name: "maxMediumAlert",
                type: 'float'
            },

            {
                name: "minHighAlert",
                type: 'float'
            },
            {
                name: "maxHighAlert",
                type: 'float'
            },


            {
                name: "created_at",
                type: 'int'
            },
            ]
        }));

        await queryRunner.query(`ALTER TABLE "alert" ADD COLUMN "parameterId" int`,)

        await queryRunner.createForeignKey(
            "alert",
            new TableForeignKey({
                columnNames: ["parameterId"],
                referencedColumnNames: ["id"],
                referencedTableName: "parameter",
                onDelete: "CASCADE",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('alert');
    }

}

