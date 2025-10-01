import { UserPen } from "lucide-react";

function ProfileHeader({ profileData, userData, user, onEdit }) {
  return (
    <div className="flex gap-10 justify-center relative">
      <div className="avatar">
        <div className="w-24 rounded-full shadow-md ring ring-primary ring-offset-2">
          <img src={profileData?.profileImage || user} alt="Profile" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <div className="font-semibold text-lg">{profileData?.userName}</div>
        {profileData?.profession && (
          <div className="badge badge-primary badge-outline">
            {profileData?.profession}
          </div>
        )}
      </div>
      {userData?._id === profileData?._id && (
        <UserPen
          className="absolute top-0 right-0 cursor-pointer hover:text-primary transition-colors"
          onClick={onEdit}
          size={20}
        />
      )}
    </div>
  );
}

export default ProfileHeader;
