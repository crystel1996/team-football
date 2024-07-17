<?php

namespace App\Entity;

use App\Repository\PlayerTransactionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: PlayerTransactionRepository::class)]
class PlayerTransaction
{
    #[ORM\Id]
    #[ORM\Column(name:"id", type: UuidType::NAME, unique:true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?string $id = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Player $idPlayer = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Team $idTeam = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Team $idTeamBuyer = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getIdPlayer(): ?Player
    {
        return $this->idPlayer;
    }

    public function setIdPlayer(Player $idPlayer): static
    {
        $this->idPlayer = $idPlayer;

        return $this;
    }

    public function getIdTeam(): ?Team
    {
        return $this->idTeam;
    }

    public function setIdTeam(Team $idTeam): static
    {
        $this->idTeam = $idTeam;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getIdTeamBuyer(): ?Team
    {
        return $this->idTeamBuyer;
    }

    public function setIdTeamBuyer(?Team $idTeamBuyer): static
    {
        $this->idTeamBuyer = $idTeamBuyer;

        return $this;
    }
}
