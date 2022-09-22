const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const heightTheory = 300
let thetaxy = 0
let thetaxyrefr = -Math.PI/2
let thetaxyrefr2 = Math.PI/2
let thetabec = 0
let thetaxy2 = -Math.PI/2
let grade = 0
let grade2 = 0
let graderefr = 0
let graderefr2 = 0
const xbi = 50
const xbf = 445
const yb = 375 + heightTheory
const heightBase = 15
const centerbase = (xbf - xbi) / 2 + xbi
let imgX = 30
let imgY = 200 +heightTheory
let xLight = imgX +20
let yLight =imgY //+20
const steps = 20
let active = false
let light = false
let info = false
const imgblur1 = document.getElementById('blur1')
const imgblur2 = document.getElementById('blur2')
const btntoggle = document.querySelector('.toggle')
btntoggle.addEventListener('click', () => {
    btntoggle.classList.toggle('active')
    if (!active) {
        imgblur1.style.display = 'none'
        imgblur2.style.display = 'block'
       
    } else {
      imgblur1.style.display = 'block'
      imgblur2.style.display = 'none' 
    }
    active = !active 
})

let sourceArray = []
let lineArray = []
let change = false

const bec = new Image()
bec.src = './img/becTransp.png'
function drawbec() {
ctx.shadowBlur = 0;
ctx.drawImage(bec, imgX, imgY, 40, 40)
}
function drawNorm(x,y) {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.setLineDash([15, 5]);
    ctx.moveTo(x, y)
    ctx.lineTo(x, heightTheory + 15)
    ctx.stroke()
}
function angle() {
    ctx.font = "20px Georgia";
    ctx.shadowBlur = 0
    ctx.fillText('i: ' + grade, centerbase - 90, yb +30)
    ctx.fillText('r: ' + grade2, centerbase + 30, yb +30)
    if (grade === grade2) {
        ctx.shadowBlur = 5
       ctx.fillText('= ', centerbase -3, yb +30) 
    }  
}

function drawAngle(x,y,a1,a2) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.35;
    ctx.arc(x, y, 50, a1, a2);
    ctx.closePath();  
    ctx.fill();
    ctx.restore();
    
}
function ir(xi, yi, xr, yr) {
    ctx.fillStyle = "red";
    ctx.font = "20px Georgia";
    ctx.fillText('i ', xi, yi)
    ctx.fillText('r ', xr , yr)
}

ctx.strokeStyle = 'green'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(550, 250, 200, Math.PI, 1.5 * Math.PI)
    ctx.stroke()
    const circleStart = ctx.getImageData(300, 0, 560,300)
   

const mouse = {
    x: null,
    y: null,
    clickX: null,
    clickY: null,
}
window.addEventListener('mousemove', function(e) {
    mouse.x = e.x
    mouse.y = e.y
    
})
window.addEventListener('load', function () {

window.addEventListener('click', function(e) {
    mouse.clickX = e.x
    mouse.clickY = e.y
    if (mouse.clickX < canvas.width / 2 && mouse.clickY > heightTheory) {
        change = true 
        thetaxy2 = -Math.PI / 2
    }
   
}) 
    function drawBase() {   //linia baza rosie
        ctx.strokeStyle = '#0f0'
        ctx.shadowBlur = 0;
        ctx.beginPath(); 
        ctx.setLineDash([]);
        ctx.moveTo(xbi, yb);  
        ctx.lineTo(xbf, yb);
        ctx.lineWidth = heightBase 
        ctx.stroke();
    }

    class Bec {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.angle = 0
        }
        draw() {
            ctx.shadowBlur = 0;
            
            ctx.fillStyle = 'red'
            ctx.beginPath()
           
            ctx.save()
             ctx.translate(this.x, this.y)
            ctx.rotate(this.angle)
            ctx.drawImage(bec, 0, 0, 40, 40)
            ctx.restore()        
        }
        update() {
            this.x = imgX +15 + imgX*16/100  
            this.y = imgY - 28
            let dx = this.x - centerbase  
            let dy =this.y - yb +6   
            let theta = Math.atan2(dy, dx)
              this.angle =Math.PI +theta    
            thetabec = (theta * 180 / Math.PI + 360) % 360
            
        }
    }
    const lighter = new Bec(imgX, imgY)
  
    class SourceLight {
        constructor(x,y) {
        this.x = x
        this.y = y
        this.size = 4
        this.color = '#444'    

         }
        draw() {
        ctx.fillStyle = this.color
        ctx.shadowBlur = 0;
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
         ctx.fill()   
        ctx.closePath()
        
        }
        update() {
            if (mouse.x < centerbase){
                if(mouse.y >= 70 +heightTheory &&
                mouse.y === this.y ) {
                    this.size = 10
                }else if(mouse.x === this.x &&
                mouse.y < 70 +heightTheory) {
                this.size = 10               
            }
            else {
                    this.size = 4                   
            } 
            }
            if (this.size === 10 && (mouse.clickY === this.y || mouse.clickX ===this.x) ) {
                imgX = this.x -25
                imgY = this.y - 25*35/this.y
                xLight = this.x 
                yLight = this.y  
                mouse.clickX = 0
                mouse.clickY = 0
       }
        }
    }

 class Line {
     constructor(lx, ly,c,t) {
        this.x = lx
        this.y = ly
        this.rx = centerbase
        this.ry = yb - heightBase
        this.refl = false
        this.count = c
        this.timer = t
        this.stepX = (centerbase - lx) / steps
        this.stepY = (yb - heightBase - ly +6) / steps
     }
     draw() { 
        ctx.beginPath();
        ctx.moveTo(xLight, yLight)
        ctx.lineWidth = 5
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffd";
        ctx.strokeStyle = '#fff'
        ctx.lineTo(this.x, this.y);       
        ctx.stroke();     
        ctx.closePath()
        if (this.refl === true) {
        ctx.beginPath();
        ctx.moveTo(centerbase, yb - heightBase +4)
        ctx.lineWidth = 5
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ffd";
        ctx.strokeStyle = '#fff'
        ctx.lineTo(this.rx, this.ry);       
        ctx.stroke(); 
        }
     }
     update() {   
         if (change) {
            lineArray.shift()
            lineArray.push(new Line(xLight, yLight, 0, 0))
            change = false
         }
         let dx =xLight - centerbase
         let dy = yLight - yb 
         let theta = Math.atan2(dy, dx)
         thetaxy =theta
         grade = (90- (theta*180/Math.PI +180)).toFixed(2)
           this.timer ++
         if (this.timer % 4 == 0) {
           this.count ++
         if (this.count <= steps) {
            this.x += this.stepX 
            this.y += this.stepY
            }
            if (this.count > steps && this.count <= steps * 2) {
                this.refl = true
            this.x = this.x
            this.y = this.y
            this.rx += this.stepX
                this.ry -= this.stepY
                let dx2 =this.rx - centerbase
                let dy2 = this.ry - yb+6 
                let theta2 = Math.atan2(dy2, dx2) 
                thetaxy2 = theta2
                grade2 = ((theta2*180/Math.PI +180) -90).toFixed(2)
          } 
          if (this.count > steps * 2) {
            this.stepX = 0
            this.stepY = 0
            this.count = this.count
            this.timer =this.timer
            }
          }   
        }
    }

    //Refraction
    const bec2 = new Image()
bec2.src = './img/bec1.png'
    function drawbec2() {
        ctx.shadowBlur = 0;
        ctx.drawImage(bec2, waterx-20, yb/2-20, 40, 40)
    }
    const waterx = canvas.width / 2 + 100
    const watery = yb - 100
    widthWater = 400
    const halfWaterx = waterx + widthWater / 2
    const btnLight = document.getElementById('lightbtn')
    btnLight.style.top = yb / 2 - 60 + 'px'
    btnLight.style.left = waterx + 'px'
    
    btnLight.addEventListener('click', function () {
        light = !light
        if (!light) {
            lineRefr = new LineRefraction()
            thetaxyrefr = -Math.PI/2
            thetaxyrefr2 = Math.PI / 2
            graderefr = graderefr2 = 0
            info = false
        }
    })
    function drawWater() {
        const grd = ctx.createLinearGradient(canvas.width/2,yb/2,canvas.width/2,yb);
        grd.addColorStop(0,"#33f");
        grd.addColorStop(0.4, "#44f");
        grd.addColorStop(1, "#55f");
        ctx.shadowBlur = 0
        ctx.fillStyle = grd;
        ctx.fillRect(waterx, watery, widthWater,300);
    }
    function angle2() {
        ctx.font = "20px Georgia";
        ctx.shadowBlur = 0
        ctx.fillText('i: ' + graderefr, halfWaterx + 50, yb/2 )
        ctx.fillText('r: ' + graderefr2, halfWaterx + 120, yb/2 )
        if (graderefr > graderefr2) {
            ctx.shadowBlur = 5
           ctx.fillText('>', halfWaterx + 100, yb/2) 
        }  
    }
    class LineRefraction {
        constructor() {
           this.x = waterx
           this.y = yb/2
           this.rx = halfWaterx
           this.ry = watery
           this.refl = false
           this.count = 0
           this.timer = 0
           this.stepX = (halfWaterx-waterx) / steps
           this.stepY = (watery - yb/2) / steps
        }
        draw() { 
            ctx.beginPath();
            ctx.setLineDash([]);
           ctx.moveTo(waterx, yb/2)
           ctx.lineWidth = 5
           ctx.shadowBlur = 5;
           ctx.shadowColor = "#ffd";
           ctx.strokeStyle = '#fff'
           ctx.lineTo(this.x, this.y);       
           ctx.stroke();     
           ctx.closePath()
           if (this.refl) {
           ctx.beginPath();
           ctx.moveTo(halfWaterx, watery)
           ctx.lineWidth = 5
           ctx.shadowBlur = 5;
           ctx.shadowColor = "#ffd";
           ctx.strokeStyle = '#fff'
           ctx.lineTo(this.rx, this.ry);       
           ctx.stroke(); 
            }
            
        }
        update() {   
            let dx =waterx - halfWaterx
            let dy = yb/2 -watery 
            let theta = Math.atan2(dy, dx)
            thetaxyrefr =theta
            graderefr = parseInt(90- (theta*180/Math.PI +180))
              this.timer ++
            if (this.timer % 4 == 0) {
              this.count ++
            if (this.count <= steps) {
               this.x += this.stepX 
               this.y += this.stepY
               }
               if (this.count > steps && this.count <= steps * 1.6) {
                   this.refl = true
                   
               this.x = this.x
               this.y = this.y
               this.rx += this.stepX
                   this.ry += this.stepY + 10
                   let dx2 =this.rx - halfWaterx
                   let dy2 = this.ry - watery 
                   let theta2 = Math.atan2(dy2, dx2) 
                   thetaxyrefr2 = theta2
                   graderefr2 = parseInt(90 - (theta2*180/Math.PI ))
             } 
             if (this.count > steps * 1.6) {
               this.stepX = 0
               this.stepY = 0
               this.count = this.count
                 this.timer = this.timer
                 info = true
               }
             }   
           }
       }
    function init() {
        sourceArray = []
        lineArray = []
        for (let y = 0; y < circleStart.height; y++){
            for (let x = 0; x < circleStart.width; x++){
                if (circleStart.data[(y*4*circleStart.width)+(x*4)+3] > 128) {
                    let posX = x 
                    let posY = y 
                    sourceArray.push(new SourceLight(posX , posY +heightTheory ))    
                }
            }   
        }
        lineArray.push(new Line(xLight, yLight, 0, 0))
        
    }
    init()
    let lineRefr = new LineRefraction()
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        
        for (let i = 0; i < sourceArray.length; i++){
            sourceArray[i].draw()
            sourceArray[i].update()
        }
        drawNorm(centerbase, yb, 15+heightTheory)
        drawBase()
        
        lighter.update()
        lighter.draw()
            lineArray[0].draw() 
            lineArray[0].update()
        
        angle()
        drawAngle(centerbase, yb - 6, thetaxy, -Math.PI / 2)
        drawAngle(centerbase, yb - 6, -Math.PI / 2, thetaxy2)
        ir(centerbase - 20, yb -60, centerbase + 17, yb - 60)
        drawWater()
        drawbec2()
        drawNorm(halfWaterx, yb + 150)
        
        if (light) {
            lineRefr.draw() 
          
            if (info) {
                drawAngle(halfWaterx, watery, thetaxyrefr, -Math.PI / 2)
                drawAngle(halfWaterx, watery, thetaxyrefr2, Math.PI / 2)
                ir(halfWaterx -20, watery -60, halfWaterx + 10, watery +65)  
                angle2()
            }
        
        lineRefr.update()  
        }
        
      requestAnimationFrame(animate)
    }
    animate()
})
