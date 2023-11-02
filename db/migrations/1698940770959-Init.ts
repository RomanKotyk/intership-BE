import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698940770959 implements MigrationInterface {
    name = 'Init1698940770959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT 'true', CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Auth" ("id" SERIAL NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "actionToken" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_10b96a5538c04c5c9a93f33b96" UNIQUE ("userId"), CONSTRAINT "PK_fee4a2ee6693dbef79c39ff336d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Auth" ADD CONSTRAINT "FK_10b96a5538c04c5c9a93f33b960" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" DROP CONSTRAINT "FK_10b96a5538c04c5c9a93f33b960"`);
        await queryRunner.query(`DROP TABLE "Auth"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
