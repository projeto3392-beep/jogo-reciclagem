// Jogo de Reciclagem - Turma 702M
// Desenvolvido pelos Professores Alessandro e Michele

// Variáveis globais do jogo
let gameState = {
    isPlaying: false,
    isPaused: false,
    score: 0,
    timeLeft: 60,
    objectsRecycled: 0,
    gameTimer: null,
    currentObjects: []
};

// Sistema de tema
let currentTheme = localStorage.getItem('theme') || 'light';

// Configuração dos objetos recicláveis
const recyclableObjects = {
    paper: [
        { icon: '📰', name: 'Jornal', type: 'paper' },
        { icon: '📚', name: 'Livro', type: 'paper' },
        { icon: '📄', name: 'Papel', type: 'paper' },
        { icon: '📦', name: 'Caixa', type: 'paper' },
        { icon: '📋', name: 'Caderno', type: 'paper' }
    ],
    glass: [
        { icon: '🍾', name: 'Garrafa', type: 'glass' },
        { icon: '🥃', name: 'Copo', type: 'glass' },
        { icon: '🧃', name: 'Pote', type: 'glass' },
        { icon: '🏺', name: 'Vaso', type: 'glass' },
        { icon: '🔮', name: 'Vidro', type: 'glass' }
    ],
    plastic: [
        { icon: '🥤', name: 'Garrafa PET', type: 'plastic' },
        { icon: '🍶', name: 'Embalagem', type: 'plastic' },
        { icon: '🧴', name: 'Frasco', type: 'plastic' },
        { icon: '🛍️', name: 'Sacola', type: 'plastic' },
        { icon: '🎽', name: 'Pote', type: 'plastic' }
    ],
    metal: [
        { icon: '🥫', name: 'Lata', type: 'metal' },
        { icon: '🥤', name: 'Lata de Alumínio', type: 'metal' },
        { icon: '🔧', name: 'Ferramenta', type: 'metal' },
        { icon: '⚙️', name: 'Engrenagem', type: 'metal' },
        { icon: '🔩', name: 'Parafuso', type: 'metal' }
    ]
};

// Funções para gerenciar tema
function initTheme() {
    applyTheme(currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
    updateThemeIcon();
    
    // Adicionar efeito de partículas ao trocar tema
    createThemeChangeParticles();
    
    // Recriar partículas de fundo para melhor visibilidade
    setTimeout(() => {
        refreshParticles();
    }, 500);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeIcon() {
    const icon = elements.themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        elements.themeToggle.title = 'Mudar para tema claro';
    } else {
        icon.className = 'fas fa-moon';
        elements.themeToggle.title = 'Mudar para tema escuro';
    }
}

// Sistema de partículas
function createFloatingParticles() {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        document.body.appendChild(particle);
    }
}

function createThemeChangeParticles() {
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        
        // Animação de explosão
        particle.style.animation = `sparkle 0.8s ease-out forwards`;
        particle.style.animationDelay = Math.random() * 0.3 + 's';
        
        document.body.appendChild(particle);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Função para criar efeito de brilho nos elementos
function addGlowEffect(element) {
    element.style.animation = 'pulse-glow 2s ease-in-out infinite';
}

function removeGlowEffect(element) {
    element.style.animation = '';
}

// Função para criar partículas de celebração
function createCelebrationParticles(object) {
    const rect = object.getBoundingClientRect();
    const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        // Animação de explosão
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
        const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
        
        particle.style.animation = `sparkle 0.8s ease-out forwards`;
        particle.style.animationDelay = Math.random() * 0.2 + 's';
        
        document.body.appendChild(particle);
        
        // Animar movimento
        setTimeout(() => {
            particle.style.transition = 'all 0.8s ease-out';
            particle.style.left = endX + 'px';
            particle.style.top = endY + 'px';
            particle.style.opacity = '0';
        }, 50);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Função para criar partículas de erro
function createErrorParticles(object) {
    const rect = object.getBoundingClientRect();
    const colors = ['#ef4444', '#dc2626', '#b91c1c'];
    
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        // Animação de vibração
        const angle = (i / 4) * Math.PI * 2;
        const distance = 20 + Math.random() * 15;
        const endX = rect.left + rect.width / 2 + Math.cos(angle) * distance;
        const endY = rect.top + rect.height / 2 + Math.sin(angle) * distance;
        
        particle.style.animation = `sparkle 0.6s ease-out forwards`;
        
        document.body.appendChild(particle);
        
        // Animar movimento
        setTimeout(() => {
            particle.style.transition = 'all 0.6s ease-out';
            particle.style.left = endX + 'px';
            particle.style.top = endY + 'px';
            particle.style.opacity = '0';
        }, 50);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
}

// Função para limpar partículas antigas
function cleanupParticles() {
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
}

// Função para recriar partículas (útil para mudanças de tema)
function refreshParticles() {
    cleanupParticles();
    setTimeout(() => {
        createFloatingParticles();
    }, 100);
}

// Sistema de música de fundo
let isMusicPlaying = localStorage.getItem('musicEnabled') === 'true';
let musicVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.3;

function initMusic() {
    updateMusicIcon();
    setupMusic();
    
    // Iniciar música se estiver habilitada
    if (isMusicPlaying) {
        startAmbientMusic();
    }
}

function toggleMusic() {
    isMusicPlaying = !isMusicPlaying;
    localStorage.setItem('musicEnabled', isMusicPlaying);
    
    if (isMusicPlaying) {
        startAmbientMusic();
        elements.musicToggle.classList.add('playing');
    } else {
        stopAmbientMusic();
        elements.musicToggle.classList.remove('playing');
    }
    
    updateMusicIcon();
    
    // Adicionar efeito de partículas ao trocar música
    createMusicToggleParticles();
}

function startAmbientMusic() {
    if (audio.ambient) {
        audio.ambient.volume = musicVolume;
        audio.ambient.play().catch(e => {
            console.log('Música de fundo não pode ser reproduzida:', e);
            // Se não conseguir tocar, desabilitar música
            isMusicPlaying = false;
            localStorage.setItem('musicEnabled', false);
            updateMusicIcon();
        });
    }
}

function stopAmbientMusic() {
    if (audio.ambient) {
        audio.ambient.pause();
        audio.ambient.currentTime = 0;
    }
}

function setupMusic() {
    if (audio.ambient) {
        audio.ambient.volume = musicVolume;
        audio.ambient.loop = true;
        
        // Adicionar fade in/out para transições suaves
        audio.ambient.addEventListener('play', () => {
            audio.ambient.style.transition = 'opacity 2s ease';
        });
    }
}

function updateMusicIcon() {
    const icon = elements.musicToggle.querySelector('i');
    if (isMusicPlaying) {
        icon.className = 'fas fa-volume-up';
        elements.musicToggle.title = 'Desligar música de fundo';
        elements.musicToggle.classList.add('playing');
    } else {
        icon.className = 'fas fa-volume-mute';
        elements.musicToggle.title = 'Ligar música de fundo';
        elements.musicToggle.classList.remove('playing');
    }
}

function createMusicToggleParticles() {
    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        
        // Animação de explosão
        particle.style.animation = `sparkle 0.6s ease-out forwards`;
        particle.style.animationDelay = Math.random() * 0.2 + 's';
        
        document.body.appendChild(particle);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
}

// Elementos do DOM
const elements = {
    chooseDifficulty: document.getElementById('chooseDifficulty'),
    startGame: document.getElementById('startGame'),
    difficultySection: document.getElementById('difficultySection'),
    gameSection: document.getElementById('gameSection'),
    gameOverModal: document.getElementById('gameOverModal'),
    instructionsModal: document.getElementById('instructionsModal'),
    pauseOverlay: document.getElementById('pauseOverlay'),
    score: document.getElementById('score'),
    timer: document.getElementById('timer'),
    objectsArea: document.getElementById('objectsArea'),
    pauseGame: document.getElementById('pauseGame'),
    restartGame: document.getElementById('restartGame'),
    finalScore: document.getElementById('finalScore'),
    objectsRecycled: document.getElementById('objectsRecycled'),
    timeLeft: document.getElementById('timeLeft'),
    performanceMessage: document.getElementById('performanceMessage'),
    modalTitle: document.getElementById('modalTitle'),
    themeToggle: document.getElementById('themeToggle'),
    musicToggle: document.getElementById('musicToggle')
};

// Elementos de áudio
const audio = {
    correct: document.getElementById('correctSound'),
    wrong: document.getElementById('wrongSound'),
    background: document.getElementById('backgroundMusic'),
    ambient: document.getElementById('ambientMusic')
};

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Jogo de Reciclagem da Turma 702M carregado!');
    console.log('👨‍🏫 Professores: Alessandro e Michele');
    console.log('🌱 Tema: Sustentabilidade e Reciclagem');
    
    // Mostrar modal de instruções ao carregar
    setTimeout(() => {
        showInstructions();
    }, 1000);
    
    // Event listeners
    elements.chooseDifficulty.addEventListener('click', showDifficultySelection);
    elements.startGame.addEventListener('click', startGame);
    elements.pauseGame.addEventListener('click', togglePause);
    elements.restartGame.addEventListener('click', restartGame);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.musicToggle.addEventListener('click', toggleMusic);
    
    // Configurar estado inicial
    elements.startGame.disabled = true;
    elements.startGame.style.opacity = '0.6';
    
    // Configurar drag and drop
    setupDragAndDrop();
    
    // Configurar áudio
    setupAudio();

    // Inicializar tema
    initTheme();

    // Inicializar música
    initMusic();

    // Criar partículas de fundo
    createFloatingParticles();
});

// Função para mostrar seleção de dificuldade
function showDifficultySelection() {
    console.log('🎯 Mostrando seleção de dificuldade...');
    
    // Esconder hero
    document.querySelector('.hero').style.display = 'none';
    
    // Mostrar seção de dificuldade
    elements.difficultySection.style.display = 'block';
    
    // Adicionar animações de entrada
    setTimeout(() => {
        const cards = document.querySelectorAll('.difficulty-card');
        cards.forEach((card, index) => {
            card.classList.add('fade-in-up');
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
    
    // Configurar seleção de dificuldade
    setupDifficultySelection();
}

// Função para configurar seleção de dificuldade
function setupDifficultySelection() {
    const difficultyCards = document.querySelectorAll('.difficulty-card');
    
    difficultyCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover seleção anterior
            difficultyCards.forEach(c => c.classList.remove('selected'));
            
            // Selecionar esta dificuldade
            this.classList.add('selected');
            
            // Armazenar dificuldade selecionada
            const difficulty = this.dataset.difficulty;
            gameState.selectedDifficulty = difficulty;
            
            console.log(`🎮 Dificuldade selecionada: ${difficulty}`);
            
            // Atualizar botão de começar jogo
            elements.startGame.style.display = 'inline-flex';
            elements.startGame.disabled = false;
            elements.startGame.style.opacity = '1';
            elements.startGame.style.cursor = 'pointer';
        });
    });
}

// Função para mostrar instruções
function showInstructions() {
    elements.instructionsModal.style.display = 'flex';
}

// Função para fechar instruções
function closeInstructions() {
    elements.instructionsModal.style.display = 'none';
}

// Função para iniciar o jogo
function startGame() {
    // Verificar se uma dificuldade foi selecionada
    if (!gameState.selectedDifficulty) {
        alert('Por favor, selecione uma dificuldade primeiro!');
        return;
    }
    
    console.log('🚀 Iniciando jogo de reciclagem...');
    
    // Configurar jogo baseado na dificuldade
    configureGameByDifficulty();
    
    // Resetar estado do jogo
    gameState.isPlaying = true;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.objectsRecycled = 0;
    
    // Atualizar interface
    elements.score.textContent = '0';
    elements.timer.textContent = gameState.timeLeft;
    
    // Esconder seção de dificuldade
    elements.difficultySection.style.display = 'none';
    
    // Esconder botão de começar jogo
    elements.startGame.style.display = 'none';
    
    // Mostrar seção do jogo
    elements.gameSection.style.display = 'block';
    
    // Adicionar animações de entrada
    setTimeout(() => {
        const scoreItems = document.querySelectorAll('.score-item');
        const trashBins = document.querySelectorAll('.trash-bin');
        
        scoreItems.forEach((item, index) => {
            item.classList.add('fade-in-up');
            item.style.animationDelay = `${index * 0.1}s`;
        });
        
        trashBins.forEach((bin, index) => {
            bin.classList.add('fade-in-up');
            bin.style.animationDelay = `${index * 0.1 + 0.3}s`;
        });
    }, 100);
    
    // Iniciar cronômetro
    startTimer();
    
    // Gerar objetos iniciais
    generateObjects();
    
    // Tocar música de fundo
    if (audio.background) {
        audio.background.volume = 0.3;
        audio.background.play().catch(e => console.log('Áudio não pode ser reproduzido:', e));
    }
    
    // Retomar música de fundo se estiver habilitada
    if (isMusicPlaying && audio.ambient) {
        audio.ambient.play().catch(e => console.log('Música de fundo não pode ser reproduzida:', e));
    }
    
    // Atualizar botões
    elements.pauseGame.innerHTML = '<i class="fas fa-pause"></i> Pausar';
    elements.pauseGame.className = 'btn btn-secondary';
    elements.pauseGame.disabled = false;
    elements.restartGame.disabled = false;
    
    // Esconder overlay de pausa
    elements.pauseOverlay.style.display = 'none';
}

// Função para configurar jogo baseado na dificuldade
function configureGameByDifficulty() {
    switch (gameState.selectedDifficulty) {
        case 'easy':
            gameState.timeLeft = 90;
            gameState.objectSpeed = 'slow';
            gameState.maxObjects = 6;
            break;
        case 'medium':
            gameState.timeLeft = 60;
            gameState.objectSpeed = 'normal';
            gameState.maxObjects = 8;
            break;
        case 'hard':
            gameState.timeLeft = 45;
            gameState.objectSpeed = 'fast';
            gameState.maxObjects = 10;
            break;
        default:
            gameState.timeLeft = 60;
            gameState.objectSpeed = 'normal';
            gameState.maxObjects = 8;
    }
    
    console.log(`⚙️ Configuração: ${gameState.timeLeft}s, ${gameState.objectSpeed}, ${gameState.maxObjects} objetos`);
}

// Função para iniciar cronômetro
function startTimer() {
    gameState.gameTimer = setInterval(() => {
        if (!gameState.isPaused) {
            gameState.timeLeft--;
            elements.timer.textContent = gameState.timeLeft;
            
            if (gameState.timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
}

// Função para pausar/despausar
function togglePause() {
    if (gameState.isPaused) {
        // Despausar
        gameState.isPaused = false;
        elements.pauseGame.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        elements.pauseGame.className = 'btn btn-secondary';
        elements.pauseOverlay.style.display = 'none';
        
        // Retomar música de fundo
        if (audio.background) audio.background.play().catch(e => {});
        if (isMusicPlaying && audio.ambient) audio.ambient.play().catch(e => {});
        
        console.log('▶️ Jogo despausado');
    } else {
        // Pausar
        gameState.isPaused = true;
        elements.pauseGame.innerHTML = '<i class="fas fa-play"></i> Continuar';
        elements.pauseGame.className = 'btn btn-primary';
        elements.pauseOverlay.style.display = 'flex';
        
        // Pausar música
        if (audio.background) audio.background.pause();
        if (audio.ambient) audio.ambient.pause();
        
        console.log('⏸️ Jogo pausado');
    }
}

// Função para reiniciar jogo
function restartGame() {
    if (confirm('Tem certeza que deseja reiniciar o jogo?')) {
        endGame();
        startGame();
    }
}

// Função para gerar objetos
function generateObjects() {
    const objectsArea = elements.objectsArea;
    objectsArea.innerHTML = '';
    
    // Gerar objetos baseado na dificuldade
    const objectCount = gameState.maxObjects || 8;
    
    for (let i = 0; i < objectCount; i++) {
        const object = generateRandomObject();
        if (object) {
            createObjectElement(object);
        }
    }
}

// Função para gerar objeto aleatório
function generateRandomObject() {
    const types = Object.keys(recyclableObjects);
    const randomType = types[Math.floor(Math.random() * types.length)];
    const objectsOfType = recyclableObjects[randomType];
    const randomObject = objectsOfType[Math.floor(Math.random() * objectsOfType.length)];
    
    return randomObject;
}

// Função para criar elemento do objeto
function createObjectElement(object) {
    const objectElement = document.createElement('div');
    objectElement.className = 'recyclable-object';
    objectElement.draggable = true;
    objectElement.dataset.type = object.type;
    objectElement.innerHTML = object.icon;
    objectElement.title = object.name;
    
    // Adicionar animação de entrada
    objectElement.style.opacity = '0';
    objectElement.style.transform = 'scale(0) rotate(180deg)';
    
    // Adicionar ao array de objetos atuais
    gameState.currentObjects.push(objectElement);
    
    // Adicionar à área de objetos
    elements.objectsArea.appendChild(objectElement);
    
    // Animar entrada
    setTimeout(() => {
        objectElement.style.transition = 'all 0.5s ease';
        objectElement.style.opacity = '1';
        objectElement.style.transform = 'scale(1) rotate(0deg)';
    }, 50);
    
    return objectElement;
}

// Função para configurar drag and drop
function setupDragAndDrop() {
    // Event listeners para objetos
    elements.objectsArea.addEventListener('dragstart', handleDragStart);
    elements.objectsArea.addEventListener('dragend', handleDragEnd);
    
    // Event listeners para lixeiras
    document.querySelectorAll('.trash-bin').forEach(bin => {
        bin.addEventListener('dragover', handleDragOver);
        bin.addEventListener('drop', handleDrop);
        bin.addEventListener('dragenter', handleDragEnter);
        bin.addEventListener('dragleave', handleDragLeave);
    });
}

// Funções de drag and drop
function handleDragStart(e) {
    if (!gameState.isPlaying || gameState.isPaused) {
        e.preventDefault();
        console.log('🚫 Drag and drop bloqueado - jogo pausado ou não iniciado');
        return;
    }
    
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    e.currentTarget.style.transform = 'scale(1.05)';
}

function handleDragLeave(e) {
    e.currentTarget.style.transform = 'scale(1)';
}

function handleDrop(e) {
    e.preventDefault();
    const bin = e.currentTarget;
    const objectType = e.dataTransfer.getData('text/plain');
    const draggedObject = document.querySelector('.dragging');
    
    if (!draggedObject) return;
    
    bin.style.transform = 'scale(1)';
    
    // Verificar se o objeto foi colocado na lixeira correta
    const binType = bin.dataset.type;
    const isCorrect = objectType === binType;
    
    if (isCorrect) {
        // Acertou!
        handleCorrectRecycling(draggedObject, bin);
    } else {
        // Errou!
        handleIncorrectRecycling(draggedObject, bin);
    }
}

// Função para lidar com reciclagem correta
function handleCorrectRecycling(object, bin) {
    console.log('✅ Reciclagem correta!');
    
    // Tocar som de acerto
    playSound('correct');
    
    // Adicionar pontos
    gameState.score += 10;
    gameState.objectsRecycled++;
    
    // Atualizar interface
    elements.score.textContent = gameState.score;
    
    // Animar lixeira
    bin.classList.add('correct');
    setTimeout(() => bin.classList.remove('correct'), 600);
    
    // Animar objeto
    object.classList.add('correct');
    
    // Adicionar efeito de brilho na pontuação
    const scoreElement = elements.score;
    addGlowEffect(scoreElement);
    setTimeout(() => removeGlowEffect(scoreElement), 2000);
    
    // Criar partículas de celebração
    createCelebrationParticles(object);
    
    // Remover objeto após animação
    setTimeout(() => {
        object.remove();
        gameState.currentObjects = gameState.currentObjects.filter(obj => obj !== object);
        
        // Gerar novo objeto se necessário
        if (gameState.currentObjects.length < 6) {
            const newObject = generateRandomObject();
            if (newObject) {
                createObjectElement(newObject);
            }
        }
    }, 600);
}

// Função para lidar com reciclagem incorreta
function handleIncorrectRecycling(object, bin) {
    console.log('❌ Reciclagem incorreta!');
    
    // Tocar som de erro
    playSound('wrong');
    
    // Perder pontos
    gameState.score = Math.max(0, gameState.score - 5);
    
    // Atualizar interface
    elements.score.textContent = gameState.score;
    
    // Animar objeto
    object.classList.add('incorrect');
    
    // Criar partículas de erro
    createErrorParticles(object);
    
    // Retornar objeto à posição original
    setTimeout(() => {
        object.classList.remove('incorrect');
        object.style.transform = 'none';
    }, 600);
}

// Função para tocar sons
function playSound(type) {
    try {
        if (type === 'correct' && audio.correct) {
            audio.correct.currentTime = 0;
            audio.correct.play().catch(e => console.log('Som não pode ser reproduzido:', e));
        } else if (type === 'wrong' && audio.wrong) {
            audio.wrong.currentTime = 0;
            audio.wrong.play().catch(e => console.log('Som não pode ser reproduzido:', e));
        }
    } catch (error) {
        console.log('Erro ao reproduzir som:', error);
    }
}

// Função para configurar áudio
function setupAudio() {
    // Configurar volume dos sons
    if (audio.correct) audio.correct.volume = 0.5;
    if (audio.wrong) audio.wrong.volume = 0.5;
    if (audio.background) audio.background.volume = 0.3;
}

// Função para finalizar jogo
function endGame() {
    console.log('🏁 Fim de jogo!');
    
    // Parar cronômetro
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    
    // Parar música
    if (audio.background) {
        audio.background.pause();
        audio.background.currentTime = 0;
    }
    
    // Parar música de fundo
    if (audio.ambient) {
        audio.ambient.pause();
        audio.ambient.currentTime = 0;
    }
    
    // Atualizar estado
    gameState.isPlaying = false;
    gameState.isPaused = false;
    
    // Mostrar modal de fim de jogo
    showGameOverModal();
}

// Função para mostrar modal de fim de jogo
function showGameOverModal() {
    // Atualizar informações do modal
    elements.finalScore.textContent = gameState.score;
    elements.objectsRecycled.textContent = gameState.objectsRecycled;
    elements.timeLeft.textContent = gameState.timeLeft;
    
    // Determinar mensagem de performance
    let performanceMessage = '';
    let modalTitle = 'Fim de Jogo!';
    
    if (gameState.score >= 80) {
        performanceMessage = '🎉 Excelente! Você é um mestre da reciclagem!';
        modalTitle = 'Parabéns! 🏆';
    } else if (gameState.score >= 50) {
        performanceMessage = '👍 Muito bom! Você sabe reciclar bem!';
        modalTitle = 'Bom Trabalho! 🌟';
    } else if (gameState.score >= 20) {
        performanceMessage = '💪 Bom esforço! Continue praticando!';
        modalTitle = 'Continue Tentando! 💪';
    } else {
        performanceMessage = '📚 Não desanime! Aprenda mais sobre reciclagem!';
        modalTitle = 'Aprenda Mais! 📚';
    }
    
    elements.performanceMessage.textContent = performanceMessage;
    elements.modalTitle.textContent = modalTitle;
    
    // Mostrar modal
    elements.gameOverModal.style.display = 'flex';
}

// Função para fechar modal
function closeModal() {
    elements.gameOverModal.style.display = 'none';
}

// Função para jogar novamente
function playAgain() {
    closeModal();
    startGame();
}

// Função para voltar ao início
function goToHome() {
    closeModal();
    
    // Resetar estado
    gameState.isPlaying = false;
    gameState.isPaused = false;
    gameState.score = 0;
    gameState.timeLeft = 60;
    gameState.objectsRecycled = 0;
    gameState.selectedDifficulty = null;
    
    // Limpar objetos
    elements.objectsArea.innerHTML = '';
    gameState.currentObjects = [];
    
    // Esconder seções
    elements.gameSection.style.display = 'none';
    elements.difficultySection.style.display = 'none';
    
    // Mostrar hero
    document.querySelector('.hero').style.display = 'block';
    
    // Esconder botão de começar jogo
    elements.startGame.style.display = 'none';
    elements.startGame.disabled = true;
    elements.startGame.style.opacity = '0.6';
    
    // Resetar botões
    elements.pauseGame.innerHTML = '<i class="fas fa-pause"></i> Pausar';
    elements.pauseGame.className = 'btn btn-secondary';
    elements.pauseGame.disabled = true;
    elements.restartGame.disabled = true;
    
    // Esconder overlay de pausa
    elements.pauseOverlay.style.display = 'none';
    
    // Parar cronômetro se estiver rodando
    if (gameState.gameTimer) {
        clearInterval(gameState.gameTimer);
    }
    
    // Parar música
    if (audio.background) {
        audio.background.pause();
        audio.background.currentTime = 0;
    }
    
    // Parar música de fundo
    if (audio.ambient) {
        audio.ambient.pause();
        audio.ambient.currentTime = 0;
    }
    
    // Limpar seleção de dificuldade
    document.querySelectorAll('.difficulty-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Função para fechar instruções
window.closeInstructions = closeInstructions;

// Função para fechar modal
window.closeModal = closeModal;

// Função para jogar novamente
window.playAgain = playAgain;

// Função para voltar ao início
window.goToHome = goToHome;

// Função para voltar ao início (usada no botão da seção de dificuldade)
window.goBackToHome = goToHome;

// Adicionar suporte para teclas de atalho
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (elements.gameOverModal.style.display === 'flex') {
            closeModal();
        } else if (elements.instructionsModal.style.display === 'flex') {
            closeInstructions();
        } else if (gameState.isPlaying && !gameState.isPaused) {
            // Pausar jogo com ESC
            e.preventDefault();
            togglePause();
        } else if (gameState.isPlaying && gameState.isPaused) {
            // Despausar jogo com ESC
            e.preventDefault();
            togglePause();
        }
    }
    
    if (e.key === ' ' && gameState.isPlaying) {
        e.preventDefault();
        togglePause();
    }
    
    if (e.key === 'r' && gameState.isPlaying) {
        restartGame();
    }
});

// Melhorias de acessibilidade
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

console.log('🎮 Jogo de Reciclagem configurado com sucesso!');
console.log('🌱 Ajude a salvar o planeta reciclando corretamente!');
console.log('👨‍🏫 Turma 702M - Professores Alessandro e Michele');
console.log('🌙 Sistema de tema implementado - Clique no botão de tema para alternar!');
console.log('✨ Animações de partículas ativas - Aproveite os efeitos visuais!');
console.log('🎵 Sistema de música de fundo ativo - Controle o volume com o botão de música!');
