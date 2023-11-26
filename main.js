const playlist = [
    { title: "Seikai Fuseika", artist: "CIVILIAN", src: "audio/Seikai Fuseikai.mp3", cover: "img/portada1.jpg" },
    { title: "High Stepper", artist: "Yuiko Oohara", src: "audio/High Stepper.mp3", cover: "img/portada2.jpg" },
    { title: "Lolis God", artist: "Wataten5", src: "audio/Happy Happy Friends.mp3", cover: "img/portada3.jpg" }
    // Agrega más canciones según sea necesario
];

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const coverImage = document.getElementById("coverImage");
    const volumeSlider = document.getElementById("volume");
    const volumeValue = document.getElementById("volumeValue");
    const progressContainer = document.getElementById("progress-container");
    const progress = document.getElementById("progress");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const titleElement = document.getElementById("title");
    const artistElement = document.getElementById("artist");

    let currentSongIndex = 0;

    playPauseBtn.addEventListener("click", togglePlayPause);
    volumeSlider.addEventListener("input", updateVolume);
    progressContainer.addEventListener("click", setProgress);
    prevBtn.addEventListener("click", playPrev);
    nextBtn.addEventListener("click", playNext);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", playNext);

    // Establecer el volumen por defecto al 30%
    audio.volume = 0.3;
    volumeSlider.value = 0.3;
    volumeValue.textContent = "30%";

    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = "&#10074;&#10074;"; // Símbolo de pausa
        } else {
            audio.pause();
            playPauseBtn.innerHTML = "&#9658;"; // Símbolo de reproducción
        }
    }

    function updateVolume() {
        audio.volume = volumeSlider.value;
        volumeValue.textContent = Math.round(volumeSlider.value * 100) + "%";
    }

    function setProgress(event) {
        const totalWidth = progressContainer.clientWidth;
        const clickX = event.clientX - progressContainer.getBoundingClientRect().left;
        const percentage = (clickX / totalWidth) * 100;
        audio.currentTime = (percentage / 100) * audio.duration;
    }

    function playPrev() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(playlist[currentSongIndex]);
    }

    function playNext() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(playlist[currentSongIndex]);
    }

    function updateProgress() {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + "%";
    }

    function loadSong(song) {
        titleElement.textContent = song.title;
        artistElement.textContent = song.artist;
        coverImage.src = song.cover; // Actualiza la imagen de la portada
        audio.src = song.src;
        audio.play();
        playPauseBtn.innerHTML = "&#10074;&#10074;"; // Símbolo de pausa
    }
});