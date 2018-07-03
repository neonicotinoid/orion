// For Google Maps
var map,
    coordinates = {
        lat: 55.7540233,
        lng: 37.6207384
    },
    popupContent = document.querySelector('.marker-desc').innerHTML;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 14,
            scrollwheel: false
        }),
 

        marker = new google.maps.Marker({
            position: coordinates,
            map: map,
        }),


        infowindow = new google.maps.InfoWindow({
            content: popupContent
        });
    infowindow.open(map, marker);
};


// For easy hamburger menu on mobile
var nav = document.querySelector(".header-links-group"),
    navToggle = document.querySelector(".hamburger"),
    body = document.querySelector('body');
if (nav) {
    navToggle.addEventListener("click",
        function (e) {
            e.preventDefault();
            nav.classList.toggle('is-open');
            body.classList.toggle('is-blurred');
        }, false);
};

document.onclick = function (event) {
    var target = event.target;
    if (target.classList.contains('is-blurred')) {
        console.log('click on body');
        nav.classList.toggle('is-open');
        body.classList.toggle('is-blurred');
    };
};


// Slider in first section
var swiper = new Swiper('.slider-wrapper', {
    parallax: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  });


  // Slider for projects
  var swiperProjects = new Swiper('.projects-wrapper', {
    slidesPerView: 2,
    slidesPerColumn: 2,
    spaceBetween: 15,
    navigation: {
        nextEl: '.projects__rarrow',
        prevEl: '.projects__larrow',
    },
     // Responsive breakpoints
  breakpoints: {
    // when window width is <= 640px
    640: {
      slidesPerView: 1,
      slidesPerColumn: 1,
      spaceBetween: 15
    }
  }

  });