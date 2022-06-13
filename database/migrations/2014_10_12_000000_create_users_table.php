<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name');
            $table->string('address');
            $table->string('dni');
            $table->string('birthday');
            $table->string('card_type')->nullable();
            $table->string('card_number')->nullable();    
            $table->string('card_pin')->nullable(); 
            $table->string('card_expire_year')->nullable();     
            $table->string('card_expire_month')->nullable();    
            $table->string('cbu')->nullable();
            $table->string('cvu')->nullable(); 
            $table->string('pais');   
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
