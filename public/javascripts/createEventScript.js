/* Author: Ian (ianH92)
 * Date: January 12th, 2018
 * 
 * Insert the current date into a form to submit it with the POST request.
 */

let hiddenElements = document.getElementsByClassName('hidden');
for(let i = 0; i < hiddenElements.length; i++) {
	hiddenElements[i].style.visibility = 'hidden';
}


let inputCurrDate = document.getElementById('currdate');

inputCurrDate.value = new Date();