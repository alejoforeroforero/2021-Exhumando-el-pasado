class ImgObj
{
	constructor()
	{
		this.parejaId;
		//this.x1 = random(windowWidth/3, windowWidth - windowWidth/3);
		this.audio1;
		this.x1 = 0;
		this.y1 = random(windowHeight/3, windowHeight - windowHeight/3);
		this.x1off = random(windowWidth/3, windowWidth - windowWidth/3);
		this.y1off = random(windowHeight/3, windowHeight - windowHeight/3);
		this.x2 = random(windowWidth/3, windowWidth - windowWidth/3);
		this.y2 = random(windowHeight/3, windowHeight - windowHeight/3);
		this.x2off = random(windowWidth/3, windowWidth - windowWidth/3);
		this.y2off = random(windowHeight/3, windowHeight - windowHeight/3);
		this.srcP1;
		this.srcGP1;
		this.srcP2;
		this.srcGP2;
		this.imgP1 = cE('img', document.body);
		this.imgP1.className = 'collage';
		this.imgP1S = false;
		this.imgP2 = cE('img', document.body);
		this.imgP2.className = 'collage';
		this.imgP2S = false;
		this.timer;
		this.tiempo = random(120, 160);
		this.imgP1Mover = true;
		this.imgP2Mover = true;
		this.parar = true;
	}
	
	pintar()
	{
		var thisObj = this;
		
		this.imgP1.style.left = this.x1 + 'px';
		this.imgP1.style.top = this.y1 + 'px';
		this.imgP1.src = this.srcP1;
		this.imgP1.addEventListener('mouseover', function()
		{
			thisObj.imgP1Mover = false;
			thisObj.ponerAudioCollage();
		});	
		this.imgP1.addEventListener('mouseout', function()
		{
			thisObj.imgP1Mover = true;
			thisObj.quitarAudioCollage();
		});	
		this.imgP1.addEventListener('click', function()
		{			
			thisObj.selecionarImagen1(thisObj.imgP1);			
		});		
		
		this.imgP2.style.left = this.x2 + 'px';
		this.imgP2.style.top = this.y2 + 'px';
		this.imgP2.src = this.srcP2;
		this.imgP2.addEventListener('mouseover', function()
		{
			thisObj.imgP2Mover = false;
			thisObj.ponerAudioCollage();
		});
		this.imgP2.addEventListener('mouseout', function()
		{
			thisObj.imgP2Mover = true;
			thisObj.quitarAudioCollage();
		});	
		this.imgP2.addEventListener('click', function()
		{
			thisObj.selecionarImagen2(thisObj.imgP2);			
		});	
		
		this.timer = window.setInterval(function()
		{			
			thisObj.x1 = map(noise(thisObj.x1off), 0, 1, 0, window.innerWidth);
			thisObj.y1 = map(noise(thisObj.y1off), 0, 1, 0, window.innerHeight);
			thisObj.x2 = map(noise(thisObj.x2off), 0, 1, 0, window.innerWidth);
			thisObj.y2 = map(noise(thisObj.y2off), 0, 1, 0, window.innerHeight);
			
			thisObj.imgP1.style.left = thisObj.x1 + "px";
			thisObj.imgP1.style.top = thisObj.y1 + "px";
			thisObj.imgP2.style.left = thisObj.x2 + "px";
			thisObj.imgP2.style.top = thisObj.y2 + "px";
			
			if(thisObj.imgP1Mover)
			{			
				thisObj.x1off +=  0.008;
				thisObj.y1off +=  0.008;
			}
			
			if(thisObj.imgP2Mover)
			{
				thisObj.x2off +=  0.008;
				thisObj.y2off +=  0.008;
			}
			
		}, thisObj.tiempo);
	}
	
	selecionarImagen1()
	{		
		if(this.imgP1S == false)
		{						
			this.imgP1S = true;	
			this.imgP1.className = 'collageS';
		}
		else
		{			
			this.imgP1S = false;	
			this.imgP1.className = 'collage';
		}
		
		this.agregarALaLista(this.srcP1);	
	}	
	
	selecionarImagen2()
	{		
		if(this.imgP2S == false)
		{			
			this.imgP2S = true;	
			this.imgP2.className = 'collageS';
		}
		else
		{
			this.imgP2S = false;	
			this.imgP2.className = 'collage';
		}
		
		this.agregarALaLista(this.srcP2);	
	}
	
	agregarALaLista(src)
	{
		if(imagenesS.indexOf(src)>=0)
		{
			imagenesS.splice(imagenesS.indexOf(src), 1);
			imagenesObjS.splice(imagenesS.indexOf(src), 1);
		}
		else
		{			
			imagenesS.push(src);
			imagenesObjS.push(this);
			
			if(imagenesS.length > 1)
			{
				this.parar = false;
				mostrarPopup();
			}
		}
	}
	
	ponerAudioCollage()
	{			
		this.audio1.play();	
	}
	
	quitarAudioCollage()
	{
		if(this.parar)
		{
			this.audio1.pause();
		}
	}
}