<?php 

namespace App\Controller;

use App\Entity\Player;
use App\Repository\PlayerRepository;
use App\Repository\TeamRepository;
use App\Security\JwtStrategy;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class PlayerController extends AbstractController {

    private $jwtStrategy;
    
    public function __construct(JwtStrategy $jwtStrategy)
    {
        $this->jwtStrategy = $jwtStrategy;
    }

    #[Route('/api/player')]
    public function player(
        Request $request,
        PlayerRepository $playerRepository,
        SerializerInterface $serializer
    ) 
    {

        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        $player = $playerRepository->findOneBy(['id' => $payload->id]);

        if(!$player) {
            return new JsonResponse('Joueur introuvable', Response::HTTP_BAD_REQUEST);
        }

        $data = $serializer->serialize($player, 'json', ['groups' => 'team:read']);

        return $this->json([
            "data" => json_decode($data)
        ], 
            Response::HTTP_OK
        );

    }

    #[Route('/api/create/player')]
    public function createPlayer(
        Request $request,
        ValidatorInterface $validator,
        PlayerRepository $playerRepository,
        TeamRepository $teamRepository
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $player = new Player();

        $payload = json_decode($request->getContent(), false);

        $team = $teamRepository->findOneBy(['id' => $payload->idTeam]);

        if(!$team) {
            return new Response("Equipe introuvable.", Response::HTTP_BAD_REQUEST);
        }

        $player->setFirstName($payload->firstName);
        $player->setLastName($payload->lastName);
        $player->setIdTeam($team);
        $player->setBalance($payload->balance);
        $player->setPosition($payload->position);

        $errors = $validator->validate($player);

        if (count($errors) > 0) {
            
            $errorsString = (string) $errors;
    
            return new Response($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $playerCreated = $playerRepository->save($player);
        
        return new JsonResponse([
            
            "team" => $playerCreated->getId()
        
        ]);


    }

    #[Route('/api/update/player')]
    public function updatePlayer(
        Request $request,
        ValidatorInterface $validator,
        PlayerRepository $playerRepository
    ) 
    {   
       
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }
    
        $payload = json_decode($request->getContent(), false);

        $player = $playerRepository->findOneBy(['id' => $payload->id]);

        if(!$player) {
            return new JsonResponse('Joueur introuvable', Response::HTTP_BAD_REQUEST);
        }

        $player->setFirstName($payload->firstName);
        $player->setLastName($payload->lastName);
        $player->setBalance($payload->balance);
        $player->setPosition($payload->position);

        $errors = $validator->validate($player);

        if (count($errors) > 0) {
            
            $errorsString = (string) $errors;
    
            return new Response($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $playerUpdated = $playerRepository->save($player);
        
        return new JsonResponse([
            
            "id" => $playerUpdated->getId()
        
        ]);
       

    }

    #[Route('/api/delete-player')]
    public function deletePlayer(
        Request $request,
        PlayerRepository $playerRepository
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        $player = $playerRepository->findOneBy(['id' => $payload->id]);

        if (!$player) {
            return new JsonResponse('Joueur introuvable!', Response::HTTP_BAD_REQUEST);
        }

        $playerRepository->remove($player);

        return new JsonResponse('Supression reussi', Response::HTTP_OK);

    }

}

?>