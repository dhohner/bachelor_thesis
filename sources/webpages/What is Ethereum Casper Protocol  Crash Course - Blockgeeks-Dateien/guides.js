const guidesActions = {
  init: function init() {
    this.categoryClickAction();
  },

  categoryClickAction : function clickAction() {
    $('.difficult-filter').click((event)=> {
      const element = event.target;
      const category = element.dataset.slug;
      if (typeof category === 'string' && category !== '') {
        this.loadGuidesByCategory(category)
      }
    });
  },

  loadGuidesByCategory : function loadGuidesByCategory(category) {
    $.ajax({
      type:'POST',
      url: ajaxurl,
      data: {
        action: 'getGuidesByCategory',
        category: category,
      },
      success: function(success) {
        $('#difficult-slider').text(success);
      },
      error: function() {

      }

    });
  },
};
$('document').ready(()=>{
  guidesActions.init();
});
