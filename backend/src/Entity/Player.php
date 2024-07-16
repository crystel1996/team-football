<?php

namespace App\Entity;

use App\Repository\PlayerRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Mapping\ClassMetadata;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PlayerRepository::class)]
class Player
{
    #[ORM\Id]
    #[ORM\Column(name:"id", type: UuidType::NAME, unique:true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(["team:read"])]
    private ?string $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["team:read"])]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["team:read"])]
    private ?string $lastName = null;

    #[ORM\Column]
    #[Groups(["team:read"])]
    private ?float $balance = null;

    #[ORM\ManyToOne(inversedBy: 'players')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Team $idTeam = null;

    #[ORM\Column(length: 255)]
    #[Groups(["team:read"])]
    private ?string $position = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getBalance(): ?float
    {
        return $this->balance;
    }

    public function setBalance(float $balance): static
    {
        $this->balance = $balance;

        return $this;
    }

    public function getIdTeam(): ?Team
    {
        return $this->idTeam;
    }

    public function setIdTeam(?Team $idTeam): static
    {
        $this->idTeam = $idTeam;

        return $this;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): static
    {
        $this->position = $position;

        return $this;
    }

    public static function loadValidatorMetadata(ClassMetadata $metadata): void
    {
        $metadata->addPropertyConstraint('idTeam', new NotNull());
    }

}
