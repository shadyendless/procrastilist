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
  return view('index');
});

Route::group(['prefix' => 'api'], function() {

  Route::group(['prefix' => 'tasks'], function() {

    Route::get('/', [
      'uses' => 'TasksController@getAllTasks'
    ]);
                                                      //RETRIEVE
    Route::get('{priority}', [  
      'uses' => 'TasksController@getTasksByPriority'
    ]);

    Route::delete('{taskId}', [
      'uses' => "TasksController@deleteTask"          //DELETE
    ]);

    Route::post('{taskId}', [
      'uses' => "TasksController@editTask"            //UPDATE
    ]);

    Route::post('create', [
      'uses' => "TasksController@createTask"          //CREATE
    ]);

  });//tasks route grop ends

  Route::group(['prefix' => 'subtasks'], function() {

    Route::get('/', [
      'uses' => 'SubTasksController@getAllSubTasks'
    ]);

    Route::get('/bytaskid/{subTaskId}', [
      'uses' => 'SubTasksController@getSubTasksByTaskId'
    ]);

    Route::post('{subTaskId}', [
      'uses' => 'SubTasksController@editSubTask'
    ]);

    Route::delete('{subTaskId}', [
      'uses' => 'SubTasksController@deleteSubTask'
    ]);

  });//subtasks route group ends

});//api route group ends
