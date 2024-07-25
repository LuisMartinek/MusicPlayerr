const playlistSongs = document.getElementById("playlist-songs"); // Step 1
const playButton = document.getElementById("play"); // Step 1
const pauseButton = document.getElementById("pause"); // Step 1
const nextButton = document.getElementById("next"); //Step 2
const previousButton = document.getElementById("previous"); //Step 2
const shuffleButton = document.getElementById("shuffle"); //Step 2
const allSongs = [{
    id: 0,
    title: "Scratching The Surface",
    artist: "Quincy Larson",
    duration: "4:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
}, 
{
id: 1,
title: "Can't Stay Down",
artist: "Quincy Larson",
duration: "4:15",
src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
},
{
    id: 2,
    title: "Still Learning",
    artist: "Quincy Larson",
    duration: "3:51",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
},
{
    id: 3,
    title: "Cruising for a Musing",
    artist: "Quincy Larson",
    duration: "3:34",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    artist: "Quincy Larson",
    duration: "3:35",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  {
    id: 5,
    title: "From the Ground Up",
    artist: "Quincy Larson",
    duration: "3:12",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
  },
  {
    id: 6,
    title: "Walking on Air",
    artist: "Quincy Larson",
    duration: "3:25",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
  },
  {
    id: 7,
    title: "Can't Stop Me. Can't Even Slow Me Down.",
    artist: "Quincy Larson",
    duration: "3:52",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
  },
  {
    id: 8,
    title: "The Surest Way Out is Through",
    artist: "Quincy Larson",
    duration: "3:10",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
  },
  {
    id: 9,
    title: "Chasing That Feeling",
    artist: "Quincy Larson",
    duration: "2:43",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
  },
]; //Step 3 & 4 & 5 & 6

const audio = new Audio(); //Step 7 // Web Audio API
let userData = { // 8
    songs: [...allSongs], // 9 //The spread operator (...) allows you to copy all elements from one array into another. It can also be used to concatenate multiple arrays into one.
    currentSong: null,
    songCurrentTime: 0, // 10
};

//Arrow Functions
// Basic syntax
//() => {}
// To create a named arrow function, you can assign the function to a variable:
//const exampleFunction = () => {
  // code goes here}


/* const printGreeting = () =>{
    console.log("Hello there!");
} // 11

printGreeting(); // 12

const printMessage = org => { // 13
  console.log(`${org} is awesome!`) 
}
printMessage("freeCodeCamp"); // 13

const addTwoNumbers = (num1, num2) => num1 + num2; // 14 & 15


console.log(addTwoNumbers(3, 4)); // 14 */

const renderSongs = array => { // 17
  const songsHTML = array.map((song) => { return `<li id="song-${song.id}" class="playlist-song"> 
  <button class="playlist-song-info">
  <span class="playlist-song-title">${song.title}</span>
  <span class="playlist-song-artist">${song.artist}</span>
  <span class="playlist-song-duration">${song.duration}</span>
  </button>
  <button class="playlist-song-delete arial-label="Delete"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
${song.title}</button>
  </li>`}).join(""); // 18 & 19 & 20 & 21 & 22 & 23 & 24
   playlistSongs.innerHTML = songsHTML // 25
}
renderSongs(userData?.songs); // 26

const sortSongs = () => { // 27
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) { // 30 
      return -1; // sort() method in Test.js ausprobieren 
    }
  }); // 28 & 29
};
