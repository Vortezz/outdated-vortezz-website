let age = document.getElementById("age");

setInterval(() => {
	time = new Date('2006-07-16T05:31:28+00:00');
	ageNow = (Date.now() - time) / (1000 * 60 * 60 * 24 * 365.25);
	ageNow = ageNow.toFixed(9);
	age.innerHTML = `<span>${ageNow}</span>`
}, 50);