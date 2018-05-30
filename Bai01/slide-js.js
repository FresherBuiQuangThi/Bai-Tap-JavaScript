var slides = document.getElementsByClassName("mySlides");
var dots = document.getElementsByClassName("dot");

//slide start
var slideIndex = 1; 
//time run slide auto (second)
var TIME_AUTO_SEC = 6;

//show slide
showSlides(); 
//auto run 
setInterval(function()
{
	showSlides(slideIndex += 1);
}, TIME_AUTO_SEC*1000);

/**
 * Callback ShowSlides with param for next and prev button
 * @param {num slide to plus}
 *
 */
function plusSlides(n){
	showSlides(slideIndex += n);
	console.log("Run");
}

/**
 * Callback ShowSlide with param for chose slide to show
 * @param {slide Index}
 *
 */
function currentSlide(n){
	showSlides(slideIndex = n);
}

/**
 * Function main to show slide 
 * @param n
 *
 */
function showSlides(n){
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}

	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
		dots[i].classList.remove("active"); 
	}
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].classList.add("active");
}