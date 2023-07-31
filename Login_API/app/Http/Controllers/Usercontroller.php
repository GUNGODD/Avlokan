<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Usercontroller extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $username = $request->input('username');
        $password = $request->input('password');

        // Retrieve the user based on the username
        $user = User::where('username', $username)->first();

        // Check if the user exists
        if ($user) {
            // Check if the provided password matches the stored password
            if ($user->password === $password) {
                // Password is correct
                return response()->json(['success' => true, 'message' => 'Successful login']);
            } else {
                // Password does not match
                return response()->json(['success' => false, 'message' => 'Invalid password'], 401);
            }
        } else {
            // User not found
            return response()->json(['success' => false, 'message' => 'User not found'], 404);
        }

    }
}
