<?php

namespace App\Repository;

use App\Entity\Player;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Player>
 */
class PlayerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Player::class);
    }

    /**
        * @return Player Returns an Team
    */
    public function save(Player $player) 
    {
        $this->getEntityManager()->persist($player);
        $this->getEntityManager()->flush();
        return $player;
    }

    
    /**
        * @return void 
    */
    public function updateTeam(Array $players, String $idTeam = null)
    {
        foreach($players as $player) {
            $player->setIdTeam($idTeam);
            $this->getEntityManager()->persist($player);
        }
        $this->getEntityManager()->flush();
    }

    /**
        * @return Player Returns an Player
    */
    public function remove(Player $player) 
    {
        $this->getEntityManager()->remove($player);
        $this->getEntityManager()->flush();
        return $player;
    }

    /**
    * @return Team[] Returns an array of Team objects
    */
    public function findAllPlayerForSale(String $idTeam): array
    {

        return $this->createQueryBuilder('p')
            ->andWhere('p.isAwaitingBuyer = :val')
            ->andWhere('p.idTeam != :id_team_id')
            ->setParameter('val', true)
            ->setParameter('id_team_id', $idTeam)
            ->orderBy('p.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    //    /**
    //     * @return Player[] Returns an array of Player objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Player
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
