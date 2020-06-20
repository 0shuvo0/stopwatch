function el(v){ return document.querySelector(v); }
var pg = true, milisecs = 0, secs = 0, mins = 0, hours = 0, tig = false, ss = true, em = false, nm = true;
var stopBtn;
function startTimer(){
	if(pg){
	    setTimeout(function(){
			if(!pg){
				return;
			} 
		    milisecs += 10;
		    if(milisecs >= 100){
			    secs++;
			    milisecs = 0;
			}
			if(secs >= 60){
				mins++;
				secs = 0;
			}
			if(mins >= 60){
				hours++;
				mins = 0;
			}
			var _milisecs  = (milisecs > 9)? milisecs : "0"+milisecs;
			var _secs  = (secs > 9)? secs : "0"+secs;
			var _mins = (mins > 9)? mins : "0"+mins
			var _hours = (hours > 9)? hours : "0"+hours;
			
			el("input.min").value = _mins;
			el("input.sec").value = _secs;
			el("input.mil").value = _milisecs;
		    
		    startTimer();
	    }, 100);
    }else{
    	return;
    }
}

function start(){
	pg = true;
	if(!tig){ startTimer(); }
	tig = true;
	el(".ss").classList = "fas fa-pause ss";
	ss = false;
}
function stop(){
	pg = false;
	tig = false;
	el(".ss").classList = "fas fa-play ss";
	ss = true;
}
function reset(){
	milisecs = 0;    
    secs = 0;
    mins = 0;
    hours = 0;
    el("input.min").value = "";
	el("input.sec").value = "";
	el("input.mil").value = "";
}

function main(){
	el(".ss").addEventListener('click', function(){
		if(ss){
			start();
		}else{
			stop();
		}
	});
	el(".fa-history").addEventListener('click', function(){
		reset();
	});
	el(".em").addEventListener('click', function(){
		if(!em){
			stop();
			el("input.min").focus();
			this.classList = "fas fa-check em";
		}else{
		    mins = el("input.min").value || 0;
			secs = el("input.sec").value || 0;
			milisecs = el("input.mil").value || 0;
			start();
			this.classList = "fas fa-pencil-alt em";
		}
		em = !em
	});
	el(".nm").addEventListener('click', function(){
		if(nm){
			el(".container").classList = "container day";
			this.classList = "fas fa-sun nm";
		}else{
			el(".container").classList = "container";
			this.classList = "fas fa-moon nm";
		}
		nm = !nm;
	});
}
window.onload = main();