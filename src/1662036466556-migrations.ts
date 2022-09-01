import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1662036466556 implements MigrationInterface {
    name = 'migrations1662036466556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collects" ("id" SERIAL NOT NULL, "moment" TIMESTAMP NOT NULL, "value" integer NOT NULL, "sensorId" integer, CONSTRAINT "PK_7b52d66a76cced309b54feea453" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stations" ("id" SERIAL NOT NULL, "lat" integer NOT NULL, "lon" integer NOT NULL, "localReference" character varying NOT NULL, CONSTRAINT "PK_f047974bd453c85b08bab349367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "model" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "minRange" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "maxRange" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "accuracy" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "startDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "endDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "unit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "stationId" integer`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TYPE "public"."roleEnum" RENAME TO "roleEnum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'common')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."users_role_enum" USING "role"::"text"::"public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'common'`);
        await queryRunner.query(`DROP TYPE "public"."roleEnum_old"`);
        await queryRunner.query(`ALTER TABLE "collects" ADD CONSTRAINT "FK_f6cf48af6077e5137e2432f3b27" FOREIGN KEY ("sensorId") REFERENCES "sensors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "FK_2c9180d690c5c1d79afc59ec3f2" FOREIGN KEY ("stationId") REFERENCES "stations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "FK_2c9180d690c5c1d79afc59ec3f2"`);
        await queryRunner.query(`ALTER TABLE "collects" DROP CONSTRAINT "FK_f6cf48af6077e5137e2432f3b27"`);
        await queryRunner.query(`CREATE TYPE "public"."roleEnum_old" AS ENUM('admin', 'common')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" TYPE "public"."roleEnum_old" USING "role"::"text"::"public"."roleEnum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'common'`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."roleEnum_old" RENAME TO "roleEnum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "stationId"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "unit"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "accuracy"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "maxRange"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "minRange"`);
        await queryRunner.query(`ALTER TABLE "sensors" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "sensors" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "stations"`);
        await queryRunner.query(`DROP TABLE "collects"`);
    }

}
