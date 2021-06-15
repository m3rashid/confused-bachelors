// jshint esversion: 8



// navbar thingy
function darken_screen(yesno) {
    if (yesno == true) {
        document.querySelector('.screen-darken').classList.add('active');
    } else if (yesno == false) {
        document.querySelector('.screen-darken').classList.remove('active');
    }
}

function close_offcanvas() {
    darken_screen(false);
    document.querySelector('.mobile-offcanvas.show').classList.remove('show');
    document.body.classList.remove('offcanvas-active');
}

function show_offcanvas(offcanvas_id) {
    darken_screen(true);
    document.getElementById(offcanvas_id).classList.add('show');
    document.body.classList.add('offcanvas-active');
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('[data-trigger]').forEach(function(everyelement) {

        let offcanvas_id = everyelement.getAttribute('data-trigger');

        everyelement.addEventListener('click', function(e) {
            e.preventDefault();
            show_offcanvas(offcanvas_id);

        });
    });

    document.querySelectorAll('.nav__close').forEach(function(everybutton) {

        everybutton.addEventListener('click', function(e) {
            e.preventDefault();
            close_offcanvas();
        });
    });

    document.querySelector('.screen-darken').addEventListener('click', function(event) {
        close_offcanvas();
    });

});


// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {

//     var currentScrollpos = window.pageYOffset;
//     if (prevScrollpos > currentScrollpos) {
//         document.getElementById("navbar").style.marginTop = "0";
//     } else {
//         document.getElementById("navbar")
//     }

//     prevScrollpos = currentScrollpos;

// }

$('.owl-carousel').owlCarousel({
    margin: -10,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})

var carouselitem = document.querySelectorAll(".owl-item");

console.log(carouselitem);
carouselitem.forEach(item => {
    $(item).hover(MouseHover, Mouseout);
});

function MouseHover() {

    console.log(this);
    var nextsib = $(this).nextAll();
    console.log("Mouse Hover : " +
        nextsib);

    $(this).children('.item').addClass('focus_space');
    var arr = nextsib;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            if ($(arr[i]).children('.item').hasClass('add_space') === false) {
                $(arr[i]).children('.item').addClass('add_space');
            }
        }
    }

}

function Mouseout() {
    console.log(this);
    var nextsib = $(this).nextAll();
    console.log("Mouse Out : ");
    console.log(nextsib);
    var arr = nextsib;
    $(this).children('.item').removeClass('focus_space');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            if ($(arr[i]).children('.item').hasClass('add_space') === true) {
                $(arr[i]).children('.item').removeClass('add_space');
            }
        }
    }

}