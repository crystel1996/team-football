<?php 

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController {

    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

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

    #[Route('/api/register')]
    public function register(
        Request $request, 
        ValidatorInterface $validator, 
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ) {
        
        $user = new User();
        
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $confirmPassword = $request->request->get('confirmPassword');

        $isEmailExist = $this->userRepository->findOneUserByEmail($email);

        if($isEmailExist) {
            return new JsonResponse("User already exist", Response::HTTP_BAD_REQUEST);
        }

        $user->setEmail($email);

        $errors = $validator->validate($user);

        if ($password !== $confirmPassword) {
           return new JsonResponse("Password not equal", Response::HTTP_BAD_REQUEST);
        }

        if (count($errors) > 0) {
            
            $errorsString = (string) $errors;
    
            return new Response($errorsString);
        }

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );

        $user->setPassword($hashedPassword);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([]);
    }

}

?>