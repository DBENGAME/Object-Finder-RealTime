video = "";
status = "";
object_name = "";
objects = [];
function preload()
{
    video = createCapture(VIDEO);
    video.hide();

}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
        objectDetector.detect(video,gotResults);
    }
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            if(object_name == objects[i].label)
            {
            document.getElementById("number_of_objects").innerHTML = object_name + " found";
            }
            else
            {
                document.getElementById("number_of_objects").innerHTML = object_name + " not found";
            }

            fill("#ff0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y +15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
    console.log(object_name);
}

function modelLoaded()
{
    console.log("Model Loaded :)");
    status = true;
}

