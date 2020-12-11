<template>
  <div class="my-8 dark:text-white">
    <div class="mx-auto text-center w-11/12 md:w-5/12 text-xl">
      <h1 class="text-3xl font-bold">Channel Points Icon Generator</h1>
      <p>
        This tool helps convert an image you pass in to the three <i>(28x28, 56x56, 112x112)</i> icon sizes required.
        You can then either download each size individually, or all of them in one.
      </p>
      <br/>
      <p>
        <b>Note:</b> You'll get best results if you upload a 1:1 image. Any other ratio, and the image
        will be stretched or squished to fit this ratio.
      </p>
    </div>

    <div class="w-full flex flex-col justify-center my-5">
      <h1 class="mx-auto font-bold text-2xl my-3">Upload image</h1>
      <input class="mx-auto" type="file" accept="image/*" @change="onFileChange" />
    </div>

    <div v-if="url" id="image-grid">
      <button id="download-all-button" v-if="url" @click="downloadArchive()" class="p-3 rounded-xl font-bold text-xl">
        DOWNLOAD ALL
      </button>
      <div id="main-image">
        <p>Main image</p>
        <img :src="url" />
      </div>
      <div id="image-28">
        <p>28x28</p>
        <img :src="this.resized.x28" />
        <a :href="this.resized.x28" download>
          <font-awesome-icon :icon="['fas', 'download']" />
        </a>
      </div>
      <div id="image-56">
        <p>56x56</p>
        <img :src="this.resized.x56" />
        <a :href="this.resized.x56" download>
          <font-awesome-icon :icon="['fas', 'download']" />
        </a>
      </div>
      <div id="image-112">
        <p>112x112</p>
        <img :src="this.resized.x112" />
        <a :href="this.resized.x112" download>
          <font-awesome-icon :icon="['fas', 'download']" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import JSZip from 'jszip';
import downscale from 'downscale';

export default {
  data() {
    return {
      url: null,
      zippedImages: null,
      resized : {
        'x28' : null,
        'x56' : null,
        'x112' : null,
      }
    }
  },
  methods: {
    downloadArchive() {
      var FileSaver = require('file-saver');

      this.zippedImages.generateAsync({type:"blob"})
        .then(function(content) {
            FileSaver.saveAs(content, "icons.zip");
        });
    },
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);

      const options = {
        'imageType' : 'png',
        'quality' : 0.6
      }

      downscale(this.url, 28, 28, options).then((dataURL) => {
        this.resized.x28 = dataURL
      });

      downscale(this.url, 56, 56, options).then((dataURL) => {
        this.resized.x56 = dataURL
      });

      downscale(this.url, 112, 112, options).then((dataURL) => {
        this.resized.x112 = dataURL
      });

      let zip = new JSZip();
      zip.file("ChannelPoints28.png", getBase64(this.resized.x28), {base64: true});
      zip.file("ChannelPoints56.png", getBase64(this.resized.x56), {base64: true});
      zip.file("ChannelPoints112.png", getBase64(this.resized.x112), {base64: true});
      this.zippedImages = zip;
    }
  },
  head() {
    return {
      title: "Channel Points Icon Generator",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "A helpful tool for if you want to generate all the sizes for a channel points icon real quick.",
        },
        {
          property: 'og:title',
          content: "Channel Points Icon Generator",
        },
        {
          property: 'og:description',
          content: "A helpful tool for if you want to generate all the sizes for a channel points icon real quick.",
        },
        {
          property: 'og:image',
          content: "/ChannelPoints.png"
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          property: 'twitter:site',
          content: '@enbyss'
        },
        {
          property: 'twitter:creator',
          content: '@enbyss'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  #image-grid {
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    width: 100%;
    justify-self: center;
    margin: 0 auto;
  }

  #image-grid div {
    @apply p-5 w-full h-full flex justify-center items-center flex-col;
  }

  #image-grid img {
    @apply my-4;
  }

  #image-grid p {
    @apply text-xl font-bold;
  }

  #image-grid a {
    @apply flex justify-center items-center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(240,150,255,0.5);
    border: 2px solid rgb(240,150,255);
    transition: all 0.2s ease-in-out;
  }

  #image-grid a:hover {
    background: rgba(240,150,255,1);
  }

  #image-grid {
    text-align: center;
  }

  #main-image {
    grid-column: 1 / -1;
    max-width: 400px;
  }

  #download-all-button {
    grid-column: 1 / -1;
    width: 90%;
    background: linear-gradient(rgba(89, 0, 255, 0.5), rgba(255, 0, 157, 0.5));
    transition: all 0.2s ease-in-out;
    border: 0px solid rgba(89, 0, 255, 0.5);
  }

  #download-all-button:hover {
    border: 10px solid rgba(89, 0, 255, 0.5);
  }

  @screen lg {
    #image-grid {
      grid-template-columns: 1fr 1fr 1fr;
      width: 800px;
    }
  }
</style>
