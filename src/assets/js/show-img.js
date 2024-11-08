$(document).ready(function() {
    // When the image-view link is clicked
    $('.image-view').click(function(event) {
        event.preventDefault(); // Prevent the default anchor click behavior
        
        // Get the image source from the parent .products-single
        var imageSrc = $(this).closest('.products-single').find('img.img-fluid').attr('src');
        
        // Set the image source to the modal image
        $('#img01').attr('src', imageSrc);
        
        // Display the modal
        $('#myModal').css('display', 'block');

        // Optional: Set the caption if needed
        var captionText = $(this).closest('.products-single').find('.card-title').text();
        $('#caption').text(captionText);
    });

    // When the modal close button is clicked
    $('.myModal-close').click(function() {
        $('#myModal').css('display', 'none'); // Hide the modal
    });
});