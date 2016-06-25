<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubTasks extends Model
{
    public function task() {
      return $this->belongsTo('App\Tasks');
    }

    protected $fillable = ['tasks_id', 'task'];
}
