$(document).ready(function() {
  //add a div for each contact with delete, edit, and add num buttons
  var display_contacts = function(contacts){
  	console.log(contacts);
	  var info, num, del, edit, add_num, full_contact, create;
	  var div = $('<div>')

	  for(var i = 0; i < contacts.length; i++) {
        full_contact = $('<div>').addClass("full-contact");
	    full_contact
            .append($('<p>')
            .addClass("contact")
            .text("Name:  "));
        full_contact
            .append($('<p>')
            .addClass("update")
            .addClass('name-field')
            .text(contacts[i].first_name + " " + contacts[i].last_name));;
        full_contact
            .append($('<p>')
            .text("Email:  "));
        full_contact
            .append($('<p>')
            .addClass("update")
            .addClass('email-field')
            .text(contacts[i].email));

	    for(var n = 0; n < contacts[i].numbers.length; n++){
	    	num = $('<p>').text(contacts[i].numbers['type'] + ":  " + contacts[i].numbers[n] + '\n');
	    	full_contact.append(num);
	    }
	    del = $('<button>').addClass("delete").data('id', contacts[i].id).text("delete");    
	    edit = $('<button>').addClass("edit").data('id', contacts[i].id).text("edit");
	    add_num = $('<button>').addClass("add-num").data('id', contacts[i].id).text("add number");
	    full_contact.append(del);
	    full_contact.append(edit);
	    full_contact.append(add_num);
	    div.append(full_contact);
	  }
	  $("#container").empty();
	  $(div).appendTo("#container");
	}


  $('#container').on('click', '.delete', function(){
  	console.log("WTF");
    console.log($(this).data('id'));

    $.ajax({
    	url: 'contacts/' + $(this).data('id'),
    	type: 'DELETE',
    	success: function() {
    		load_contacts();
    	},
    	complete: function() {
    	console.log("I tried")
    }
    });
  });

$('#container').on('click', '.edit', function(e){
    e.stopPropagation();
    var $contact = $(this);
    $contact.text('save');
    $contact.addClass('save');
    $contact.siblings('.update').attr("contenteditable", true).addClass('selected');
    $('body').on('click', function() {
        console.log("clicked my body");
        $('.update').on('click', function(e) {
          e.stopPropagation();
        });
    confirm("would you like to save changes?");
    $contact.siblings('.update').removeAttr('contenteditable').removeClass('selected');
    });
});

$('#container').on('click', '.save', function(e){
    var $contact = $(this);
    e.stopPropagation();
    var id = $(this).data('id');
    var full_name = $contact.siblings('.name-field').text().split(" ");
    var email = $contact.siblings('.email-field').text();
    var data =  { 'first_name': full_name[0], 'last_name': full_name[1], 'email': email}
    //get changed data from fields, send_update_data, revert button back to edit
    $contact.siblings('.update').removeAttr('contenteditable').removeClass('selected');
    $(this).text('edit');
    $(this).removeClass('save');
    send_update_data(data, id)
});

var send_update_data = function(data, id) {
    data = JSON.stringify(data);
    $.ajax({
        url: 'contacts/' + id,
        type: 'PUT',
        dataType: 'json',
        data: data,
        success: function() {
            console.log("send_update_data success");
            load_contacts();
        },
        complete: function() {
        console.log("I tried")
    }
    });
}
	// display_contacts();

	$('#search').submit(function(event) {
		console.log("searching");
    event.preventDefault();

    var value = {};
    $.each($('#search').serializeArray(), function(i, field) {
    	value[field.name] = field.value;
    });

    console.log(value);
    load_contacts(value);
	});

	$('#create').submit(function(event) {
		event.preventDefault();
		var values = {};
		$.each($('#create').serializeArray(), function(i, field) {
			values[field.name] = field.value;
		});
		console.log("sending ajax request");
    $.ajax({
    	type: "POST",
    	url: 'contacts/new',
    	dataType: 'json',
    	data: JSON.stringify(values),
    	complete: function(q) {  //Should be success, returning 200 but still not hitting
    		console.log(q)
    		console.log("YAY");
    		load_contacts();
    		$('#create')[0].reset();
    	}
    	});
	});

	var load_contacts = function(query) {
		  $.getJSON('/contacts', query, function(data) {
	  	console.log("loading")
    	console.log("getting json for load contacts");
    	console.log(data);
    	display_contacts(data);
    });
	}
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
