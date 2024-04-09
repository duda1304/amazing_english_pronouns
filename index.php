<?php
// $imageDirectory = 'media/1_4';

// $files = scandir($imageDirectory);

// foreach ($files as $file) {
//    if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
//         $imagePath = $imageDirectory . '/' . $file;

//         $image = new Imagick($imagePath);

//         $image->trimImage(0);

//         $newImagePath = 'modified_' . basename($imagePath);
//         $image->writeImage($newImagePath);

//         $image->destroy();

//         echo "Whitespace removed from: $newImagePath\n";
//     }
// }

// Function to remove whitespace around an image
function removeWhitespace($imagePath) {
    // Open the image
    $image = imagecreatefromstring(file_get_contents($imagePath));

    // Get image dimensions
    $width = imagesx($image);
    $height = imagesy($image);

    // Find the non-white pixels
    $nonWhiteSpaceX = [];
    $nonWhiteSpaceY = [];
    for ($x = 0; $x < $width; $x++) {
        for ($y = 0; $y < $height; $y++) {
            $pixelColor = imagecolorat($image, $x, $y);
            $rgba = imagecolorsforindex($image, $pixelColor);
            if ($rgba['red'] != 255 || $rgba['green'] != 255 || $rgba['blue'] != 255) {
                $nonWhiteSpaceX[] = $x;
                $nonWhiteSpaceY[] = $y;
            }
        }
    }

    // Calculate new image dimensions without whitespace
    $newWidth = max($nonWhiteSpaceX) - min($nonWhiteSpaceX) + 1;
    $newHeight = max($nonWhiteSpaceY) - min($nonWhiteSpaceY) + 1;

    // Create a new image with the new dimensions
    $newImage = imagecreatetruecolor($newWidth, $newHeight);

    // Copy the non-white pixels to the new image
    imagecopy($newImage, $image, 0, 0, min($nonWhiteSpaceX), min($nonWhiteSpaceY), $newWidth, $newHeight);

    // Save the modified image
    $newImagePath = './media/1_4/modified_' . basename($imagePath);
    imagepng($newImage, $newImagePath);

    // Free up memory
    imagedestroy($image);
    imagedestroy($newImage);

    return $newImagePath;
}

// Directory containing the images
$imageDirectory = './media/1_4';

// Get all files in the directory
$files = scandir($imageDirectory);

// Loop through each file
foreach ($files as $file) {
    // Check if it's a valid image file
    if (preg_match('/\.(jpg|jpeg|png|gif)$/i', $file)) {
        $inputPath = 'media/1_4/' . $file;
        $outputPath = 'media/1_4/trimmed/' . $file;
        
        // Execute the ImageMagick command to trim the image
        $command = "convert $inputPath -trim +repage $outputPath";
        $output = array();
        $returnVar = 0;
        exec($command, $output, $returnVar);
        
        // Check if the command executed successfully
        if ($returnVar === 0) {
            echo "Image trimmed successfully!";
        } else {
            echo "Error trimming image: $returnVar";
            // Optionally, you can also print the output to see any error messages from ImageMagick
            echo implode("\n", $output);
        }
    }
}
echo phpinfo();
?>
