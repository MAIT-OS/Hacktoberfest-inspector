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
var msg;
var html="";

function checkfromgithub(val) {
	msg="";
	valid_hack_array=[];
	if(val.trim()==0){
		msg='Username cant be blank'
		show_msg(msg);
	}
	else{
		$.ajax({
			url : "https://api.github.com/search/issues?q=author%3A"+val+"+type%3Apr",
			dataType : "jsonp",
			success : function ( returndata ) {
				$.each( returndata.data.items, function ( i, item ) {
					if( moment(returndata.data.items[i].created_at).isAfter(moment('01/10/2017','DD/MM/YYYY')) && moment(returndata.data.items[i].created_at).isBefore(moment('1/11/2017','DD/MM/YYYY')))
						valid_hack_array.push(returndata.data.items[i]);
				// html+=	'<div class="col-sm-12">'+returndata.data.items[i].created_at+'</div>'+'<br>'
				});
				show_msg(msg);
				show_results();
				// $( '#result' ).html(html);
				console.log(valid_hack_array);
			}
		});
	}
}
function show_results(){
	c=valid_hack_array.length;
	if(c<1){
		msg="It's not to late to start now :)"
		$( '#result' ).html(valid_hack_array.length+'/4');
		html="";
		return show_msg(msg);
	}
	else if(c>=4){
		msg="Congrats,You Completed Hacktoberfest ^_^ !!!"
		$( '#result' ).html(valid_hack_array.length+'/4');
		return show_msg(msg);
	}
	else if(c<4){
		msg="Good Going ^_^ !"
	}
	html='<div class="request_msg">';
	$( '#result' ).html(valid_hack_array.length+'/4');
	valid_hack_array.forEach(function(item,id) {
		html+="*<a href="+item.html_url+" target='_blank'>"+"Pull Request"+id+"</a><br>"
	});
	html+='</div>'
	console.log(html);
	show_msg(msg);
}

function show_msg(m){
	$('#alert').html(m);
	console.log(html);
	$('#pr_data').html(html);
}

$(document).on('turbolinks:load', function() {
	$('#github_username').keypress(function (e) {
		var key = e.which;
		if(key == 13)
		{
			console.log('hiankush');
			checkfromgithub($(this).val());
		}
	});
});