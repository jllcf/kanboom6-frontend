const handleOnboardSceneChange = (current, direction) => {
  if (direction === "next" && current === 4) {
    return;
  }
  if (direction === "previous" && current === 1) {
    return;
  }
  return direction === "next" ? current + 1 : current - 1;
};

export default handleOnboardSceneChange;
