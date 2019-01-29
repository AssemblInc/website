<?PHP
	error_reporting(0); ini_set('display_errors', 0);
	require_once('../import/php/MailChimp.php');
	use \DrewM\MailChimp\MailChimp;
	
	$data = array();
	$data["type"] = "error";
	$data["message"] = "An unknown error occured.";
	$data["data"] = array();
	
	function returnError($msg, $details = null) {
		global $data, $connection;
		$data["type"] = "error";
		$data["message"] = $msg;
		$data["details"] = $details;
		$data["data"] = array();
		if ($_GET["pretty"] !== "false") {
			echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
		}
		else {
			echo json_encode($data, JSON_UNESCAPED_UNICODE);
		}
		header('Content-Type: application/json; charset=utf-8');
		die();
	}
	
	function returnWarning($msg, $details = null) {
		global $data, $connection;
		$data["type"] = "warning";
		$data["message"] = $msg;
		$data["details"] = null;
		$data["data"] = array();
		if ($_GET["pretty"] !== "false") {
			echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
		}
		else {
			echo json_encode($data, JSON_UNESCAPED_UNICODE);
		}
		header('Content-Type: application/json; charset=utf-8');
		die();
	}
	
	function returnData($msg, $stuff, $details = null) {
		global $data, $connection;
		$data["type"] = "success";
		$data["message"] = $msg;
		$data["details"] = null;
		$data["data"] = $stuff;
		if (!isset($_GET["pretty"]) || $_GET["pretty"] !== "false") {
			echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
		}
		else {
			echo json_encode($data, JSON_UNESCAPED_UNICODE);
		}
		header('Content-Type: application/json; charset=utf-8');
		die();
	}
	
	$apiKey = "2ce440f5055fe43f705b2a7cfdfb70d5-us19";
	$listID = "98db0a9a3f";
	$MailChimp = new MailChimp($apiKey);
	
	if (isset($_POST["email"]) && !empty($_POST["email"])) {
		if (filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
			$result = $MailChimp->post("lists/".$listID."/members", array(
				'email_address' => $_POST["email"],
				'status' => 'subscribed'
			));
			if ($MailChimp->success()) {
				returnData("Thank you! We'll be sure to keep you updated and in the loop.", null);
			}
			else {
				$error = $MailChimp->getLastError();
				if (strpos($error, ": ") === false) {
					returnError("An error occured and we couldn't properly add you to our list. Please try again later.", $error);
				}
				else {
					$error = explode(": ", $error);
					switch(intval($error[0])) {
						case 400: {
							returnWarning("You're already on our list! Thank you. We'll be sure to keep you updated and in the loop.");
							break;
						}
						default: {
							returnError("An error occured and we couldn't properly add you to our list. Please try again later.", implode(": ", $error));
							break;
						}
					}
				}
			}
		}
		else {
			returnWarning("The e-mail address provided is invalid. Please enter a valid address.", $_POST["email"]);
		}
	}
	else {
		returnWarning("The e-mail address field is required! Please enter your e-mail address.");
	}
?>