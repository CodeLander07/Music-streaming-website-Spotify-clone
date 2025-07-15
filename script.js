class PopularSongsPlayer {
    constructor() {
        this.currentSong = null;
        this.isPlaying = false;
        this.songs = {
            1: { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20" },
            2: { title: "Shape of You", artist: "Ed Sheeran", album: "÷ (Divide)", duration: "3:53" },
            3: { title: "Bad Habits", artist: "Ed Sheeran", album: "= (Equals)", duration: "3:51" },
            4: { title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23" },
            5: { title: "Stay", artist: "The Kid LAROI, Justin Bieber", album: "F*CK LOVE 3", duration: "2:21" },
            6: { title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58" },
            7: { title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55" },
            8: { title: "Imagine", artist: "John Lennon", album: "Imagine", duration: "3:03" },
            9: { title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", duration: "4:54" }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupProgressBar();
    }
    
    setupEventListeners() {
        // Song card click events
        document.querySelectorAll('.song-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const songId = card.dataset.song;
                this.playSong(songId, card);
            });
        });
        
        // Play/pause button
        document.querySelector('.play-pause-btn').addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Like button
        document.querySelector('.like-btn').addEventListener('click', (e) => {
            e.target.classList.toggle('active');
        });
        
        // Volume button (toggle mute simulation)
        document.querySelector('.volume-btn').addEventListener('click', (e) => {
            const icon = e.target;
            if (icon.classList.contains('fa-volume-high')) {
                icon.classList.remove('fa-volume-high');
                icon.classList.add('fa-volume-mute');
            } else {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-high');
            }
        });
    }
    
    playSong(songId, cardElement) {
        const song = this.songs[songId];
        if (!song) return;
        
        // Remove playing state from all cards
        document.querySelectorAll('.song-card').forEach(card => {
            card.classList.remove('playing');
        });
        
        // Add playing state to current card
        cardElement.classList.add('playing');
        
        // Update current song info
        this.currentSong = songId;
        this.updateNowPlaying(song, cardElement);
        
        // Update play button state
        this.isPlaying = true;
        this.updatePlayButton();
        
        // Start progress simulation
        this.startProgressSimulation(song.duration);
    }
    
    updateNowPlaying(song, cardElement) {
        const img = cardElement.querySelector('.card-img');
        const currentSongImg = document.querySelector('.current-song-img');
        const currentSongTitle = document.querySelector('.current-song-title');
        const currentSongArtist = document.querySelector('.current-song-artist');
        const totalTime = document.querySelector('.curr-total');
        
        currentSongImg.src = img.src;
        currentSongTitle.textContent = song.title;
        currentSongArtist.textContent = song.artist;
        totalTime.textContent = song.duration;
    }
    
    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        
        if (this.isPlaying && this.currentSong) {
            this.startProgressSimulation(this.songs[this.currentSong].duration);
        }
    }
    
    updatePlayButton() {
        const playBtn = document.querySelector('.play-pause-btn');
        // In a real implementation, you'd change the icon source
        playBtn.style.opacity = this.isPlaying ? '1' : '0.7';
    }
    
    setupProgressBar() {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.addEventListener('input', (e) => {
            const value = e.target.value;
            this.updateCurrentTime(value);
        });
    }
    
    startProgressSimulation(duration) {
        if (!this.isPlaying) return;
        
        const progressBar = document.querySelector('.progress-bar');
        const currentTime = document.querySelector('.curr-time');
        
        // Simple simulation - in real app, this would be tied to actual audio
        let progress = 0;
        const interval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(interval);
                return;
            }
            
            progress += 0.5;
            if (progress >= 100) {
                clearInterval(interval);
                this.isPlaying = false;
                this.updatePlayButton();
                return;
            }
            
            progressBar.value = progress;
            this.updateCurrentTime(progress);
        }, 100);
    }
    
    updateCurrentTime(progress) {
        const currentTimeSpan = document.querySelector('.curr-time');
        const totalTimeSpan = document.querySelector('.curr-total');
        const totalTime = totalTimeSpan.textContent;
        
        // Convert progress to time format
        const [minutes, seconds] = totalTime.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        
        const currentMinutes = Math.floor(currentSeconds / 60);
        const remainingSeconds = currentSeconds % 60;
        
        currentTimeSpan.textContent = `${currentMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PopularSongsPlayer();
});