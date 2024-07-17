<?php

namespace App\Controller;

use App\Entity\PlayerTransaction;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use App\Security\JwtStrategy;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\PlayerRepository;
use App\Repository\TeamRepository;
use App\Repository\PlayerTransactionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
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
        PlayerRepository $playerRepository,
        PlayerTransactionRepository $playerTransactionRepository,
        ValidatorInterface $validator,
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

        $playerTransaction = new PlayerTransaction();

        $playerTransaction->setIdPlayer($player);
        $playerTransaction->setIdTeam($team);
        $playerTransaction->setType('SELL');

        $errors = $validator->validate($playerTransaction);

        if (count($errors) > 0) {
            
            $errorsString = (string) $errors;
    
            return new Response($errorsString, Response::HTTP_BAD_REQUEST);
        }

        $playerTransactionCreated = $playerTransactionRepository->save($playerTransaction);
        $player->setAwaitingBuyer(true);
        $playerRepository->save($player);

        return new JsonResponse([
            
            "team" => $playerTransactionCreated->getId()
        
        ]);

    }

    #[Route('/api/cancel-selling-player')]
    public function cancelSellPlayer(
        Request $request,
        PlayerTransactionRepository $playerTransactionRepository,
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        $playerTransaction = $playerTransactionRepository->findOneBy(['id' => $payload->id]);

        if(!$playerTransaction) {
            return new JsonResponse('Transaction introuvable', Response::HTTP_BAD_REQUEST);
        }

        $playerTransactionRepository->remove($playerTransaction);

        return new JsonResponse('Annulation reussi', Response::HTTP_OK);

    }

    #[Route('/api/buy-player')]
    public function buyPlayer(
        Request $request,
        PlayerTransactionRepository $playerTransactionRepository,
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

        $playerTransaction = $playerTransactionRepository->findOneBy(['id' => $payload->id]);
        $teamBuyer = $teamRepository->findOneBy(['id' => $payload->idTeamBuyer]);
        $player = $playerRepository->findOneBy(['id' => $playerTransaction->getIdPlayer()]);
        $teamSeller = $teamRepository->findOneBy(['id' => $playerTransaction->getIdTeam()]);

        if(!$playerTransaction) {
            return new JsonResponse('Transaction introuvable', Response::HTTP_BAD_REQUEST);
        }

        if(!$teamBuyer) {
            return new JsonResponse('Equipe introuvable', Response::HTTP_BAD_REQUEST);
        }

        if(!$player) {
            return new JsonResponse('Joueur introuvable', Response::HTTP_BAD_REQUEST);
        }

        if(!$teamSeller) {
            return new JsonResponse('Equipe introuvable', Response::HTTP_BAD_REQUEST);
        }

        $playerTransaction->setType('SOLD');
        $playerTransaction->setIdTeamBuyer($payload->idTeamBuyer);

        $playerTransactionCreated = $playerTransactionRepository->save($playerTransaction);

        $teamBuyerSold = ($teamBuyer->getBalance()) - $player->getBalance();
        $teamSellerSold = ($teamSeller->getBalance()) + $player->getBalance();

        $teamBuyer->setBalance($teamBuyerSold);
        $teamSeller->setBalance($teamSellerSold);

        $teamRepository->save($teamBuyer);
        $teamRepository->save($teamSeller);

        return new JsonResponse([
            
            "team" => $playerTransactionCreated->getId()
        
        ]);

    }

    #[Route('/api/list-selling-player')]
    public function ListSellingPlayer(
        Request $request,
        PlayerTransactionRepository $playerTransactionRepository,
        SerializerInterface $serializer
    )
    {
        $token = $request->headers->get('Authorization');
        $decoded = $this->jwtStrategy->isValidToken($token);
        
        if($decoded->getStatusCode() !== Response::HTTP_OK) {
            return $decoded;
        }

        $payload = json_decode($request->getContent(), false);

        $playerTransactions = $playerTransactionRepository->findAllPlayerTransaction($payload->idTeam, 'SELL');

        $data = $serializer->serialize($playerTransactions, 'json', ['groups' => 'list_team:read']);

        return $this->json([
            "data" => json_decode($data)
        ], 
            Response::HTTP_OK
        );

    }

}

?>