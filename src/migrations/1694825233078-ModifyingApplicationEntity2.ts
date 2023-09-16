import {MigrationInterface, QueryRunner} from "typeorm";

export class ModifyingApplicationEntity21694825233078 implements MigrationInterface {
    name = 'ModifyingApplicationEntity21694825233078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" ADD "score" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "score"`);
    }

}
