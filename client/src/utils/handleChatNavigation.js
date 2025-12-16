function handleChatNavigation({ user, setIsLoginned, navigate }) {
  if (!user) {
    setIsLoginned(false);
  } else {
    setIsLoginned(true);
    navigate("/chat");
  }
}

export default handleChatNavigation;
