import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Image, ModalBody } from "react-bootstrap";
import onboardingScenes from "./utils/onboardingScenes";
import handleOnboardSceneChange from "./functions/handleOnboardSceneChange";
import saveOnboarding from "./functions/saveOnboarding";

const Onboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingScene, setOnboardingScene] = useState(1);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (!onboardingCompleted) setShowOnboarding(true);
  }, []);

  const OnboardingNavigation = () => {
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

  return (
    <>
      <Modal show={showOnboarding} backdrop="static" keyboard={false}>
        <ModalBody>
          <div className="d-flex justify-content-center flex-column">
            <div className="mt-3">
              <Image src={onboardingScenes(onboardingScene).image} fluid style={{ border: "2px solid #757575" }} rounded />
            </div>
            <h3 className="card-title text-center mt-2" style={{ fontSize: "24px" }}>
              {onboardingScenes(onboardingScene).title}
            </h3>
            {onboardingScenes(onboardingScene)
              .paragraph.split("\n")
              .map((paragraph, index) => (
                <p className="card-text text-center mt-2" key={index}>
                  {paragraph}
                </p>
              ))}

            <OnboardingNavigation />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Onboarding;
