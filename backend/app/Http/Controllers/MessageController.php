<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function index() {
        return Message::all();
    }

    public function store(Request $request) {
        $reqBody = $request->all();
        $validator = Validator::make($reqBody, [
            'email' => ['required', 'email'],
            'name' => ['required', 'max:255' ],
            'message' => ['required', 'max:3000', 'min:20','unique:messages'],
        ], ['message.unique' => 'This message has already been received']);
        
        if ($validator->fails()) {return response($validator->errors()->toJson(), 422);}

        $message = Message::create([
            "email" => $reqBody["email"],
            "name" => $reqBody["name"],
            "message" => $reqBody["message"],
            "ip" => $request->ip(),
        ]);

        return $message;

    }
}
