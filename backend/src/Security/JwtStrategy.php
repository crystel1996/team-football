<?php

namespace App\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
}

?>