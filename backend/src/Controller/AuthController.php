<?php 

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController {

    #[Route('/api/login')]
    public function Login() {

        $result = [
            [
                'name' => 'Crystel'
            ],
            [
                'name' => 'Tantely'
            ]
        ];

        return $this->json($result);

    }

}

?>