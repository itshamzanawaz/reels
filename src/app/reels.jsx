'use client'
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import client from '@/app/client'
const GET_REELS = gql`
  query MyQuery {
    reels {
      desc
      id
      slug
      stage
      title
      video {
        url
      }
    }
  }
`;

;


const ReelsPage = () => {

  const [currentReelIndex, setCurrentReelIndex] = useState(0);

  const { loading, error, data } = useQuery(GET_REELS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { reels } = data;

  const goToNextReel = () => {
    setCurrentReelIndex((prevIndex) => (prevIndex + 1) % reels.length);
  };

  const goToPreviousReel = () => {
    setCurrentReelIndex((prevIndex) => (prevIndex - 1 + reels.length) % reels.length);
  };

  const currentReel = reels[currentReelIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-3xl p-4 bg-white shadow-lg">
      <video
        key={currentReel.id}
        controls
        autoPlay
        loop
        className="w-full h-80"
      >
        <source src={currentReel.video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className="mt-2 text-xl font-semibold">{currentReel.title}</h2>
      <p className="text-gray-600">{currentReel.desc}</p>
    </div>
    <div className="flex mt-4 space-x-2">
      <button
        onClick={goToPreviousReel}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
      >
        Previous
      </button>
      <button
        onClick={goToNextReel}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
      >
        Next
      </button>
    </div>
  </div>
  );
};

// ...getStaticProps from above

export default ReelsPage;