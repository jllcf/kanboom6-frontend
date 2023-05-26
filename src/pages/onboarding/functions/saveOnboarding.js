const saveOnboarding = (setShowOnboarding) => {
  localStorage.setItem("onboardingCompleted", true);
  setShowOnboarding(false);
};

export default saveOnboarding;
