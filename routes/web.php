<?php

use Illuminate\Support\Facades\Route;

Route::view('/{vue_capture?}', 'index')->where('vue_capture', '[\/\w\.-]*');
