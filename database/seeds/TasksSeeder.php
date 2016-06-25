<?php

use Illuminate\Database\Seeder;
use App\Tasks;
use App\SubTasks;
class TasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sub_tasks')->delete();
        DB::table('tasks')->delete();

        $task = new Tasks();
        $task->task = "Purchase goodness more";
        $task->urgency = "urgent";
        $task->save();

        $secondTask = new Tasks();
        $secondTask->task = "Buy this";
        $secondTask->urgency = "meh";
        $secondTask->save();

        $subTasks = [
          new SubTasks(['task' => 'and this']),
          new SubTasks(['task' => 'and this']),
          new SubTasks(['task' => 'and this too'])
        ];

        $secondTask->subTasks()->saveMany($subTasks);




    }
}
