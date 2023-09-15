import {MigrationInterface, QueryRunner} from "typeorm";

export class jobUpdate1694770579779 implements MigrationInterface {
    name = 'jobUpdate1694770579779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "application" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "application" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "interview" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "interview" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "interview" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "interview" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "interviewer" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "interviewer" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" ADD "updatedBy" integer`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "createdBy" integer`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "updatedBy" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "job" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "preferred_slot" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer_vs_preferred_slot" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "interviewer" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "interviewer" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "interviewer" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "interview" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "interview" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "interview" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "interview" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "experience" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "experience" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "application" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "application" ADD "createdBy" character varying`);
    }

}
