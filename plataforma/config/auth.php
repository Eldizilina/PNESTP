<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication "guard" and password
    | reset options for your application. You may change these defaults
    | as required, but they're a perfect start for most applications.
    |
    */

    'defaults' => [
        'guard' => 'web',
        'passwords' => 'utilizadores',
    ],

   

    // isso diz ao laravel para usar o passaport e não tokens simples para autenticar requesições da API
    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

         'api' => [
        'driver' => 'passport', // <- este é o driver usado pelo Laravel Passport
        'provider' => 'utilizadores',
         ],
    ],


    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'utilizadores' => [ // <--- novo provider
        'driver' => 'eloquent',
        'model' => App\Models\Utilizador::class,
        ],
    ],

   

    'passwords' => [
        'utilizadores' => [
            'provider' => 'utilizadores',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may define the amount of seconds before a password confirmation
    | times out and the user is prompted to re-enter their password via the
    | confirmation screen. By default, the timeout lasts for three hours.
    |
    */

    'password_timeout' => 10800,

];
