"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function GuessingGame() {
  const [dice1, setDice1] = useState(1)
  const [dice2, setDice2] = useState(1)
  const [sum, setSum] = useState(2)
  const [playerGuess, setPlayerGuess] = useState(null)
  const [isRolling, setIsRolling] = useState(false)
  const [result, setResult] = useState("")
  const [score, setScore] = useState(0)

  const rollDice = () => {
    if (!playerGuess) return

    setIsRolling(true)

    // Animate dice rolling
    const rollInterval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1)
      setDice2(Math.floor(Math.random() * 6) + 1)
    }, 100)

    // Stop rolling after 2 seconds
    setTimeout(() => {
      clearInterval(rollInterval)
      const newDice1 = Math.floor(Math.random() * 6) + 1
      const newDice2 = Math.floor(Math.random() * 6) + 1
      const newSum = newDice1 + newDice2

      setDice1(newDice1)
      setDice2(newDice2)
      setSum(newSum)
      setIsRolling(false)

      // Determine result
      let isCorrect = false
      if (playerGuess === "less" && newSum < 7) isCorrect = true
      if (playerGuess === "equal" && newSum === 7) isCorrect = true
      if (playerGuess === "more" && newSum > 7) isCorrect = true

      if (isCorrect) {
        setResult("You win! 🎉")
        setScore(score + 1)
      } else {
        setResult("You lose! Try again.")
      }
    }, 2000)
  }

  const resetGame = () => {
    setPlayerGuess(null)
    setResult("")
  }

  // Dice component with dots
  const Dice = ({ value, isRolling }) => {
    // Define dot positions based on dice value
    const getDotPositions = (val) => {
      switch (val) {
        case 1:
          return [{ top: "50%", left: "50%" }]
        case 2:
          return [
            { top: "25%", left: "25%" },
            { top: "75%", left: "75%" },
          ]
        case 3:
          return [
            { top: "25%", left: "25%" },
            { top: "50%", left: "50%" },
            { top: "75%", left: "75%" },
          ]
        case 4:
          return [
            { top: "25%", left: "25%" },
            { top: "25%", left: "75%" },
            { top: "75%", left: "25%" },
            { top: "75%", left: "75%" },
          ]
        case 5:
          return [
            { top: "25%", left: "25%" },
            { top: "25%", left: "75%" },
            { top: "50%", left: "50%" },
            { top: "75%", left: "25%" },
            { top: "75%", left: "75%" },
          ]
        case 6:
          return [
            { top: "25%", left: "25%" },
            { top: "25%", left: "50%" },
            { top: "25%", left: "75%" },
            { top: "75%", left: "25%" },
            { top: "75%", left: "50%" },
            { top: "75%", left: "75%" },
          ]
        default:
          return []
      }
    }

    const dots = getDotPositions(value)

    return (
      <motion.div
        className="w-24 h-24 bg-white rounded-xl shadow-lg relative"
        animate={isRolling ? { rotate: 360 } : {}}
        transition={isRolling ? { duration: 0.5, repeat: 4 } : {}}
      >
        {dots.map((position, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: position.top, left: position.left }}
          />
        ))}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-800 flex flex-col items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Guess the Number</h1>

        <div className="text-center mb-8">
          <p className="text-white text-lg mb-2">Will the sum of dice be:</p>
          <div className="flex justify-center gap-3 mb-6">
            <button
              onClick={() => setPlayerGuess("less")}
              className={`px-4 py-2 rounded-full ${playerGuess === "less" ? "bg-green-500 text-white" : "bg-white/20 text-white"} transition-colors`}
            >
              Less than 7
            </button>
            <button
              onClick={() => setPlayerGuess("equal")}
              className={`px-4 py-2 rounded-full ${playerGuess === "equal" ? "bg-green-500 text-white" : "bg-white/20 text-white"} transition-colors`}
            >
              Exactly 7
            </button>
            <button
              onClick={() => setPlayerGuess("more")}
              className={`px-4 py-2 rounded-full ${playerGuess === "more" ? "bg-green-500 text-white" : "bg-white/20 text-white"} transition-colors`}
            >
              More than 7
            </button>
          </div>

          <button
            onClick={rollDice}
            disabled={!playerGuess || isRolling}
            className={`px-6 py-3 rounded-full font-bold text-lg ${!playerGuess || isRolling ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-500 text-gray-800"} transition-colors`}
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </button>
        </div>

        <div className="flex justify-center gap-6 mb-6">
          <Dice value={dice1} isRolling={isRolling} />
          <Dice value={dice2} isRolling={isRolling} />
        </div>

        {sum > 2 && !isRolling && (
          <div className="text-center mb-6">
            <p className="text-white text-xl mb-2">Sum: {sum}</p>
            <p className="text-2xl font-bold" style={{ color: result.includes("win") ? "#4ade80" : "#f87171" }}>
              {result}
            </p>
          </div>
        )}

        {result && (
          <div className="flex justify-center">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-white text-lg">Score: {score}</p>
        </div>
      </div>
    </div>
  )
}

