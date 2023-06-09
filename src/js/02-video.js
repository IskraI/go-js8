import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_TIME = 'videoplayer-current-time';

const currentTime = localStorage.getItem(STORAGE_TIME)
  ? Number(localStorage.getItem(STORAGE_TIME))
  : 0;

function getCurrentTime(e) {
  localStorage.setItem(STORAGE_TIME, e.seconds);
}
player.on('timeupdate', throttle(getCurrentTime, 1000));

player.setCurrentTime(currentTime);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
