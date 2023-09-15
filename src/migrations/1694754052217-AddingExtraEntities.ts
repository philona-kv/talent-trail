import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingExtraEntities1694754052217 implements MigrationInterface {
  name = 'AddingExtraEntities1694754052217';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interviewer_vs_preferred_slot" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "slotId" integer NOT NULL, "userId" integer NOT NULL, "status" character varying NOT NULL, "rejectionReason" character varying NOT NULL, CONSTRAINT "PK_501bebd38b6fcf63b461fa684e8" PRIMARY KEY ("slotId", "userId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "interviewer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "categoryId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_8b5a3f8c8c273aef8bb3afbb912" PRIMARY KEY ("categoryId", "employeeId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "preferred_slot" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "candidateId" integer NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "applicationId" integer NOT NULL, "interviewId" integer NOT NULL, CONSTRAINT "PK_a51b54fea95b64b99d4c5a67ca6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "preferred_slot"`);
    await queryRunner.query(`DROP TABLE "interviewer"`);
    await queryRunner.query(`DROP TABLE "interviewer_vs_preferred_slot"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
