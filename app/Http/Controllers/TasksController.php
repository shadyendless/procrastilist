<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Tasks;
use App\SubTasks;
use DB;


class TasksController extends Controller
{
  /*
  Returns all tasks, including their subtasks, as a JSON string.
  */
  public function getAllTasks() {
    $tasks = Tasks::with('SubTasks')->get();
    return response()->json($tasks);
  }

  /*
  Returns all tasks, including their subtasks, for a given priority (meh, important, urgent) as a JSON string.
  */
  public function getTasksByPriority($priority) {
    $tasks = Tasks::with('SubTasks')->where('urgency', '=', strtolower($priority))->get();
    return response()->json($tasks);
  }

  /*
  Removes a row from the database based on the provided key, returns OK if successful
  */
  public function deleteTask($taskId) {
    return DB::transaction(function($taskId) use ($taskId) {
      SubTasks::where('task_id', '=', $taskId)->delete();
      Tasks::destroy(intval($taskId));
    });
  }

  /*
  Edits a record in the Tasks table based on posted json
  */
  public function editTask(Request $request, $taskId) {
    return Tasks::where('id', '=', $taskId)->update($request->data);
  }
  /*
  Creates a new database record in the Tasks table based on posted json
  !!Please note subtasks can only be created through this function!!
  JSON format for creating w/ subtasks:
  {
    "data": {
      "task": "do something",
      "urgency": "urgent",
      "subtasks": [
        {
          "task": "do something more"
        },
        {
          "task": "do something even more"
        }
      ]
    }
  }
  */
  public function createTask(Request $request) {

    return DB::transaction(function($request) use ($request) {
      //create the new task
      $newTask = new Tasks();
      $newTask->task = $request->data['task'];
      $newTask->urgency = $request->data['urgency'];
      $newTask->save();

      if(isset($request->data['subtasks'])) {
        $subtasks = [];
        //Instantiate each subtask into an array
        foreach($request->data["subtasks"] as $subtask){
          $subtasks[] = new SubTasks(['task' => $subtask['task']]);
        }
        //using the saveMany method, save the array of SubTasks - now associated to the task we just made
        $newTask->subTasks()->saveMany($subtasks);
      }

      return response()->json($newTask->where('id', '=', $newTask->id)->with('SubTasks')->get());

    });
  }
}
