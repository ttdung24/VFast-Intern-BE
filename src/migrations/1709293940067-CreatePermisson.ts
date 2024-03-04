import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePermisson1709293940067 implements MigrationInterface {
  name = 'CreatePermisson1709293940067';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "user_roles_role_roleId_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "user_roles_role_userId_fkey"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_user_roles_role_userid"`);
    await queryRunner.query(`DROP INDEX "public"."idx_user_roles_role_roleid"`);
    await queryRunner.query(
      `CREATE TABLE "permisson" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "module" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_67249d3470c9d2f1358fe4d5bfa" UNIQUE ("code"), CONSTRAINT "PK_67d4daff0e97846010fc09e5998" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions_permisson" ("roleId" integer NOT NULL, "permissonId" integer NOT NULL, CONSTRAINT "PK_c42bd50d9a2c0c41ef4afb24024" PRIMARY KEY ("roleId", "permissonId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_66f62f3e201c901ea0ded2c1e2" ON "role_permissions_permisson" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab566a8e5bd2e342a8b45afa54" ON "role_permissions_permisson" ("permissonId") `,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "role" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "price" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permisson" ADD CONSTRAINT "FK_66f62f3e201c901ea0ded2c1e23" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permisson" ADD CONSTRAINT "FK_ab566a8e5bd2e342a8b45afa54a" FOREIGN KEY ("permissonId") REFERENCES "permisson"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permisson" DROP CONSTRAINT "FK_ab566a8e5bd2e342a8b45afa54a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions_permisson" DROP CONSTRAINT "FK_66f62f3e201c901ea0ded2c1e23"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "price" real DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab566a8e5bd2e342a8b45afa54"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_66f62f3e201c901ea0ded2c1e2"`,
    );
    await queryRunner.query(`DROP TABLE "role_permissions_permisson"`);
    await queryRunner.query(`DROP TABLE "permisson"`);
    await queryRunner.query(
      `CREATE INDEX "idx_user_roles_role_roleid" ON "user_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_user_roles_role_userid" ON "user_roles_role" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "user_roles_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "user_roles_role_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
