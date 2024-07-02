<?php

namespace App\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class JwtStrategy {
    
    protected $jwtSecretKey;
    protected $jwtLifetime;

    public function __construct(
        $jwtSecretKey,
        $jwtLifetime
    )
    {
        $this->jwtLifetime = $jwtLifetime;
        $this->jwtSecretKey = $jwtSecretKey;
    }

    public function encode(Array $data)
    {

        $jwt = JWT::encode(
            array(
                'iat'		=>	time(),
                'nbf'		=>	time(),
                'exp'		=>	time() + intval($this->jwtLifetime),
                'data'	=> $data
            ),
            $this->jwtSecretKey,
            'HS256'
        );

        return $jwt;

    }
    public function decode(String $jwt)
    {
        return JWT::decode($jwt, new Key($this->jwtSecretKey, 'HS256'));
    }

    public function replacePrefixToken($token)
    {
        return str_replace('Bearer ', '',$token);
    }

    public function checkValidationTokenFromApi(String $token = null) 
    {
        if(!$token) {
            return new JsonResponse("UNAUTHORIZED", Response::HTTP_OK);
        }

        try {
            $decoded = $this->decode($this->replacePrefixToken($token));
            return new JsonResponse($decoded->data, Response::HTTP_OK);
        } catch(\Exception $e) {
            return new JsonResponse($e->getMessage(), Response::HTTP_UNAUTHORIZED);
        }

    }

}

?>