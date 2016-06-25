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
      Returns a success code, but removes a row from the database based on the provided key
    */
    public function deleteTask($taskId) {
      return DB::transaction(function($taskId) use ($taskId) {
        SubTasks::where('task_id', '=', $taskId)->delete();
        Tasks::destroy(intval($taskId));
      });
    }

    /*
      Returns nothing, fuck you
    */

    public function editTask($task) {
      return "!";
    }
}
