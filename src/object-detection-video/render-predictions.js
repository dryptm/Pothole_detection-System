let data = [{
  lat: "1",
  long: "",
  city: "",
  state: "",
  country: "",
  pluscode: ""
}]
var backendurl = "http://localhost:5000"


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
let x1, x2, x3, x4;
var showPosition = (position) => {
  let x = (position.coords.latitude);
  let y = (position.coords.longitude);
  data.lat = x;
  data.long = y;
  console.log(position.coords);
  // console.log(position.coords.accuracy);
  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(position.coords)
  }

  fetch("https://api.bigdatacloud.net/data/reverse-geocode?latitude=" + data.lat + "&longitude=" + data.long + "&localityLanguage=en&key=91b80d02a7d84f918133f27b52939b73")
    .then(response => response.json())
    .then(data1 => {
      console.log(0, data1);
      x1 = data1.localityInfo.administrative[2].name;
      x2 = data1.localityInfo.administrative[1].name;
      x3 = data1.localityInfo.administrative[0].name;
      x4 = data1.plusCode;
      x1 = x1.replace(" ", "-")
      x2 = x2.replace(" ", "-")
      x3 = x3.replace(" ", "-")
      x4 = x4.replace(" ", "-")
      data.city = x1;
      data.state = x2;
      data.country = x3;
      data.pluscode = x4;
      fetch(backendurl + "/api/" + data.lat + "/" + data.long + "/" + data.city + "/" + data.state + "/" + data.country + "/" + data.pluscode).then(a => console.log(a)).catch(e => console.log(e))
      console.log(1, data)
    })
    .catch(err => console.warn(err.message));


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