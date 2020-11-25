

let data=[{
  lat:"1",
  long:""
}]
var backendurl="http://localhost:5000"


let c = 0;

const getLabelText = (prediction) => {

  const scoreText = (prediction.score * 100).toFixed(1)
  if (scoreText >= 65) {
    

    document.getElementById("xxxx").innerHTML = scoreText;
    
    c++;
    if (c == 100) {
      c = 0;
      navigator.geolocation.getCurrentPosition(showPosition);
    }
  }
  return `${prediction.label} ${scoreText}%`
}

var showPosition=(position)=> {
  let x=(position.coords.latitude);
  let y=(position.coords.longitude);
  data.lat=x;
  data.long=y;
  console.log(position.coords);
  console.log(position.coords.accuracy);
  const options={
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body:JSON.stringify(position.coords)
  }
  // axios.post(backendurl+"/api",{data:position.coords})
  fetch(backendurl+"/api/"+data.lat+"/"+data.long).then(a=>console.log(a)).catch(e=>console.log(e))
  // console.log("Latitude: " + position.coords.latitude +" Longitude: " + position.coords.longitude);
  fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+data.lat+","+data.long+"&key=AIzaSyBjHj_ANrtzp2hxUzW-BIcXb_ELUjpZJP4").then(response=>response.json()).then(data=>{console.log(data)}).catch(err=>console.warn(err.message));
}
export const renderPredictions = (ctx, predictions) => {
  // Font options.
  const font = `${10}px 'ibm-plex-sans', Helvetica Neue, Arial, sans-serif`
  ctx.setFont(font)
  ctx.setTextBaseLine('top')
  const border = 4
  const xPadding = 16
  const yPadding = 8
  const offset = 6
  const textHeight = parseInt(font, 10) // base 10

  predictions.forEach((prediction) => {
    // console.log(prediction);
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]
    const width = prediction.bbox[2]
    const height = prediction.bbox[3]

    const predictionText = getLabelText(prediction)

    // Draw the bounding box.
    ctx.setStrokeStyle('#0062ff')
    ctx.setLineWidth(border)

    ctx.strokeRect(
      Math.round(x),
      Math.round(y),
      Math.round(width),
      Math.round(height)
    )
    // Draw the label background.
    ctx.setFillStyle('#0062ff')
    const textWidth = ctx.measureText(predictionText).width
    ctx.fillRect(
      Math.round(x - border / 2),
      Math.round(y - (textHeight + yPadding) - offset),
      Math.round(textWidth + xPadding),
      Math.round(textHeight + yPadding)
    )
  })

  predictions.forEach((prediction) => {
    const x = prediction.bbox[0]
    const y = prediction.bbox[1]

    const predictionText = getLabelText(prediction)
    // Draw the text last to ensure it's on top.
    ctx.setFillStyle('#ffffff')
    ctx.fillText(
      predictionText,
      Math.round(x - border / 2 + xPadding / 2),
      Math.round(y - (textHeight + yPadding) - offset + yPadding / 2)
    )
  })
}