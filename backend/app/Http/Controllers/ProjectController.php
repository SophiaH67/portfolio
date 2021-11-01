<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function index() {
        return Project::all()->sortBy('name')->reverse()->values();
    }

    public function store(Request $request) {
        $reqBody = $request->all();
        $validator = Validator::make($reqBody, [
            'name' => ['required', 'max:200', 'unique:projects'],
            'description_en' => ['required', 'max:3000', 'min:20'],
            'description_nl' => ['required', 'max:3000', 'min:20'],
            'link' => ['required', 'url', 'max:200' ],
        ], ['name.unique' => 'A project with this name already exists']);

        if ($validator->fails()) {return response($validator->errors()->toJson(), 422);}

        $project = Project::create([
            "name" => $reqBody["name"],
            "description_en" => $reqBody["description_en"],
            "description_nl" => $reqBody["description_nl"],
            "link" => $reqBody["link"],
        ]);

        return $project;

    }

    public function update(Request $request, $id)
    {
        $reqBody = $request->all();
        $validator = Validator::make($reqBody, [
            'name' => ['required', 'max:200'],
            'description_en' => ['required', 'max:3000', 'min:20'],
            'description_nl' => ['required', 'max:3000', 'min:20'],
            'link' => ['required', 'url', 'max:200' ],
        ]);

        if ($validator->fails()) {return response($validator->errors()->toJson(), 422);}

        $project = Project::where('id', '=', $id)->first();

        $project->name = $reqBody["name"];
        $project->description_en = $reqBody["description_en"];
        $project->description_nl = $reqBody["description_nl"];
        $project->link = $reqBody["link"];

        $project->save();

        return $project;
    }

    public function destroy($id) {
        $project = Project::findOrFail($id);

        $project->delete();

        return;
    }
}
