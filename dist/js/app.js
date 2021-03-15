// Check Local Storage On Page Load
document.addEventListener('DOMContentLoaded', () => {
    let existingScore = sessionStorage.getItem('RPSSL_Score');
    if (!existingScore) {
      sessionStorage.setItem('RPSSL_Score', 0);
      document.querySelector('.actual-score').innerText = 0;
    } else {
      document.querySelector('.actual-score').innerText = existingScore;
    }
  });
  
  // Turn rules overlay on
  document.getElementById('rules-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'block';
  });
  
  // Turn rules overlay off
  document.getElementById('close-rules-button').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
  });
  
  // Get Random Value
  const getRandNum = () => {
    return Math.floor((Math.random() * 10) / 2);
  };
  
  // Get Message for Player
  const getMessage = (playerVal, houseVal) => {
    let message;
    switch (playerVal) {
      case 'scissors':
        switch (houseVal) {
          case 'paper':
          case 'lizard':
            message = 'YOU WIN!';
            break;
          case 'rock':
          case 'spock':
            message = 'You Lose';
            break;
          default:
            message = 'You Tie';
            break;
        }
        break;
      case 'paper':
        switch (houseVal) {
          case 'rock':
          case 'spock':
            message = 'YOU WIN!';
            break;
          case 'scissors':
          case 'lizard':
            message = 'You Lose';
            break;
          default:
            message = 'You Tie';
            break;
        }
        break;
      case 'rock':
        switch (houseVal) {
          case 'scissors':
          case 'lizard':
            message = 'YOU WIN!';
            break;
          case 'paper':
          case 'spock':
            message = 'You Lose';
            break;
          default:
            message = 'You Tie';
            break;
        }
        break;
      case 'spock':
        switch (houseVal) {
          case 'scissors':
          case 'rock':
            message = 'YOU WIN!';
            break;
          case 'paper':
          case 'lizard':
            message = 'You Lose';
            break;
          default:
            message = 'You Tie';
            break;
        }
        break;
      case 'lizard':
        switch (houseVal) {
          case 'paper':
          case 'spock':
            message = 'YOU WIN!';
            break;
          case 'scissors':
          case 'rock':
            message = 'You Lose';
            break;
          default:
            message = 'You Tie';
            break;
        }
        break;
    }
    return message;
  };
  
  // Create Icon HTML
  const createIconHTML = (icon) => {
    let iconHTML = `<div id="${icon}-icon" class="icon-container icon-container-${icon}">
    <img src="images/icon-${icon}.svg" alt="${icon}">
  </div>`;
  
    return iconHTML;
  };
  
  // Find New Score
  const getNewScore = (message) => {
    if (message === 'YOU WIN!') {
      return parseInt(sessionStorage.getItem('RPSSL_Score')) + 1;
    } else if (message === 'You Tie') {
      return sessionStorage.getItem('RPSSL_Score');
    } else {
      return parseInt(sessionStorage.getItem('RPSSL_Score')) - 1;
    }
  };
  
  // Icon Click
  const iconButtons = document.querySelectorAll('.icon-container');
  iconButtons.forEach((clickedIcon) => {
    clickedIcon.addEventListener('click', (e) => {
      let playerVal;
      if (e.target.value) {
        playerVal = e.target.value;
      } else {
        playerVal = e.target.alt;
      }
      let iconArr = ['scissors', 'paper', 'spock', 'rock', 'lizard'];
      let houseVal = iconArr[getRandNum()];
      // let playerVal = value;
      let message = getMessage(playerVal, houseVal);
      let newScore = getNewScore(message);
      const iconPlayer = document.getElementById('icon-player');
      const iconHouse = document.getElementById('icon-house');
      const yourOutcome = document.getElementById('your-outcome');
      const choicesCont = document.getElementById('choices-container');
      const gamePlayCont = document.getElementById('game-play-container');
      const outcomeCont = document.getElementById('outcome-container');
  
      // Add Player Icon to HTML
      iconPlayer.innerHTML = createIconHTML(playerVal);
  
      // Add House Icon to HTML
      iconHouse.innerHTML = createIconHTML(houseVal);
  
      // Add Message to HTML
      yourOutcome.innerText = message;
  
      // Save New Score to Session Storage
      sessionStorage.setItem('RPSSL_Score', newScore);
  
      // Transition Choices Container Out
      choicesCont.style.display = 'none';
  
      // Transition Game Play Container In
      gamePlayCont.style.display = 'flex';
  
      // Transition House Pick Circle Out and House Pick Icon In (after 1/2s)
      setTimeout(() => {
        document.getElementById('house-pick-circle').style.display = 'none';
        iconHouse.style.display = 'flex';
      }, 1500);
  
      // Transition Outcome Container in, Display new Score(after 1s), Highlight Winning Icon
      setTimeout(() => {
        outcomeCont.style.display = 'flex';
        setTimeout(() => {
          outcomeCont.style.opacity = 1;
          outcomeCont.style.transform = 'scale(1)';
        }, 0);
        document.querySelector('.actual-score').innerText = newScore;
  
        if (message === 'YOU WIN!') {
          iconPlayer.childNodes[0].className += ' winner';
        }
  
        if (message === 'You Lose') {
          iconHouse.childNodes[0].className += ' loser';
        }
      }, 3000);
    });
  });
  
  // Click Play Again
  document.getElementById('play-again').addEventListener('click', () => {
    const choicesCont = document.getElementById('choices-container');
    const gamePlayCont = document.getElementById('game-play-container');
    const housePickCircle = document.getElementById('house-pick-circle');
    const iconHouse = document.getElementById('icon-house');
    const outcomeCont = document.getElementById('outcome-container');
  
    choicesCont.style.display = 'flex';
  
    gamePlayCont.style.display = 'none';
  
    housePickCircle.style.display = 'flex';
  
    iconHouse.style.display = 'none';
  
    outcomeCont.style.display = 'none';
  
    outcomeCont.style.opacity = 0;
  
    outcomeCont.style.transform = 'scale(0)';
  });