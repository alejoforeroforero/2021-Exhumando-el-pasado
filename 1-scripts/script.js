
var nParejas = 10;
var imagenesObj = [];
var imagenesS = [];
var imagenesObjS = [];
var hizoMatch = false;

var audioCentro;
var audio1;
var audio2;
var divPopup;
var divPopupImg;
var imgObjS1;
var imgObjS2;
var aC;

function construirPc()
{
	var divTextoEntrada = cE("div", document.body);
	divTextoEntrada.id = "divTextoEntrada";
	divTextoEntrada.innerHTML = "Los recuerdos están fragmentados, son fichas de rompecabezas y cuando se juntan se desvanecen, como cuando cerramos los ojos e intentamos atrapar pensamientos completos del pasado… o ¿No será quizás que creamos otro recuerdo? nuestro recuerdo que se alimenta de los fragmentos…y de repente florece una nueva memoria del pasado…que transforme el recuerdo…lo difumina…lo falsea para el beneficio de nuestra mente. <br><br> Recorre, busca, selecciona (hacer clic), escucha, junta y atrapa el recuerdo.";	
	
	var divEntrar = cE('div', document.body);
	divEntrar.id = 'divEntrar';
	divEntrar.innerHTML = 'Entrar';
	divEntrar.addEventListener('click', function()
	{
		aC =  new (window.AudioContext || window.webkitAudioContext)();
		divTextoEntrada.style.display = "none";
		divEntrar.style.display = 'none';
		openFullscreen(document.body);		
	});
}

function openFullscreen(elem)
 {
	if(elem.requestFullscreen) 
	{
		elem.requestFullscreen();
	} 
	else if(elem.webkitRequestFullscreen) 
	{ // Safari 
		elem.webkitRequestFullscreen();
	} 
	else if(elem.msRequestFullscreen) 
	{ //
		elem.msRequestFullscreen();
	}
	
	window.setTimeout(function()
	{
		construirContenedores();
	}, 1500);
}

function construirContenedores()
{	
	divPopup = cE('div', document.body);
	divPopup.id = 'divPopup';
	
	var x = cE("div", divPopup);
	x.innerHTML = "X";
	x.className = "x";
	x.addEventListener("click", function()
	{
		if(!hizoMatch)
		{
			imgObjS1.audio1.pause();
			imgObjS2.audio1.pause();
			
			imgObjS1.parar = true;
			imgObjS2.parar = true;
		}
		else
		{
			imgObjS1.audio1.pause();
		}
		
		divPopup.style.display = "none";
	});
	
	divPopupImg = cE('div', divPopup);
	divPopupImg.id = 'divPopupImg';
	
	ponerCollage();
};

function ponerCollage()
{	
	for(var i=1; i<=nParejas; i++)
	{		
		var imgObj = new ImgObj();
		imgObj.parejaId = i;
		imgObj.srcP1 = '2-imagenes/' + i + 'a.png';
		imgObj.srcGP1 = '2-imagenes/' + i + 'ag.png';
		imgObj.srcP2 = '2-imagenes/' + i + 'b.png';
		imgObj.srcGP2 = '2-imagenes/' + i + 'bg.png';
				
		imgObj.audio1 = new Audio();
		imgObj.audio1.loop = true;
		imgObj.audio1.src = "3-audio/" + i + ".mp3";
		imgObj.source1 = aC.createMediaElementSource(imgObj.audio1);
		imgObj.source1.connect(aC.destination);	
		imgObj.panNode = aC.createStereoPanner();	
		imgObj.source1.connect(imgObj.panNode);
		imgObj.panNode.connect(aC.destination);		
		imgObj.pintar();
		
		imagenesObj.push(imgObj);
	}
}

function mostrarPopup()
{
	divPopup.style.display = "block";
	divPopupImg.innerHTML ="";
	
	imgObjS1 = imagenesObjS[0];
	imgObjS2 = imagenesObjS[1];
			
	if(imgObjS1.parejaId == imgObjS2.parejaId)
	{
		hizoMatch = true;
		
		document.body.removeChild(imgObjS1.imgP1);
		document.body.removeChild(imgObjS1.imgP2);	
		
		imgObjS1.panNode.pan.value = 0;
		imgObjS1.audio1.currentTime = 0;
		imgObjS1.audio1.play();		
	}
	else
	{		
		imgObjS1.panNode.pan.value = 1;
		imgObjS2.panNode.pan.value = -1;
		
		imgObjS1.audio1.currentTime = 0;
		imgObjS2.audio1.currentTime = 0;
		
		imgObjS1.audio1.play();
		imgObjS2.audio1.play();	
		
		hizoMatch = false;	
	}
	
	if(hizoMatch)
	{
		var img = cE('img', divPopupImg);
		img.className = 'imgPopup';
		img.src = "2-imagenes/"+imgObjS1.parejaId + ".jpg";
	}
	else
	{
		imgObjS1.imgP1.className = "collage";
		imgObjS1.imgP2.className = "collage";
		imgObjS2.imgP1.className = "collage";
		imgObjS2.imgP2.className = "collage";
				
		if(imgObjS1.imgP1S)
		{
			var src = imgObjS1.srcGP1;
			imgObjS1.imgP1S = false;
		}
		else
		{
			var src = imgObjS1.srcGP2;
			imgObjS1.imgP2S = false;
		}
		
		var img = cE('img', divPopupImg);
		img.className = 'imgPopup1' ;
		img.src = src;	
		
		if(imgObjS2.imgP1S)
		{
			var src = imgObjS2.srcGP1;
			imgObjS2.imgP1S = false;
		}
		else
		{
			var src = imgObjS2.srcGP2;
			imgObjS2.imgP2S = false;
		}
		
		var img = cE('img', divPopupImg);
		img.className = 'imgPopup2'
		img.src = src;		
	}
	
	imagenesObj = [];
	imagenesS = [];
	imagenesObjS = [];
}

function preload() 
{	
	
}

function setup() 
{

}

function draw()
{
	background(0);	
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}