<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Config;
use DB;

class UserLoginToken extends Model implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract {

    use Authenticatable,
        Authorizable,
        CanResetPassword;

    protected $table = 'user_login_token';

    protected $fillable = ['id','user_id','login_token','created_at','updated_at','deleted'];

    public function saveUserLoginDetail($loginTokenDetail) {

        $data = DB::table('user_login_token')->where('user_id', $loginTokenDetail['user_id'])->first();
        if (count($data) > 0) {
            $return = DB::table('user_login_token')->where('user_id', $loginTokenDetail['user_id'])->update($loginTokenDetail);
        } else {
            $return = DB::table('user_login_token')->insert($loginTokenDetail);
        }
        return $return;
    }

    public function delereUserLoginToken($id) {
        $data = DB::table('user_login_token')->where('user_id', $id)->first();
        if(count($data)) {
            $data = DB::table('user_login_token')->where('user_id', $id)->delete();
            return true;
        } else {
          return false;
        }
    }

}