<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DB;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getUserDetailByEmail($email) {

        $data = DB::table('users')->where(['email'=>$email,'deleted'=>1])->first();

        return $data;
    }

    public function checkUserExist($id) {
        $data = DB::table('users')->where(['id'=>$id,'deleted'=>1])->first();
        if(count($data) > 0) {
           return true;
        } else {
           return false;
        }
    }
}
