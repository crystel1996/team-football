<?php

namespace App\Repository;

use App\Entity\PlayerTransaction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PlayerTransaction>
 */
class PlayerTransactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlayerTransaction::class);
    }

    /**
        * @return PlayerTransaction Returns an Team
    */
    public function save(PlayerTransaction $playerTransaction) 
    {
        $this->getEntityManager()->persist($playerTransaction);
        $this->getEntityManager()->flush();
        return $playerTransaction;
    }

    /**
        * @return PlayerTransaction Returns an Player
    */
    public function remove(PlayerTransaction $playerTransaction) 
    {
        $this->getEntityManager()->remove($playerTransaction);
        $this->getEntityManager()->flush();
        return $playerTransaction;
    }

    /**
    * @return Team[] Returns an array of PlayerTransaction objects
    */
    public function findAllPlayerTransaction(String $idTeam, String $type): array
    {

        return $this->createQueryBuilder('p')
            ->andWhere('p.idTeam != :idTeam')
            ->andWhere('p.type = :type')
            ->setParameter('type', $type)
            ->setParameter('idTeam', $idTeam)
            ->orderBy('t.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    //    /**
    //     * @return PlayerTransaction[] Returns an array of PlayerTransaction objects
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

    //    public function findOneBySomeField($value): ?PlayerTransaction
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
