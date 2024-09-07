<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['appFile']) && isset($_POST['appName'])) {
        $file = $_FILES['appFile'];
        $appName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $_POST['appName']); // تنظيف الاسم
        $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
        $newFileName = $appName . '.' . $extension;
        $uploadDir = 'uploads/'; // تأكد من إنشاء هذا المجلد

        if (move_uploaded_file($file['tmp_name'], $uploadDir . $newFileName)) {
            echo "تم رفع التطبيق بنجاح! <a href='$uploadDir$newFileName'>تحميل $newFileName</a>";
        } else {
            echo 'فشل رفع الملف.';
        }
    } else {
        echo 'يرجى اختيار ملف وادخال اسم التطبيق.';
    }
} else {
    echo 'طلب غير صالح.';
}
?>
