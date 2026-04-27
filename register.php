<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/css/intlTelInput.css">
    <link rel="stylesheet" href="style.css">
    <title>Register  | Swagbucks</title>
</head>
<body>
            <?php
            session_start();
            // Recuperamos los datos o inicializamos un array vacío si no existen
            $datos = $_SESSION['datos_registro'] ?? ['nombre' => '', 'segundo_nombre' => '', 'email' => ''];
            ?>
        <section class="register_section">
            <form id="registrationForm" class="glass_form">
                    <h1>Swagbucks</h1>

                    <section id="step1" class="step1">
                    
                        <h3>Step 1: Personal Information</h3>

                        <label>First Name:</label>
                        <input type="text" name="fname" value="<?php echo htmlspecialchars($datos['nombre']); ?>" readonly class="input-readonly">

                        <label>Middle Name:</label>
                        <input type="text" name="sname" value="<?php echo htmlspecialchars($datos['segundo_nombre']); ?>" readonly class="input-readonly">

                        <label>Email Address:</label>
                        <input type="email" name="email" value="<?php echo htmlspecialchars($datos['email']); ?>" readonly class="input-readonly">

                        <label>Country:</label>
                        <select name="country" id="selectCountry" required></select>

                        <label>State/Province:</label>
                        <select name="state" id="selectState" disabled required></select>

                        <label>Direction:</label>
                        <input type="text" name="direction"  required>

                        <label>Phone Number:</label>
                        <input type="tel" id="phone" name="phone"  required>

                        <label>Zip/Postal Code:</label>
                        <input type="text" name="zipCode" placeholder="e.g. 1011" required>

                        <button type="button" id="nextBtn" class="nextBtn">Next</button>
                    </section>

                    <section id="step2" style="display: none;" class="step2">
                    <h3>Step 2: Visual Verification</h3>

                    <div class="file-upload-container">
                        <label>ID Document (Front Side):</label>
                        <input type="file" name="idPhotoFront" accept="image/*" capture="environment" required>
                        
                        <label>ID Document (Back Side):</label>
                        <input type="file" name="idPhotoBack" accept="image/*" capture="environment" required>
                        
                        <label>Face Photo (Selfie):</label>
                        <input type="file" name="facePhoto" accept="image/*" capture="user" required>
                        
                        <label>Selfie Holding ID Document:</label>
                        <input type="file" name="selfieWithId" accept="image/*" capture="user" required>
                    </div>

                    <div class="button-group">
                        <button type="button" id="backBtn" class="back-button">Back</button>
                        <button type="submit" class="submit-button">Complete Registration</button>
                    </div>
                    </section>
            </form>
        </section>
        <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/intlTelInput.min.js"></script>
        <script src="countries.js"></script>
        <script src="register_countries.js"></script>
</body>
</html>