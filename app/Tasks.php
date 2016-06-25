<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    public function subTasks() {
      return $this->hasMany('App\SubTasks');
    }

    protected $fillable = ['task'];
}
