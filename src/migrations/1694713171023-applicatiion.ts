import { MigrationInterface, QueryRunner } from 'typeorm';

export class applicatiion1694713171023 implements MigrationInterface {
  name = 'applicatiion1694713171023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "application" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "candidateId" integer NOT NULL, "jobId" integer NOT NULL, "referredBy" integer NOT NULL, "status" character varying NOT NULL, "appliedDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "application"`);
  }
}
