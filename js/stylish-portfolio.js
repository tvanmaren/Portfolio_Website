'use strict';
// Closes the sidebar menu
$("#menu-close").click(function (e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});
// Scrolls to the selected menu item on the page
$(function () {
  $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function () {
  if ($(this).scrollTop() > 250) {
    if (!fixed) {
      fixed = true;
      // $('#to-top').css({position:'fixed', display:'block'});
      $('#to-top').show("slow", function () {
        $('#to-top').css({
          position: 'fixed',
          display: 'block'
        });
      });
    }
  } else {
    if (fixed) {
      fixed = false;
      $('#to-top').hide("slow", function () {
        $('#to-top').css({
          display: 'none'
        });
      });
    }
  }
});
// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function (event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
};
var onMapClickHandler = function (event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
};
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);
// Filter functionality
$('#filter-options span a').click((e) => {
  e.preventDefault();
  const currentClass = $(e.target).attr('class').split(' ').filter((classAttr) => {
    return !(classAttr === 'btn' || classAttr === 'btn-default');
  })[0];
  $('#filter-options span').removeClass('active');
  $(e.target).parent().addClass('active');

  if (currentClass === 'all') {
    $('#portfolio-items').children('div.item').fadeIn("fast");
  } else {
    $('#portfolio-items').children(`div:not(.${currentClass})`).fadeOut('slow', () => {
      $('#portfolio-items').children(`div.${currentClass}`).fadeIn("slow");
    });
  }
});
// Email popup on portfolio details
$('#portfolio > .container > .row > div > a.btn.btn-dark').click((e) => {
  e.preventDefault();
  let emailMe = confirm('Just shoot me a message over LinkedIn or Email, and I\'ll be happy to send you links to my latest work! tristan@vanmaren.us');
  console.log(`Your understanding of why you're here is... ${emailMe}`);
});
// Hidden text functionality
$('.portfolio-item > #in-progress').click((e) => {
  e.preventDefault();
  const $hiddenText = $('.portfolio-item + div.hidden-text');
  if ($hiddenText.css('display') === 'none') {
    $hiddenText.css({
      'display': 'inline-block',
      'height': 'auto',
      'width': 'auto'
    });
  } else {
    $hiddenText.css({
      'display': 'none',
      'height': '0',
      'width': '0'
    });
  }
});
