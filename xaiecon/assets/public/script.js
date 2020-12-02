function status_change(id,value) {
	/* sucess voting */
	var c = document.getElementById(id+'-counter');
	var cnt = c.textContent.split('/');
	var u = document.getElementById(id+'-upvote');
	var d = document.getElementById(id+'-downvote');
	
	var downvotes = 0;
	var upvotes = 0;

	upvotes = cnt[0];
	downvotes = cnt[1];
	
	if(value === 1) {
		// change downvote to upvote
		if(u.className === 'content-upvote'
		&& d.className === 'content-downvote-active') {
			u.className = 'content-upvote-active';
			d.className = 'content-downvote';
			upvotes++;
			downvotes--;
		}
		// remove upvote
		else if(u.className === 'content-upvote-active') {
			u.className = 'content-upvote';
			upvotes--;
		}
		// just add a upvote
		else if(u.className === 'content-upvote') {
			u.className = 'content-upvote-active';
			upvotes++;
		}
	} else if(value === -1) {
		// change upvote to downvote
		if(u.className === 'content-upvote-active'
		&& d.className === 'content-downvote') {
			u.className = 'content-upvote';
			d.className = 'content-downvote-active';
			downvotes++;
			upvotes--;
		}
		// remove downvote
		else if(d.className === 'content-downvote-active') {
			d.className = 'content-downvote';
			downvotes--;
		}
		// just add a downvote
		else if(d.className === 'content-downvote') {
			d.className = 'content-downvote-active';
			downvotes++;
		}
	}
	
	console.log(cnt);
	console.log(downvotes,upvotes);

	str = upvotes+'/'+downvotes;
	c.textContent = str;
}

function vote_post(id,value) {
	var xhr = new XMLHttpRequest();
	var url = '/post/vote/'+id;
	var params = 'value='+value;
	xhr.open('POST',url,true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			status_change(id,value);
		}
	}
	xhr.send(params);
}

function vote_comment(id,value) {
	var xhr = new XMLHttpRequest();
	var url = '/comment/vote/'+cid;
	var params = 'value='+value;
	xhr.open('POST',url,true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			status_change(id,value);
		}
	}
	xhr.send(params);
}

function follow(uid,e) {
	var xhr = new XMLHttpRequest();
	var url;
	var text;
	if(e.value === 'Unfollow') {
		url = '/user/unfollow/'+uid;
		text = 'Follow';
	} else {
		url = '/user/follow/'+uid;
		text = 'Unfollow';
	}
	xhr.open('POST',url,true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			e.value = text;
		}
	}
	xhr.send();
}

function subscribe(bid,e) {
	var xhr = new XMLHttpRequest();
	var url;
	var text;
	if(e.value === 'Unsubscribe') {
		url = '/board/unsubscribe/'+bid;
		text = 'Subscribe';
	} else {
		url = '/board/subscribe/'+bid;
		text = 'Unsubscribe';
	}
	xhr.open('POST',url,true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			e.value = text;
		}
	}
	xhr.send();
}

function reply_comment(idd) {
	var txt = document.getElementById(idd);
	if(txt.style.display == 'none') {
		txt.style.display = 'block';
	} else {
		txt.style.display = 'none';
	}
}

function handle_is_link(checkbox) {
	var txt = document.getElementById('link-text');
	if(checkbox.checked == true) {
		txt.style.display = 'block';
	} else {
		txt.style.display = 'none';
	}
}

function get_title_from_link(link_f) {
	var e = link_f
	var u = document.getElementById('link-text-input');

	// Get title by url
	var xhr = new XMLHttpRequest();

	xhr.open('GET','/post/title_by_url',true);
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	// We dont give a fuck if the server is down, we need to get that title
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			e.value = xhr.responseText;
		}
	}
	xhr.send('url='+u.value);
}

function update_content_time() {
	var list = document.getElementsByClassName('content-datetime');
	var ctime = Math.round((new Date()).getTime()/1000);
	for(var e of list) {
		var otime = parseInt(e.attributes.value.nodeValue);
		var diff = ctime-otime;
		
		// Convert diff to readable
		var text = '';
		
		if(diff <= 60) {
			text = diff+' seconds ago';
		} else if(diff >= 61 && diff <= 60*60) {
			text = Math.floor(diff/60)+' minutes and '+Math.floor(diff%60)+' seconds ago';
		} else if(diff >= (60*60)+1 && diff <= (60*60*24)) {
			text = Math.floor(diff/(60*60))+' hours and '+Math.floor((diff/60)%60)+' minutes ago';
		} else if(diff >= (60*60*24)+1) {
			text = Math.floor(diff/(60*60*24))+' days and '+Math.floor((diff/24)%24)+' hours ago';
		}
		
		e.innerText = text;
	}
}

var source = document.getElementById('link-text')
if(source !== null) {
	source.addEventListener('input',get_title_from_link);
}

// display full image when clicking on image block thing
function full_image() {
	var e = document.getElementById('image-full');
	var s = document.getElementById('smoke-curtain');
	
	e.classList.remove('fucking-die');
	s.classList.remove('fucking-die');
	
	e.style.display = 'block';
	s.style.display = 'block';
	
	e.animationName = 'fade-out';
	s.animationName = 'fade-in';
}

// close image when clicking outside it
window.addEventListener('click', function(m) {
	var e = document.getElementById('image-full');
	var d = document.getElementById('image-full-dispenser');
	var s = document.getElementById('smoke-curtain');
	
	if(!e.contains(m.target) && !d.contains(m.target)) {
		e.classList.add('fucking-die');
		s.classList.add('fucking-die');
	}
});

window.addEventListener('animationend', function(m) {
	var e = document.getElementById('image-full');
	var s = document.getElementById('smoke-curtain');
	
	if(e.classList.contains('fucking-die') && s.classList.contains('fucking-die')) {
		e.style.display = 'none';
		s.style.display = 'none';
	}
});