function init() {

  //sidebar dropdown menu
  $('#sidebar .sub-menu > a').click(function () {
    var above = $(this).prev('.sub-menu');
    // Toggle current submenu
    var sub = $(this).next();
    if (sub.is(":visible")) {
      $('.menu-arrow', this).addClass('fa-angle-right');
      $('.menu-arrow', this).removeClass('fa-angle-down');
      sub.slideUp(200);
      $(sub).removeClass("open");
      $(this).prev('.sub-menu').removeClass('open');
    } else {
      $('.menu-arrow', this).addClass('fa-angle-down');
      $('.menu-arrow', this).removeClass('fa-angle-right');
      sub.slideDown(200);
      $(sub).addClass("open");
      $(this).prev('.sub-menu').addClass('open');
    }
  });

  $('.toggle-nav').on('click', function(event) {
    console.log('toggle nav clicked');
    $('#sidebar').addClass('show-sidebar');
    $('#sidebar .sidebar-nav').addClass('show-sidebar-nav');
  });
  $('#close-button').on('click', function(event) {
    console.log('close menu clicked');
    $('#sidebar').removeClass('show-sidebar');
    $('#sidebar .sidebar-nav').removeClass('show-sidebar-nav');
  });

  // multi-code blocks
  $('#multi-code').find('pre').each(function() {
    console.log("item: " + this);
  });

  // poor man's scrollspy ;)
  var lastId,
    topMenu = $("#TableOfContents"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top - 15;//-topMenuHeight+100;
      $('html, body').stop().animate({
          scrollTop: offsetTop
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // affix toc]
       var totHeight = $('#header').outerHeight() + $('.article-tagline').outerHeight();
       console.log("totHeight: " + totHeight);
       if ($(this).scrollTop() > $('.article-body').offset().top) {
         $('#TableOfContents').addClass('floating');
       } else {
         $('#TableOfContents').removeClass('floating');
       }
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";

       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href='#"+id+"']").parent().addClass("active");
       }
    });

    // set up tabbed code blocks
    $('.tab-content').find('.tab-pane').each(function(idx, item) {
      var navTabs = $(this).closest('.code-tabs').find('.nav-tabs'),
          title = $(this).attr('title');
      navTabs.append('<li><a href="#">'+title+'</a></li');
    });

    $('.code-tabs ul.nav-tabs').each(function() {
      $(this).find("li:first").addClass('active');
    })

    $('.code-tabs .tab-content').each(function() {
      // $(item).find('tab-pane').addClass('active');
      $(this).find("div:first").addClass('active');
    });

    $('.nav-tabs a').click(function(e){
      e.preventDefault();
      var tab  = $(this).parent(),
          tabIndex = tab.index(),
          tabPanel = $(this).closest('.code-tabs'),
          tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
      tabPanel.find('.active').removeClass('active');
      tab.addClass('active');
      tabPane.addClass('active');
    });
};

$(document).ready(function() {
  init();
});
