



(function ($) {
  $(document).ready(function () {
    
    generateID()
    choose()
    generateOption()
    selectionOption()
    removeClass()
    uploadImage()
    submit()
    resetButton()
    removeNotification()
    autoRemoveNotification()
    autoDequeue()
    
    var ID
    var way = 0
    var queue = []
    var fullStock = 1
    var speedCloseNoti = 1000
    
	var toBeUploadedImg;
	
	var isReady = 0;
	
	var startTime, endTime;
	startTime = new Date();
	
    function generateID() {
		

		
      var text = $('header span')
      var newID = ''
    
      for(var i = 0; i < 3; i++) {
        newID += Math.floor(Math.random() * 3)
      }
      
      ID = 'ID: 5988' + newID
      text.html(ID)
    }
    
	var userID;
	
	  			userID = window.location.href.split("tic=");  //Please replace tic with the respondent identifier used in your survey.
	userID = userID[1];
		
	//document.getElementById("send").hide();
	  var deleteButton = $('.DeleteButton')
	  deleteButton.hide();
	
    function choose() {
      var li = $('.ways li')
      var section = $('.sections section')
      var index = 10
      li.on('click', function () {
        index = $(this).index()
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
        
        section.siblings().removeClass('active')
        section.eq(index).addClass('active')
        if(!way) {
          way = 1
        }  else {
          way = 0
        }
      })
    }
    
    function generateOption() {
      var select = $('select option')
      var selectAdd = $('.select-option .option')
      $.each(select, function (i, val) {
          $('.select-option .option').append('<div rel="'+ $(val).val() +'">'+ $(val).html() +'</div>')
      })
    }
    
    function selectionOption() {
      var select = $('.select-option .head')
      var option = $('.select-option .option div')
    
      select.on('click', function (event) {
        event.stopPropagation()
        $('.select-option').addClass('active')
      })
      
      option.on('click', function () {
        var value = $(this).attr('rel')
        $('.select-option').removeClass('active')  
        select.html(value)
    
        $('select#category').val(value)
      })
    }
    
    function removeClass() {
      $('body').on('click', function () { 
        $('.select-option').removeClass('active')   
      })                  
    }
    
	var Uploader;
	
    function uploadImage() {
			
      var button = $('.images .pic')
      var uploader = $('<input type="file" accept="image/*"/>')
      var images = $('.images')
	  var orientedImage = $('.images')
      
	  Uploader = uploader;
	  
      button.on('click', function () {
        uploader.click()
      })
      
      //uploader.on('change', function () {
	  uploader.on('change', function () {

		   
		   //CHECK TYPE
		   
		   var wrong = 1;
		   var tooBig = 0;
		   
		   if (uploader[0].files[0].size > 20000000) 
		   {
			   tooBig = 1;
		   }
		   
		   //console.log(uploader.value);
		   
		   var fileName = uploader[0].files[0].name;
        var fileExtension = "";
        if (fileName.lastIndexOf(".") > 0) {
            fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
        }
        if (fileExtension.toLowerCase() == "jpg") {
            wrong = 0;
        }
		if (fileExtension.toLowerCase() == "jpeg") {
            wrong = 0;
        }
        if (fileExtension.toLowerCase() == "png") {
            wrong = 0;
        }
		if (fileExtension.toLowerCase() == "bmp") {
            wrong = 0;
        }
		if (fileExtension.toLowerCase() == "tiff") {
            wrong = 0;
        }
		if (fileExtension.toLowerCase() == "tif") {
            wrong = 0;
        }
		if (fileExtension.toLowerCase() == "raw") {
            wrong = 0;
        }
		if ( wrong == 1 )
		{
	            alert("No image was recognized. Please select one of the following file types: jpg, jpeg, png, bmp, tiff, raw.");
		}
		else if ( tooBig == 1)
		{
			alert("The selected image must not exceed 20MB. Please select another image.");
		}
		else
		{
		  button.hide();
		  deleteButton.show();
		  isReady = 1;
		  document.getElementById("NotificationText").innerHTML = "<center>To upload the picture, click on Next</center>";
		  document.getElementById("send").innerHTML = "Next";

		  
          var reader = new FileReader()
          reader.onload = function(event) {			 		  
            images.prepend('<div class="img" id="preview" style="background-image" rel="'+ event.target.result  +'"></div>')


		  //
		  loadImage(
        		event.target.result,
        		function (img) {
				   document.getElementById("preview").appendChild(img);


        },
        {
			orientation: true,
			maxWidth: 600,
        maxHeight: 300,
        minWidth: 100,
        minHeight: 50,
        canvas: true
		} // Options
    );
		}
		//CHECK TYPE END
		  

		//  


          }
		  

		  
		  
         if (wrong == 0 && tooBig == 0) reader.readAsDataURL(uploader[0].files[0])
  
  		toBeUploadedImg = uploader[0].files[0];		
		
		
       })
      
    
    }
    
    function submit() {  
      var button = $('#send')
      	  
      button.on('click', function () {
		  

		  
        if(!way) {
		
          var title = $('#title')
          var cate  = $('#category')
          var images = $('.images .img')
          var imageArr = []

          
          for(var i = 0; i < images.length; i++) {
            imageArr.push({url: $(images[i]).attr('rel')})
          }
          
          var newStock = {
            title: title.val(),
            category: cate.val(),
            images: imageArr,
            type: 1
          }
          
          saveToQueue(newStock)
        } else {
          // discussion
          var topic = $('#topic')
          var message = $('#msg')
          
          var newStock = {
            title: topic.val(),
            message: message.val(),
            type: 2
          }
          
          saveToQueue(newStock)
        }
      })
    }
    
    function removeNotification() {
      var close = $('.notification')
      close.on('click', 'span', function () {
        var parent = $(this).parent()
        parent.fadeOut(300)
        setTimeout(function() {
          parent.remove()
        }, 300)
      })
    }
    
    function autoRemoveNotification() {
      setInterval(function() {
        var notification = $('.notification')
        var notiPage = $(notification).children('.btn')
        var noti = $(notiPage[0])
        
        setTimeout(function () {
          setTimeout(function () {
           noti.remove()
          }, speedCloseNoti)
          noti.fadeOut(speedCloseNoti)
        }, speedCloseNoti)
      }, speedCloseNoti)
    }
    
    function autoDequeue() {
      var notification = $('.notification')
      var text
      
      setInterval(function () {

          if(queue.length > 0) {
            if(queue[0].type == 2) {
              text = ' Your discusstion is sent'
            } else {
              text = ' Your order is allowed.'
            }
            
            notification.append('<div class="success btn"><p><strong>Success:</strong>'+ text +'</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>')
            queue.splice(0, 1)
            
          }  
      }, 10000)
    }
    
    function resetButton() {
      var resetbtn = $('#reset')
      resetbtn.on('click', function () {
        reset()
      })
    }
    
    // helpers
    function saveToQueue(stock) {
      var notification = $('.notification')
      var check = 1
      
      if(queue.length <= fullStock) {
        if(stock.type == 2) {
            if(!stock.title || !stock.message) {
              check = 0
            }
        } else {
          if(!stock.title || !stock.category || stock.images == 0) {
            check = 0
          }
        }
        
        if(check = 0) {
          //notification.append('<div class="error btn"><p><strong>Error:</strong> Please fill in the form524524.</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>')
        } else {
          //notification.append('<div class="success btn"><p><strong>Success:</strong> '+ ID +' is submitted.</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>')
          queue.push(stock);
          //reset();
		  
		  
		  
var currentUrl = window.location.href.split("?");

var urlChunks = currentUrl.toString().split('/');

var currentQuestion = urlChunks[urlChunks.length - 1].split('.');		  
		  
		  		  
		 const formData = new FormData();

		formData.append('fileToUpload', toBeUploadedImg);

  const url = 'upload.php?tic=' + userID + '&que=' + currentQuestion[0];
  const request = new Request(url, {
    method: 'POST',
    body: formData,
	mode: 'same-origin'
  });

  fetch(request).then(function(response1) {

//TIME

endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;
  const formData2 = new FormData();
  const url2 = 'SaveTime.php?tic=' + userID + '&que=' + currentQuestion[0] + '&tim=' + timeDiff;
  const request2 = new Request(url2, {
    method: 'POST',
    body: formData2
  });

  fetch(request2).then(function(response2) {
  
  
  //END
  

// Please do not forget to add an respondent identifier to the URLs of the respondents gallery uploads for identifying respondents. 
// Please replace localhost with your server address for storing the photos.
// Please be aware that tic might be named differently in your survey (see above)


		if (isReady == 0)
	  	{
			
			if (currentUrl[0] == "https://localhost/SImage/Upload_Gallery.html") window.location.href = "Upload_Gallery.html?typ=" + "&tic=" + userID;
		
		}
		else
		{
			
			if (currentUrl[0] == "https://localhost/SImage/Upload_Gallery.html") window.location.href = "Upload_Gallery.html?typ=" + "&tic=" + userID;
			
			}
			
			
			
  });
    });
		  
		  //fetch('upload.php', options);
		  
		  
		  
        }
      } else {
        //notification.append('<div class="error btn"><p><strong>Error:</strong> Please waiting a queue.</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>')
      } 
    }
    function reset() {
      
      $('#title').val('')
      $('.select-option .head').html('Category')
      $('select#category').val('')
      
      var images = $('.images .img')
      for(var i = 0; i < images.length; i++) {
        $(images)[i].remove()
      }
      	  
	Uploader.prop("value", "");	  
	   
	  var button = $('.images .pic')
	  button.show();
	  deleteButton.hide();
	  document.getElementById("NotificationText").innerHTML = "<center>To select an image, click on the folder icon.</center>";
	  document.getElementById("send").innerHTML = "Next";
	  isReady = 0;
	  
      var topic = $('#topic').val('')
      var message = $('#msg').val('')
    }
  })
  
  
  




  
  
})(jQuery)

