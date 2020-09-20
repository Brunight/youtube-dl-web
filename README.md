![](prints/preview.gif)

# 🎈 About
This is a React web interface for converting Youtube videos to mp3 files with metadata (tags) and album cover art using **youtube-dl** and **ffmpeg**. Please use alongside with [@brunight/youtube-dl-api](https://github.com/brunight/youtube-dl-api).

Allows cropping the video's thumbnail, image file ou image url and send it to the API to be set as album cover art, as well as set a specific duration to audio.

# 📝 Requirements
- NodeJS and NPM or Yarn;
- [YouTube Data API](https://developers.google.com/youtube/v3) key;

# 🛠 Installation
You'll need to set your API key to an Environment Variable. See [Configuration](#configuration).

With npm do:
```bash
npm install
```
Or with yarn do:
```bash
yarn install
```

# ⚙ Configuration <a name="configuration"></a>
Create a file named **.env** in project root and put there your configuration. At the time there are two variables:
- REACT_APP_YOUTUBE_API_KEY - your YouTube Data API key.
- REACT_APP_SERVER_ADDRESS - optional - [youtube-dl-api](https://github.com/brunight/youtube-dl-api) address. If not present, *localhost:3333* will be used.

For examples, check **.env.example** file.

# 🚀 Usage
To start with npm do:
```bash
npm run start
```
Or with yarn do:
```bash
yarn start
```

And that's it. Simply paste an Youtube video link, set the data you want for audio file and press **Download**. Some videos can return a *mpd* manifest/dash file to youtube-dl, causing the overall process to get a bit slower since there more than one stream on it.

When done, you'll be moved back to the homepage and there'll be a Toast with the link for the audio file.

# 👨‍💻 Technologies
- TypeScript;
- Context API;
- Axios;
- Styled Components;
- Polished;
- Date-fns and Moment;
- [Unform](https://github.com/Rocketseat/unform);
- [CropperJS](https://github.com/fengyuanchen/cropperjs) and [React Cropper](https://github.com/react-cropper/react-cropper);
- [React Slider](https://github.com/zillow/react-slider);
- React Icons;
- React Spring;
- uuidv4;
- ESLint;
- Prettier;
- DotEnv;
- Color scheme based on [Omni Theme](https://github.com/getomni);

# 📜 Planned features <a name="planned-features"></a>
- Set volume;
- Show process progress;
- Download video;
- Upload files and change their metadata without changing format, codec, sample rate and bitrate;
- Drag and drop image to load in Cropper canvas;
- Support other plataforms such as Soundcloud;
- Improve UI responsivity for mobile users;
- Download history (with database);
- Solve some Cors Policy problems;
- Suggest album name and cover art by song title and artist;
- Playlist support;

- **Mix this interface and the API into a independent ElectronJS application;**

# 📃 License
MIT. Not recommended to use with copyrighted content. Developed by [Bruno Rodrigues](https://github.com/brunight/).
