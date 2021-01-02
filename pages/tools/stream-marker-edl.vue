<template>
  <div class="my-8 dark:text-white">
    <div class="w-full flex flex-col justify-center my-5">
      <h1 class="mx-auto font-bold text-2xl my-3">Upload Twitch Marker CSV</h1>
      <input class="mx-auto" type="file" @change="onFileChange" />
      <div v-if="processedEDL" class="w-full text-center">
        <h1 class="mx-auto font-bold text-2xl my-3">Download .edl file.</h1>
        <a id="download-button" :href="processedEDL" download="twitch_markers.edl" target="_blank" class="p-3 rounded-full">
          <font-awesome-icon :icon="['fas', 'download']" />
        </a>
      </div>
      <hr class="mt-8 mb-5">
      <h1 class="mx-auto font-bold text-2xl my-3">Twitch-2-Resolve Marker Converter</h1>
      <div class="mx-auto">
        <p class="my-3 mx-8 text-xl text-center" style="max-width:800px">
          This tool to put it lightly, generates a marker file from your <b>Twitch CSV marker file.</b>
          More specifically, it generates an <b>EDL file</b> that can be imported into a video editor compatible
          with it.
        </p>
        <p class="my-3 mx-8 text-xl text-center" style="max-width:800px">
          So far it's only confirmed to work with <b><i>Davinci Resolve</i></b>, so I named it as such.
          I <i>thought</i> it would work with all editors that supported EDL, but after seeing how Premiere uses EDL
          files uh. I'm not so sure anymore.
        </p>
        <p class="my-3 mx-8 text-xl text-center" style="max-width:800px">
          As for how to import it, watch <a class="text-orange-800 dark:text-orange-400 italic" href="https://youtu.be/SJ867oKZhuM">this video here!</a>
        </p>
      </div>
      <h1 class="mx-auto font-bold text-2xl my-3 italic">Sorry, EDL?</h1>
      <div class="mx-auto">
        <p class="mx-8 text-xl text-center" style="max-width:800px">
          <b>Edit Decision List</b>, specifically. It's the file format most video editors use to denote markers. It's
          also used for a lot more things, but the focus here is on markers.
        </p>
      </div>
      <h1 class="mx-auto font-bold text-2xl my-3 italic">Can you tell me more?</h1>
      <div class="mx-auto">
        <p class="mx-8 text-xl text-center" style="max-width:800px">
          I'm going to be writing up a bit of an article about how I went about doing this, because I feel like it'd be interesting. When
          that's done I'll put a link to it <b>here.</b> Keep an eye out!
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      processedEDL: null,
    }
  },
  methods: {
    onFileChange(e) {
      this.processedEDL = null;
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = event => {
        let contents = event.target.result;
        const csv = this.processCSV(contents);

        const toEDLData = csv.map((marker, index) => {
          const splitCode = marker.timecode.split(':');
          const timecode = `${(parseInt(splitCode[0])+1).toString().padStart(2, "0")}:${splitCode[1]}:${splitCode[2]}`;
          return {
            start: `${timecode}:00`,
            end: `${timecode}:01`,
            iteration: (index+1).toString().padStart(3, "0"),
            name: `${marker.comment} by ${marker.username} [${marker.class}]`
          }
        });

        const header = "EDL\nTITLE: Timeline 1\nFCM:NON-DROP-FRAME\n\n";
        let result = "";

        for (const marker of toEDLData) {
          const item = `${marker.iteration}  001      V    C        ${marker.start} ${marker.end} ${marker.start} ${marker.end}  \n |C:ResolveColorBlue |M:${marker.name} |D:1\n\n`;
          result += item;
        }

        const edl = header + result;
        const data = new Blob([edl], {type: 'text/plain'});
        this.processedEDL = window.URL.createObjectURL(data);
      }

      reader.onerror = error => console.error("Something went wrong: ", error);
      reader.readAsText(file);
    },
    // Copied from Ben Nadel's blog, https://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm
    processCSV(strData) {
      const strDelimiter = ",";

      var objPattern = new RegExp(
        (
          "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
          "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
          "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
      var arrData = [[]];
      var arrMatches = null;
      while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
          strMatchedDelimiter.length &&
          (strMatchedDelimiter != strDelimiter)
        ){
          arrData.push( [] );
        }
        if (arrMatches[ 2 ]){
          var strMatchedValue = arrMatches[ 2 ].replace(/""/g,"\"");
        } else {
          var strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );
      }

      return arrData.map(marker => {
        return {
          timecode: marker[0],
          class: marker[1],
          username: marker[2],
          comment: marker[3]
        }
      }).slice(0, -1);
    }
  },
    head() {
    return {
      title: "Twitch-2-Resolve Marker Converter",
      meta: [
        {
          hid: 'description',
          name: "description",
          content: "A tool that helps convert your Twitch Marker file into an EDL file that Davinci Resolve can use.",
        },
        {
          property: 'og:title',
          content: "Twitch-2-Resolve Marker Converter",
        },
        {
          property: 'og:description',
          content: "A tool that helps convert your Twitch Marker file into an EDL file that Davinci Resolve can use.",
        },
        {
          property: 'og:image',
          content: "/MarkerConverter.png"
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
#download-button {
  display: inline-block;
  background: #560088;
  width: 100px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #8000ca;
  }
}
</style>
