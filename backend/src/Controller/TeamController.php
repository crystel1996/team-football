<?php

namespace App\Controller;

use App\Entity\Team;
use App\Repository\TeamRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Security\JwtStrategy;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

class TeamController extends AbstractController {

    private $jwtStrategy;
    
    public function __construct(JwtStrategy $jwtStrategy)
    {
        $this->jwtStrategy = $jwtStrategy;
    }

    #[Route('/api/create/team')]
    public function createTeam(
        Request $request,
        ValidatorInterface $validator,
        TeamRepository $teamRepository
    ) 
    {   
       
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $team = new Team();
    
        $payload = json_decode($request->getContent(), false);

        $team->setName($payload->name);
        $team->setCountry($payload->country);
        $team->setBalance($payload->balance);
        $team->setImage($payload->image);
        $team->setSlug(str_replace(' ', '-', strtolower($payload->name)));

        $errors = $validator->validate($team);

        if (count($errors) > 0) {
            
            $errorsString = (string) $errors;
    
            return new Response($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $teamCreated = $teamRepository->save($team);
        
        return new JsonResponse([
            
            "team" => $teamCreated->getId()
        
        ]);
       

    }

    #[Route('/api/list-team/{page}', name: 'list_team', requirements: ['page' => '\d+'])]
    public function list(
        int $page, 
        Request $request, 
        TeamRepository $teamRepository,
        SerializerInterface $serializer
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        if ($page < 1) {
            return new JsonResponse('La page doit etre 1 ou plus.', Response::HTTP_BAD_REQUEST);
        }

        $teams = $teamRepository->findAllTeam($page);

        $data = $serializer->serialize($teams, 'json', ['groups' => 'list_team:read']);

        return $this->json([
            "data" => json_decode($data),
            "count" => $teamRepository->count()
        ], 
            Response::HTTP_OK
        );

    }

}

?>