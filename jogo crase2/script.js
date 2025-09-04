class CraseGame {
  constructor() {
    this.canvas = document.getElementById("gameCanvas")
    this.ctx = this.canvas.getContext("2d")
    this.score = 0
    this.lives = 5 // Adicionado sistema de vidas
    this.currentQuestionIndex = 0
    this.totalQuestions = 10 // Limitado a 10 perguntas
    this.gameCompleted = false // Controle de fim de jogo

    this.questions = [
      {
        phrase: "Vou _ praia amanhã.",
        correctAnswer: "with",
        explanation:
          "Correto! 'Vou À praia' - usa-se crase porque é 'ir A + A praia' (artigo feminino). A preposição 'a' + artigo 'a' = à",
      },
      {
        phrase: "Entreguei o documento _ ela.",
        correctAnswer: "without",
        explanation:
          "Correto! 'Entreguei A ela' - SEM crase porque pronomes pessoais não admitem artigo. Apenas a preposição 'a'.",
      },
      {
        phrase: "Estudo _ noite todos os dias.",
        correctAnswer: "with",
        explanation:
          "Correto! 'Estudo À noite' - usa-se crase nas locuções adverbiais femininas de tempo. 'a' + 'a' noite = à",
      },
      {
        phrase: "Refiro-me _ aquela situação.",
        correctAnswer: "with",
        explanation:
          "Correto! 'Àquela situação' - usa-se crase porque 'referir-se' pede preposição 'a' + 'aquela' = àquela",
      },
      {
        phrase: "Viajei _ França no verão.",
        correctAnswer: "with",
        explanation:
          "Correto! 'À França' - usa-se crase com nomes de países femininos que admitem artigo. 'a' + 'a' França = à",
      },
      {
        phrase: "Gosto de bife _ parmegiana.",
        correctAnswer: "with",
        explanation:
          "Correto! 'À parmegiana' - usa-se crase porque subentende-se 'à moda de parmegiana'. Expressão implícita.",
      },
      {
        phrase: "Entreguei o presente _ minha irmã.",
        correctAnswer: "with",
        explanation:
          "Facultativo! Pode ser 'À minha irmã' ou 'A minha irmã'. Com possessivos femininos, a crase é facultativa.",
      },
      {
        phrase: "Comecei _ estudar cedo.",
        correctAnswer: "without",
        explanation:
          "Correto! 'A estudar' - SEM crase porque não se usa crase antes de verbos. 'Estudar' é verbo no infinitivo.",
      },
      {
        phrase: "Conversamos face _ face.",
        correctAnswer: "without",
        explanation:
          "Correto! 'Face A face' - SEM crase em expressões com palavras repetidas. Apenas preposição, sem artigo.",
      },
      {
        phrase: "Viajei _ Curitiba no inverno.",
        correctAnswer: "without",
        explanation:
          "Correto! 'A Curitiba' - SEM crase porque Curitiba não admite artigo. Teste: 'Conheço Curitiba' (não 'a Curitiba').",
      },
    ]

    this.shuffleQuestions()
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.drawGame()
    this.loadQuestion()
    this.updateUI() // Atualizar interface inicial
  }

  setupEventListeners() {
    document.getElementById("door-with-crase").addEventListener("click", () => {
      if (!this.gameCompleted) this.checkAnswer("with")
    })

    document.getElementById("door-without-crase").addEventListener("click", () => {
      if (!this.gameCompleted) this.checkAnswer("without")
    })

    document.getElementById("next-round").addEventListener("click", () => {
      this.nextQuestion()
    })
  }

  updateUI() {
    document.getElementById("score").textContent = this.score
    document.getElementById("lives").textContent = this.lives
    document.getElementById("progress").textContent = `${this.currentQuestionIndex + 1}/${this.totalQuestions}`
  }

  drawGame() {
    const ctx = this.ctx
    const canvas = this.canvas

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.drawMarioBackground()

    this.drawCurrentPhrase()

    this.drawMarioCharacter(canvas.width / 2, canvas.height - 120)

    this.drawMarioDoor(200, canvas.height - 200, "#2ECC71", "COM\nCRASE")
    this.drawMarioDoor(500, canvas.height - 200, "#E74C3C", "SEM\nCRASE")

    this.drawMarioElements()
  }

  drawCurrentPhrase() {
    const ctx = this.ctx
    const canvas = this.canvas

    if (this.currentQuestionIndex < this.questions.length) {
      const question = this.questions[this.currentQuestionIndex]

      // Fundo para a frase estilo Mario no topo
      ctx.fillStyle = "rgba(70, 130, 180, 0.9)"
      ctx.fillRect(20, 20, canvas.width - 40, 60)

      // Borda estilo Mario
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      ctx.strokeRect(20, 20, canvas.width - 40, 60)

      // Texto da frase
      ctx.fillStyle = "white"
      ctx.font = "bold 16px 'Press Start 2P'"
      ctx.textAlign = "center"

      // Quebrar a frase em linhas se necessário
      const words = question.phrase.split(" ")
      let line = ""
      let y = 45

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " "
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width

        if (testWidth > canvas.width - 80 && n > 0) {
          ctx.fillText(line, canvas.width / 2, y)
          line = words[n] + " "
          y += 20
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, canvas.width / 2, y)
    }
  }

  loadQuestion() {
    // Esta função agora apenas serve como placeholder para carregar a pergunta atual
  }

  drawMarioBackground() {
    const ctx = this.ctx
    const canvas = this.canvas

    // Céu azul do Mario
    ctx.fillStyle = "#5C94FC"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Nuvens brancas estilo Mario
    this.drawMarioCloud(100, 50)
    this.drawMarioCloud(300, 80)
    this.drawMarioCloud(500, 60)

    // Chão verde estilo Mario
    ctx.fillStyle = "#2ECC71"
    ctx.fillRect(0, canvas.height - 80, canvas.width, 80)

    // Tijolos no chão
    ctx.fillStyle = "#8B4513"
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.fillRect(x, canvas.height - 20, 38, 18)
      ctx.strokeStyle = "#654321"
      ctx.lineWidth = 2
      ctx.strokeRect(x, canvas.height - 20, 38, 18)
    }
  }

  drawMarioCloud(x, y) {
    const ctx = this.ctx

    ctx.fillStyle = "white"
    // Corpo principal da nuvem
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.arc(x + 25, y, 35, 0, Math.PI * 2)
    ctx.arc(x + 50, y, 25, 0, Math.PI * 2)
    ctx.arc(x + 15, y - 15, 20, 0, Math.PI * 2)
    ctx.arc(x + 35, y - 15, 20, 0, Math.PI * 2)
    ctx.fill()
  }

  drawMarioCharacter(x, y) {
    const ctx = this.ctx

    // Chapéu vermelho do Mario
    ctx.fillStyle = "#FF4757"
    ctx.beginPath()
    ctx.arc(x, y - 65, 22, Math.PI, 2 * Math.PI)
    ctx.fill()

    // Aba do chapéu
    ctx.fillStyle = "#FF4757"
    ctx.fillRect(x - 25, y - 65, 50, 8)

    // Cabeça (pele)
    ctx.fillStyle = "#FDBCB4"
    ctx.beginPath()
    ctx.arc(x, y - 50, 18, 0, Math.PI * 2)
    ctx.fill()

    // Bigode
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(x - 12, y - 45, 24, 6)
    ctx.beginPath()
    ctx.arc(x - 12, y - 42, 3, 0, Math.PI * 2)
    ctx.arc(x + 12, y - 42, 3, 0, Math.PI * 2)
    ctx.fill()

    // Olhos
    ctx.fillStyle = "#000"
    ctx.beginPath()
    ctx.arc(x - 8, y - 55, 3, 0, Math.PI * 2)
    ctx.arc(x + 8, y - 55, 3, 0, Math.PI * 2)
    ctx.fill()

    // Nariz
    ctx.fillStyle = "#FDBCB4"
    ctx.beginPath()
    ctx.arc(x, y - 48, 4, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#1e3a8a"
    ctx.fillRect(x - 15, y - 40, 30, 35)

    // Botões do macacão
    ctx.fillStyle = "#FFD700"
    ctx.beginPath()
    ctx.arc(x - 8, y - 25, 3, 0, Math.PI * 2)
    ctx.arc(x + 8, y - 25, 3, 0, Math.PI * 2)
    ctx.fill()

    // Camisa vermelha
    ctx.fillStyle = "#FF4757"
    ctx.fillRect(x - 12, y - 20, 24, 15)

    // Braços
    ctx.fillStyle = "#FDBCB4"
    ctx.beginPath()
    ctx.arc(x - 20, y - 25, 8, 0, Math.PI * 2)
    ctx.arc(x + 20, y - 25, 8, 0, Math.PI * 2)
    ctx.fill()

    // Luvas brancas
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(x - 20, y - 25, 6, 0, Math.PI * 2)
    ctx.arc(x + 20, y - 25, 6, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#1e3a8a"
    ctx.fillRect(x - 12, y - 5, 10, 20)
    ctx.fillRect(x + 2, y - 5, 10, 20)

    // Sapatos marrons
    ctx.fillStyle = "#8B4513"
    ctx.fillRect(x - 15, y + 15, 12, 8)
    ctx.fillRect(x + 3, y + 15, 12, 8)
  }

  drawMarioDoor(x, y, color, text) {
    const ctx = this.ctx

    // Fundo da porta
    ctx.fillStyle = color
    ctx.fillRect(x, y, 100, 150)

    // Padrão de tijolos na porta
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 5; col++) {
        const brickX = x + col * 20
        const brickY = y + row * 18
        ctx.strokeRect(brickX, brickY, 20, 18)
      }
    }

    // Borda da porta estilo Mario
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 4
    ctx.strokeRect(x, y, 100, 150)

    // Maçaneta dourada estilo Mario
    ctx.fillStyle = "#FFD700"
    ctx.beginPath()
    ctx.arc(x + 80, y + 75, 10, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Texto na porta estilo Mario
    ctx.fillStyle = "white"
    ctx.font = "bold 14px 'Press Start 2P'"
    ctx.textAlign = "center"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3

    const lines = text.split("\n")
    lines.forEach((line, index) => {
      // Contorno preto
      ctx.strokeText(line, x + 50, y + 60 + index * 20)
      // Texto branco
      ctx.fillText(line, x + 50, y + 60 + index * 20)
    })
  }

  drawMarioElements() {
    const ctx = this.ctx

    // Moedas douradas
    this.drawCoin(150, 150)
    this.drawCoin(550, 120)
    this.drawCoin(350, 100)

    // Blocos de interrogação
    this.drawQuestionBlock(100, 200)
    this.drawQuestionBlock(600, 180)

    // Tubos verdes
    this.drawPipe(50, this.canvas.height - 150)
    this.drawPipe(this.canvas.width - 80, this.canvas.height - 130)

    // Contador de portas restantes estilo Mario
    ctx.fillStyle = "#FFD700"
    ctx.font = "bold 16px 'Press Start 2P'"
    ctx.textAlign = "center"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    
    ctx.strokeText(text, this.canvas.width / 2, 40)
    ctx.fillText(text, this.canvas.width / 2, 40)
  }

  drawCoin(x, y) {
    const ctx = this.ctx

    ctx.fillStyle = "#FFD700"
    ctx.beginPath()
    ctx.arc(x, y, 12, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = "#FFA500"
    ctx.lineWidth = 2
    ctx.stroke()

    // Símbolo da moeda
    ctx.fillStyle = "#FFA500"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("$", x, y + 5)
  }

  drawQuestionBlock(x, y) {
    const ctx = this.ctx

    // Bloco amarelo
    ctx.fillStyle = "#F1C40F"
    ctx.fillRect(x, y, 30, 30)

    // Borda preta
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, 30, 30)

    // Interrogação
    ctx.fillStyle = "#000"
    ctx.font = "bold 20px Arial"
    ctx.textAlign = "center"
    ctx.fillText("?", x + 15, y + 22)
  }

  drawPipe(x, y) {
    const ctx = this.ctx

    // Corpo do tubo
    ctx.fillStyle = "#2ECC71"
    ctx.fillRect(x, y, 30, 100)

    // Topo do tubo
    ctx.fillStyle = "#27AE60"
    ctx.fillRect(x - 5, y, 40, 15)

    // Bordas
    ctx.strokeStyle = "#1E8449"
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, 30, 100)
    ctx.strokeRect(x - 5, y, 40, 15)
  }

  checkAnswer(answer) {
    const question = this.questions[this.currentQuestionIndex]
    const modal = document.getElementById("explanation-modal")
    const resultTitle = document.getElementById("result-title")
    const explanationText = document.getElementById("explanation-text")

    if (answer === question.correctAnswer) {
      this.score += 10
      resultTitle.textContent = "Porta Correta! Você avançou!"
      resultTitle.style.color = "#48bb78"
    } else {
      this.lives--
      resultTitle.textContent = "Porta Errada! Você perdeu uma vida!"
      resultTitle.style.color = "#e53e3e"

      if (this.lives <= 0) {
        this.gameOver()
        return
      }
    }

    explanationText.textContent = question.explanation
    this.updateUI() // Atualizar interface
    modal.classList.remove("hidden")
  }

  gameOver() {
    const modal = document.getElementById("explanation-modal")
    const resultTitle = document.getElementById("result-title")
    const explanationText = document.getElementById("explanation-text")

    resultTitle.textContent = "GAME OVER!"
    resultTitle.style.color = "#e53e3e"
    explanationText.textContent =
      "Suas vidas acabaram! Você ficou preso na sala. Recarregue a página para tentar novamente."

    document.getElementById("next-round").textContent = "Reiniciar Jogo"
    document.getElementById("next-round").onclick = () => location.reload()

    modal.classList.remove("hidden")
  }

  nextQuestion() {
    const modal = document.getElementById("explanation-modal")
    modal.classList.add("hidden")

    this.currentQuestionIndex++

    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.completeGame()
      return
    }

    this.loadQuestion()
    this.drawGame()
    this.updateUI()
  }

  completeGame() {
    this.gameCompleted = true
    const modal = document.getElementById("explanation-modal")
    const resultTitle = document.getElementById("result-title")
    const explanationText = document.getElementById("explanation-text")

    resultTitle.textContent = "PARABÉNS! VOCÊ ESCAPOU!"
    resultTitle.style.color = "#48bb78"
    explanationText.textContent = `Fantástico! Você conseguiu escapar da sala respondendo corretamente sobre o uso da crase! Pontuação final: ${this.score} pontos. Você é um verdadeiro mestre da crase!`

    document.getElementById("next-round").textContent = "Jogar Novamente"
    document.getElementById("next-round").onclick = () => location.reload()

    this.drawVictory()

    modal.classList.remove("hidden")
  }

  drawVictory() {
    const ctx = this.ctx
    const canvas = this.canvas

    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const colors = ["#FFD700", "#FF4757", "#2ECC71", "#3498DB", "#F1C40F"]

      // Estrelas do Mario
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      this.drawMarioStar(x, y, 8)
    }

    ctx.fillStyle = "#FFD700"
    ctx.font = "bold 24px 'Press Start 2P'"
    ctx.textAlign = "center"
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 3

    const victoryText = "MAMA MIA!"
    ctx.strokeText(victoryText, canvas.width / 2, canvas.height / 2 - 50)
    ctx.fillText(victoryText, canvas.width / 2, canvas.height / 2 - 50)

    ctx.fillStyle = "white"
    ctx.font = "16px 'Press Start 2P'"
    const escapeText = "VOCE ESCAPOU!"
    ctx.strokeText(escapeText, canvas.width / 2, canvas.height / 2 - 10)
    ctx.fillText(escapeText, canvas.width / 2, canvas.height / 2 - 10)
  }

  drawMarioStar(x, y, size) {
    const ctx = this.ctx

    ctx.beginPath()
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5
      const px = x + Math.cos(angle) * size
      const py = y + Math.sin(angle) * size
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fill()

    // Borda preta
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 1
    ctx.stroke()
  }

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]]
    }
  }
}

// Inicializar o jogo quando a página carregar
window.addEventListener("load", () => {
  new CraseGame()
})
