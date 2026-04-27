<?php
// Requiere el SDK de AWS
require 'vendor/autoload.php';
use Aws\Rekognition\RekognitionClient;

header('Content-Type: application/json');

$client = new RekognitionClient([
    'region'      => 'us-east-1',
    'version'     => 'latest',
    'credentials' => [
        'key'    => 'TU_ACCESS_KEY',
        'secret' => 'TU_SECRET_KEY',
    ],
]);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $imageContent = file_get_contents($_FILES['image']['tmp_name']);

    try {
        // Ejemplo: Detectar si hay una cara real y si es nítida
        $result = $client->detectFaces([
            'Image' => ['Bytes' => $imageContent],
            'Attributes' => ['DEFAULT']
        ]);

        if (!empty($result['FaceDetails'])) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'No se detectó un rostro claro']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Error en el servidor de IA']);
    }
}