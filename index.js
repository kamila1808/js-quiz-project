const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "1993"],
    correct: 2,
  },
];

// Находим элементы
const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

// Переменные игры
let score = 0; // кол-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuiestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = ""; // очистка html
  listContainer.innerHTML = ""; // очистка ответов
}

function showQuiestion() {
  //вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`; //%title% работает как временная заглушка, когда в будущем нам нужно будет другое имя
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  ); // вернет новую строку с заменненным заголовком

  headerContainer.innerHTML = title;

  // варианты ответов
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
    <label>
      <input value="%number%" type="radio" class="answer" name="answer" />
      <span>%answer%</span>
    </label>
  </li>`;

    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );

  // если ответ не выбран - ничего не делаем, выходим из функции
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  // узнаем номер ответа пользователя
  const userAnswer = parseInt(checkedRadio.value); //приводим к числу, так как в объекте у нас значение correct это число

  // если ответил верно - увеличиваем счет
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuiestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultsTemplate = `
  <h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>
    `;

  let title, message;
  // варианты заголовков и текстов
  if (score === questions.length) {
    title = "Поздравляем!";
    message = "Вы ответили верно на все вопросы!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат!";
    message = "Вы дали более половины правильных ответов!";
  } else {
    title = "Стоит постараться!";
    message = "Пока у вас меньше половины правильных ответов!";
  }

  // результат
  let result = `${score} из ${questions.length}`;

  // финальный ответ, подставляем данные в шаблон
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;

  // меняем кнопку на играть снова
  submitBtn.blur();
  submitBtn.innerText = "Начать заново";
  submitBtn.onclick = () => history.go();
}
