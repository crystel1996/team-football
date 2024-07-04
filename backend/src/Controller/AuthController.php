<?php 

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Security\JwtStrategy;
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
    private $jwtStrategy;

    public function __construct(UserRepository $userRepository, JwtStrategy $jwtStrategy)
    {
        $this->userRepository = $userRepository;
        $this->jwtStrategy = $jwtStrategy;
    }

    #[Route('/api/login')]
    public function Login(
        Request $request,
        UserPasswordHasherInterface $passwordHasher
    ) 
    {
        $payload = json_decode($request->getContent(), false);
        $email = $payload->email;
        $password = $payload->password;

        $user = $this->userRepository->findOneUserByEmail($email);

        if(!$user) {
            return new JsonResponse("Bad credential!", Response::HTTP_BAD_REQUEST);
        }

        $isPasswordValid = $passwordHasher->isPasswordValid($user, $password);

        if(!$isPasswordValid) {
            return new JsonResponse("Bad credential!", Response::HTTP_BAD_REQUEST);
        }

        $token = $this->jwtStrategy->encode([
            'email' => $user->getEmail(),
            'id' => $user->getId()
        ]);

        return new JsonResponse([
            
                "token" => $token
            
        ]);

    }

    #[Route('/api/register')]
    public function register(
        Request $request, 
        ValidatorInterface $validator, 
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ) 
    {
        
        $user = new User();
        
        $email = $request->request->get('email');
        $username = $request->request->get('username');
        $password = $request->request->get('password');
        $confirmPassword = $request->request->get('confirmPassword');

        $isEmailExist = $this->userRepository->findOneUserByEmail($email);

        if($isEmailExist) {
            return new JsonResponse("User already exist", Response::HTTP_BAD_REQUEST);
        }

        $user->setEmail($email);
        $user->setUsername($username);

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

        $token = $this->jwtStrategy->encode([
            'email' => $user->getEmail(),
            'id' => $user->getId()
        ]);

        return new JsonResponse([
            
                "token" => $token
            
        ]);
    }

    #[Route('/api/me')]
    public function me(
        Request $request
    ){
        $token = $request->headers->get('Authorization');
        return $this->jwtStrategy->isValidToken($token);
    }

}

?>