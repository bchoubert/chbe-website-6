<?php

include_once "functions.php";

$client_ip = $_SERVER['REMOTE_ADDR'];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
  echo generateNewToken($client_ip);
  return;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {
  http_response_code(405);
  echo "SEND processes only GET or POST requests";
  return;
}

var_dump($_POST);

$PARAMS = ["name", "email", "message", "check"];

foreach ($PARAMS as $PARAM) {
  if (!isset($_POST[$PARAM]) || $_POST[$PARAM] == "") {
    http_response_code(500);
    echo sprintf("Missing required parameter : %s in array: %s", $PARAM, implode(", ", $PARAMS));
    return;
  }
}

$field_email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
if (!filter_var($field_email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(404);
  echo "Invalid email address";
  return;
}

$error = sendMessage($_POST["check"], $client_ip, $_POST["name"], $_POST["email"], $_POST["message"]);

if($error != "") {
  http_response_code(500);
  echo "There was an error processing your request : ".$error;
  return;
}

echo "success";
