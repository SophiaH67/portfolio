<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
    
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended();
        }

        return response([
            'message'=>'Invalid credentials'
        ], 401);
    }

    public function register(Request $request){
        $fields = $request->validate([
         'name'=>'required|string',
         'email'=>'required|string|email|confirmed|unique:users,email',
         'password'=>'required|string|confirmed'   
        ]);
  
        $user= User::create([
            'name'=>$fields['name'],
            'email'=>$fields['email'],
            'password'=> bcrypt($fields['password'])
        ]);
  
        $token = $user->createToken('myapptoken')->plainTextToken;
  
        $response= [
            'user' => $user,
            'token'=> $token
        ];
  
        return response($response, 201);
    }

    public function logout(Request $request){
        return json_encode($request->session());
        // Auth::logout();

        // $request->session()->invalidate();

        // $request->session()->regenerateToken();

        // return [
        //     'message'=> 'Logged out'
        // ];
    }
}
