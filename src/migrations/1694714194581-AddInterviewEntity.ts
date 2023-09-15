import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInterviewEntity1694714194581 implements MigrationInterface {
  name = 'AddInterviewEntity1694714194581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "interview" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "candidateId" integer NOT NULL, "employeeId" integer NOT NULL, "applicationId" integer NOT NULL, "startDate" TIMESTAMP, "endDate" TIMESTAMP, "feedback" jsonb, "round" integer NOT NULL, "status" character varying NOT NULL, "next" integer, "prev" integer, CONSTRAINT "PK_44c49a4feadefa5c6fa78bfb7d1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "interview"`);
  }
}
