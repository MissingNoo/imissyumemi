import { type PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import Footer from "../islands/Footer.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, target-densitydpi=device-dpi, initial-scale=0, maximum-scale=1, user-scalable=yes" />
        <title>I Miss Yumemi</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body f-client-nav style="background-color:#d1aaf3; height:100%;">
      <div dangerouslySetInnerHTML={{ __html: `
          <audio id="sound1"> <source src="hiccups/1.mp3" type="audio/mpeg"> </audio>
          <audio id="sound2"> <source src="hiccups/2.mp3" type="audio/mpeg"> </audio>
          <audio id="sound3"> <source src="hiccups/3.mp3" type="audio/mpeg"> </audio>
          <audio id="sound4"> <source src="hiccups/4.mp3" type="audio/mpeg"> </audio>
          <audio id="sound5"> <source src="hiccups/5.mp3" type="audio/mpeg"> </audio>
          <audio id="sound6"> <source src="hiccups/6.mp3" type="audio/mpeg"> </audio>
          <audio id="sound7"> <source src="hiccups/7.mp3" type="audio/mpeg"> </audio>
          <audio id="sound8"> <source src="hiccups/8.mp3" type="audio/mpeg"> </audio>
          <audio id="sound9"> <source src="hiccups/9.mp3" type="audio/mpeg"> </audio>
          <audio id="sound10"> <source src="hiccups/10.mp3" type="audio/mpeg"> </audio>
          <audio id="sound11"> <source src="hiccups/11.mp3" type="audio/mpeg"> </audio>
          <audio id="sound12"> <source src="hiccups/12.mp3" type="audio/mpeg"> </audio>
          <audio id="sound13"> <source src="hiccups/13.mp3" type="audio/mpeg"> </audio>
          <audio id="sound14"> <source src="hiccups/14.mp3" type="audio/mpeg"> </audio>
          <audio id="sound15"> <source src="hiccups/15.mp3" type="audio/mpeg"> </audio>

          <script>
            var x = document.getElementById("myAudio"); 

            mySounds = [ 'sound1', 'sound2', 'sound3', 'sound4', 'sound5' ]
            function randomSound() {
              var index = Math.floor(Math.random() * 1000) % mySounds.length;
              var id = mySounds[index];
              var audioElement = document.getElementById(id);
              audioElement.play();
            }
            function playAudio() { 
              randomSound();
              //x.play(); 
            } 

            function pauseAudio() { 
              x.pause(); 
            } 
          </script>` 
        }} />
        <Partial name="body">
            <Component />
        </Partial>
        
      </body>
      <footer>
        <Footer></Footer>
      </footer>
    </html>
  );
}
