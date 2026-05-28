const shuffleBtn = document.getElementById("shuffle");
const loopBtn = document.getElementById("loop");

let isShuffle = false;
let isLoop = false;
const songs = [

  // HINDI SONGS

  {
    title: "Love Me",
    artist: "Salman Khan - Wanted",
    src: "songs/love-me.mp3",
    cover: "images/love-me.jpg",
    category: "Hindi"
  },

  {
    title: "You're My Love",
    artist: "Partner - Armaan Malik",
    src: "songs/youre-my-love.mp3",
    cover: "images/partner.jpg",
    category: "Hindi"
  },

  {
    title: "Rani Me Tu Raja",
    artist: "Son of Sardar - Sonu Nigam",
    src: "songs/rani-me-tu-raja.mp3",
    cover: "images/rani-raja.jpg",
    category: "Hindi"
  },

  {
    title: "Love Dose",
    artist: "Yo Yo Honey Singh",
    src: "songs/love-dose.mp3",
    cover: "images/love-dose.jpg",
    category: "Hindi"
  },



  // ENGLISH SONGS

  {
    title: "Levitating",
    artist: "Dua Lipa",
    src: "songs/levitating.mp3",
    cover: "images/levitating.jpg",
    category: "English"
  },

  {
    title: "Chanel",
    artist: "Tyla",
    src: "songs/chanel.mp3",
    cover: "images/chanel.jpg",
    category: "English"
  },

  {
    title: "Dance Monkey",
    artist: "Tones and I",
    src: "songs/dance-monkey.mp3",
    cover: "images/dance-monkey.jpg",
    category: "English"
  },

  {
    title: "Tout Donner (Slowed)",
    artist: "Slowed Version",
    src: "songs/tout-donner.mp3",
    cover: "images/tout-donner.jpg",
    category: "English"
  }

];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const currentTime = document.getElementById("current");
const durationTime = document.getElementById("duration");

const hindiList = document.getElementById("hindi-list");
const englishList = document.getElementById("english-list");

let songIndex = 0;

function loadSong(song){
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

loadSong(songs[songIndex]);

function playSong(){
  audio.play();
  playBtn.innerText = "⏸ Pause";
}

function pauseSong(){
  audio.pause();
  playBtn.innerText = "▶ Play";
}

function pauseSong(){
  audio.pause();
  playBtn.innerText = "▶";
}

playBtn.addEventListener("click", () => {
  if(audio.paused){
    playSong();
  } else {
    pauseSong();
  }
});
shuffleBtn.addEventListener("click", () => {

  isShuffle = !isShuffle;

  if(isShuffle){
    shuffleBtn.style.background = "#22c55e";
  } else {
    shuffleBtn.style.background = "#38bdf8";
  }

});
loopBtn.addEventListener("click", () => {

  isLoop = !isLoop;

  audio.loop = isLoop;

  if(isLoop){
    loopBtn.style.background = "#22c55e";
  } else {
    loopBtn.style.background = "#38bdf8";
  }

});

nextBtn.addEventListener("click", () => {

  if(isShuffle){

    songIndex = Math.floor(Math.random() * songs.length);

  } else {

    songIndex++;

    if(songIndex > songs.length - 1){
      songIndex = 0;
    }

  }

  loadSong(songs[songIndex]);
  playSong();

});

prevBtn.addEventListener("click", () => {
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {

  progress.value = (audio.currentTime / audio.duration) * 100;

  let currentMinutes = Math.floor(audio.currentTime / 60);
  let currentSeconds = Math.floor(audio.currentTime % 60);

  let durationMinutes = Math.floor(audio.duration / 60);
  let durationSeconds = Math.floor(audio.duration % 60);

  if(currentSeconds < 10){
    currentSeconds = "0" + currentSeconds;
  }

  if(durationSeconds < 10){
    durationSeconds = "0" + durationSeconds;
  }

  currentTime.innerText = `${currentMinutes}:${currentSeconds}`;

  if(durationMinutes){
    durationTime.innerText = `${durationMinutes}:${durationSeconds}`;
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function createPlaylist(){

  songs.forEach((song, index) => {

    const li = document.createElement("li");
    li.innerText = song.title + " - " + song.artist;

    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(song);
      playSong();
    });

    if(song.category === "Hindi"){
      hindiList.appendChild(li);
    } else {
      englishList.appendChild(li);
    }
  });
}

createPlaylist();

audio.addEventListener("ended", () => {

  if(!isLoop){
    nextBtn.click();
  }

});