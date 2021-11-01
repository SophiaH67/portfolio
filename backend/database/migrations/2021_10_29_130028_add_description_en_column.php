<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AdddescriptionENColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function($table) {
            $table->renameColumn('description', 'description_en');
            $table->text('description_nl')->default('Lange beschrijving over dit geweldige project...');
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
            $table->renameColumn('description_en', 'description');
            $table->dropColumn('description_nl');
        });
    }
}
