var bkcore = bkcore || {};
bkcore.Timer = function()
{
	this.time = {
		start: 0,
		current: 0,
		previous: 0,
		elapsed: 0,
		delta: 0
	}

	this.active = false;
}
bkcore.Timer.prototype.start = function()
{
	var now = new Date().getTime();

	this.time.start = now;
	this.time.current = now;
	this.time.previous = now;
	this.time.elapsed = 0;
	this.time.delta = 0;

	this.active = true;
}
bkcore.Timer.prototype.pause = function(bool)
{
	this.active = !bool;
}
bkcore.Timer.prototype.update = function()
{
	if(!this.active) return;

	var now = new Date().getTime();

	this.time.current = now;
	this.time.elapsed = this.time.current - this.time.start;
	this.time.delta = now - this.time.previous;
	this.time.previous = now;
}
bkcore.Timer.prototype.getElapsedTime = function()
{
	return bkcore.Timer.msToTime(this.time.elapsed);
}
bkcore.Timer.msToTime = function(t)
{
	var ms, s, m, h;
	
	ms = t%1000;

	s = Math.floor((t/1000)%60);

	m = Math.floor((t/60000)%60);
	h = Math.floor((t/3600000));

	return {h:h, m:m, s:s, ms:ms};
}
bkcore.Timer.msToTimeString = function(t)
{
	var ms, s, m, h;
	
	ms = t%1000;
	if(ms < 10) ms = "00"+ms;
	else if(ms < 100) ms = "0"+ms;

	s = Math.floor((t/1000)%60);
	if(s < 10) s = "0"+s;

	m = Math.floor((t/60000)%60);
	h = Math.floor((t/3600000));

	return {h:h, m:m, s:s, ms:ms};
}