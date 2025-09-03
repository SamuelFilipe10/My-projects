class CraseGame {
    constructor() {
      this.canvas = document.getElementById("gameCanvas")
      this.ctx = this.canvas.getContext("2d")
      this.score = 0
      this.level = 1
      this.currentQuestionIndex = 0
  
      // Perguntas sobre crase
      this.questions = [
        {
          phrase: "Vou _ praia amanhã.",
          correctAnswer: "with", // with = com crase, without = sem crase
          explanation:
            "Correto! 'Vou À praia' - usa-se crase porque é 'ir A + A praia' (artigo feminino). A preposição 'a' + artigo 'a' = à",
        },
        {
          phrase: "Ele se refere _ pessoas educadas.",
          correctAnswer: "with",
          explanation:
            "Correto! 'Refere-se ÀS pessoas' - usa-se crase porque 'referir-se' pede preposição 'a' + artigo 'as' = às",
        },
        {
          phrase: "Entreguei o documento _ ela.",
          correctAnswer: "without",
          explanation:
            "Correto! 'Entreguei A ela' - SEM crase porque pronomes pessoais não admitem artigo. Apenas a preposição 'a'.",
        },
        {
          phrase: "Chegamos _ casa da Maria.",
          correctAnswer: "with",
          explanation: "Correto! 'Chegamos À casa' - usa-se crase porque 'chegar' pede preposição 'a' + artigo 'a' = à",
        },
        {
          phrase: "Vou _ pé para o trabalho.",
          correctAnswer: "without",
          explanation:
            "Correto! 'Vou A pé' - SEM crase porque 'pé' é masculino. Não há artigo feminino para formar a crase.",
        },
        {
          phrase: "Dedico este livro _ minha mãe.",
          correctAnswer: "with",
          explanation:
            "Correto! 'Dedico À minha mãe' - usa-se crase porque 'dedicar' pede preposição 'a' + artigo 'a' (minha) = à",
        },
        {
          phrase: "Saí _ uma hora da tarde.",
          correctAnswer: "with",
          explanation: "Correto! 'Saí À uma hora' - usa-se crase nas expressões de tempo femininas. 'a' + 'a' (uma) = à",
        },
        {
          phrase: "Voltei _ Bahia nas férias.",
          correctAnswer: "with",
          explanation:
            "Correto! 'Voltei À Bahia' - usa-se crase com nomes de lugares femininos que admitem artigo. 'a' + 'a' Bahia = à",
        },
        {
          phrase: "Fui _ Brasília ontem.",
          correctAnswer: "without",
          explanation:
            "Correto! 'Fui A Brasília' - SEM crase porque Brasília não admite artigo feminino. Teste: 'Conheço Brasília' (não 'a Brasília').",
        },
        {
          phrase: "Estudo _ noite todos os dias.",
          correctAnswer: "with",
          explanation:
            "Correto! 'Estudo À noite' - usa-se crase nas locuções adverbiais femininas de tempo. 'a' + 'a' noite = à",
        },
        // CASOS OBRIGATÓRIOS - Locuções adverbiais/prepositivas/conjuntivas femininas
        {
          phrase: "Caminhamos _ luz da lua.",
          correctAnswer: "with",
          explanation: "Correto! 'À luz da lua' - locução prepositiva feminina sempre leva crase. 'a' + 'a' luz = à",
        },
        {
          phrase: "Ficou _ vontade na festa.",
          correctAnswer: "with",
          explanation: "Correto! 'À vontade' - locução adverbial feminina sempre leva crase. 'a' + 'a' vontade = à",
        },
        // CASOS OBRIGATÓRIOS - Antes de "aquela", "aquele", "aquilo" com preposição
        {
          phrase: "Refiro-me _ aquela situação.",
          correctAnswer: "with",
          explanation:
            "Correto! 'Àquela situação' - usa-se crase porque 'referir-se' pede preposição 'a' + 'aquela' = àquela",
        },
        {
          phrase: "Entregue o documento _ aquele homem.",
          correctAnswer: "with",
          explanation: "Correto! 'Àquele homem' - usa-se crase porque há preposição 'a' + 'aquele' = àquele",
        },
        {
          phrase: "Não me refiro _ aquilo que você disse.",
          correctAnswer: "with",
          explanation: "Correto! 'Àquilo' - usa-se crase porque 'referir-se' pede preposição 'a' + 'aquilo' = àquilo",
        },
        // CASOS OBRIGATÓRIOS - Nomes de cidades femininos com artigo
        {
          phrase: "Viajei _ França no verão.",
          correctAnswer: "with",
          explanation:
            "Correto! 'À França' - usa-se crase com nomes de países femininos que admitem artigo. 'a' + 'a' França = à",
        },
        // CASOS OBRIGATÓRIOS - Expressão "à moda de" (mesmo implícita)
        {
          phrase: "Gosto de bife _ parmegiana.",
          correctAnswer: "with",
          explanation:
            "Correto! 'À parmegiana' - usa-se crase porque subentende-se 'à moda de parmegiana'. Expressão implícita.",
        },
        {
          phrase: "Preparei frango _ passarinho.",
          correctAnswer: "with",
          explanation:
            "Correto! 'À passarinho' - usa-se crase porque subentende-se 'à moda de passarinho'. Expressão implícita.",
        },
        // CASOS FACULTATIVOS - Antes de possessivos femininos
        {
          phrase: "Entreguei o presente _ minha irmã.",
          correctAnswer: "with", // Aceita ambas, mas vamos considerar com crase como padrão
          explanation:
            "Facultativo! Pode ser 'À minha irmã' ou 'A minha irmã'. Com possessivos femininos, a crase é facultativa.",
        },
        {
          phrase: "Dediquei o poema _ nossa professora.",
          correctAnswer: "with",
          explanation:
            "Facultativo! Pode ser 'À nossa professora' ou 'A nossa professora'. Com possessivos femininos, a crase é facultativa.",
        },
        // CASOS FACULTATIVOS - Depois da preposição "até"
        {
          phrase: "Caminhei até _ escola.",
          correctAnswer: "with", // Aceita ambas
          explanation: "Facultativo! Pode ser 'até À escola' ou 'até A escola'. Após 'até', a crase é facultativa.",
        },
        // CASOS FACULTATIVOS - Antes de nomes próprios femininos
        {
          phrase: "Entreguei a carta _ Maria.",
          correctAnswer: "with", // Aceita ambas
          explanation:
            "Facultativo! Pode ser 'À Maria' ou 'A Maria'. Com nomes próprios femininos, a crase é facultativa.",
        },
        // CASOS PROIBIDOS - Antes de palavras masculinas
        {
          phrase: "Refiro-me _ cavalo branco.",
          correctAnswer: "without",
          explanation:
            "Correto! 'A cavalo' - SEM crase porque 'cavalo' é masculino. Palavras masculinas não admitem crase.",
        },
        // CASOS PROIBIDOS - Antes de verbos
        {
          phrase: "Comecei _ estudar cedo.",
          correctAnswer: "without",
          explanation:
            "Correto! 'A estudar' - SEM crase porque não se usa crase antes de verbos. 'Estudar' é verbo no infinitivo.",
        },
        {
          phrase: "Vou _ trabalhar amanhã.",
          correctAnswer: "without",
          explanation: "Correto! 'A trabalhar' - SEM crase porque não se usa crase antes de verbos no infinitivo.",
        },
        // CASOS PROIBIDOS - Antes de pronomes pessoais/indefinidos/tratamento
        {
          phrase: "Refiro-me _ você.",
          correctAnswer: "without",
          explanation: "Correto! 'A você' - SEM crase porque pronomes de tratamento não admitem artigo.",
        },
        {
          phrase: "Dedico este livro _ qualquer pessoa.",
          correctAnswer: "without",
          explanation: "Correto! 'A qualquer pessoa' - SEM crase porque pronomes indefinidos não admitem artigo.",
        },
        {
          phrase: "Entreguei a carta _ Vossa Senhoria.",
          correctAnswer: "without",
          explanation: "Correto! 'A Vossa Senhoria' - SEM crase porque pronomes de tratamento não admitem artigo.",
        },
        // CASOS PROIBIDOS - Palavras repetidas
        {
          phrase: "Vamos dia _ dia melhorando.",
          correctAnswer: "without",
          explanation:
            "Correto! 'Dia A dia' - SEM crase em expressões com palavras repetidas. Não há artigo, apenas preposição.",
        },
        {
          phrase: "Conversamos face _ face.",
          correctAnswer: "without",
          explanation:
            "Correto! 'Face A face' - SEM crase em expressões com palavras repetidas. Apenas preposição, sem artigo.",
        },
        {
          phrase: "Gota _ gota, enche-se o copo.",
          correctAnswer: "without",
          explanation: "Correto! 'Gota A gota' - SEM crase em expressões com palavras repetidas. Não há artigo.",
        },
        // CASOS PROIBIDOS - Nomes de cidades sem artigo
        {
          phrase: "Viajei _ Curitiba no inverno.",
          correctAnswer: "without",
          explanation:
            "Correto! 'A Curitiba' - SEM crase porque Curitiba não admite artigo. Teste: 'Conheço Curitiba' (não 'a Curitiba').",
        },
        {
          phrase: "Mudei-me _ Fortaleza.",
          correctAnswer: "without",
          explanation:
            "Correto! 'A Fortaleza' - SEM crase porque Fortaleza (cidade) não admite artigo. Teste: 'Conheço Fortaleza'.",
        },
      ]
  
      this.init()
    }
  
    init() {
      this.setupEventListeners()
      this.drawGame()
      this.loadQuestion()
    }
  
    setupEventListeners() {
      document.getElementById("door-with-crase").addEventListener("click", () => {
        this.checkAnswer("with")
      })
  
      document.getElementById("door-without-crase").addEventListener("click", () => {
        this.checkAnswer("without")
      })
  
      document.getElementById("next-round").addEventListener("click", () => {
        this.nextQuestion()
      })
    }
  
    drawGame() {
      const ctx = this.ctx
      const canvas = this.canvas
  
      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      // Desenhar fundo
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#e2e8f0")
      gradient.addColorStop(1, "#cbd5e0")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
  
      // Desenhar chão
      ctx.fillStyle = "#663300"
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50)
  
      // Desenhar personagem (estudante)
      this.drawCharacter(canvas.width / 2, canvas.height - 120)
  
      // Desenhar portas
      this.drawDoor(200, canvas.height - 200, "#3399ff", "COM\nCRASE")
      this.drawDoor(500, canvas.height - 200, "#ed8936", "SEM\nCRASE")
    }
  
    drawCharacter(x, y) {
      const ctx = this.ctx
  
      // Corpo
      ctx.fillStyle = "#4299e1"
      ctx.fillRect(x - 15, y - 40, 30, 40)
  
      // Cabeça
      ctx.fillStyle = "#fbb6ce"
      ctx.beginPath()
      ctx.arc(x, y - 50, 20, 0, Math.PI * 2)
      ctx.fill()
  
      // Olhos
      ctx.fillStyle = "#2d3748"
      ctx.beginPath()
      ctx.arc(x - 8, y - 55, 3, 0, Math.PI * 2)
      ctx.arc(x + 8, y - 55, 3, 0, Math.PI * 2)
      ctx.fill()
  
      // Sorriso
      ctx.strokeStyle = "#2d3748"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(x, y - 45, 8, 0, Math.PI)
      ctx.stroke()
  
      // Braços
      ctx.strokeStyle = "#fbb6ce"
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(x - 15, y - 30)
      ctx.lineTo(x - 35, y - 15)
      ctx.moveTo(x + 15, y - 30)
      ctx.lineTo(x + 35, y - 15)
      ctx.stroke()
  
      // Pernas
      ctx.beginPath()
      ctx.moveTo(x - 10, y)
      ctx.lineTo(x - 10, y + 25)
      ctx.moveTo(x + 10, y)
      ctx.lineTo(x + 10, y + 25)
      ctx.stroke()
    }
  
    drawDoor(x, y, color, text) {
      const ctx = this.ctx
  
      // Porta
      ctx.fillStyle = color
      ctx.fillRect(x, y, 100, 150)
  
      // Borda da porta
      ctx.strokeStyle = "#2d3748"
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, 100, 150)
  
  
      // Texto na porta
      ctx.fillStyle = "white"
      ctx.font = "bold 16px Arial"
      ctx.textAlign = "center"
      const lines = text.split("\n")
      lines.forEach((line, index) => {
        ctx.fillText(line, x + 50, y + 60 + index * 20)
      })
    }
  
  
    loadQuestion() {
      const question = this.questions[this.currentQuestionIndex]
      document.getElementById("current-phrase").textContent = question.phrase
    }
  
    checkAnswer(answer) {
      const question = this.questions[this.currentQuestionIndex]
      const modal = document.getElementById("explanation-modal")
      const resultTitle = document.getElementById("result-title")
      const explanationText = document.getElementById("explanation-text")
  
      if (answer === question.correctAnswer) {
        this.score += 10
        resultTitle.textContent = "Parabéns! Resposta Correta!"
        resultTitle.style.color = "#48bb78"
      } else {
        resultTitle.textContent = "Resposta Incorreta"
        resultTitle.style.color = "#e53e3e"
      }
  
      explanationText.textContent = question.explanation
  
      // Atualizar pontuação
      document.getElementById("score").textContent = this.score
  
      // Mostrar modal
      modal.classList.remove("hidden")
    }
  
    nextQuestion() {
      const modal = document.getElementById("explanation-modal")
      modal.classList.add("hidden")
  
      this.currentQuestionIndex++
  
      if (this.currentQuestionIndex >= this.questions.length) {
        // Reiniciar o jogo
        this.currentQuestionIndex = 0
        this.level++
        document.getElementById("level").textContent = this.level
  
        // Embaralhar perguntas
        this.shuffleQuestions()
      }
  
      this.loadQuestion()
      this.drawGame()
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
  