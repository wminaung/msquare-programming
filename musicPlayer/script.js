//<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1227440014%3Fsecret_token%3Ds-XgoXMXAhYT4&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/win-min-aung-357690693" title="Win Min Aung" target="_blank" style="color: #cccccc; text-decoration: none;">Win Min Aung</a> · <a href="https://soundcloud.com/win-min-aung-357690693/ozegdm8cpwm/s-XgoXMXAhYT4" title="တင္တင္ျမင့္။ယေသာ္ဓရာအလြမ္း - OZEgdm8CpWM" target="_blank" style="color: #cccccc; text-decoration: none;">တင္တင္ျမင့္။ယေသာ္ဓရာအလြမ္း - OZEgdm8CpWM</a></div>
const tracks = [
  {
    track: "../mp3/တင္တင္ျမင့္။ယေသာ္ဓရာအလြမ္း-OZEgdm8CpWM.mp3",
    name: "တင္တင္ျမင့္။ယေသာ္ဓရာအလြမ္း",
    artist: "don't know",
  },
  {
    track: "../mp3/တောထွက်ခန်း - မာမာအေး-xJj6VFi9MjI.mp3",
    name: "တောထွက်ခန်း",
    artist: "မာမာအေး",
  },
  {
    track: "../mp3/ထူးမျခားနား( ျမ၀တီမင္းၾကီး ဦးစ- မသိန္းဟန္)-zF8PX9BMBMI.mp3",
    name: "ထူးမျခားနား",
    artist: " ျမ၀တီမင္းၾကီး ဦးစ- မသိန္းဟန္",
  },
  {
    track: "../mp3/ဓမၼစႀကၤာ- Mar Mar Aye-wc3QEDznYX4.mp3",
    name: "ဓမၼစႀကၤာ",
    artist: "မာမာအေး",
  },
  {
    track:
      "../mp3/ဗေါဓိပင် နှင့် ရွှေပလ္လင် ( တေးဆို - မာမာအေး)-2TYsUqnjGXM.mp3",
    name: "ေါဓိပင် နှင့် ရွှေပလ္လင်",
    artist: "မာမာအေး",
  },
];
const progressBar = document.getElementById("progressBar");
const root = document.getElementById("root");
const audioTag = document.getElementById("audio");
const playTag = document.querySelector(".play");
const previousTag = document.querySelector(".previous");
const pauseTag = document.querySelector(".pause");
const nextTag = document.querySelector(".next");
const timeTag = document.querySelector(".time");

// create div
tracks.map((track, trackIndex) => {
  let no = 1 + trackIndex;
  const trackHolder = document.createElement("div");
  trackHolder.className = "trackHolder";

  const trackName = document.createElement("div");
  trackName.textContent = no + ". " + track.name;

  const trackArtist = document.createElement("div");
  trackArtist.textContent = track.artist;

  trackHolder.append(trackName, trackArtist);
  root.append(trackHolder);

  //track play click event
  trackHolder.addEventListener("click", () => {
    audioTag.src = track.track;
    isPlaying = true;
    updatePlayAndPause();
    audioTag.play();

    i = trackIndex;
  });
});

let isPlaying = false;
let i = 0;
playTag.addEventListener("click", () => {
  let currentTime = Math.floor(audioTag.currentDuration);
  if (currentTime === 0) {
    audioForFun(i);
  } else {
    audioTag.play();
    isPlaying = true;
    updatePlayAndPause();
  }
});

//pauseButton
pauseTag.addEventListener("click", () => {
  isPlaying = false;
  audioTag.pause();
  updatePlayAndPause();
});

//previousButton
previousTag.addEventListener("click", () => {
  if (i === 0) {
    return;
  }
  i -= 1;
  audioForFun(i);
});

//nextButton
nextTag.addEventListener("click", () => {
  if (i === 4) {
    return;
  }
  i += 1;
  audioForFun(i);
});

let duration = 0;
let durationText = "";
//audio is loaded
audioTag.addEventListener("loadeddata", (e) => {
  duration = Math.floor(e.target.duration);
  durationText = createText(duration);
});

//audio is time updating
audioTag.addEventListener("timeupdate", (e) => {
  let currentDuration = Math.floor(e.target.currentTime);

  let currentText = createText(currentDuration);

  const currentProgress = document.getElementById("currentProgress");

  // this is for time textContent
  if (duration > 0) {
    timeTag.textContent = `${currentText.MinuteText}:${currentText.SecondText} / ${durationText.MinuteText}:${durationText.SecondText}`;
    let j = (500 / duration) * currentDuration;

    currentProgress.style.width = j + "px"; // for update progress with bc-red
  }
});

//cretaet time text function return m & s object
const createText = (duration) => {
  let MinuteText =
    Math.floor(duration / 60) < 10
      ? "0" + Math.floor(duration / 60)
      : Math.floor(duration / 60);
  let SecondText = duration % 60 < 10 ? "0" + (duration % 60) : duration % 60;
  return {
    MinuteText,
    SecondText,
  };
};

//for play pause toggle
const updatePlayAndPause = () => {
  if (isPlaying) {
    pauseTag.classList.remove("dn");
    playTag.classList.add("dn");
  } else {
    pauseTag.classList.add("dn");
    playTag.classList.remove("dn");
  }
};

//for dry
const audioForFun = (i) => {
  audioTag.src = tracks[i].track;
  isPlaying = true;
  updatePlayAndPause();
  audioTag.play();
};
