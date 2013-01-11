var jq = jQuery;
var startingClass = getUrlVars()["c"];
var currentClass = 0;
var timer;

jq(document).ready(function () {
	setupAside();
	init();
});

function init() {
	if (startingClass == undefined) {
		currentClass = 0;
	} else {
		if (startingClass < jq('.class_date').size()) {
			currentClass = startingClass;
		} else {
			currentClass = 0;
		}
	}
	
	displayNextClass(currentClass);
	timer_start();
}

function displayNextClass(class_id) {
	var currentClassObject = jq('#class_id_'+class_id);
	
	jq('#class_display').empty().append(jq(currentClassObject).html());
	setupClassDisplay();
	jq('article').scrollTop(0);
	jq('.class_date').removeClass('class_active');
	jq(currentClassObject).addClass('class_active');
}
function timer_start() {
	timer = setInterval(timer_action, 30000);
	timer_action();
}
function timer_stop() {
	clearInterval(timer);
}
function timer_action() {
	var date_data = new Date();
	var date_string = '';
	
	// update the current time displayed
	var date_string_minutes = date_data.getMinutes();
	if (date_string_minutes.toString().length < 2) {
		date_string_minutes = '0'+date_data.getMinutes();
	}
	
	if (date_data.getHours() > 12) {
		date_string = date_data.getHours()-12+':'+date_string_minutes+' pm';
	} else {
		date_string = date_data.getHours()+':'+date_string_minutes+' am';
	}
	jq('#current_time').text(date_string);
	
	// check to see if class is over
	/*
	var currentClass_time_end = jq('.class_active').find('.class_end_time').text;
	
	if (currentClass_time_end != undefined) {
		if () {
			
		}
	}
	*/
}

function setupAside() {
	jq('.class_date').each(function (index) {
		jq(this).attr('id', 'class_id_'+index);
	});
	
	jq('.class_date').click(function () {
		displayNextClass(jq(this).attr('id').substr(9));
	});
}

function setupClassDisplay() {
	jq('.section_description li').unbind('click').click(function () {
		jq('.class_section_active').removeClass('class_section_active');
		jq(this).parents('.class_section').addClass('class_section_active');
		
		if (jq(this).hasClass('class_section_item_active')) {
			jq(this).removeClass('class_section_item_active');
		} else {
			jq('.class_section_item_active').removeClass('class_section_item_active');
			jq(this).addClass('class_section_item_active');
		}
	});
}

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	
	for(var i = 0; i < hashes.length; i++)
	{
	hash = hashes[i].split('=');
	vars.push(hash[0]);
	vars[hash[0]] = hash[1];
	}
	return vars;
}