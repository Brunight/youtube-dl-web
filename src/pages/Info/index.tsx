import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiMusic, FiMic, FiDisc, FiMessageSquare } from 'react-icons/fi';
import { BsArrowUpDown } from 'react-icons/bs';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Container, Content } from './styles';
import Cropper from './Cropper';
import TimeSlider, { ChangeEventData } from './TimeSlider';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import parseYoutubeDuration from '../../utils/parseYoutubeDuration';
import api from '../../services/api';

interface InfoParams {
  source: 'youtube' | 'file';
  id: 'string';
}

const Info: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { params } = useRouteMatch<InfoParams>();
  const [cropper, setCropper] = useState<any>();
  const [durationMs, setDurationMs] = useState(0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [durationTime, setDurationTime] = useState('');

  const [cover, setCover] = useState('');

  const { addToast } = useToast();

  useEffect(() => {
    async function run() {
      if (params.source === 'youtube') {
        const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
        if (!apiKey) {
          throw new Error('Missing Youtube API Key in .env');
        }

        const url = `https://www.googleapis.com/youtube/v3/videos?id=${params.id}&key=${apiKey}&part=snippet,contentDetails&fields=items/snippet/title,items/snippet/thumbnails,items/contentDetails/duration`;

        const response = await (await api.get(url)).data.items[0];

        const { thumbnails } = response.snippet;

        const sizes = ['default', 'medium', 'high', 'standard', 'maxres'];

        let thumbnailPath = '';

        sizes.forEach((size) => {
          if (thumbnails[size]) {
            thumbnailPath = thumbnails[size].url;
          }
        });

        // Having Cors problem
        setCover(`http://cors-anywhere.herokuapp.com/${thumbnailPath}`);

        const videoTitle = response.snippet.title;
        let parsedTitle = '';
        let parsedArtist = '';
        if (videoTitle.includes(' - ')) {
          const videoTitleArray = videoTitle.split(' - ');
          [parsedArtist, parsedTitle] = videoTitleArray;
        } else parsedTitle = videoTitle;

        formRef.current?.setData({
          title: parsedTitle,
          artist: parsedArtist,
          album: videoTitle,
          comment: `https://youtu.be/${params.id}`,
        });

        const { duration } = response.contentDetails;
        const durationInMilisseconds = parseYoutubeDuration(duration);

        console.log(durationInMilisseconds);
        setDurationMs(durationInMilisseconds);
      }
      if (params.source === 'file') {
        // TO DO
      }
    }
    run();
  }, [params.id, params.source]);

  const handleTimeSliderChange = useCallback(
    ({ start, end, duration }: ChangeEventData) => {
      setStartTime(start);
      setEndTime(end);
      setDurationTime(duration);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (typeof cropper !== 'undefined') {
      window.scrollTo(0, 0);
      cropper.getCroppedCanvas().toBlob(async function (blob: Blob) {
        const formData = new FormData();

        formData.append('cover', blob);
        console.log(process.env.REACT_APP_SERVER_ADDRESS);

        try {
          const coverResponse = await api.post('/cover', formData);

          const coverUrl = coverResponse.data.url;

          addToast({
            title: 'Sending request to server...',
          });

          const musicResponse = await api.post(
            '/youtube',
            {
              id: params.id,
              title: formRef.current?.getFieldValue('title'),
              artist: formRef.current?.getFieldValue('artist'),
              album: formRef.current?.getFieldValue('album'),
              comment: formRef.current?.getFieldValue('comment'),
              startTime,
              endTime,
              duration: durationTime,
              cover: coverUrl,
            },
            { timeout: 20000 },
          );

          const link = `${
            process.env.REACT_APP_SERVER_ADDRESS || 'http://localhost:3333'
          }/musics/${musicResponse.data.fileName}`;

          addToast({
            title: 'Done!',
            link,
            type: 'success',
          });
          history.push('/');
        } catch (err) {
          addToast({
            title: 'Error!',
            description: err.toString(),
            type: 'error',
          });
          console.log(err);
        }
      });
    }
  }, [cropper, addToast, params.id, startTime, endTime, durationTime, history]);

  const handleSwipe = useCallback(() => {
    const oldTitle = formRef.current?.getFieldValue('title');
    const oldArtist = formRef.current?.getFieldValue('artist');
    let oldAlbum = formRef.current?.getFieldValue('album');
    if (oldAlbum.includes(' - ')) {
      const albumArray = oldAlbum.split(' - ');
      oldAlbum = `${albumArray[1]} - ${albumArray[0]}`;
    }
    formRef.current?.setData({
      title: oldArtist,
      artist: oldTitle,
      album: oldAlbum,
    });
  }, []);

  return (
    <>
      <Container>
        <Content>
          <Cropper
            imgUrl={cover}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
          />
          <TimeSlider
            onChange={(e) => handleTimeSliderChange(e)}
            timeMs={durationMs}
          />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              icon={FiMusic}
            />
            <BsArrowUpDown
              size={32}
              style={{ marginTop: '16px', marginBottom: '16px' }}
              onClick={handleSwipe}
              cursor="pointer"
            />
            <Input
              name="artist"
              type="text"
              placeholder="Artist"
              icon={FiMic}
            />
            <Input name="album" type="text" placeholder="Album" icon={FiDisc} />
            <Input
              name="comment"
              type="text"
              placeholder="Comment"
              icon={FiMessageSquare}
            />
            <Button type="submit">Download</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Info;
