<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    const STATUS_TODO = 1;
    const STATUS_DOING = 2;
    const STATUS_DONE = 3;

    public static $statuses_name = [
        self::STATUS_TODO => 'TODO',
        self::STATUS_DOING => 'DOING',
        self::STATUS_DONE => 'DONE'
    ];

    protected $fillable = ['name', 'description', 'status'];

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }
}
