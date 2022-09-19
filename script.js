const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const heightTheory = 300
let thetaxy = 0
let thetabec = 0
let thetaxy2 = -Math.PI/2
let grade = 0
let grade2 = 0
const xbi = 50
const xbf = 445
const yb = 375 + heightTheory
const heightBase = 15
const centerbase = (xbf - xbi) / 2 + xbi
let imgX = 30
let imgY = 200 +heightTheory
let xLight = imgX +25
let yLight =imgY +20
const steps = 20


let sourceArray = []
let lineArray = []
let change = false

const bec = new Image()
bec.src = 'becTransp.png'
function drawbec() {
ctx.shadowBlur = 0;
ctx.drawImage(bec, imgX, imgY, 40, 40)
}
function drawNorm() {
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.setLineDash([15, 5]);
    ctx.moveTo(centerbase, yb)
    ctx.lineTo(centerbase, 15 + heightTheory)
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
function drawAngle(a1,a2) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerbase, yb - 6);
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.15;
    ctx.arc(centerbase, yb - 6, 50, a1, a2);
    ctx.closePath();  
    ctx.fill();
    ctx.restore();
    ctx.font = "20px Georgia";
    ctx.fillText('i ', centerbase - 20, yb -60)
    ctx.fillText('r ', centerbase + 17, yb - 60)
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
    change = true
    thetaxy2 = -Math.PI/2
   
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

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height) 
        
        for (let i = 0; i < sourceArray.length; i++){
            sourceArray[i].draw()
            sourceArray[i].update()
        }
        drawNorm()
        drawBase()
        lighter.draw()
        lighter.update()
        
            lineArray[0].draw() 
            lineArray[0].update()
        
        angle()
        drawAngle(thetaxy, -Math.PI / 2)
        drawAngle(-Math.PI/2,thetaxy2)
      requestAnimationFrame(animate)
    }
    animate()
})
