// Use the event handler for each carousel's next and prev buttons.
$('.carousel').each(function () {
    var carousel = $(this);
    var carouselItems = carousel.find('.carousel-item');
    var cardWidth = carouselItems.first().width();  // Get the width of a single item
    var carouselWidth = carousel.find('.carousel-inner')[0].scrollWidth;  // Get the total scroll width
    var scrollPosition = 0;

    // Calculate the number of items per slide dynamically based on carousel width
    function calculateItemsPerSlide() {
        return Math.floor(carousel.width() / cardWidth);  // Dynamically calculate how many items fit based on carousel width
    }

    var itemsPerSlide = calculateItemsPerSlide();  // Initial calculation of items per slide

    // Update the number of items per slide when the window is resized
    $(window).on('resize', function () {
        itemsPerSlide = calculateItemsPerSlide();
    });

    // Next button functionality
    carousel.find('.carousel-control-next').on('click', function () {
        if (scrollPosition < (carouselItems.length - itemsPerSlide)) {  // Check if there are more items to scroll
            console.log('next');
            scrollPosition += itemsPerSlide;  // Move by the number of items per slide
            carousel.find('.carousel-inner').animate({
                scrollLeft: scrollPosition * cardWidth  // Smooth scroll by the width of the items
            }, 600);  // Smooth transition over 600ms
        }
    });

    // Prev button functionality
    carousel.find('.carousel-control-prev').on('click', function () {
        if (scrollPosition > 0) {  // Check if we are not at the start
            console.log('prev');
            scrollPosition -= itemsPerSlide;  // Move back by the number of items per slide
            carousel.find('.carousel-inner').animate({
                scrollLeft: scrollPosition * cardWidth  // Smooth scroll by the width of the items
            }, 600);  // Smooth transition over 600ms
        }
    });
});



function addToCart(event) {
    event.preventDefault();  // Prevent default action (link navigation)

    var pid = event.target.getAttribute('data-pid');
    var uid = event.target.getAttribute('data-uid');
    
    // Send AJAX request to add the product to the cart
    fetch('/user/addCart?pid=' + pid + '&uid=' + uid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Product added to cart");
        } else {
            alert("Failed to add product to cart");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error adding product to cart");
    });
}

