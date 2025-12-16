function handleFeedNavigation({ user, setIsLoginned, navigate }) {
  if (!user) {
    setIsLoginned(false);
  } else {
    setIsLoginned(true);
    navigate("/feed");
  }
}

export default handleFeedNavigation;
