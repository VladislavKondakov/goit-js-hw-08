import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCAL_KEY = 'videoplayer-current-time';
player.on('timeupdate', throttle(getCurrentTime, 1250));

function getCurrentTime(currentTime) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(Math.round(currentTime.seconds)));
  }
  
  if (localStorage.getItem(LOCAL_KEY)) {
    
    player.setCurrentTime(JSON.parse(localStorage.getItem(LOCAL_KEY)));
  }
