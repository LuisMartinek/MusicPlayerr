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

const playSong = (id) => { // 35
  const song = userData?.songs.find((song) => song.id === id);
  audio.src = song.src; // 37
  audio.title = song.title; // 37
  if (userData?.currentSong === null || userData?.currentSong.id !== song.id){ // 38 This condition will check if no current song is playing or if the current song is different from the one that is about to be played.
    audio.currentTime = 0; 
  } else { // 39
    audio.currentTime = userData?.songCurrentTime; 
  }
  userData.currentSong = song; // 40
  playButton.classList.add("playing") // 41
  
  highlightCurrentSong(); 
  setPlayerDisplay(); // 71
  setPlayButtonAccessibleText(); // 75
  audio.play() // 40
}

const pauseSong = () => { // 46
  userData.songCurrentTime = audio.currentTime; // 47
  playButton.classList.remove("playing"); // 48
  audio.pause(); // 48
}

const playNextSong  = () => { // 52
  if (userData.currentSong === null){ // 53
    playSong(userData?.songs[0].id)
  } else {
    const currentSongIndex = getCurrentSongIndex(); // 54
    const nextSong = userData?.songs[currentSongIndex + 1]; // 55
    playSong(nextSong.id); // 55
  }
}

const playPreviousSong = () => { // 57 
  if (userData?.currentSong === null){  // 58
    return
  } else {
    const currentSongIndex = getCurrentSongIndex();
    const previousSong = userData?.songs[currentSongIndex - 1]; // 59
    playSong(previousSong.id)
  }
}

const shuffle = () => { // 76
  userData?.songs.sort(() => Math.random() - 0.5); // 77
  userData.currentSong = null; // 78
  userData.songCurrentTime = 0; // 78
  renderSongs(userData?.songs); 
  pauseSong()
  setPlayerDisplay();
  setPlayButtonAccessibleText(); // 79
}

const deleteSong = (id) => { // 81
  if (userData?.currentSong?.id === id){ // 84
    userData.currentSong = null; 
    userData.songCurrentTime = 0; 
    pauseSong();
    setPlayerDisplay(); // 85
  }

  userData.songs = userData?.songs.filter((song) => song.id !== id) // 82
  renderSongs(userData?.songs);
  highlightCurrentSong();
  setPlayButtonAccessibleText(); // 83

  if (userData?.songs.length === 0){ // 87
    const resetButton = document.createElement("button"); // 88
    const resetText = document.createTextNode("Reset Playlist"); // 89
    resetButton.id = "reset"; // 90
    resetButton.ariaLabel = "Reset playlist"; // 90
    resetButton.appendChild(resetText); // 91
    playlistSongs.appendChild(resetButton); // 91
    resetButton.addEventListener("click", () => {
      userData.songs = [...allSongs]; // 93
      renderSongs(sortSongs()); // 94
      setPlayButtonAccessibleText(); // 94
      resetButton.remove(); // 94
    }); // 92
  }
}

const setPlayerDisplay = () => {  // 67
  const playingSong = document.getElementById("player-song-title"); // 68
  const songArtist = document.getElementById("player-song-artist"); // 68
  const currentTitle = userData?.currentSong?.title; // 69
  const currentArtist = userData?.currentSong?.artist; // 69

  playingSong.textContent = currentTitle ? currentTitle : ""; // 70 explanation in the wiki under ternary operators 
  songArtist.textContent = currentArtist ? currentArtist : ""; // 70 
}

const highlightCurrentSong = () => {
  const playlistSongElements = document.querySelectorAll(".playlist-song")
  const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`); // 62
  playlistSongElements.forEach((songEl) => { // 63
    songEl.removeAttribute("aria-current"); // 64
  }); 
  if (songToHighlight) {
    songToHighlight.setAttribute("aria-current", "true"); // 65
  }
}

const renderSongs = array => { // 17
  const songsHTML = array.map((song) => { return `<li id="song-${song.id}" class="playlist-song"> 
  <button class="playlist-song-info" onclick="playSong(${song.id})">
  <span class="playlist-song-title">${song.title}</span>
  <span class="playlist-song-artist">${song.artist}</span>
  <span class="playlist-song-duration">${song.duration}</span>
  </button>
  <button class="playlist-song-delete arial-label="Delete ${song.title}" onclick="deleteSong(${song.id})"><svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
</button>
  </li>`}).join(""); // 18 & 19 & 20 & 21 & 22 & 23 & 24 & 45 & 86
   playlistSongs.innerHTML = songsHTML // 25
}


const setPlayButtonAccessibleText = () => { // 71
  const song = userData?.currentSong || userData?.songs[-1]; // 73
  playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play"); // 73
}

const getCurrentSongIndex = () => { // 50
  return userData?.songs.indexOf(userData?.currentSong); // 51

}


playButton.addEventListener("click", () => {
  if (!userData?.currentSong){ // 43
    playSong(userData?.songs[0].id); 
  } else { // 44
    playSong(userData?.currentSong.id)
  }
}) // 42

pauseButton.addEventListener("click", pauseSong); // 50

nextButton.addEventListener("click", playNextSong); // 56

previousButton.addEventListener("click", playPreviousSong); // 60

shuffleButton.addEventListener("click", shuffle); // 80

audio.addEventListener("ended", () => {
  const currentSongIndex = getCurrentSongIndex(); // 96
  const nextSongExists = userData.songs.length -1 > currentSongIndex ? true : false; // 96
  if (nextSongExists) { // 97
    playNextSong(); 
  } else {
    userData.currentSong = null; // 98
    userData.songCurrentTime = 0; // 98
    pauseSong();
    setPlayerDisplay();
    highlightCurrentSong();
    setPlayButtonAccessibleText(); // 99
  }
}); // 95



const sortSongs = () => { // 27
  userData?.songs.sort((a, b) => {
    if (a.title < b.title) { // 30 
      return -1; 
    }
    if (a.title > b.title) { // 31
      return 1;
    }
      return 0; // 32
  }); // 28 & 29
  return userData?.songs; // 33
};

renderSongs(sortSongs()); // 26 & 34