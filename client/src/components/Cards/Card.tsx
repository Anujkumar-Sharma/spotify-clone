import React from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { isTrackId, istrue } from "../../Slices/drawerSlice";

interface CardProps {
  trackId: string | any;
  image: string;
  title: string;
  description: string;
  type: any;
  removeFromPlaylist: any;
  selectedPlaylist: string;
}

const Card: React.FC<CardProps> = ({
  trackId,
  image,
  title,
  description,
  type,
  removeFromPlaylist,
  selectedPlaylist,
}) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    if (type !== "edit") {
      dispatch(isTrackId(trackId));
      dispatch(istrue());
    } else {
      await removeFromPlaylist(selectedPlaylist, trackId);
    }
  };

  return (
    <div className="w-[250px] bg-white border border-green-400 rounded-lg shadow-lg flex flex-col justify-between">
      <img
        className="rounded-t-lg object-cover w-full h-24"
        src={image}
        alt={title}
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h5 className="text-lg font-bold tracking-tight text-green-600">
            {title}
          </h5>
          <p className="text-sm text-gray-700">{description}</p>
        </div>
        <Button
          text={`${type === "edit" ? "Remove From Playlist" : "Add to list"}`}
          additionalClasses="mt-4 bg-green-500 text-white w-full"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
