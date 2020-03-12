<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tasks\StoreRequest;
use App\Http\Requests\Tasks\UpdateRequest;
use App\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the tasks.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::orderBy('updated_at', 'desc')->with('comments')->get();

        return response()->json([
            'message' => 'Successfully get a listing of the tasks',
            'tasks' => $tasks,
            'statuses_name' => Task::$statuses_name
        ], 200);
    }

    /**
     * Store a newly created task in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $data = $request->all();
        $task = Task::create($data);

        return response()->json([
            'message' => 'Successfully create a new task',
            'task' => $task
        ], 201);
    }

    /**
     * Display the task
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::where('id', $id)->with('comments')->first();

        return response()->json([
            'message' => 'Successfully get a of the tasks',
            'task' => $task
        ], 200);
    }

    /**
     * Update the task in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, $id)
    {
        $task = Task::findOrFail($id);

        if(!$task) {
            return response()->json([
                'message' => 'No find task in storage'
            ], 404);
        }

        $data = $request->all();
        $task->update($data);

        return response()->json([
            'message' => 'Successfully update task',
            'task' => $task
        ], 200);
    }

    /**
     * Remove the task from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::findOrFail($id);

        if(!$task) {
            return response()->json([
                'message' => 'No find task in storage'
            ], 404);
        }
        $task->delete();

        return response()->json([
            'message' => 'Successfully delete task',
            'task' => $task
        ], 200);
    }
}
