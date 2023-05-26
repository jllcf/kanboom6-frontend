import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Image, ModalBody } from "react-bootstrap";
import onboardingScenes from "./utils/onboardingScenes";
import saveOnboarding from "./functions/saveOnboarding";
import OnboardingNavigation from "./components/OnboardingNavigation";

const Onboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingScene, setOnboardingScene] = useState(1);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (!onboardingCompleted) setShowOnboarding(true);
  }, []);

  return (
    <>
      <Modal show={showOnboarding} backdrop="static" keyboard={false}>
        <ModalBody>
          <div className="d-flex justify-content-end">
            <button className="onboarding-button skip-button" onClick={() => saveOnboarding(setShowOnboarding)}>
              Pular
            </button>
          </div>
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

            <OnboardingNavigation onboardingScene={onboardingScene} setOnboardingScene={setOnboardingScene} setShowOnboarding={setShowOnboarding} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Onboarding;
