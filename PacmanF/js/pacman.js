var canvas=document.getElementById("canvas")
var punto=document.getElementById("punto")
var ctx=canvas.getContext("2d")
var come=document.getElementById("come");

//Imagenes
var img=new Image()
img.src="./img/pacman1.png"
img.width=10;
img.height=10;

var estrella=new Image()
estrella.src="./img/estrellas.png"
estrella.width=10
estrella.height=10

var cuadrado=new Image()
cuadrado.src="./img/cuadrado.jpg"
cuadrado.width=10;
cuadrado.height=10;
var pos=0

//audio puntos
var monedas=new Audio()
monedas.src="./audio/come.ogg"

var gano=new Audio()
gano.src="./audio/ganador.mp3"

var ini=new Audio()
ini.src="./audio/inicio.mp3"


go()
//variables movilidad
xmon=0
ymon=0
//variable pacman
var xpac=0
var ypac=0

//fantasmas ubicacion iniciasl en la matiz
var xrec1=8
var yrec1=15

//variables fantasma1 rosa
var xfan1=190
var yfan1=25
var xcol1=18
var ycol1=3

//variables fantasma2
var xfan2=10
var yfan2=125
var xcol2=1
var ycol2=13
//score
var puntaje=0
var bandera1=1
var bandera2=0
var playini=1

function go(e){
	
	setInterval(dibuja,100)
	
}

//funcion que dibuja todos nuestros objetos
function dibuja(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	fantasmas()
	ctx.closePath()
	ecenario()	
	ctx.fillText("puntaje:"+puntaje,250,10,100)
	ctx.fillStyle="white"
	
	
}



function ecenario(){

	

	for(i=0,i=0;i<33;i++)
	{
		for(var x=0;x<15;x++){
			//muros
			if(puntos[x][i]==1){
				ctx.drawImage(cuadrado,0,10,1,1,i*10,x*10,8,8)
			}
			//monedas
			if(puntos[x][i]==-1){
				ctx.drawImage(estrella,E[pos][0],E[pos][1],E[pos][2],E[pos][3],i*10,x*10,E[pos][2]/6,E[pos][3]/5)
			}
			if(puntos[x][i]==5){
				ctx.drawImage(img,M[pos][0],M[pos][1],M[pos][2],M[pos][3],xpac+i*10,ypac+x*10,M[pos][2]/6,M[pos][3]/8)
			}

		}
	}
}

function pacman(){
    ctx.drawImage(img,M[pos][0],M[pos][1],M[pos][2],M[pos][3],xpac,ypac,M[pos][2]/6,M[pos][3]/8)
	ctx.fill()
}

function fantasma1(){
	ctx.drawImage(img,FR[pos][0],FR[pos][1],FR[pos][2],FR[pos][3],xfan1,yfan1,FR[pos][2]/6,FR[pos][3]/6)
	pos=(pos+1)%6
	

	if(bandera2==1){
		xfan2-=10
		xcol2-=1
		if(xfan2==10){
			bandera2=0
		}
	}	
	if(bandera2==0){
		xfan2+=10
		xcol2+=1
		if(xfan2==270){
			bandera2=1
		}
	}	
	if(xcol2*10==xpac && ycol2*10==ypac){
		location.reload()
	}




}
function fantasma2(){
	ctx.drawImage(img,FN[pos][0],FN[pos][1],FN[pos][2],FN[pos][3],xfan2,yfan2,FN[pos][2]/6,FN[pos][3]/6)
	pos=(pos+1)%6

	if(bandera1==1){
		xfan1-=10
		xcol1-=1
		if(xfan1==50){
			bandera1=0
		}
	}	
	if(bandera1==0){
		xfan1+=10
		xcol1+=1
		if(xfan1==190){
			bandera1=1
		}
	}	
	
	if(xcol1*10==xpac && ycol1*10==ypac){
		location.reload()
	}


	
}

//definimos todos los fantasmas
function fantasmas(){
	fantasma2()
	fantasma1()
	
}







//mobilidad
function movimiento(e){

	if(puntos[xmon][ymon]==5){
		ini.play()
	}
	if(puntaje+1==152){
		gano.play()
	}
	if(puntaje+1==153){
		location.reload()
	}
	//flecha izquierda
	if(e.keyCode==37 && xpac>0){
		
		if(puntos[xmon][ymon-1]==-1){
			
			xpac-=10
			ymon-=1
			puntos[xmon][ymon]=0

			monedas.play()
			puntaje+=1
			
		}	
		if(puntos[xmon][ymon-1]==0 ){
			
			xpac-=10
			ymon-=1
			puntos[xmon][ymon]=0


			
			
		}	
		
			
	}
	//flecha derecha
	if(e.keyCode==39 &&  xpac<canvas.width-15 ){
		
		
		if(puntos[xmon][ymon+1]==-1){
			
			ymon+=1
			xpac+=10
			puntos[xmon][ymon]=0
			monedas.play()
			puntaje+=1
		}
		
		if( puntos[xmon][ymon+1]==0){
			
			ymon+=1
			xpac+=10
			puntos[xmon][ymon]=0
			
		}


		
	}
	//fecha arriba
    if(e.keyCode==38  && ypac>0){
		
		if(puntos[xmon-1][ymon]==-1){

			ypac-=10
			xmon-=1
			puntos[xmon][ymon]=0
			monedas.play()
			puntaje+=1
		}
		if( puntos[xmon-1][ymon]==0){

			ypac-=10
			xmon-=1
			puntos[xmon][ymon]=0
			
		}

	}
	
	//flecha abajo
    if(e.keyCode==40 && ypac<canvas.height-15){

		if(puntos[xmon+1][ymon]==-1){

			xmon+=1
			ypac+=10
			puntos[xmon][ymon]=0
			monedas.play()
			puntaje+=1
		}
		
		if( puntos[xmon+1][ymon]==0){

			xmon+=1
			ypac+=10
			puntos[xmon][ymon]=0
			
		}

	}
}















var E=[
	[80,5,33,38],
	[80,5,33,38],
	[80,5,33,38],
	[80,5,33,38],
	[80,5,33,38],
	[80,5,33,38],
]

var M=[
		[00,300,70,110],
		[00,400,70,110],
		[00,500,70,110],
		[00,600,70,110],
		[00,700,70,110],
		[00,800,70,110],
		[00,900,70,110]
]


var FN=[
		[100,0,70,110],
		[100,100,70,110],
		[100,200,70,110],
		[100,300,70,110],
		[100,400,70,110],
		[100,500,70,110],
		[100,600,70,110]
]

var FR=[
		[200,0,70,110],
		[200,100,70,110],
		[200,200,70,110],
		[200,300,70,110],
		[200,400,70,110],
		[200,500,70,110],
		[200,600,70,110]
]



var puntos=[
	[5	,-1 ,-1 ,-1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1],  
	[1	,1  ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,1  ,1], 
	[1	,1  ,-1 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,-1 ,1  ,1  ,1  ,-1 ,-1  ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1  ,-1 ,-1 ,-1 ,1  ,1  ,-1 ,-1 ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,-1 ,1  ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,-1  ,1 ,1  ,1  ,-1 ,1  ,1  ,1  ,-1 ,-1 ,-1 ,-1 ,1  ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,-1 ,-1 ,1  ,1  ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,-1 ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,-1  ,-1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,-1 ,-1 ,-1 ,-1 ,-1 ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,-1  ,-1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1  ,-1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1 ,1  ,1,-1 ,1  ,1], 
	[1	,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,1  ,1  ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,1  ,1  ,-1 ,1  ,1], 
	[1	,1  ,1  ,1  ,-1 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,-1 ,1  ,1], 
	[1	,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,-1 ,1  ,1], 
	[1  ,1  ,1  ,1  ,1, 1  ,1 ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1  ,1], 
];




document.addEventListener("keydown",movimiento,false)	//evento
ctx.addEventListener("click",function(evt){
	estado=1
})






