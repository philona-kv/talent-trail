import { MigrationInterface, QueryRunner } from 'typeorm';

export class jobCreated1694753333279 implements MigrationInterface {
  name = 'jobCreated1694753333279';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "info" jsonb, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "job"`);
  }
}
