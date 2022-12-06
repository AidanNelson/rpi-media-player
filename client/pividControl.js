const https = require("https");

// pivid constants
const PRE_BUFFER = 0.3;
const RUN_BUFFER = 0.3;

const OUTPUT_RESOLUTION_WIDTH = 1920;
const OUTPUT_RESOLUTION_HEIGHT = 1080;
const OUTPUT_RESOLUTION_REFRESH_RATE = 60;

const OUTPUT_UPDATE_FREQUENCY = 60;

function playVideo(fileName) {
  // https://stackoverflow.com/questions/42169906/nodejs-make-https-request-sending-json-data
  const playScript = {
    buffer_tuning: { fileName: { pin: PRE_BUFFER } },
    screens: {
      "HDMI-1": {
        mode: [
          OUTPUT_RESOLUTION_WIDTH,
          OUTPUT_RESOLUTION_HEIGHT,
          OUTPUT_RESOLUTION_REFRESH_RATE,
        ],
        update_hz: OUTPUT_UPDATE_FREQUENCY,
        layers: [
          {
            media: fileName,
            play: { t: [0, 30], v: [0, 30], repeat: True },
            buffer: RUN_BUFFER,
            to_size: [OUTPUT_RESOLUTION_WIDTH, OUTPUT_RESOLUTION_HEIGHT],
          },
        ],
      },
    },
    zero_time: 0.0,
  };
  var postData = querystring.stringify(playScript);

  var options = {
    hostname: "http://localhost",
    port: 31415,
    path: "/play",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  var req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  //
  console.log("attempting to send pivid play script");
  console.log(playScript);
  // write data to request body
  req.write(postData);
  req.end();
}

playVideo("/home/aidan/Videos/water-4k-h265.mkv");
