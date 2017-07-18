<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Input;

class RegistrationController extends Controller
{
	public function __construct()
    {
        $this->useObj = new User;
    }

    function Register(){

        $inputData = Input::all();
        $data = [];
        $response = [];
        $data['first_name'] = $inputData['first_name'];
        $data['last_name'] = $inputData['last_name'];
        $data['email'] = $inputData['email'];
        $data['password'] = $inputData['password'];

        $saveUser = $this->useObj->create($data);

        if($saveUser)
        {
        	$response['Success'] = 'User Registered successfully';
        }
        else
        {
        	$response['Failed'] = 'User Not Registered successfully <br> Pleasr try again...';
        }

        return response()->json($response);  
    }
}