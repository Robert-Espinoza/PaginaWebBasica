document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const volumeSlider = document.getElementById("volume");
    const volumeValue = document.getElementById("volumeValue");
    const progressContainer = document.getElementById("progress-container");
    const progress = document.getElementById("progress");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const totalDurationElement = document.getElementById('totalDuration');

    playPauseBtn.addEventListener("click", togglePlayPause);
    volumeSlider.addEventListener("input", updateVolume);
    progressContainer.addEventListener("click", setProgress);
    prevBtn.addEventListener("click", playPrev);
    nextBtn.addEventListener("click", playNext);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener('loadedmetadata', () => {
    const totalDuration = formatTime(audio.duration);
    totalDurationElement.textContent = totalDuration;
});

  // Establecer el volumen predeterminado al 50%
    audio.volume = 0.3;
    volumeSlider.value = 0.3;
    volumeValue.textContent = "30%";

    playPauseBtn.addEventListener("click", togglePlayPause);
    volumeSlider.addEventListener("input", updateVolume);
    progressContainer.addEventListener("click", setProgress);
    prevBtn.addEventListener("click", playPrev);
    nextBtn.addEventListener("click", playNext);
    audio.addEventListener("timeupdate", updateProgress);
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = "&#10074;&#10074;"; // Pause symbol
        } else {
            audio.pause();
            playPauseBtn.innerHTML = "&#9658;"; // Play symbol
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
        // Implement logic to play the previous song
        // For simplicity, let's assume you have an array of song sources
        const playlist = ["song1.mp3", "song2.mp3", "song3.mp3"];
        const currentSongIndex = playlist.indexOf(audio.src);
        const prevSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        audio.src = playlist[prevSongIndex];
        audio.play();
    }

    function playNext() {
        // Implement logic to play the next song
        // For simplicity, let's assume you have an array of song sources
        const playlist = ["song1.mp3", "song2.mp3", "song3.mp3"];
        const currentSongIndex = playlist.indexOf(audio.src);
        const nextSongIndex = (currentSongIndex + 1) % playlist.length;
        audio.src = playlist[nextSongIndex];
        audio.play();
    }

    function updateProgress() {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + "%";
    }

    function updateSongInfo(title, artist) {
    document.getElementById('title').innerText = title;
    document.getElementById('artist').innerText = artist;
}

// Llamas a esta función cuando cambias de canción
updateSongInfo('Seikai Fuseikai', 'CIVILIAN');
});