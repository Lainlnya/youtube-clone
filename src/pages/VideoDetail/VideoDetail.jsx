import React from 'react';
import { useParams } from 'react-router-dom';
import Home from '../Home/Home';

export default function VideoDetail() {
  const { videoid } = useParams();
  return (
    <>
      <Home search={videoid} />
    </>
  );
}
