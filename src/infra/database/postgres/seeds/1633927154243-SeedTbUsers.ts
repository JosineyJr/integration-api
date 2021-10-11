import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTbUsers1633927154243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "insert into tb_users (created_at, deleted_at, email, id, name, password, role_id) values (now(), NULL, 'admin@admin.com', '16877e62-a43b-4a9f-aa1f-65e8504dce07', 'admin', '$2b$12$dcT0uwgY20uSQ8baLOVzIueHZcDmRsSfaQHS7qq8u2gMtqDHTOpo2', 1)",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("delete from tb_users where id = '16877e62-a43b-4a9f-aa1f-65e8504dce07'");
  }
}
