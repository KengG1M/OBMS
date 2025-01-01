var carouselWidth = $('.carousel-inner')[0].scrollWidth;
var cardWidth = $('.carousel-item').width();

var scrollPosition = 0;

$('.carousel-control-next').on('click', function () {
    if(scrollPosition < (carouselWidth - (cardWidth * 4))){
        console.log('next');
        scrollPosition += cardWidth;
        $('.carousel-inner').animate({scrollLeft: scrollPosition}, 600); 
    }
});

$('.carousel-control-prev').on('click', function () {
    if(scrollPosition > 0){
        console.log('prev');
        scrollPosition -= cardWidth;
        $('.carousel-inner').animate({scrollLeft: scrollPosition}, 600); 
    }
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

