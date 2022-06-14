//Constantes
const image = document.getElementById("imageid");
const prevbtn = document.getElementById("previd");
const nextbtn = document.getElementById("nextid");
const imgtext = document.getElementById("imgtext");
const indicatorcontainer = document.getElementById("indicators");

//Evento de botones
prevbtn.addEventListener("click", prevImage);
nextbtn.addEventListener("click", nextImage);

let imagesGallerry = [];
//Lamma metodo que lee archivo json de archivo Json
readTextFile("./Images.json",(x) => {
    imagesGallerry = JSON.parse(x);
});
//Funcion que se ejecuta cuando se oprime el boton retroceder
function prevImage() {
    sliderImages(false);
}

//Funcion que se ejecuta cuando se oprime el boron proximo
function nextImage() {
    sliderImages(true);
}

//Animacion en slider cada 3s
setInterval(() => {
    sliderImages(true);        
}, 3000);

//Evento para cuando den click a indicadores
document.addEventListener('click', function (e) {
    let element = e.target;

    if (element && element.classList.contains("dot")) {
       
        let indexS = element.getAttribute("indexSlider");
        let imgsrc = imagesGallerry.items[indexS].img;
        setImageValues(indexS,imgsrc)
    }
});

//Variables de contexto
let isFirst = true, indeximg = 0;

//Funcion para manejar los slider animados y para boton de next and prev
function sliderImages(isNext) {

    if (isFirst) {
        isFirst = false; 
        IndicatorsSlider();
    }
    else {
        indeximg = isNext
            ? getImageIndex() + 1
            : getImageIndex() - 1;
    }

    let imagesarritems= imagesGallerry.items;
    let imagesrc;

    imagesrc = GetImageByIndex(imagesarritems, indeximg) ??
        (isNext
            ? GetImageByIndex(imagesarritems, 0)
            : GetImageByIndex(imagesarritems, imagesarritems.length - 1));

    indeximg = imagesarritems.findIndex(v => v.img == imagesrc)
    
    setImageValues(indeximg, imagesrc);
}

function GetImageByIndex(arr,index = 0){
  return arr[index]?.img ?? null;
}

function getImageIndex(){
  return image.getAttribute("indexImage") 
         ? parseInt(image.getAttribute("indexImage")) 
         : 0;
}

function setImageValues(indeximg,srcimage){
    image.setAttribute("indexImage", indeximg);
    image.src = srcimage;
    
    imgtext.innerHTML = "#"+ (parseInt(indeximg) + 1);

    SetSliderValues(indeximg);
}

function SetSliderValues(indeximg){
    for (const element of indicatorcontainer.childNodes) {
        let sliderindex = element.getAttribute("indexSlider");
        if(sliderindex == indeximg) {
           element.classList.add("active");
        }
        else{
            element.classList.remove("active");
        }
    }
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function IndicatorsSlider() {
    let GalerryLength = imagesGallerry.items.length;

    indicatorcontainer.innerHTML = "";

    for (let n = 0; n < GalerryLength; n++) {

        let spanelement = document.createElement("span");
        spanelement.classList.add("dot");
        spanelement.setAttribute("indexSlider", n);
        indicatorcontainer.appendChild(spanelement);
    }
}


