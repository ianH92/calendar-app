let hiddenElements = document.getElementsByClassName('hidden');
for(let i = 0; i < hiddenElements.length; i++) {
	hiddenElements[i].style.visibility = 'hidden';
}


let inputCurrDate = document.getElementById('currdate');

inputCurrDate.value = new Date();