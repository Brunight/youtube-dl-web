import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import querystring from 'querystring';

import youtubeGetId from '../../utils/youtubeGetId';

import { Container, Content } from './styles';

import YoutubeSVG from '../../assets/youtube_logo.svg';

const Dashboard: React.FC = () => {
  const [video, setVideo] = useState('');

  const history = useHistory();

  useEffect(() => {
    try {
      new URL(video);
      const id = youtubeGetId(video);
      if (id !== video) history.push(`/info/youtube/${id}`);
    } catch (err) {}
  }, [video]);

  return (
    <>
      <Container>
        <Content>
          <img src={YoutubeSVG} alt="YoutubeSVG" width={256} />
          <h1>Download audio from YouTube</h1>
          <h3>Editing mp3 files and downloading videos soon</h3>
          <input
            placeholder="Ex: https://www.youtube.com/watch?v=bwfT9pDV_-4"
            onChange={(e) => setVideo(e.target.value)}
          />
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
