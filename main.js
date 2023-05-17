song1 = ""
song2 = ""
var confidence_left_wrist = 0
var confidence_right_wrist = 0
var rightwrist_x = 0
var rightwrist_y = 0
var leftwrist_x = 0
var leftwrist_y = 0
function preload(){
    song1 = loadSound("song1.mp3")
    song2 = loadSound("song2.mp3")
}
function setup(){
    canvas = createCanvas(600,500)
    canvas.center();

    video = createCapture(VIDEO)
    video.hide()

    pose_net = ml5.poseNet(video,modelLoaded)

    pose_net.on('pose',getPoses)

}
function draw(){
    image(video,0,0,600,500)
    if (confidence_left_wrist > 0.2){
        fill("red")
        stroke("red")
        circle(leftwrist_x,leftwrist_y,20)
        song1.play()
        song2.stop()
        document.getElementById("song").innerHTML = "Playing Song 1"
    }
    if (confidence_right_wrist > 0.2){
        fill("red")
        stroke("red")
        circle(rightwrist_x,rightwrist_y,20)
        song2.play()
        song1.stop()
        document.getElementById("song").innerHTML = "Playing Song 2"
    }
}
function modelLoaded(){
    console.log("pose net is initialized");
}
function getPoses(results){
    if (results.length > 0){
        console.log(results);
        rightwrist_x = results[0].pose.rightWrist.x
        rightwrist_y = results[0].pose.rightWrist.y
        leftwrist_x = results[0].pose.leftWrist.x
        leftwrist_y = results[0].pose.leftWrist.y
        console.log("RightWrist x="+rightwrist_x+"RightWrist y="+rightwrist_y)
        console.log("leftWrist x="+leftwrist_x+"leftWrist y="+leftwrist_y)
        confidence_left_wrist = results[0].pose.keypoints[9].score
        confidence_right_wrist = results[0].pose.keypoints[10].score

    }
}