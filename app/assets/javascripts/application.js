// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require popper
//= require bootstrap-sprockets
//= require_tree .


var a;
var valid_hack_array=[];
function checkfromgithub(val) {
	var html="";
	valid_hack_array=[];
	if(val.trim()==0){
		//append something
		return;
	}
	//hundredeir
	else{
		$.ajax({
			url : "https://api.github.com/search/issues?q=author%3A"+val+"+type%3Apr",
			dataType : "jsonp",
			success : function ( returndata ) {
				// console.log(returndata.data.items)
				$.each( returndata.data.items, function ( i, item ) {
					if( moment(returndata.data.items[i].created_at).isAfter(moment('01/10/2017','DD/MM/YYYY')) )
						valid_hack_array.push(returndata.data.items[i]);
				html+=	'<div class="col-sm-12">'+returndata.data.items[i].created_at+'</div>'+'<br>'
				});
				$( '#result' ).html(html);
						console.log(valid_hack_array);
			}
		});
	}
}

//function get_watched_repos() 
//{
//   
//  $( '#result' ).html( "" );
//  var html = "<h2>Repos I'm watching</h2>";
//  
  
//  
//}

//}); //close document ready
