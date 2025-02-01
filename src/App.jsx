import { useState, useEffect } from 'react'

function App() {
  const [score, setscore] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const fetchQuiz = async () => {
    try {
      const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://api.jsonserve.com/Uw5CrX'));

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data.contents);
      const parsedData = JSON.parse(data.contents);
      setQuizData(parsedData.questions);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleStart = () => {
    document.getElementById('container').style.display = 'none';
    document.getElementById('quiz').style.display = 'flex';
  };

  const handleAnswer = (option) => {
    const btns = document.getElementsByClassName('btn');
    if (option.is_correct) {
      setscore(score + 1);
      document.getElementById('CorrectorNot').innerHTML = 'correct Answer! Congratulations!';
      document.getElementById('CorrectorNot').style.color = 'green';
    }
    else {
      document.getElementById('CorrectorNot').innerHTML = 'Incorrect Answer! better luck next time!';
      document.getElementById('CorrectorNot').style.color = 'red';
    }

    document.getElementById('detailed_solution').style.display = 'block';
    setIsAnswered(true);
  }

  const restartQuiz = () => {
    setscore(0);
    setCurrentQuestion(0);
    setIsAnswered(false);
    document.getElementById('CorrectorNot').innerHTML = '';
    document.getElementById('detailed_solution').style.display = 'none';
  }

  const handleNext = () => {
    if (currentQuestion<quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    else{
      alert(`Quiz Completed! Your Score is:${score}`);
    }
    document.getElementById('detailed_solution').style.display = 'none';
    setIsAnswered(false);
    document.getElementById('CorrectorNot').innerHTML = '';

  }
  const handlePrevious = () => {
     if (currentQuestion>0) {
      setCurrentQuestion(currentQuestion - 1);
      setIsAnswered(true);
     }

     else{
      alert(`This is the first question!`);
     }
     document.getElementById('detailed_solution').style.display = 'block';
  }

  return (
    <>
      <div className='p-3 rounded-lg flex flex-col justify-center h-auto w-[600px] bg-gray-200 shadow-lg' id='container'>
        <div>
          <p>Hello! 👋 Welcome to our Web-Based Quiz Application!
            <br />
            If you're excited to test your knowledge and have some fun, click on <b>Start</b> to begin your quiz journey! 🚀
            <br />
            ✔ Multiple quiz categories 📚<br />
            ✔ Instant feedback & scoring ✅<br />
            ✔ Compete & track your progress 🏆<br />

            Are you ready? Let’s go! 🎯</p>
        </div>
        <div className='flex justify-center mt-5'>
          <button className='w-fit p-3 bg-[#28a745] hover:bg-[#218838] text-white rounded-[8px] text-[18px]' onClick={() => { fetchQuiz(); handleStart() }}>Start</button>
        </div>
      </div>
      <div className='p-3 rounded-lg hidden flex-col gap-3 justify-center h-auto w-[600px] bg-gray-200 shadow-lg text-[20px]' id='quiz'>
        <div className='flex justify-between '>
          <h3 className='bg-orange-400 p-3 rounded-lg'>Score : {score}</h3>
          <button onClick={restartQuiz} className='bg-orange-400 p-3 rounded-lg'>Restart</button>
        </div>
        <div>
          <p className='bg-blue-100 p-4 rounded-lg '>{currentQuestion + 1}) {quizData[currentQuestion]?.description}</p>
          <div className='flex flex-col gap-3'>
            {
              quizData[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  className='w-fit p-3 bg-[#007bff] hover:bg-[#0056b3] text-white rounded-[8px] text-[18px] mt-3 btn'
                  onClick={() => {
                    handleAnswer(option);
                  }}
                  disabled={isAnswered}
                >
                  {option.description}
                </button>
              ))
            }
            <p id='CorrectorNot'></p>
          </div>
        </div>
        <div className='bg-yellow-100 p-4 rounded-lg mt-5 hidden' id='detailed_solution'>
          {quizData[currentQuestion]?.detailed_solution}
        </div>
        <div className='flex justify-between mt-5'>
          <button className='bg-orange-400 p-3 rounded-lg' onClick={handlePrevious}>Previous</button>
          <button className='bg-orange-400 p-3 rounded-lg' onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  )
}

export default App
