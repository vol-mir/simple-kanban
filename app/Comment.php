<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['name', 'task_id'];

    public function task()
    {
        return $this->belongsTo('App\Models\Task');
    }

}
