<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDescriptionEnColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function($table) {
            $table->renameColumn('description', 'descriptionEN');
            $table->text('descriptionNL');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function($table) {
            $table->renameColumn('descriptionEN', 'description');
            $table->dropColumn('descriptionNL');
        });
    }
}
