import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleRelation1709266805332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_roles_role" (
                "userId" INTEGER,
                "roleId" INTEGER,
                PRIMARY KEY ("userId", "roleId"),
                FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY ("roleId") REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
            CREATE INDEX IDX_user_roles_role_userId ON "user_roles_role" ("userId");
            CREATE INDEX IDX_user_roles_role_roleId ON "user_roles_role" ("roleId");
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
  }
}
