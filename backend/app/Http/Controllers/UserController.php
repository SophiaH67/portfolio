<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class UserController extends Controller
{
    public function index () {
        echo(json_encode(User::all()));
    }

    public function show ($id) {
        echo(json_encode(User::findOrFail($id)));
    }

    public function store (Request $request) {
        $reqBody = $request->all();
 
        $user = User::create([
            "name" => "name",
            "email" => "email",
            "password" => Hash::make($reqBody['password'])
        ]);

        echo(json_encode($user));
    }
}
