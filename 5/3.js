const ICONS = {
    play: '<span class="material-icons">play_arrow</span>',
    pause: '<span class="material-icons">pause</span>',
    mute: '<span class="material-icons">volume_off</span>',
    low: '<span class="material-icons">volume_down</span>',
    high: '<span class="material-icons">volume_up</span>',
    fullscreen: '<span class="material-icons">fullscreen</span>',
    exitFullscreen: '<span class="material-icons">fullscreen_exit</span>'
};
const setIcon = (el, icon) => el.innerHTML = ICONS[icon];

const videoPlayerContainer = document.querySelector('.video-player-container');
const video = document.querySelector('.main-video');
const playPauseButton = document.querySelector('.play-pause-button');
const progressBar = document.querySelector('.progress-bar');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');
const volumeButton = document.querySelector('.volume-button');
const volumeSlider = document.quertSelector('.volume-slider');

const setVolumeIcon = v => setIcon(volumeButton, v === 0
    ? 'mute' : v < 0.5 ? 'low' : 'high');
    const setPlayPauseIcon = paused => setIcon(playPauseButton,
        paused? 'play' : 'pause');
        const setFullscreenIcon = full => setIcon(fullscreenButton,
            full ? 'fullscreen' : 'exitFullscreen');
            const formatTime = t => `${Math.floor(t/ 60)}
            :${String(Math.floor(t % 60)).padStart(2, '0')}`;

            const updateProgress = () => {
                progressBar.value = video.currentTime;
                currentTimeDisplay.textContent = formatTime(video.currentTime);
            };
            video.addEventListener('loadedmetadata', () => {
                durationDisplay.textContent = formatTime(video.duration);
                progressBar.max = video.duration;
                updateProgress();
            });

            video.addEventListener('timeupdate', updateProgress);

            progressBar.addEventListener('input', () =>
            video.currentTime = progressBar.value);

            const togglePlay = () => {
                if(video.paused || video.ended) {
                    video.play();
                    setPlayPauseIcon(false);
                } else {
                    video.pause();
                    setPlayPauseIcon(true);
                }
            };
            playPauseButton.addEventListener('click', togglePlay);
            video.addEventListener('click', togglePlay);

            volumeSlider.addEventListener('input', () => {
                video.volume = volumeSlider.value;
                setVolumeIcon(video.volume);
            });

            fullscreenButton.addEventListener('click', () => {
                if (!document.fullscreenElement) videoPlayerContainer.requestFullscreen();
                else document.exitFullscreen();
            });

            document.addEventListener('fullscreenchange', () => 
            setFullscreenIcon(!!document.fullscreenElement));

            setPlayPauseIcon(true);
            setVolumeIcon(video.volume);
            setFullscreenIcon(false);

            function createYoutubeIframe(videoId) {
                const iframe = document.createElement('iframe');
                iframe.classList.add('main-video');
                iframe.src = `https://www.youtube.com/embed/${videoId}
                ?enablejsapi=1`;
                iframe.frameBorder = "0";
                iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                return iframe;
            }

            function injectYouTubeAPI() {
                if (!window.YT) {
                    const tag = document.createElement('script');
                    tag.src = 'https://www.youtube.com/iframe_api';
                    document.head.appendChild(tag);
                }
            }

            function loadYouTubeVideo(videoId) {
                const iframe = createYoutubeIframe(videoId);
                const oldVideo = document.querySelector('.main-video');
                oldVideo.parentNode.replaceChild(iframe, oldVideo);
                injectYouTubeAPI();

                window.onYouTubeIframeAPIReady = function() {
                    const player = new YT.Player(iframe, {
                        events: {
                            'onStateChange': event => setPlayPauseIcon
                            (event.data === YT.PlayerState.PAUSED),
                            'onReady': event => {
                                const duration = event.target.getDuration();
                                durationDisplay.textContent = formatTime(duration);
                                progressBar.max = duration;
                                setInterval(() => {
                                    progressBar.value = event.target.getCurrentTime();
                                    currentTimeDisplay.textContent = formatTime
                                    (event.target.getCurrentTime());
                                }, 1000);
                            }
                        }
                });
                }
            }