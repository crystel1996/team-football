<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240718190827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE player_transaction DROP CONSTRAINT fk_2a00ec4419d349f8');
        $this->addSql('ALTER TABLE player_transaction DROP CONSTRAINT fk_2a00ec44f7f171de');
        $this->addSql('ALTER TABLE player_transaction DROP CONSTRAINT fk_2a00ec446a1f5a39');
        $this->addSql('DROP TABLE player_transaction');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE player_transaction (id UUID NOT NULL, id_player_id UUID DEFAULT NULL, id_team_id UUID DEFAULT NULL, id_team_buyer_id UUID DEFAULT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX uniq_2a00ec446a1f5a39 ON player_transaction (id_team_buyer_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_2a00ec44f7f171de ON player_transaction (id_team_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_2a00ec4419d349f8 ON player_transaction (id_player_id)');
        $this->addSql('COMMENT ON COLUMN player_transaction.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN player_transaction.id_player_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN player_transaction.id_team_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN player_transaction.id_team_buyer_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE player_transaction ADD CONSTRAINT fk_2a00ec4419d349f8 FOREIGN KEY (id_player_id) REFERENCES player (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE player_transaction ADD CONSTRAINT fk_2a00ec44f7f171de FOREIGN KEY (id_team_id) REFERENCES team (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE player_transaction ADD CONSTRAINT fk_2a00ec446a1f5a39 FOREIGN KEY (id_team_buyer_id) REFERENCES team (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
