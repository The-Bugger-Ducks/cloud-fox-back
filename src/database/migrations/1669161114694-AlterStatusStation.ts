import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AlterStatusStation1669161114694 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameter" ADD COLUMN "status" varchar(55)`,)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameter" DROP COLUMN "status"`,)
    }
}
