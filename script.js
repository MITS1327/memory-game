(() => {
  const cards = document.querySelectorAll('.card');
  const wrapper = document.querySelector('.wrapper');
  let hasFlippedCard = false;
  let displayLocked = false;
  let firstCard, secondCard;
  let resetButton;
  let counter = 0 ;

  const flipCard = e => {
    if (displayLocked) return;

    const target = e.target.parentElement;

    if (target === firstCard) return;

    target.classList.add("flip");

    if (!hasFlippedCard) {
      //первое нажатие

      hasFlippedCard = true;
      firstCard = target;
    } else {
      //второе нажаие

      hasFlippedCard = false;
      secondCard = target;

      // проверка совпадений
      ChekForMatch();
    }
      if(firstCard.dataset.number === secondCard.dataset.number) {
        counter = counter + 1;
      };
      console.log(counter);
      if(counter === 8) {
        addResetButton();
      }
  };

  const ChekForMatch = () => {
    const isEqual = firstCard.dataset.number === secondCard.dataset.number;
    isEqual ? disabledCards() : unflipedCards();
  }

  const disabledCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  }

  const unflipedCards = () => {
    displayLocked = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetDisplay();
    }, 1000);
  }

  const resetDisplay = () => {
    hasFlippedCard = displayLocked = false;
    firstCard = secondCard = null;
  };

  cards.forEach(card => {
    //добавляем события для каждой карточки

    card.addEventListener('click', flipCard);

    const randomIndex = Math.floor(Math.random() * cards.length);
    card.style.order = randomIndex;
  });

  const addResetButton = () => {
    resetButton = document.createElement('button')
    resetButton.textContent = 'Начать заново';
    wrapper.append(resetButton);
    resetButton.addEventListener('click' , function() {
      window.location.reload();
    });
  };
})();
