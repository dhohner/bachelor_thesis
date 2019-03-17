hasScrolled = function(){
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event){
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

window.isopenCommunityPressed = true;

function openCommunity(){
  if (window.isopenCommunityPressed === false) {
    document.getElementById("open-hide-community").style.textDecoration = "none";
    document.getElementById("open-hide-community").style.color = "#000000";
    document.getElementById("community-list").style.display = "none";
    window.isopenCommunityPressed = true;
    return;
  } else if (window.isopenCommunityPressed === true) {
    document.getElementById("open-hide-community").style.textDecoration = "underline";
    document.getElementById("open-hide-community").style.color = "#24b2fa";
    document.getElementById("community-list").style.display = "block";
    window.isopenCommunityPressed = false;
  }
}

function goToRound1(){
  document.getElementById("slider").style.marginLeft = "0";
  document.getElementById("round-1").classList.add("active-round");
  document.getElementById("round-2").classList.remove("active-round");
  document.getElementById("round-3").classList.remove("active-round");
}

function goToRound2(){
  document.getElementById("slider").style.marginLeft = "-100%";
  document.getElementById("round-1").classList.remove("active-round");
  document.getElementById("round-2").classList.add("active-round");
  document.getElementById("round-3").classList.remove("active-round");
}

function goToRound3(){
  document.getElementById("slider").style.marginLeft = "-200%";
  document.getElementById("round-1").classList.remove("active-round");
  document.getElementById("round-2").classList.remove("active-round");
  document.getElementById("round-3").classList.add("active-round");
}

function sliderRight(){
  var leftRanger = document.getElementById("slider").style.marginLeft;
  if (leftRanger == 0 || leftRanger == "0px") {
    goToRound2();
  } else if (leftRanger == "-100%") {
    goToRound3();
  } else if (leftRanger == "-200%") {
    goToRound1();
  }
}

function sliderLeft(){
  var leftRanger = document.getElementById("slider").style.marginLeft;
  if (leftRanger == 0 || leftRanger == "0px") {
    goToRound3();
  } else if (leftRanger == "-100%") {
    goToRound1();
  } else if (leftRanger == "-200%") {
    goToRound2();
  }
}

jQuery(document).ready(function($){
  
  $('.simplefavorite-button').attr("title", "Add to favorites");
  $('.simplefavorite-button.active').attr("title", "Added to favorites");

  $('.simplefavorite-button').click(function(){
    if ($('.simplefavorite-button').attr("title") === "Add to favorites") {
      $('.simplefavorite-button').attr("title", "Added to favorites");
    } else {
      $('.simplefavorite-button').attr("title", "Add to favorites");
    }
  })


  $('.dropLogin .dropbtn').click(function(e){
    var $d = $('#dropdown-login');
    if ($d.is(":visible")) { $d.hide() } else { $d.show(); }
  });

    $('.mobile-top-menu li.current-menu-parent').addClass('show-dropdown');
    $('.current-menu-ancestor').addClass('show-dropdown');

    $('body').on('click', '.mobile-top-menu a', function (e) {
        if ($(e.target).is('svg')) {
            e.preventDefault();
        }
    });

    $('body').on('click', '.mobile-top-menu .icon.icon-angle-down', function (e) {
        var parentLi = $(e.target).closest('li').toggleClass('show-dropdown');
    });

  $('.upload-ava-form input:submit').attr('style', 'display:none!important');
  $('.upload-ava-form input:file').on("change", function() {
    if ($(this).val()) {
      $('.upload-ava-form input:submit').fadeIn();
    }
  });

  $('form.upload-ava-form').on("submit", function() {
    $('.profile-ava, form.upload-ava-form').css('opacity', 0.5);
    document.body.style.cursor = 'wait';
  });
  if ($('.single-guides').length || $('.single-post').length || $('.single-events').length ) {
    $( window ).scroll(function() {
      var cardRightHeight = $('.card-right').height();
      var offsetTop = $('.card-right').offset().top;
      var scroll = $(window).scrollTop();
      var sticky = $( ".card-counters.sticky" );
      var varY = (offsetTop + cardRightHeight) - sticky.height() - 30;

      if (!$('.single-events').length) {
        if (scroll > offsetTop + 50 && scroll < varY) {
            sticky.css( "top", (scroll - 400) + "px" );
        } else if (scroll > varY) {
          sticky.css( "top", (cardRightHeight - sticky.height()) + "px" );
        } else {
          sticky.css( "top", "50px" );
        }
      } else {
        if (scroll > 600 && scroll < cardRightHeight + 520) {
          sticky.css( "top", (scroll - 600) + "px" );
        } else if(scroll > cardRightHeight + 520) {
          sticky.css( "top", (cardRightHeight - 90) + "px" );
        } else {
          sticky.css( "top", "50px" );
        }
      }

    });
  }

  $('.gform_wrapper').on('submit', 'form', function() {
    $('input[type=submit]', this).css('opacity', 0);
  });

  // expand hentry
  bh = $('body').height();
  wh = $(window).height();
  if (bh < wh) {
    $he = $('#main .hentry');
    heh = $he.height();
    $he.height(heh + wh - bh - 1);
  }

  $('.main-header #opennav').on('click', function(){
    $("body").append("<div class='mobile-overlay'></div>");
    $("html").css('overflow', 'hidden');
    $("#mySidenav").css('right', 0);
    setTimeout(function(){
      $("#close-sidenav").show();
    }, 300);
  });

  $('#close-sidenav').on('click', function(){
    $("#mySidenav").css('right', '-220px');
    $("html").css('overflow', 'auto');
    $("#close-sidenav").hide();
    $( ".mobile-overlay" ).remove();
  });

  $('.business-page .input-text>label').each(function(){
    $(this).clone().appendTo(".material-input");
  });

  $('.steps-list__mob, .recruiters-steps-list__mob,.about-testimonials-list, .about-team-list__mob, .ourclients-list-mob, .testimonials').slick({
    dots: true
  });

  $('.main-team-owl, .main-advantages-owl').slick({
    dots: false,
    slidesToShow: 4,
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        infinite: true
      }
    }]
  });


  if($.isFunction($('.ourclients-list-desk').owlCarousel)) {
    $('.ourclients-list-desk').owlCarousel({
      nav: false,
      autoHeight: true,
      responsive: {
        0: {
          mouseDrag: true,
          touchDrag: true,
          dots: true,
          items: 1
        },
        992: {
          items: 3,
          mouseDrag: false,
          touchDrag: false,
          dots: false,
        }
      }
    });
  }

  /*if($.isFunction($('.main-team-owl').owlCarousel)) {
    $('.main-team-owl').owlCarousel({
      autoHeight: true,
      nav: true,
      responsive: {
        0: {
          mouseDrag: true,
          touchDrag: true,
          dots: true,
          items: 1
        },
        992: {
          items: 4,
          dots: false,
        }
      }
    });
  }*/

  $('.search-field-mobile').on('focus', function(){
    $('.topbar-content .float-right').animate({
      marginRight: "-230px",
    }, 2000);
  });

  $('.search-field-mobile').on('focusout', function(){
    $('.topbar-content .float-right').animate({
      marginRight: "0",
    }, 1200);
  });

  //

  if ($('body').children('#wpadminbar').length > 0) {
    document.getElementById("mySidenav").style.top = "46px";
  }

  $(".course-hide-btn").on('click', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 1000);
  });

  $('.toggle-search-js').on('click', function(){
    $('.search-wrapper').toggleClass('hidden-on-mobile');
    if (!$('.search-wrapper').hasClass('hidden-on-mobile')) {
      $('.search-wrapper input').focus();
    }
  });

  if ($('.success-message')[0]) {
    $(window).scrollTop($('.success-message').offset().top);
  }

  $(document).on("gform_confirmation_loaded", function(e, form_id){
    $('.pum.pum-overlay').addClass('pum-success');
    $(".success-button .button").on("click", function(e){
      e.preventDefault();
      $(".pum-close.popmake-close").trigger("click");
    });
  });

  // material forms

  $('form.material, .popmake form.material, .material form, .widget.gform_login_widget, .gform_wrapper form').materialForm();
  // render filter input for countries list and init filter logic
  initFilterForCountries();

  $('.material-input label').click(function(){
    $(this).parent().find('input').trigger("focus");
  });

  if ($('form.material').find('.validation_error')[0]) {
    $(window).scrollTop($('form.material .fields-group-wrap').offset().top);
  }

  // style form again after update (ajax)

  $(document).bind('gform_post_render', function(event, formId){

    $('.popmake form.material, .user-account .gform_wrapper form, .popup-auth-container .gform_wrapper form').materialForm();
    // render filter input for countries list and init filter logic
    initFilterForCountries();

    $('.popmake .material-input label').click(function(){
      $(this).parent().find('input').trigger("focus");
    });

    $('.material-select').click(function(){
      $(this).children('input').prop("checked", true);
    });

    // autocomplete
		if ($.browser.chrome) {
			$("input").each(function() {
        $(this).attr('autocomplete', 'false'); //FALSE AS OF 2015
      });
      $("form").each(function() {
        $(this).attr('autocomplete', 'false'); //FALSE AS OF 2015
      });
		} else {
			$("input").each(function() {
        $(this).attr('autocomplete', 'off');
      });
      $("form").each(function() {
        $(this).attr('autocomplete', 'off');
      });
		}

    $('.material-input label, .popmake .material-input label').on('click', function(){
      $(this).siblings('input').trigger("focus");
      return false;
    });

    if ($('form.material').find('.validation_error')[0]) {
      $(window).scrollTop($('form.material .fields-group-wrap').offset().top);
    }

    $('.material-select').click(function(){
      $(this).children('input').prop("checked", true);
    });

    $('.material-input textarea')
      .on('focus', function(){
        $(this).siblings('label').fadeOut();
        return false;
      })
      .on('blur', function(){
        if ($(this).val().trim() == '') {
          $(this).siblings('label').fadeIn();
        }
        return false;
      });

  });


  $('.account-left-side a').on('click', function () {
    $('.account-left-side a').each(function (i, item) {
      $(item).removeClass('current')
    });
    $(this).addClass('current');
  });

  $(window).scroll(function (e) {
    if ($('.toc-single-guide').length) {
      checkTocOffset();
    }
  });
  if ($('.toc-single-guide').length) {
    checkTocOffset();
  }

  $('body').on('click', '.toc-single-guide li a', function (e) {
      $('.toc-single-guide li').each(function (index, elem) {
          $(elem).removeClass('active');
      });
      $(this).closest('li').addClass('active');
  });

  checkInitialAnnouncementState();

  $('body').on('click', '.announcement-closer', function (event) {
      closeAnnouncement($(this));
  });

  $('body').on('click', '.profile-menu-mobile-dropdown', function (e) {
    var menu = $(this).find('.dropdown-menu-profile');
    var dropBlock = $(this).find('.dropdown');
    var showClass = 'show-dropdown';
    if (menu.hasClass(showClass)) {
        menu.removeClass(showClass);
        dropBlock.removeClass(showClass);
    } else {
        menu.addClass(showClass);
        dropBlock.addClass(showClass);
    }
  });

  $('body .guides-menu.guides-menu-pages li:not(.active):not(.guides-menu-title)').hover(
      function (e) {
        var $image = $(this).find('img');
        var src = $image.attr('src');
        var newSrc = src.replace(/gray/i, 'white');
        $image.attr('src', newSrc);
      },
      function (e) {
        if ( ! $(e.target).closest('li').hasClass('active') &&
            ! $(e.target).hasClass('active')
        ) {
            var $image = $(this).find('img');
            var src = $image.attr('src');
            var newSrc = src.replace(/white/i, 'gray');
            $image.attr('src', newSrc);
        }
      }
  );

  $('body .guides-menu.guides-menu-filter li:not(.active):not(.guides-menu-title)').hover(
      function (e) {
        var $image = $(this).find('img');
        var src = $image.attr('src');
        if (src) {
            var newSrc = src.replace(/gray/i, 'blue');
            $image.attr('src', newSrc);
        }
      },
      function (e) {
          if ( ! $(e.target).closest('li').hasClass('active') &&
              ! $(e.target).hasClass('active')
          ) {
                var $image = $(this).find('img');
                var src = $image.attr('src');
                if (src) {
                    var newSrc = src.replace(/blue/i, 'gray');
                    $image.attr('src', newSrc);
                }
          }
      }
  );
    setActiveLiOnFiltersMenu();

    initGuidesSliderByIds('must-read-slider', 'must-read');

    initGuidesSliderByIds('latest-slider', 'latest');

    initGuidesSliderByIds('beginners-slider', 'new-guide-tab-beginners');

    $('body').on('click', '.new-guide-tab-link', function (e) {
        var $tabLink = $(this);
        var tabId = $tabLink.attr('data-new-guide-tab-id');
        var $tabContent = $(document.getElementById(tabId));
        // var $allTabLinks = $tabLink.closest('.new-guide-tabs').find('.new-guide-tab-link');
        // var $allTabContents = $tabLink.closest('.new-guide-tabs').parent().find('.new-guide-tab-content');
        var $allTabContents = $('.new-guide-tab-content');
        var $allTabLinks = $('.new-guide-tab-link');
        $allTabLinks.each(function (index, elem) {
            $(elem).removeClass('active');
        });
        $allTabContents.each(function (index, elem) {
            $(elem).removeClass('active');
        });
        $tabLink.addClass('active');
        $tabContent.addClass('active');
        $('.new-guide-categories-dropdown-mobile').find('button').text($tabLink.text());
        $('.new-guide-categories-dropdown-mobile')
            .find('.dropdown')
            .removeClass('show-dropdown')
            .find('ul')
            .removeClass('show-dropdown');

        var sliderId = $tabContent.find('.new-guide-slider').attr('id');
        initGuidesSliderByIds(sliderId, tabId);
    });

    $('body').on('click', '.guides-filter-mobile-button', function (e) {
        showMobileGuidesFilterMenu();
    });

    $('body').on('click', '.close-guides-filters-mobile-block', function (e) {
        hideMobileGuidesFilterMenu();
    });

    $('body').on('click', '.new-guide-categories-dropdown-mobile button', function (e) {
        var menu = $(this).closest('.dropdown').find('.new-guide-categories-dropdown');
        var dropBlock = $(this).closest('.dropdown');
        var showClass = 'show-dropdown';
        if (menu.hasClass(showClass)) {
            menu.removeClass(showClass);
            dropBlock.removeClass(showClass);
        } else {
            menu.addClass(showClass);
            dropBlock.addClass(showClass);
        }
    });

  cutBusinessTestimonial();

  $('body').on('click', '.testimonial-quote-item-short-desc a', function (e) {
      var parent = $(this).closest('.testimonial-quote-item');
      parent.find('.testimonial-short').hide();
      parent.find('.testimonial-full').show();
  });

  $('body').on('click', '.testimonial-full a', function (e) {
      var parent = $(this).closest('.testimonial-quote-item');
      parent.find('.testimonial-short').show();
      parent.find('.testimonial-full').hide();
  });

  $('body').on('click', '.additional-filter-dropdown > a', function (e) {
      $(this).closest('.additional-filter-dropdown').toggleClass('show-dropdown');

  });

  insertRelatedGuides();

  replaceRelatedPostsTitle();

  if ($('.video-guide').length) {
    $('.video-guide').find('.card-desc').find('.swp_social_panel').remove();
    if ($('.yuzo__title').length) {
      $('.yuzo__title').each(function (index, elem) {
        $(elem).text('RELATED VIDEOS');
      });
    }
  }

  if ( ! $('.toc-single-guide #ez-toc-container').length) {
    $('#community-left-side #site-navigation').next('.side-menu-divider').hide();
    $('#community-left-side').find('.new-guide-content-title').hide();
  }

  if (document.getElementById('div-gpt-ad-1550675423276-0')) {
    //store the element
    var $cache = $('#div-gpt-ad-1550675423276-0');

    //store the initial position of the element
    var vTop = $cache.offset().top - parseFloat($cache.css('marginTop').replace(/auto/, 0));
    $(window).scroll(function (event) {
      // what the y position of the scroll is
      var y = $(this).scrollTop();

      // whether that's below the form
      if (y >= vTop) {
        // if so, ad the fixed class
        $cache.addClass('stuck');
      } else {
        // otherwise remove it
        $cache.removeClass('stuck');
      }
    });
  }

});

function initFilterForCountries() {
    if ($('[data-register-filter-country-input]').length < 1) {
      $('.gform_wrapper .country-select ul.radio').prepend('<li><input class="countries-filter-input" type="text" placeholder="Enter country" data-register-filter-country-input="true"></li>');
    }

    $('body').on('click', '.address_country .material-select > label', function (e) {
        setTimeout(function (e) {
            $('.countries-filter-input').focus();
        }, 400);
    });

    var $countryList = $('.gform_wrapper form ul.radio li');
    $('body').on('input', '[data-register-filter-country-input]', function (e) {
        var search = e.target.value.toLowerCase();
        $countryList.each(function (index, element) {
            var countryName = $(element).find('label').text().toLowerCase();
            if (countryName.startsWith(search, 0)) {
                $(element).show();
            } else if (index > 0) {
                $(element).hide();
            }
        });
    });
}

function checkTocOffset() {
    var windowOffset = $(window).scrollTop();
    var $toc = $('.toc-single-guide');
    var $siteNav = $('#site-navigation');
    var offBreak = $siteNav.offset().top + $siteNav.outerHeight();

    if (windowOffset > offBreak + 50) {
        $toc.addClass('fixed-toc');
    } else {
        $toc.removeClass('fixed-toc');
    }
}

function checkInitialAnnouncementState() {
    if ( ! localStorage.getItem('announcement-ids')) {
        localStorage.setItem('announcement-ids', JSON.stringify([]));
    }
    var ids = JSON.parse(localStorage.getItem('announcement-ids'));
    var $announcements = $('.announcement-block');
    if (ids.length === 0) {
        $announcements.each(function (index, element) {
            $(element).css('display', 'flex');
        });
    }
    $announcements.each(function (index, element) {
        var id = $(element).closest('[data-id]').attr('data-id');
        if (ids.indexOf(id) === -1) {
            $(element).css('display', 'flex');
        }
    });
}

function closeAnnouncement(element) {
    var $announcement = $(element).closest('.announcement-block');
    $announcement.css('display', 'none');
    var id = $announcement.closest('[data-id]').attr('data-id');
    var ids = JSON.parse(localStorage.getItem('announcement-ids'));
    if (ids.indexOf(id) === -1) {
        ids.push(id);
    }
    localStorage.setItem('announcement-ids', JSON.stringify(ids));
}

function cutBusinessTestimonial() {
  $('.testimonial-quote-item-short-desc').each(function (index, elem) {
    var text = $(elem).text();
    var cuttedText = text.slice(0, 170);
    if (cuttedText.length < text.length) {
        cuttedText += '...';
        cuttedText += " <a href='javascript:void(0);'>Read full comment</a>"
    }
    $(elem).html(cuttedText);
  });
}

function setActiveLiOnFiltersMenu() {
    var links = $('.guides-menu-filter a');
    var currentUrl = window.location.href.toLowerCase();
    links.each(function (index, elem) {
        var $elem = $(elem);
        var link = $elem.attr('data-filter-href');
        $elem.closest('li').removeClass('active');
        if (link) {
            if (currentUrl.indexOf(link.toLowerCase()) !== -1) {
                if (currentUrl.indexOf('/guides/?view=sections') !== -1 && link.toLowerCase() === '/guides') {

                } else if (currentUrl.indexOf('/guides/?tagfilter=true') !== -1 && link.toLowerCase() === '/guides') {

                } else if ($('[data-is-single-guide-page]').length && link.toLowerCase() === '/guides') {

                } else {
                    if ($elem.closest('.additional-filter-dropdown').length) {
                        $elem.closest('.additional-filter-dropdown').addClass('show-dropdown');
                    }
                    $elem.closest('li').addClass('active');
                    var $img = $elem.find('img');
                    if ($img.length) {
                        var src = $img.attr('src');
                        $img.attr('src', src.replace(/gray/i, 'blue'));
                    }
                }
            }
        }
  });
}

function initGuidesSliderByIds(sliderId, parentId) {
    if (document.getElementById(sliderId) && $('#'+sliderId).hasClass('slick-initialized')) {
        $("#" + sliderId).slick('unslick');
    }
    if (document.getElementById(sliderId) && ! $('#'+sliderId).hasClass('slick-initialized')) {
        $("#" + sliderId).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            draggable: false,
            appendArrows: '#' + parentId + ' .new-guide-slider-bottom .new-guide-slider-nav',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        draggable: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        // On before slide change
        $('#' + sliderId).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('#' + parentId + ' .new-guide-slider-nav span').text(nextSlide + 1);
        });
    }
}

function showMobileGuidesFilterMenu() {
    $('body').append('<div class="mobile-overlay"></div>');
    $('.close-guides-filters-mobile-block').show();
    $('.guides-filters-mobile-block').css('left', 0);
    $('html').css('overflow', 'hidden');
}

function hideMobileGuidesFilterMenu() {
    $('.mobile-overlay').remove();
    $('.close-guides-filters-mobile-block').hide();
    $('.guides-filters-mobile-block').css('left', '-300px');
    $('html').css('overflow', 'auto');
}

function insertRelatedGuides() {
    var $relatedAside = $('.yuzo_related_post');
    var insertElement = '<div class="related-guides-middle-block">\n' +
        '                    <h3>Related Guides</h3>\n' +
        '                    <div class="related-guides-middle">\n' +
        '                    </div>\n' +
        '                </div>';

    if ($relatedAside.length) {
        var number = Math.round($('.card-right .card-desc').contents().length / 2);
        var targetElement = $($('.card-right .card-desc').contents()[number]);
        targetElement.after(insertElement);
        var $relatedItems = $relatedAside.find('.relatedthumb');
        $relatedItems.each(function (index, item) {
            if (index < 3) {
               var $item = $(item);
               var imageSrc = $item.find('.yuzo-img').css('background-image').replace(/\"/g, '');
               var link = $item.find('a').attr('href');
               var text = $item.find('.yuzo__text--title').text();
               var middleItem = '<div class="related-guides-middle-item">\n' +
                   '                    <a href="'+link+'">\n' +
                   '                       <div class="related-guides-middle-image-wrap">\n' +
                   '                           <div class="related-guides-middle-image" style="background-image:'+imageSrc+'"></div>\n' +
                   '                       </div>\n' +
                   '                       <span>'+text+'</span>\n' +
                   '                   </a>\n' +
                   '                </div>';
               $('.card-right').find('.related-guides-middle').append(middleItem);
            }
        });
    }
}

function replaceRelatedPostsTitle() {
  $yuzo = $('.yuzo_related_post');
  $article = $('.single-post');
  $middleBlock = $('.related-guides-middle-block');
  if ($yuzo.length && $article.length) {
    $yuzo.find('h3').text('Related Articles');
    $middleBlock.find('h3').text('Related Articles');
  }
}