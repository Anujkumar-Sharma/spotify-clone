import { Spotify } from "../modules/user/user.model";

export const getCurrentTimePlus55Minutes = () => {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + 55);
  return currentTime;
};

const getHeaders = async () => {
  let spotifyData = await Spotify.findOne();
  if (!spotifyData || !isEndTimeGreaterThanCurrentTime(spotifyData?.endTime)) {
    await generateToken();
    spotifyData = await Spotify.findOne();
  }
  return {
    Authorization: `Bearer ${spotifyData.token}`,
  };
};

export const isEndTimeGreaterThanCurrentTime = (endTime: Date) => {
  const currentTime = new Date();
  return endTime > currentTime;
};

export const findTracksByIds = async (ids: Array<string>) => {
  const headers = await getHeaders();

  let tracks = await fetch(
    `https://api.spotify.com/v1/tracks?ids=${ids.toString()}`,
    { headers }
  );
  tracks = await tracks.json();
  return tracks;
};

export const getRandomTracksList = async () => {
  const headers = await getHeaders();

  let tracks = await fetch(
    `https://api.spotify.com/v1/recommendations?limit=100&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA`,
    { headers }
  );

  tracks = await tracks.json();
  return tracks;
};

export const searchOnSpotify = async (search: string) => {
  const headers = await getHeaders();

  let tracks = await fetch(
    `https://api.spotify.com/v1/search?q=${search}&type=album%2Cartist%2Ctrack%2Caudiobook`,
    { headers }
  );

  tracks = await tracks.json();
  return tracks;
};

export const generateToken = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";

  // Encode the Client ID and Client Secret in Base64
  const message = `${clientId}:${clientSecret}`;
  const messageBase64 = btoa(message);

  // Set up the data and headers for the request
  const data = new URLSearchParams({
    grant_type: "client_credentials",
  });

  const tokenHeader = {
    Authorization: `Basic ${messageBase64}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Make the POST request to get the token
  let response = await fetch(tokenUrl, {
    method: "POST",
    headers: tokenHeader,
    body: data,
  });

  const token = await response.json();
  const spotifyData = await Spotify.findOne();
  if (!spotifyData) {
    await Spotify.create({
      token: token.access_token,
      endTime: getCurrentTimePlus55Minutes(),
    });

  } else if (!isEndTimeGreaterThanCurrentTime(spotifyData.endTime)) {
    spotifyData.token = token.access_token;
    spotifyData.endTime = getCurrentTimePlus55Minutes();
    await spotifyData.save();
  }
};
