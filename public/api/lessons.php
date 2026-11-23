<?php
/**
 * RevType Academy - Lightweight PHP 8.3 REST API Endpoint
 * Serves editable lesson JSON for Apache / Laragon environment
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$jsonPath = __DIR__ . '/lessons.json';

if (file_exists($jsonPath)) {
    echo file_get_contents($jsonPath);
    exit;
}

http_response_code(404);
echo json_encode([
    'status' => 'error',
    'message' => 'lessons.json not found'
]);
