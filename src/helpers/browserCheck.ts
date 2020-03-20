export const isBrowserNotChrome = () => {
  return (
    navigator.userAgent.search("Safari") > 1 ||
    navigator.userAgent.search("Firefox") > 1
  );
};
