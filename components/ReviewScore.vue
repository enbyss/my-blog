<template>
  <div class="review-score flex justify-center">
    <div class="review-container" :class="ratingCategory">
      <div class="main-review-portion">
        <h1 class="score">
          {{score}}
        </h1>
        <h1 class="ranking">
          {{ratingCategory}}
        </h1>
      </div>
      <h1 class="rating-summary">
        {{summary}}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ['score', 'summary'],
  computed: {
    ratingCategory() {
      if (this.score >= 0 && this.score < 2) {
        return 'dismal';
      }
      else if (this.score >= 2 && this.score < 4) {
        return 'bad';
      }
      else if (this.score >= 4 && this.score < 6) {
        return 'decent'
      }
      else if (this.score >= 6 && this.score < 8) {
        return 'great'
      }
      else if (this.score >= 8) {
        return 'brilliant';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap');

.review-score {
  margin-top: -30px;
  margin-bottom: 100px;
  width: 100%;
}

.review-container {
  width: 400px;
  border-radius: 20px;
}

.main-review-portion {
  width: 400px;
  height: 100px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background: rgba(0,0,0,0.5);
}

.score {
  border-radius: 20px;
  padding: 5px;
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  margin-left: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Yeseva One';
}

.ranking {
  font-family: 'Yeseva One';
  font-size: 50px;
  margin-left: 10px;
  font-style: italic;
}

.rating-summary {
  padding: 5px;
  margin: 4px 10px;
  font-family: 'Yeseva One';
  font-size: 17px;
  text-shadow: 0 0 10px black;
}

// Rating Categories
.review-score {
  .dismal {
    background: linear-gradient(90deg, rgb(104, 0, 0), rgba(0, 0, 0, 0));

    .score {
      background: linear-gradient(90deg, rgb(255, 0, 0), rgba(173, 78, 0, 0.425));
    }
  }

  .bad {
    background: linear-gradient(90deg, rgb(16, 0, 104), rgba(0, 0, 0, 0));

    .score {
      background: linear-gradient(90deg, rgb(0, 217, 255), rgba(17, 0, 173, 0.425));
    }
  }

  .decent {
    background: linear-gradient(90deg, rgb(104, 59, 0), rgba(0, 0, 0, 0));

    .score {
      background: linear-gradient(90deg, rgb(255, 81, 0), rgba(173, 84, 0, 0.425));
    }
  }

  .great {
    background: linear-gradient(90deg, rgb(0, 104, 87), rgba(0, 0, 0, 0));

    .score {
      background: linear-gradient(90deg, rgb(43, 255, 0), rgba(0, 173, 92, 0.425));
    }
  }

  .brilliant {
    background: linear-gradient(90deg, rgb(140, 0, 255), rgba(255, 0, 157, 0.178));

    .score {
      background: linear-gradient(90deg, rgb(255, 0, 149), rgba(140, 0, 255, 0.425));
    }

    animation: rainbow-fx 5s linear infinite;
  }
}

h1 {
  color: white;
}

@keyframes rainbow-fx {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

@screen sm {
  .review-score {
    margin-top: -30px;
    margin-bottom: 100px;
    width: 100%;
  }

  .review-container {
    width: 500px;
    border-radius: 20px;
  }

  .main-review-portion {
    width: 500px;
    height: 100px;
  }

  .score {
    font-size: 50px;
    width: 100px;
    height: 100px;
    margin-left: -2px;
  }

  .ranking {
    font-size: 50px;
    margin-left: 10px;
  }

  .rating-summary {
    padding: 5px;
    margin: 4px 10px;
    font-size: 17px;
  }
}
</style>
