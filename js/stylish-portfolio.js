'use strict';
// enable tooltips
$($('[data-toggle="tooltip"]').tooltip());
// hide email form
$($('#email-form').slideToggle(0));

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
// Email form toggle
$('#email-toggle').click((e) => {
  e.preventDefault();
  const $hiddenForm = $('#email-form');
  $hiddenForm.slideToggle("slow");
});
// Email form functionality
$('#contact_form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      first_name: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please supply your first name'
          }
        }
      },
      last_name: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please supply your last name'
          }
        }
      },
      _replyto: {
        validators: {
          notEmpty: {
            message: 'Please supply your email address'
          },
          emailAddress: {
            message: 'Please supply a valid email address'
          }
        }
      },
      company: {
        validators: {
          stringLength: {
            min: 2,
          },
          notEmpty: {
            message: 'Please supply your company name'
          }
        }
      },
      city: {
        validators: {
          stringLength: {
            min: 4,
          },
          notEmpty: {
            message: 'Please supply your city'
          }
        }
      },
      state: {
        validators: {
          notEmpty: {
            message: 'Please select your state'
          }
        }
      },
      comment: {
        validators: {
          stringLength: {
            min: 10,
            max: 200,
            message: 'Please enter at least 10 characters and no more than 200'
          },
          notEmpty: {
            message: 'Please supply a description of your project'
          }
        }
      }
    }
  })
  .on('success.form.bv', function (e) {
    $('#success_message').slideDown({
      opacity: "show"
    }, "slow");
    $('#contact_form').data('bootstrapValidator').resetForm();

    // Prevent form submission
    e.preventDefault();

    // Get the form instance
    const $form = $(e.target);

    // Get the BootstrapValidator instance
    const bv = $form.data('bootstrapValidator');

    // Use Ajax to submit form data
    $.post($form.attr('action'), $form.serialize(), function (result) {
      console.log(result);
    }, 'json');
  });
