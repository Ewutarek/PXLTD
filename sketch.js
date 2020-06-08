
let video, button;
let boxWidth = 10;
let boxHeight = 10;
let modeSlider;
let canvas;



function setup() 
{
  // let cardWidth = document.getElementsByClassName("card text-center")[0].getBoundingClientRect().width;
  let  cardWidth = (document.getElementsByClassName("card text-center")[0].offsetWidth)*0.9;
  canvas =  createCanvas(cardWidth, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cardWidth, 480);
  video.hide();
  noStroke();

  canvas.parent('canvas-container');

  // modeSlider = createSlider(1,3,1,1);
  // modeSlider.position(10, 500);
  // modeSlider.style('width', '80px');

 
  
}

function draw()
{
  // var modeSliderValue = modeSlider.value();
  let _16bit = document.getElementById("16bit"); 
  let _8bit = document.getElementById("8bit"); 
  let _2bit = document.getElementById("2bit"); 
  let _normal = document.getElementById("normal");


  background(51);

  if(_normal.checked == true)
  {
      image(video,0,0);
  }

  video.loadPixels();

  var totalPix = boxHeight*boxWidth;

  for(var x = 0; x < video.width; x += boxWidth)
  {
      for(var y = 0; y < video.height; y += boxHeight)
      
      {
          

          var red = 0, green = 0, blue = 0;
          var index = (x  + (y * video.width) ) * 4;
          red = video.pixels[index+0];
          green = video.pixels[index+1];
          blue = video.pixels[index+2];

          if(_16bit.checked == true)
          {
            fill(color(red, green, blue));
          } else if(_8bit.checked == true)
            {
              fill(replace8bit(color(red, green, blue)));
            } else if(_2bit.checked == true)
              {
                fill(replace2bit(color(red, green, blue)));
              } else{  image(video,0,0);}

          

          // if (modeSliderValue == 1)
          // {
          //      fill(color(red, green, blue));
          // } else if(modeSliderValue == 2)
          //   {
          //       fill(replace8bit(color(red, green, blue)));
          //   } else if(modeSliderValue == 3)
          //     {
          //       fill(replace2bit(color(red, green, blue)))
          //     }

        
          rect(x, y, boxWidth, boxHeight);
      }
  }


}

function replace8bit(c)
{
    var r = int(red(c) / (255/8)) * (255/8);
    var g = int(green(c) / (255/8)) * (255/8);
    var b = int(blue(c) / (255/4)) * (255/4);
    return color(r,g,b);  
}


function replace2bit(c) //bloody tragic attempt of 4bit
{
    var colors = [color("#000000"), //black
                  color("#555555"), // gray
                  color("#0000AA"), // blue
                  color("#5555FF"), // light blue
                  color("#00AA00"), // green
                  color("#55FF55"), // light green
                  color("#00AAAA"), // cyan
                  color("#55FFFF"), // light cyan
                  color("#AA0000"), // red
                  color("#FF5555"), // light red
                  color("#AA00AA"), // magenta
                  color("#FF55FF"), // light magenta
                  color(170, 85, 0), // brown // #AA5500
                  color("#FFFF55"), // yellow
                  color("#AAAAAA"), // light gray
                  color("#FFFFFF") // white (high intensity)
                  ];
    
    for(var k =0;k<colors.length;k++)
    {
        
        var incomingColour = replace8bit(c);
            
         if(
             ((red(incomingColour)-red(colors[k])) <=0.3) &&
             ((green(incomingColour)-green(colors[k])) <= 0.59) &&
             ((blue(incomingColour)-blue(colors[k])) <= 0.11)
         ) 
        {
            return color(colors[k]);
        }
        
    }  
}


function saveImage()
{
    save("PXLTD_output.png"); 
}
