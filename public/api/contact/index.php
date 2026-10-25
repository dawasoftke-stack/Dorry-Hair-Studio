<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim(strip_tags($data['name'])) : 'Valued Client';
$phone = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$email = isset($data['email']) ? trim(strip_tags($data['email'])) : '';
$subject = isset($data['subject']) ? trim(strip_tags($data['subject'])) : 'General Enquiry';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (!empty($data['honeypot'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Bot submission rejected.']);
    exit();
}

$inquiryRecord = [
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'subject' => $subject,
    'message' => $message,
    'createdAt' => date('c')
];

@file_put_contents(
    __DIR__ . '/contact.log',
    json_encode($inquiryRecord) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

echo json_encode([
    'success' => true,
    'message' => 'Thank you for contacting Dorry Hair Studio! We will get back to you shortly.'
]);
