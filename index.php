<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  
    $jsonData = file_get_contents('php://input');

  
    $orderData = json_decode($jsonData, true);

    
    if ($orderData) {
     
        $billingDetails = $orderData['billingDetails'];
        $products = $orderData['products'];
        $totalAmount = $orderData['totalAmount'];

    
        echo json_encode([
            'status' => 'success',
            'message' => 'Order received!',
            'billingDetails' => $billingDetails,
            'products' => $products,
            'totalAmount' => $totalAmount
        ]);
    } else {
        
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    }
} else {
  
    echo json_encode(['status' => 'error', 'message' => 'Only POST requests are allowed']);
}

?>