//script-for sticky-nav
		
$(document).ready(function() {
	 var navoffeset=$(".header-main").offset().top;
	 $(window).scroll(function(){
		var scrollpos=$(window).scrollTop(); 
		if(scrollpos >=navoffeset){
			$(".header-main").addClass("fixed");
		} else {
			$(".header-main").removeClass("fixed");
		}
	 });	 
	 $('#nivo-lightbox-demo a').nivoLightbox({ effect: 'fade' });


   $('.close1').on('click', function(c){
      $('.cart-header').fadeOut('slow', function(c){
        $('.cart-header').remove();
      });      
    });

    $('.close2').on('click', function(c){
      $('.cart-header2').fadeOut('slow', function(c){
        $('.cart-header2').remove();
      });
    }); 

});

//script for slide bar menu 
var toggle = true;
            
$(".sidebar-icon").click(function() {                
  if (toggle)
  {
    $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
    $("#menu span").css({"position":"absolute"});
  }
  else
  {
    $(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
    setTimeout(function() {
      $("#menu span").css({"position":"relative"});
    }, 400);
  }               
  toggle = !toggle;
});

//script for animate the search bar
$(function () {
  var searchForm = $('#search-form');
  var searchField = $('#query');
  var icon = $('#search-btn');

  //Focus Handler
  /*$(searchField).on('focus',function(){ 
    $(this).animate({
      width:'150%'
    }, 400);
    $(icon).animate({
      right: '-50px'
    }, 400);
  });

  //Blur Event Handler
  $(searchField).on('blur', function(){
    if (searchField.val() == ''){
      $(searchField).animate({
        width:'100%'
      },400,function(){});
      $(icon).animate({
        right:'50px'
      },400,function(){});
    }
  });*/

  $('#search-form').submit(function(e){
    e.preventDefault();
  });
});



//order list process

var count = 1;
var countClick=0;

function init(i){
  var btnDone = $('#btnDone'+i);
  var btnEdit = $('#btnEdit'+i);
  var btnDelete = $('#btnDelete'+i);
  var orderForm = $('#order-item-form'+i);
  var orderInfo = $('#order-item-info'+i);
  var orderItem = $('#order-item'+i); 

  $(btnDone).hide();
  $(orderForm).hide();
  $(btnEdit).on('click', function(){
    $(orderInfo).hide();
    getOrderInfo(i);
    $(btnDone).show();
    $(btnEdit).hide();
  });

  $(btnDone).on('click', function(){
    $(orderForm).hide();
    getOrderForm(i);
    $(btnDone).hide();
    $(btnEdit).show();
  });

  $(btnDelete).on('click',function() {
    $('#order-item'+i).hide(1000);
  });
}


$(function () {

  init(0);

  /*for (var i=0; i<count; i++) {
    
  }*/
  
  $('#btnDeleteAll').on('click', function(){
    $('.order-item').hide(1000);
  });

  $('#btnAdd').on('click', function(){
    //countClick++;
    //if (countClick%2==0)
      addOrder(count);
  });


});

function getOrderInfo(i) {
  var color = $('#itemColor' + i).val();
  var size = $('#itemSize' + i).val();
  var quantity = $('#itemQuantity' + i).val();
  var id = $('#itemID' + i).val();

  $('#searchID' + i).text(id);
  $('#selectSize select' + i).val(size);
  $('#selectColor select' + i).val(color);
  $('#quantity' + i).text(quantity);

  $('#order-item-form' + i).show(1000);
}

function getOrderForm(i) {
  var color = $('#selectColor' + i).val();
  var size = $('#selectSize'+ i).val();
  var quantity = $('#quantity' + i).text();
  var id = $('#searchID' + i).text();


  $('#itemID' + i).text(id);
  $('#itemSize' + i).text(size);
  $('#itemColor' +i).text(color);
  $('#itemQuantity'+ i).text(quantity);

  $('#order-item-info' + i).show(1000);
}

function addOrder(i) {
  var string = '<div class="col-md-12">'+
    '<div id="order-item'+ i +'" class="order-item">'+  
       '<div id="order-item-info'+i+'" class="order-item-info">'+
          '<div class="col-md-6">'+
            '<p><strong>Order ID: </strong>#123456</p>'+
          '</div>'+
          '<div class="col-md-6">'+
          '<p><strong>Product ID: </strong> <span id="itemID'+i+'">#12345</span></p>'+
        '</div>'+
        '<div class="col-md-4">'+
        '<p><strong>Size: </strong> <span id="itemSize'+i+'">S</span></p>'+
        '</div>'+
        '<div class="col-md-4">'+
        '<p><strong>Color: </strong><span id="itemColor'+i+'">Blue</span></p>'+
        '</div>'+
        '<div class="col-md-4">'+
        '<p><strong>Quantity: </strong><span id="itemQuantity'+i+'">1</span></p>'+
        '</div>'+
         '</div>'+
         '<div id="order-item-form'+i+'" class="order-item-form">'+
            '<div class="col-md-5">'+
              '<p><strong>Order ID: </strong>#123456</p>'+
            '</div>'+
            '<form>'+
            '<div class="col-md-7 order-margin-down">'+
              '<div class="col-md-4">'+
          '<label for="searchID'+i+'">Product ID</label>'+
          '</div>'+
          '<div class="col-md-8">'+
            '<input id="searchID'+i+'" name="searchID'+i+'" type="search" placeholder="Search..." class="form-control input-md">'+
          '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
          '<label for="selectSize'+i+'">Select Size</label>'+
            '<div>'+
              '<select id="selectSize'+i+'" name="selectSize'+i+'" class="form-control">'+
                '<option value="S">S</option>'+
                '<option value="XS">XS</option>'+
                '<option value="M">M</option>'+
                '<option value="L">L</option>'+
                '<option value="XL">XL</option>'+
                '<option value="XXL">XXL</option>'+
              '</select>'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
          '<label for="selectColor'+i+'">Select Color</label>'+
            '<div>'+
              '<select id="selectColor'+i+'" name="selectColor'+i+'" class="form-control">'+
                '<option value="Blue">Blue</option>'+
                '<option value="Red">Red</option>'+
                '<option value="Green">Green</option>'+
                '<option value="Yellow">Yellow</option>'+
                '<option value="Pink">Pink</option>'+
              '</select>'+
            '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
          '<label for="quantity'+i+'">Quantity</label>'+
          '<div>'+
              '<input id="quantity'+i+'" name="quantity'+i+'" type="text" placeholder="Input number" class="form-control input-md">'+
          '</div>'+
        '</div>'+
        '</form>'+
         '</div>'+
       '<div class="clearfix"></div>'+            
       '<div class="btn-order-edit">'+
         '<button id="btnDone'+i+'" type="button" class="btn btn-success">Done</button>'+
         '<button id="btnEdit'+i+'" type="button" class="btn btn-success">Edit</button>'+
         '<button id="btnDelete'+i+'" type="button" class="btn btn-danger">Delete</button>'+
       '</div>'+
    '</div>'+
  '</div>';

  $('#list').append(string);
  init(count);

  count++;
}






		
