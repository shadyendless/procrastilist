<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('home');
});

Route::group(['prefix' => 'api'], function() {

  Route::get('tasks', [
    'uses' => 'TasksController@getAllTasks'
  ]);

  Route::get('tasks/{priority}', [
    'uses' => 'TasksController@getTasksByPriority'
  ]);

  Route::post('tasks/{taskId}/delete', [
    'uses' => "TasksController@deleteTask"
  ]);

  Route::post('tasks/{taskId}/edit', [
    'uses' => "TasksController@editTask"
  ]);

});
