const onboardingScenes = (scene) => {
  switch (scene) {
    case 1:
      return {
        title: "Conheça o Kanboom",
        image: "../../assets/onboarding-1.png",
        paragraph:
          "Kanboom é uma plataforma de gestão de tarefas 100% voltado para pessoas de desenvolvimento! \n Simples de usar e pronto para começar a melhorar seu fluxo de trabalho.",
      };
    case 2:
      return {
        title: "Criando Quadros",
        image: "../../assets/onboarding-2.png",
        paragraph:
          "Quadros são como seus projetos serão organizados. Você pode criar mais de um quadro, basta clicar no botão ”criar quadro” no canto superior direito na tela de ”meus quadros”",
      };
    case 3:
      return {
        title: "Criando Colunas",
        image: "../../assets/onboarding-3.png",
        paragraph:
          "Colunas representam os estágios do seu processo de trabalho. Você pode adicionar quantas colunas quiser, basta clicar no botão ”Adicionar Coluna” na última coluna do seu quadro.",
      };
    case 4:
      return {
        title: "Criando Cards",
        image: "../../assets/onboarding-4.png",
        paragraph:
          "Cards representam as tarefas ou funcionalidades que você irá monitorar. Basta clicar no botão ”Adicionar Card” na parte inferior de uma coluna para adicionar seu novo card.\n Você pode preencher também as estimativas de complexidade e tempo para te ajudar a se planejar no seu dia-a-dia!",
      };
    default:
      break;
  }
};

export default onboardingScenes;
