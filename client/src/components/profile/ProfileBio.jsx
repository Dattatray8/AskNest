function ProfileBio({ bio }) {
  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <p className="text-sm text-base-content/80">{bio}</p>
      </div>
    </div>
  );
}

export default ProfileBio;
