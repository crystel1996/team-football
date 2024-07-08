<?php

namespace App\DataFixtures;

use App\Entity\Team;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);

        for ($i=0; $i < 50 ; $i++) {
            $team = new Team();
            $team->setName('teams'.$i);
            $team->setCountry('Country'.$i);
            $team->setBalance(mt_rand(1000,20000));
            $team->setImage('https://cdn.statically.io/gh/hjnilsson/country-flags/master/svg/mg.svg');
            $team->setSlug('teams'.$i);
            $manager->persist($team);
        }

        $manager->flush();
    }
}
