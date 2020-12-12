const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

exports.handler = async function(event, context) {

  console.log("request received");
  const b64 = JSON.parse(event.body).b64;

  console.log("body parsed");

  let imgBuf = Buffer.from(b64, 'base64');

  console.log("buffer created");

  let resize = async (dim) => {
    console.log("STEP 1");
    const resizedBuf = await sharp(imgBuf)
      .resize(dim,dim)
      .png()
      .toBuffer();

      console.log("STEP 2");

    const buf = await imagemin.buffer(resizedBuf, {
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });

    console.log("STEP 3");

    return {
      size: buf.length,
      image: buf.toString('base64')
    }
  }

  let v28 = await resize(28);
  let v56 = await resize(56);
  let v112 = await resize(112);

  return {
    statusCode: 200,
    body: JSON.stringify({
      v28, v56, v112,
      format: 'png'
    })
  }
}
