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

class PlayerController extends AbstractController {

    private $jwtStrategy;
    
    public function __construct(JwtStrategy $jwtStrategy)
    {
        $this->jwtStrategy = $jwtStrategy;
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

}

?>