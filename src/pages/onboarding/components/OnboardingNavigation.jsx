import handleOnboardSceneChange from "../functions/handleOnboardSceneChange";
import saveOnboarding from "../functions/saveOnboarding";

const OnboardingNavigation = ({ onboardingScene, setOnboardingScene, setShowOnboarding }) => {
  if (onboardingScene === 1) {
    return (
      <button className="onboarding-button" onClick={() => setOnboardingScene(handleOnboardSceneChange(onboardingScene, "next"))}>
        Começar!
      </button>
    );
  }

  return (
    <div className="d-flex justify-content-between">
      <button className="onboarding-button" onClick={() => setOnboardingScene(handleOnboardSceneChange(onboardingScene, "previous"))}>
        Anterior
      </button>
      <button
        className="onboarding-button"
        onClick={() =>
          onboardingScene === 4 ? saveOnboarding(setShowOnboarding) : setOnboardingScene(handleOnboardSceneChange(onboardingScene, "next"))
        }
      >
        {onboardingScene === 4 ? "Finalizar" : "Próximo"}
      </button>
    </div>
  );
};

export default OnboardingNavigation;
