<template>
  <div class="my-8 dark:text-white">
    <div class="mx-auto text-center w-11/12 md:w-5/12 text-xl">
      <h1 class="text-3xl font-bold">Channel Points Icon Generator</h1>
      <p>
        This tool helps convert an image you pass in to the three <i>(28x28, 56x56, 112x112)</i> icon sizes required.
        You can then either download each size individually, or all of them in one. This also works for designing icons for channel point <i>rewards.</i>
      </p>
      <br />
      <p>
        It also compresses these icons so that the chances of hitting the filesize limit is minimal.
      </p>
      <br/>
      <p>
        <b>Note:</b> You'll get best results if you upload a 1:1 image. Any other ratio, and the image
        will be cropped to fit the ratio.
      </p>
    </div>

    <div class="w-full flex flex-col justify-center my-5">
      <h1 class="mx-auto font-bold text-2xl my-3">Upload image</h1>
      <input class="mx-auto" type="file" accept="image/*" @change="onFileChange" />
    </div>

    <div v-if="url" id="image-grid">
      <button v-if="zippedImages" id="download-all-button" @click="downloadArchive()" class="p-3 rounded-xl font-bold text-xl">
        DOWNLOAD ALL
      </button>

      <!-- The main image uploaded. -->
      <div id="main-image">
        <p>Main image</p>
        <img :src="url" />
      </div>

      <!-- Shows all icon sizes. -->
      <div v-for="(size, index) in loadedSizes" :key="index" :id="'image-'+size">
        <p>{{size + 'x' + size}}</p>
        <img :src="resized['x' + size].img" />
        <i>{{resized['x' + size].size}}</i>
        <a :href="resized['x' + size].img" download>
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
      loadedSizes : [],
      resized : {
        'x28' : {},
        'x56' : {},
        'x112' : {},
      },
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
    async onFileChange(e) {
      this.zippedImages = null;
      this.loadedSizes = [];

      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);

      const getBase64 = (url) => url.replace(/^data:image\/(png|jpg);base64,/, "");

      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async function () {
        const b64 = getBase64(reader.result);

        try {
          const result = await this.$axios.post(`/api/genTwitchIcon`, {
            b64
          });

          console.info("Processed images.");

          // For archiving
          let zip = new JSZip();
          zip.file("ChannelPoints28.png", getBase64(result.data.v28.image), {base64: true});
          zip.file("ChannelPoints56.png", getBase64(result.data.v56.image), {base64: true});
          zip.file("ChannelPoints112.png", getBase64(result.data.v112.image), {base64: true});
          this.zippedImages = zip;

          console.info("Processed archive.");

          const setResized = ((dim) => {
            const formatBytes = (bytes, decimals = 2) => {
              if (bytes === 0) return '0 Bytes';

              const k = 1024;
              const dm = decimals < 0 ? 0 : decimals;
              const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

              const i = Math.floor(Math.log(bytes) / Math.log(k));

              return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }


            this.resized['x' + dim] = {
              size: formatBytes(result.data['v' + dim].size),
              img: `data:image/${result.data.format};base64, ${result.data['v' + dim].image}`,
            }
            this.loadedSizes.push(dim);
          }).bind(this);

          // For displaying.
          setResized(28);
          setResized(56);
          setResized(112);

          console.info("Displayed individual files.");
          console.info("Complete.");

        } catch (err) {
          console.error("Failed to process images.");
          console.error(err);
        }

      }.bind(this);
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
