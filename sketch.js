//Crea las variables llamadas "video" y "classifier"
var video;
var classifier;
// crea la variable label y asignale el texto "Cargando..."
var label = "Cargando...";

function preload() {
  //Asigna a la variable "classifier" la clasificación de imágenes de la librería ml5 
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kAm2D7dNoq/model.json");
}

function setup() {
  createCanvas(640, 480);
  //Crear el vídeo
  video = createCapture(VIDEO);
  //Asigna el tamaño del vídeo
  video.size(640, 240);
  //Esconde el vídeo duplicado
  video.hide();
  //Llama a la función "classifyVideo"
  classifyVideo();
}

//Crear función classifyVideo
function classifyVideo() {
  //Clasifica el vídeo
  classifier.classify(video, gotResult);
}

//Crea la función para obtener los resultados
function gotResult(error, results) {
  //Evalua si existe un error al obtener los resultados
  if (error) {
  console.error(error);  
   return; 
  }
  //Muestra los resultados que tengan un porcentaje de confiabilidad mayor a 65%
  if(results[0].confidence > 0.65){
    label = results[0].label;
  }
  //Llamar a la función "classifyVideo()"
 classifyVideo(); 
}

function draw() {
  background(220);
  //dibujar el vídeo para poder verlo
  push();
  translate(video.width, 0);
  scale(-1,1);
  image(video, 0,0);
  pop();
  //Agregar la etiqueta de clasificación:
  //Tamaño del texto
  textSize(50);
  //Color del texto
  fill("yellow");
  //Texto
  text(label, 250, 80);
}
