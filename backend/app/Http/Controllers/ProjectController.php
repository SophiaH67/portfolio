<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index () {
        echo(json_encode(Project::all()));
    }

    public function show ($id) {
        echo(json_encode(Project::findOrFail($id)));
    }

    public function store (Request $request) {
        $reqBody = $request->all();
 
        $project = new Project;
        $project->title = $reqBody['title'];
        $project->description = $reqBody['description'];
        $project->image = $reqBody['image'];
        $project->created_by = 1;
        $project->updated_by = 1;

        $project->save();
        echo(json_encode($project));
    }
}
