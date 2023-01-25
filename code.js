const imgQuantity = 4
var imgCount = 0
const backgroundStyle = "background-size:contain; background-repeat:repeat; background-position: center;"

window.onload = function(){ 
    SliderImageLoad();
    KropkiSlideraLoad();
    
};
function ShowListMenu(){
    document.body.classList.toggle("nav-droped")
}
function SliderImageLoad(){
    for(let i=0; i<3; i++){
        let j = imgCount-1+i
        let imageBox = document.createElement("div")
        imageBox.classList.add("imageBox")
        imageBox.id="pos"+i
        if(j<0) j=imgQuantity-1;
        else if(j>=imgQuantity) j=0 
        imageBox.addEventListener("click", function(){

        })
        thisBackgroundStyle=backgroundStyle+"left:"+(-100+(i*100))+"%;"
        imageBox.style.cssText = "background:url('media/slider"+j+".jpg');"+thisBackgroundStyle
        document.getElementById("slider-image-placeholder").appendChild(imageBox)
    }
    document.getElementById("slider-image-placeholder").addEventListener("click",function(){
        document.getElementById("slider-full-image").style.display="block";
        document.getElementById("slider-full-image").style.backgroundImage = "url('media/slider"+imgCount+".jpg')"
    })
    
}
function KropkiSlideraLoad(){
    var sliderkropki = document.createElement("div")
    sliderkropki.id="slider-kropki-box"
    var szerokosckropek=1.5*imgQuantity
    sliderkropki.style.width=szerokosckropek+"vw"
    var lewokropki=50-szerokosckropek/2
    sliderkropki.style.left=lewokropki+"%"
    document.getElementById("slider").appendChild(sliderkropki)
    for(let i=0; i<imgQuantity; i++){
        let kropkaslidera = document.createElement("div")
        kropkaslidera.style.width = 100/(1.5*imgQuantity)+"%"
        kropkaslidera.style.left=i*100/imgQuantity+"%"
        kropkaslidera.style.opacity = 0.4;
        kropkaslidera.className="slider-kropka"
        kropkaslidera.id="kropka"+i
        if(i==imgCount) kropkaslidera.style.opacity=0.8
        kropkaslidera.addEventListener("click",function(){
            document.getElementById("kropka"+imgCount).style.opacity = 0.4
            kropkaslidera.style.opacity = 0.8;
            document.getElementById("slider").removeChild(document.getElementById("slider-image-placeholder"))
            var sliderdiv = document.createElement("div")
            sliderdiv.id = "slider-image-placeholder"
            document.getElementById("slider").appendChild(sliderdiv)
            imgCount = i
            SliderImageLoad()
        })
        document.getElementById("slider-kropki-box").appendChild(kropkaslidera)
    }
}
function SliderClick(x){
    document.getElementById("kropka"+imgCount).style.opacity = 0.4;
    var newPosId
    if(x.dataset.way=="left"){
        imgCount--
        if(imgCount<0) imgCount=imgQuantity-1
        var pos1 = document.getElementById("pos1")
        pos1.style.left="100%"
        var pos0 = document.getElementById("pos0")
        pos0.style.left=0
        document.getElementById("slider-image-placeholder").removeChild(document.getElementById("pos2"))
        pos1.id="pos2"
        pos0.id="pos1"
        newPosId = 0;
        addimgnr = -1;
    }
    else if(x.dataset.way=="right"){
        imgCount++
        if(imgCount>=imgQuantity) imgCount=0
        var pos1 = document.getElementById("pos1")
        pos1.style.left="-100%"
        var pos2 = document.getElementById("pos2")
        pos2.style.left=0
        document.getElementById("slider-image-placeholder").removeChild(document.getElementById("pos0"))
        pos1.id="pos0"
        pos2.id="pos1"
        newPosId = 2
        addimgnr = 1;
    }
    var imageBox = document.createElement("div")
    imageBox.classList.add("imageBox")
    imageBox.id="pos"+newPosId
    thisBackgroundStyle=backgroundStyle+"left:"+(-100+(newPosId*100))+"%;"
    var imgNr = imgCount+addimgnr
    if(imgNr<0) imgNr=imgQuantity-1
    else if(imgNr==imgQuantity) imgNr=0 
    imageBox.style.cssText = "background:url('media/slider"+imgNr+".jpg');"+thisBackgroundStyle
    document.getElementById("slider-image-placeholder").appendChild(imageBox)
    document.getElementById("kropka"+imgCount).style.opacity = 0.8
    x.style.pointerEvents="none"
    setTimeout(function(){x.style.pointerEvents="auto"}, 900)
}
