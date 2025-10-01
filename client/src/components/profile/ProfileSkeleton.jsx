function ProfileSkeleton() {
  return (
    <div className="sm:w-full max-w-5xl w-full px-6 sm:px-8 m-auto py-8 flex flex-col gap-6">
      {/* Profile Header Skeleton */}
      <div className="flex gap-10 justify-center">
        <div className="skeleton h-24 w-24 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="skeleton h-6 w-32"></div>
          <div className="skeleton h-5 w-24"></div>
        </div>
      </div>

      {/* Bio Skeleton */}
      <div className="skeleton h-20 w-full"></div>

      {/* Divider Skeleton */}
      <div className="skeleton h-4 w-32 mx-auto"></div>

      {/* Tabs Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="skeleton h-24 w-full"></div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
