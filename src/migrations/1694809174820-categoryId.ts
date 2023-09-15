import {MigrationInterface, QueryRunner} from "typeorm";

export class categoryId1694809174820 implements MigrationInterface {
    name = 'categoryId1694809174820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "categoryId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "categoryId"`);
    }

}
