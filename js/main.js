(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

  

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);

  //Estimate
  var currentTab = 0;
  const emailAddress = document.querySelector("#Email_Address");
  const phone = document.querySelector("#Phone");
//   const zip = document.querySelector("#Zip");
  const whatPromptedInput = document.querySelector("#lead_what_prompted_response");
  const whatPromptedSelect = document.querySelector("#lead_what_prompted_id");
  const projectInput = document.querySelector("#Project");
  const designInput = document.querySelector("#design");
  const projectSelect = document.querySelector("#project_select");
  const designSelect = document.querySelector("#design_select");
  const submit = document.querySelector("input[type='submit']");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  const form = document.querySelector("#contact_form");
  
  showTab(currentTab);
  
  function showTab(n) {
      var x = document.getElementsByClassName("tab");
      x[n].style.display = "block";
      if (n == 0) {
          prevBtn.style.display = "none";
      } else {
          prevBtn.style.display = "inline-block";
      }
      if (n == 1) {
          nextBtn.style.display = "inline-block";
      }
      if (n == 2) {
          nextBtn.style.display = "none";
          submit.style.display = "inline-block";
      } else {
          submit.style.display = "none";
      }
      fixStepIndicator(n);
  }
  
  function nextPrev(n) {
      var x = document.getElementsByClassName("tab");
      if (n == 1 && !validateForm()) return false;
      x[currentTab].style.display = "none";
      currentTab = currentTab + n;
      if (n == -1) {
          document.querySelector(".active").classList.remove("active");
          document.getElementsByClassName("finish")[currentTab].classList.remove("finish");
      }
      showTab(currentTab);
  }
  
  function validateForm() {
      projectInput.value = projectSelect.value;
      designInput.value = designSelect.value;
      whatPromptedInput.value = whatPromptedSelect.value;
      
      var x, y, i, valid = true;
      x = document.getElementsByClassName("tab");
      y = x[currentTab].getElementsByTagName("input");
      for (i = 0; i < y.length; i++) {
          y[i].classList.remove("invalid");
          y[i].nextElementSibling.classList.add("invalid-label-hidden");
          if (y[i].value == "") {
              y[i].className += " invalid";
              y[i].nextElementSibling.classList.remove("invalid-label-hidden");
              valid = false;
          }
          if (y[i].id == "Email_Address") {
              let isValidEmail = emailAddress.checkValidity();
              if (!isValidEmail || emailAddress.value.length == 0) {
                  y[i].className += " invalid";
                  y[i].nextElementSibling.classList.remove("invalid-label-hidden");
                  valid = false;
              } else {
                  valid = true;
                  y[i].classList.remove("invalid");
                  y[i].nextElementSibling.classList.add("invalid-label-hidden");
              }
          }
          if (y[i].id == "Phone") {
              let regExp = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
              let isPhoneValid = phone.value.match(regExp);
              if (!isPhoneValid || phone.value.length == 0) {
                  y[i].className += " invalid";
                  y[i].nextElementSibling.classList.remove("invalid-label-hidden");
                  valid = false;
              } else {
                  valid = true;
                  y[i].classList.remove("invalid");
                  y[i].nextElementSibling.classList.add("invalid-label-hidden");
              }
          }
        //   if (y[i].id == "Zip") {
        //       let regExp = /^[0-9]{5}(?:-[0-9]{4})?$/;
        //       let isZipValid = zip.value.match(regExp);
        //       if (!isZipValid || zip.value.length == 0) {
        //           y[i].className += " invalid";
        //           y[i].nextElementSibling.classList.remove("invalid-label-hidden");
        //           valid = false;
        //       } else {
        //           valid = true;
        //           y[i].classList.remove("invalid");
        //           y[i].nextElementSibling.classList.add("invalid-label-hidden");
        //       }
        //   }
      }
      if (valid) {
          document.getElementsByClassName("step")[currentTab].className += " finish";
      }
      return valid;
  }
  
  submit.addEventListener('click', function (e) {
      if (!validateForm()) {
          e.preventDefault();
      } else {
          contact_form.submit();
      }
  });
  
  function fixStepIndicator(n) {
      var i, x = document.getElementsByClassName("step");
      for (i = 0; i < x.length; i++) {
          x[i].className = x[i].className.replace(" active", "");
      }
      x[n].className += " active";
  }