<template>
    <div>
        <b-row>
             <b-col>
              <b-carousel
                id="carousel-1"
                v-model="slide"
                controls
                indicators
                background="#ababab"
                img-width="1024"
                img-height="480"
                style="text-shadow: 1px 1px 2px #333;"
                :interval="intervalValue"
                >
                <!--
                     sliding-start="onSlideStart"
                sliding-end="onSlideEnd"
                     -->
                <!-- Text slides with image -->
                <b-carousel-slide
                v-for="(dng, i) in dungeons"
                    v-bind:key="i" 
                    :caption="dng.name"
                    text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                   :img-src="GetDungeonImageUrl(slide)"
                ></b-carousel-slide>
                <!--   -->
                <!-- require('../assets/medival_knight.png') -->
                <!-- Slides with custom text -->
                <!-- <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
                    <h1>Hello world!</h1>
                </b-carousel-slide> -->

                <!-- Slides with image only -->
                <!-- <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58"></b-carousel-slide> -->

                <!-- Slides with img slot -->
                <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
                <!-- <b-carousel-slide>
                    <template v-slot:img>
                    <img
                        class="d-block img-fluid w-100"
                        width="1024"
                        height="480"
                        src="https://picsum.photos/1024/480/?image=55"
                        alt="image slot"
                    >
                    </template>
                </b-carousel-slide> -->

                <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                <!-- <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                    a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
                    </p>
                </b-carousel-slide> -->
                </b-carousel>

                <p class="mt-4">
                Slide #: {{ slide }}<br>
                Sliding: {{ sliding }} <br>
                <!-- {{GetDungeonImageUrl(0)}} -->
                </p>

                {{dungeons[slide]}}
                <ul>

                </ul>

          </b-col>
          <b-col>
          </b-col>
        </b-row>
    </div>
</template>
<script>
import { dungeonHelperMixin } from '../../mixins/dungeonHelper';
export default {
    data() {
      return {
        slide: 0,
        intervalValue: 0,
        sliding: 0,
        imgUrl: '../../../assets/dungeons/grassland2.gif'
      }
    },
    props: {
        dungeons: {}
    },
    mixins: [dungeonHelperMixin],
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        // urlChecker(id){
            
        // }
    }   
}
</script>
<style scoped>

</style>