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
        if($token == null) {
            return "UNAUTHORIZED";
        }

        try {
            $decoded = $this->decode($this->replacePrefixToken($token));
            return $decoded->data;
        } catch(\Exception $e) {
            return $e->getMessage();
        }

    }

    public function isValidToken(String $token = null)
    {
        $checking = $this->checkValidationTokenFromApi($token);
        if(is_object($checking) && $checking->id) {
            return new JsonResponse($checking, Response::HTTP_OK);
        }
        return new JsonResponse($checking, Response::HTTP_UNAUTHORIZED);
    }

}

?>