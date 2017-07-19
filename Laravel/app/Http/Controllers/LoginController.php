<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Auth;
use App\User;
use App\UserLoginToken;

class LoginController extends Controller
{
	public function __construct()
    {
        $this->useObj = new User;
    }

    public function Logout()
    {
        $postData = Input::All();
        // print_r($postData);
        // die();
        $objUserLoginToken = new UserLoginToken();
        $objUser = new User();
        $userId = '';
        if(!empty($postData)) {
            $userId = $postData['id'];
        }
        $response = [];
        $response['status'] = 0;
        $checkUserExist = $objUser->checkUserExist($userId);
        if($checkUserExist) {
            $return = $objUserLoginToken->delereUserLoginToken($userId);
            if($return){
                $response['status'] = 1;
                $response['message'] = "User Successfully logout...!";
            } else {
                $response['message'] = "Invalid user login token";
            }
        } else {
            $response['message'] = "Invalid user";
        }

        return response()->json($response);  
    }

    function LoginCheck(){

        $postData = Input::All();
        $objUserLoginToken = new UserLoginToken();
        $objUser = new User();
        $response = [];
        $response['status'] = 0;
        if (Auth::guard('web')->attempt(['email' => $postData['email'], 'password' => $postData['password']])) {
            $userDetail = $objUser->getUserDetailByEmail($postData['email']);
            $loginDetail = [];
            $loginDetail['user_id'] = $userDetail->id;
            $loginDetail['login_token'] = base64_encode($postData['email'].':'.$postData['password']);
            $userLoginDetails = $objUserLoginToken->saveUserLoginDetail($loginDetail);
            $data = [];
            $response['loginToken'] = base64_encode($postData['email'].':'.$postData['password']);
            $response['name'] = $userDetail->first_name ." ". $userDetail->last_name;
            $response['id'] = $userDetail->id;
            $response['status'] = 1;
            // $response['data'] = $data;
            $response['message'] = "suceessfully login..!";
            return response()->json($response);  
        } else {
                        $response['status'] = 0;

            $response['message'] = "Invalid email or password";
            return response()->json($response);  
        }
    }
}
