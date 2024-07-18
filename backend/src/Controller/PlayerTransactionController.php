<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use App\Security\JwtStrategy;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\PlayerRepository;
use App\Repository\TeamRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class PlayerTransactionController extends AbstractController
{

    private $jwtStrategy;
    
    public function __construct(JwtStrategy $jwtStrategy)
    {
        $this->jwtStrategy = $jwtStrategy;
    }

    #[Route('/api/sell-player')]
    public function sellPlayer(
        Request $request,
        TeamRepository $teamRepository,
        PlayerRepository $playerRepository
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        $team = $teamRepository->findOneBy(['id' => $payload->idTeam]);
        $player = $playerRepository->findOneBy(['id' => $payload->idPlayer]);

        if(!$player) {
            return new JsonResponse('Joueur introuvable', Response::HTTP_BAD_REQUEST);
        }

        if(!$team) {
            return new JsonResponse('Equipe introuvable', Response::HTTP_BAD_REQUEST);
        }

        
        $player->setAwaitingBuyer(true);
        $playerRepository->save($player);

        return new JsonResponse([
            
            "player" => $player->getId()
        
        ]);

    }

    #[Route('/api/cancel-selling-player')]
    public function cancelSellPlayer(
        Request $request,
        PlayerRepository $playerRepository,
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        $player = $playerRepository->findOneBy(['id' => $payload->idPlayer]);

        if(!$player) {
            return new JsonResponse('Transaction introuvable', Response::HTTP_BAD_REQUEST);
        }

        $player->setAwaitingBuyer(false);

        $playerRepository->save($player);

        return new JsonResponse('Annulation reussi', Response::HTTP_OK);

    }

    #[Route('/api/buy-player')]
    public function buyPlayer(
        Request $request,
        TeamRepository $teamRepository,
        PlayerRepository $playerRepository
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        
        $teamBuyer = $teamRepository->findOneBy(['id' => $payload->idTeam]);
        
        $player = $playerRepository->findOneBy(['id' => $payload->idPlayer]);

        if(!$teamBuyer) {
            return new JsonResponse('Equipe introuvable', Response::HTTP_BAD_REQUEST);
        }

        if(!$player) {
            return new JsonResponse('Joueur introuvable', Response::HTTP_BAD_REQUEST);
        }

        $teamSeller = $teamRepository->findOneBy(['id' => $player->getIdTeam()]);

        if(!$teamSeller) {
            return new JsonResponse('Equipe introuvable', Response::HTTP_BAD_REQUEST);
        }

        $teamBuyerSold = ($teamBuyer->getBalance()) - $player->getBalance();
        $teamSellerSold = ($teamSeller->getBalance()) + $player->getBalance();

        $teamBuyer->setBalance($teamBuyerSold);
        $teamSeller->setBalance($teamSellerSold);
        $player->setAwaitingBuyer(false);
        $player->setIdTeam($teamBuyer);

        $teamRepository->save($teamBuyer);
        $teamRepository->save($teamSeller);
        $playerRepository->save($player);


        return new JsonResponse([
            
            "player" => $player->getId()
        
        ]);

    }

    #[Route('/api/list-selling-player')]
    public function ListSellingPlayer(
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

        $playerTransactions = $playerRepository->findAllPlayerForSale($payload->idTeam);

        $data = $serializer->serialize($playerTransactions, 'json', ['groups' => 'team:read']);

        return $this->json([
            "data" => json_decode($data)
        ], 
            Response::HTTP_OK
        );

    }

}

?>