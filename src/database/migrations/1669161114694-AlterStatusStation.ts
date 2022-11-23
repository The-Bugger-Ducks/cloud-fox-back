import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class AlterStatusStation1669161114694 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameterType" ADD COLUMN "status" varchar(55)`,)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parameterType" DROP COLUMN "status"`,)
    }
}
