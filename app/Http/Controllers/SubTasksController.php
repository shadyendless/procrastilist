<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Tasks;
use App\SubTasks;
use DB;

class SubTasksController extends Controller
{
    public function getAllSubTasks() {
      return response()->json(SubTasks::all());
    }

    public function getSubTasksByTaskId($subTaskId){
      return response()->json(SubTasks::where('tasks_id', '=', $subTaskId)->get());
    }

    public function editSubTask(Request $request, $subTaskId){
      return SubTasks::where('id', '=', $subTaskId)->update($request->data);
    }

    public function deleteSubTask($subTaskId){
      return SubTasks::where('id', '=', $subTaskId)->delete($subTaskId);
    }
}
