// $('#manage-influencer-modal').modal('show');

// Toggle Notification
$('a.notification').click(function(){
    $('.notification-popup').toggleClass('hidden');
});
$('.notification-popup a.close-popup').click(function(){
    $('.notification-popup').addClass('hidden');
});


$('[data-toggle="tooltip"]').tooltip();
$('[data-toggle="datepicker"]').datepicker({
    autoHide: true,
    zIndex: 9999,
    format: 'dd/mm/yyyy'
});

$('#editcampaign-modal .start-date').datepicker({
    autoHide: true,
    zIndex: 9999,
    format: 'dd/mm/yyyy',
});  

// Diabled End date on Edit Popup.
$(document).ready(function(){
    if($('#editcampaign-modal .start-date').val() == "") {
        $('#editcampaign-modal .end-date').prop('disabled', true);
    }
});

// Set Start date on End date.
$('body').on('change', '#editcampaign-modal .start-date', function(){
    $('#editcampaign-modal .end-date').datepicker('destroy');
    startDate = $('#editcampaign-modal .start-date').val();
    $('#editcampaign-modal .end-date').prop('disabled', false);
    $('#editcampaign-modal .end-date').datepicker({
        autoHide: true,
        zIndex: 9999,
        format: 'dd/mm/yyyy',
        startDate: startDate
    });  
})

//Init Select 2
$(document).ready(function() {
    $('.select2').select2({
        tags: true
    });
    $('.campaign-manager-select2').select2({
    });
});

$.each($('.influencer-group'), function(){
    const maxInfluencerShow = 7;
    let influencer = $(this).children('.influencer-avatar');

    if(influencer.length > maxInfluencerShow) {
        let overInfluencer = influencer.length - maxInfluencerShow;
        $(this).addClass('more-influencer');

        $(influencer[maxInfluencerShow]).addClass('more');
        $(influencer[maxInfluencerShow]).attr('data-toggle', 'none');
        $(this).append('<div class="influencer-avatar more"><span>+'+overInfluencer+'</span></div>');
        
        for (i = maxInfluencerShow; i < influencer.length ; i++ ) {
            $(influencer[i]).addClass('hidden');
        }

    }
});

//Apply Click to Hidden Upload File
$('body').on('click', '.upload-file a.upload', function(e) {
    e.preventDefault();
    upload = $(this).closest('.upload-file').find('input');
    upload.click();
})

//Apply File Name
$('body').on('change', 'input[type="file"]', function(e){
    var fileName = e.target.files[0].name;
    var fileSize = e.target.files[0].size;
    var convertSize = 0;
    if(fileSize < 1000000) {
        convertSize = ((fileSize/1000)).toFixed(2);
        newSize = ' ('+convertSize + ' KB)';
    } else {
        convertSize = ((fileSize/1000)/1000).toFixed(2);
        newSize = ' ('+convertSize + ' MB)';
    }
    $(this).closest('.upload-file').find('.filename').text(fileName);
    $(this).closest('.upload-file').find('.filesize').text(newSize);
    $(this).closest('.upload-file').find('.upload').hide();
})

//Add new upload file row
$('.add-upload-file').click(function(e) {
    e.preventDefault();
    $('.upload-file-group').append('<div class="upload-file with-close"><input type="file"><a href="#" class="upload">Select File</a><p class="filename"></p><p class="filesize"></p><a href="#" class="close"><i class="fas fa-times"></i></a></div>')
});

//Remove File row
$('body').on('click', '.with-close a.close', function(e){
    e.preventDefault();
    $(this).closest('.with-close').remove();
});

//Copy timeline
$('.campaign-timeline').on('click', 'a.add-new', function(e){
    e.preventDefault();
    var newElement = $(this).closest('.campaign-timeline').find('.item:first').clone();
    newElement.appendTo('.campaign-timeline .timeline-group').find("input[type='text']").val("");
    $('[data-toggle="datepicker"]').datepicker({
        autoHide: true,
        zIndex: 9999,
        format: 'dd/mm/yyyy'
    });
});

//Copy timeline
$('.influencer-timeline').on('click', 'a.add-new', function(e){
    e.preventDefault();
    var newElement = $(this).closest('.influencer-timeline').find('.item:first').clone();
    newElement.appendTo('.influencer-timeline .timeline-group').find("input[type='text']").val("");
    $('[data-toggle="datepicker"]').datepicker({
        autoHide: true,
        zIndex: 9999,
        format: 'dd/mm/yyyy'
    });
});

//Copy custom API
$('.custom-kpi-group').on('click', 'a.add-custom-kpi', function(e){
    e.preventDefault();
    var dataClass = $(this).attr('data-group');
    var newKPI = $('.'+dataClass+'').find('.custom-kpi-group .item:first').clone();
    newKPI.insertBefore('.'+dataClass+' .add-custom-kpi-group').find("input[type='text']").val("");
});

$('body').on('click', '.custom-kpi-group span.remove', function(e){
    e.preventDefault();
    $(this).parent('.item').remove();
});

//Set Social Status
$.each($('.social-status-group'), function(){
    let facebook = $(this).attr('data-fb');
    let instagram = $(this).attr('data-ig');
    let twitter = $(this).attr('data-tw');
    let youtube = $(this).attr('data-yt');
    let mobile = $(this).attr('data-mb');
    let globe = $(this).attr('data-gb');
    if(facebook == 1) {
        $(this).find('i.fa-facebook-square').addClass('active')
    }
    if(instagram == 1) {
        $(this).find('i.fa-instagram').addClass('active')
    }
    if(twitter == 1) {
        $(this).find('i.fa-twitter').addClass('active')
    }
    if(youtube == 1) {
        $(this).find('i.fa-youtube').addClass('active')
    }
    if(mobile == 1) {
        $(this).find('i.fa-mobile').addClass('active')
    }
    if(globe == 1) {
        $(this).find('i.fa-globe').addClass('active')
    }
});


//Apply Click to Hidden Upload Image (Edit-Campaign)
$('#editcampaign-modal .cover-image-preview, #editcampaign-modal .cover-image-text').click(function(e) {
    e.preventDefault();
    upload = $('#editcampaign-modal .upload-cover-image');
    upload.click();
})

//Apply Image (Edit-Campaign)
$('#editcampaign-modal .upload-cover-image').change(function(e){
    var fileName = e.target.files[0].name;
    var urlFile = URL.createObjectURL(e.target.files[0]);
    // $(this).closest('.upload-file').find('.filename').text(fileName);
    $('.cover-image-preview').css('background-image', 'url(' + urlFile + ')');
})


$('#manage-influencer-modal .modal-footer a.remove, #manage-influencer-modal .remove-section .no').click(function(e){
    e.preventDefault();
    $('#manage-influencer-modal .remove-section').toggleClass('active');
});


//Apply Click to Hidden Upload File
$('body').on('click', '.upload-slip a.upload', function(e) {
    e.preventDefault();
    upload = $(this).closest('.upload-slip').find('input');
    upload.click();
})

//Apply File Name
$('body').on('change', '.upload-slip input[type="file"]', function(e){
    $(this).closest('.upload-slip').find('.view').removeClass('hidden');
})

$('#manage-influencer-modal .payment-method').change(function(){
    var value = $('#manage-influencer-modal .payment-method').val();
    function addClassHidden() {
        var section = $('.payment-setup .upload-slip-section').addClass('hidden');
        if(!$(section).hasClass('hidden').addClass('hidden'));
    }
    if(value == "v5050") { 
        $('.select-status .influ-payment-group').addClass('hidden'); 
        $('.payment-setup .upload-slip-section').addClass('hidden'); 
        $('.payment-setup .group-50-50').removeClass('hidden');
        $('.influ-payment-group.group-50-50').removeClass('hidden');
    }
    if(value == "v3070") { 
        $('.select-status .influ-payment-group').addClass('hidden'); 
        $('.payment-setup .upload-slip-section').addClass('hidden'); 
        $('.payment-setup .group-30-70').removeClass('hidden');
        $('.influ-payment-group.group-30-70').removeClass('hidden');
    }
    if(value == "v100") { 
        $('.select-status .influ-payment-group').addClass('hidden'); 
        $('.payment-setup .upload-slip-section').addClass('hidden'); 
        $('.payment-setup .group-100').removeClass('hidden');
        $('.influ-payment-group.group-100').removeClass('hidden');
    }
    if(value == "vcredit") { 
        $('.select-status .influ-payment-group').addClass('hidden'); 
        $('.payment-setup .upload-slip-section').addClass('hidden'); 
        $('.payment-setup .group-credit').removeClass('hidden');
        $('.influ-payment-group.group-100').removeClass('hidden');
    }

});

//Copy timeline
$('.work-progress-group').on('click', 'a.add-new', function(e){
    e.preventDefault();
    var newElement = $(this).closest('.work-progress-group').find('.item:first').clone();
    newElement.appendTo('.working-group').find("input[type='text']").val("");
});
$('body').on('click', '.work-progress-group .auto-select', function(){
    $(this).select();
});

$(document).ready(function(){
    /* 1. Visualizing things on Hover - See next part for action on click */
    $('#stars li').on('mouseover', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

      // Now highlight all the stars that's not after the current hovered star
      $(this).parent().children('li.star').each(function(e){
        if (e < onStar) {
          $(this).addClass('hover');
        }
        else {
          $(this).removeClass('hover');
        }
      });
      
    }).on('mouseout', function(){
      $(this).parent().children('li.star').each(function(e){
        $(this).removeClass('hover');
      });
    });
    
    
    /* 2. Action to perform on click */
    $('#stars li').on('click', function(){
      var onStar = parseInt($(this).data('value'), 10); // The star currently selected
      var stars = $(this).parent().children('li.star');
      
      for (i = 0; i < stars.length; i++) {
        $(stars[i]).removeClass('selected');
      }
      
      for (i = 0; i < onStar; i++) {
        $(stars[i]).addClass('selected');
      }
      
      // JUST RESPONSE (Not needed)
      var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
      var msg = "";
      if (ratingValue > 1) {
          msg = "Thanks! You rated this " + ratingValue + " stars.";
      }
      else {
          msg = "We will improve ourselves. You rated this " + ratingValue + " stars.";
      }
      responseMessage(msg);
      
    });
    
    
  });
  
  
  function responseMessage(msg) {
    $('.success-box').fadeIn(200);  
    $('.success-box div.text-message').html("<span>" + msg + "</span>");
  }