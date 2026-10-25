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
$serviceName = isset($data['serviceName']) ? trim(strip_tags($data['serviceName'])) : 'Hair Consultation & Styling';
$serviceCategory = isset($data['serviceCategory']) ? trim(strip_tags($data['serviceCategory'])) : 'Natural Hair Care';
$preferredDate = isset($data['preferredDate']) ? trim(strip_tags($data['preferredDate'])) : date('Y-m-d', strtotime('+1 day'));
$preferredTime = isset($data['preferredTime']) ? trim(strip_tags($data['preferredTime'])) : '10:00 AM';
$notes = isset($data['notes']) ? trim(strip_tags($data['notes'])) : '';

// Anti-spam honeypot
if (!empty($data['honeypot'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Bot submission rejected.']);
    exit();
}

// Generate unique booking reference
$chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
$randomCode = '';
for ($i = 0; $i < 4; $i++) {
    $randomCode .= $chars[rand(0, strlen($chars) - 1)];
}
$bookingId = 'DHS-' . strtoupper(base_convert(time(), 10, 36)) . '-' . $randomCode;

// Verified Dorry Hair Studio WhatsApp number
$whatsappNumber = '254728173197';

$waMessage = "Hello Dorry Hair Studio! I would like to confirm my appointment request (Ref: {$bookingId}) for {$serviceName} on {$preferredDate} at {$preferredTime}. Name: {$name}, Phone: {$phone}.";
$whatsappLink = 'https://wa.me/' . $whatsappNumber . '?text=' . urlencode($waMessage);

$bookingRecord = [
    'bookingId' => $bookingId,
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'serviceName' => $serviceName,
    'serviceCategory' => $serviceCategory,
    'preferredDate' => $preferredDate,
    'preferredTime' => $preferredTime,
    'notes' => $notes,
    'createdAt' => date('c'),
    'status' => 'Pending Confirmation'
];

// Optional file logging on server
@file_put_contents(
    __DIR__ . '/bookings.log',
    json_encode($bookingRecord) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

echo json_encode([
    'success' => true,
    'message' => 'Appointment request successfully received.',
    'booking' => $bookingRecord,
    'whatsappLink' => $whatsappLink
]);
