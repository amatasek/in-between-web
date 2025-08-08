import { r as reactExports, j as jsxRuntimeExports, m as useParams, u as useNavigate } from './react-D-xSlSIM.js';
import { a as useSocket, u as useAuth, s as soundService, U as UserDataContext, f as usePreferences, L as LoadingScreen } from './index-B_3z-Zzg.js';
import { I as IconButton, C as CurrencyAmount, a as PreferencesButton, R as RulesButton, P as PlayerStatsButton, S as StoreButton, c as GameSummaryModal, b as StoreModal, G as GamepadInput, U as UserAvatar } from './StoreModal-CIOpBmpA.js';
import { u as useGamepadNavigation } from './useGamepadNavigation-BcjfaxZ8.js';
import './vendor-B9LcgdhK.js';
import './socket-KU1mICmt.js';

/**
 * Frontend Constants - Game logic and UI constants for the web client
 * 
 * ⚠️  SHARED CONSTANTS - Keep synchronized with backend! ⚠️
 * Some constants must match @am-games-api/src/constants.js
 * Any changes to shared constants should be reflected in the backend constants file.
 */


/**
 * Core game configuration constants
 * 🔄 SHARED: Must match backend GAME_CONSTANTS
 */
const GAME_CONSTANTS = {
  // Timer durations (in milliseconds)
  // 🔄 SHARED: Backend uses these for game logic, frontend for UI timers
  TIMERS: {
    DEALING_DURATION: 3000,         // Total duration of dealing phase (3 seconds)
    BETTING_DURATION: 30000,        // Duration for betting phase (30 seconds)
    REVEALING_DURATION: 3000,       // Duration for revealing phase
    RESULTS_DURATION: 5000}
};

// ========================================
// FRONTEND-ONLY CONSTANTS
// ========================================

/**
 * UI Icons used throughout the application
 * 🎨 FRONTEND-ONLY: These are only used for UI display
 */
const ICONS = {
  POT: '🍯',
  DEALER: '🃏',
  CHECK: '✓',
  DECK: '🃏'
};

// Export specific commonly used constants for convenience
const { TIMERS} = GAME_CONSTANTS;

const GameContext = reactExports.createContext();
const useGameContext = () => {
  const context = reactExports.useContext(GameContext);
  if (context === void 0) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
const GameProvider = ({ children, gameId, initialGameState = null }) => {
  const { socket, error: socketError } = useSocket();
  const { user } = useAuth();
  const [gameState, setGameState] = reactExports.useState(initialGameState);
  reactExports.useRef({});
  const prevActivePlayerRef = reactExports.useRef(null);
  const [error, setError] = reactExports.useState(null);
  const clearError = reactExports.useCallback(() => {
    setError(null);
  }, []);
  reactExports.useEffect(() => {
    if (socketError) {
      setError(socketError);
    }
  }, [socketError]);
  reactExports.useEffect(() => {
    if (!socket) return;
    socket.on("gameReconnected", (data) => {
      console.log(`[Game] Reconnected to game: ${data.gameId}`, data.game);
      setGameState(data.game);
      console.log(`[Game] Successfully reconnected as user ID: ${user?.id}`);
      setError(null);
      if (data.game && data.game.id) {
        setTimeout(() => {
          console.log(`[Game] Requesting fresh game state after reconnection`);
          socket.emit("getGameState", { gameId: data.game.id });
        }, 500);
      }
    });
    socket.on("gameState", (data) => {
      if (data && data.id) {
        if (JSON.stringify(gameState) !== JSON.stringify(data)) {
          if (data.currentPlayerId && user?.id) {
            const isMyTurn = data.currentPlayerId === user.id;
            const wasPreviouslyMyTurn = prevActivePlayerRef.current === user.id;
            if (isMyTurn && !wasPreviouslyMyTurn) {
              soundService.play("ui.alert");
            }
            prevActivePlayerRef.current = data.currentPlayerId;
          }
          setGameState(data);
          clearError();
        }
      }
    });
    socket.on("gameError", (message) => {
      console.error("Game error:", message);
      setError(message);
    });
    return () => {
      socket.off("gameReconnected");
      socket.off("gameState");
      socket.off("gameError");
    };
  }, [socket]);
  const placeBet = reactExports.useCallback((amount) => {
    if (!socket || !gameId) return;
    try {
      socket.emit("placeBet", { bet: amount, gameId });
    } catch (err) {
      console.error("Error placing bet:", err);
      setError("Failed to place bet. Please try again.");
    }
  }, [socket, gameId]);
  const payAnte = reactExports.useCallback(() => {
    if (!socket || !gameId) return;
    try {
      socket.emit("payAnte", { gameId });
    } catch (err) {
      console.error("Error paying ante:", err);
      setError("Failed to pay ante. Please try again.");
    }
  }, [socket, gameId]);
  const dealCards = reactExports.useCallback(() => {
    if (!socket || !gameId) return;
    try {
      socket.emit("dealCards", { gameId });
    } catch (err) {
      console.error("Error dealing cards:", err);
      setError("Failed to deal cards. Please try again.");
    }
  }, [socket, gameId]);
  const revealMiddleCard = reactExports.useCallback(() => {
    if (!socket || !gameId) return;
    try {
      socket.emit("revealMiddleCard", { gameId });
    } catch (err) {
      console.error("Error revealing middle card:", err);
      setError("Failed to reveal middle card. Please try again.");
    }
  }, [socket, gameId]);
  const nextRound = reactExports.useCallback(() => {
    if (!socket || !gameId) return;
    try {
      socket.emit("nextRound", { gameId });
    } catch (err) {
      console.error("Error moving to next round:", err);
      setError("Failed to move to next round. Please try again.");
    }
  }, [socket, gameId]);
  const playerReady = reactExports.useCallback(() => {
    if (!socket || !gameId) return;
    try {
      socket.emit("ready");
    } catch (err) {
      console.error("Error setting player ready:", err);
      setError("Failed to set player ready. Please try again.");
    }
  }, [socket, gameId]);
  const playerUnready = reactExports.useCallback(() => {
    if (!socket || !gameId) return;
    try {
      socket.emit("unready");
    } catch (err) {
      console.error("Error setting player unready:", err);
      setError("Failed to set player unready. Please try again.");
    }
  }, [socket, gameId]);
  const value = {
    // Game state - just provide the complete gameState object
    gameState,
    error,
    gameId,
    // Game actions
    placeBet,
    payAnte,
    playerReady,
    playerUnready,
    dealCards,
    revealMiddleCard,
    nextRound,
    // Helper methods
    clearError
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GameContext.Provider, { value, children });
};

const gameContainer = "_gameContainer_e1zrv_1";
const gameScreen = "_gameScreen_e1zrv_16";
const loadingContainer = "_loadingContainer_e1zrv_52";
const errorContainer = "_errorContainer_e1zrv_61";
const errorText = "_errorText_e1zrv_71";
const gameInfoWrapper = "_gameInfoWrapper_e1zrv_76";
const gameBottomSection = "_gameBottomSection_e1zrv_91";
const playerListContainer = "_playerListContainer_e1zrv_98";
const gameLogContainer$1 = "_gameLogContainer_e1zrv_103";
const imBackButton = "_imBackButton_e1zrv_141";
const styles$f = {
	gameContainer: gameContainer,
	gameScreen: gameScreen,
	loadingContainer: loadingContainer,
	errorContainer: errorContainer,
	errorText: errorText,
	gameInfoWrapper: gameInfoWrapper,
	gameBottomSection: gameBottomSection,
	playerListContainer: playerListContainer,
	gameLogContainer: gameLogContainer$1,
	imBackButton: imBackButton};

const headerContainer = "_headerContainer_bsfrc_1";
const desktopLayout = "_desktopLayout_bsfrc_14";
const mobileLayout = "_mobileLayout_bsfrc_22";
const mobileTopRow = "_mobileTopRow_bsfrc_28";
const mobileRight = "_mobileRight_bsfrc_40";
const mobileActions = "_mobileActions_bsfrc_47";
const mobileBottomRow = "_mobileBottomRow_bsfrc_54";
const headerLeft = "_headerLeft_bsfrc_63";
const headerRight = "_headerRight_bsfrc_69";
const controlsGroup = "_controlsGroup_bsfrc_75";
const controlsStack = "_controlsStack_bsfrc_82";
const mobileControlsStack = "_mobileControlsStack_bsfrc_89";
const gameTitle = "_gameTitle_bsfrc_98";
const liveTag = "_liveTag_bsfrc_108";
const pulse = "_pulse_bsfrc_1";
const gameIdText = "_gameIdText_bsfrc_160";
const gameIdLink = "_gameIdLink_bsfrc_167";
const balanceDisplay = "_balanceDisplay_bsfrc_184";
const headerCenter = "_headerCenter_bsfrc_217";
const gamePhase = "_gamePhase_bsfrc_245";
const phaseIcon = "_phaseIcon_bsfrc_307";
const phaseText = "_phaseText_bsfrc_312";
const timerBar = "_timerBar_bsfrc_316";
const timerProgress = "_timerProgress_bsfrc_326";
const dealPulse = "_dealPulse_bsfrc_1";
const betPulse = "_betPulse_bsfrc_1";
const revealFade = "_revealFade_bsfrc_1";
const resultPulse = "_resultPulse_bsfrc_1";
const phaseBettingYourTurn = "_phaseBettingYourTurn_bsfrc_480";
const phaseBettingWaiting = "_phaseBettingWaiting_bsfrc_487";
const reveal = "_reveal_bsfrc_1";
const sparkle = "_sparkle_bsfrc_1";
const timerDrain = "_timerDrain_bsfrc_1";
const styles$e = {
	headerContainer: headerContainer,
	desktopLayout: desktopLayout,
	mobileLayout: mobileLayout,
	mobileTopRow: mobileTopRow,
	mobileRight: mobileRight,
	mobileActions: mobileActions,
	mobileBottomRow: mobileBottomRow,
	headerLeft: headerLeft,
	headerRight: headerRight,
	controlsGroup: controlsGroup,
	controlsStack: controlsStack,
	mobileControlsStack: mobileControlsStack,
	gameTitle: gameTitle,
	liveTag: liveTag,
	pulse: pulse,
	gameIdText: gameIdText,
	gameIdLink: gameIdLink,
	balanceDisplay: balanceDisplay,
	headerCenter: headerCenter,
	gamePhase: gamePhase,
	phaseIcon: phaseIcon,
	phaseText: phaseText,
	timerBar: timerBar,
	timerProgress: timerProgress,
	dealPulse: dealPulse,
	betPulse: betPulse,
	revealFade: revealFade,
	resultPulse: resultPulse,
	phaseBettingYourTurn: phaseBettingYourTurn,
	phaseBettingWaiting: phaseBettingWaiting,
	reveal: reveal,
	sparkle: sparkle,
	timerDrain: timerDrain
};

const ExitIcon = ({ color = "currentColor", size = 24 }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "16 17 21 12 16 7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
      ]
    }
  );
};

const LeaveButton = ({
  onClick,
  title = "Leave Game",
  ...restProps
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ExitIcon, { color: "white", size: 20 }),
      title,
      onClick,
      variant: "danger",
      ...restProps
    }
  );
};

const phaseDisplayMap = {
  waiting: { text: "Waiting for Players", icon: "👥" },
  dealing: { text: "Dealing Cards", icon: ICONS.DEALER },
  revealing: { text: "Revealing Cards", icon: "🥁" },
  results: { text: "Round Results", icon: "🏆" }
};
const GameHeader = ({ handleLeaveGame, onModalStateChange }) => {
  const { gameState, gameId } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  const currentUserId = socket?.auth?.userId;
  const currentPlayer = currentUserId && gameState?.players ? gameState.players[currentUserId] : null;
  const playerBalance = currentPlayer?.balance ?? user?.balance ?? 0;
  const currentPhase = gameState?.phase || "waiting";
  const isPlayerReady = currentPlayer?.isReady || false;
  const [timeLeft, setTimeLeft] = reactExports.useState(null);
  const [showGameSummary, setShowGameSummary] = reactExports.useState(false);
  const [showStoreModal, setShowStoreModal] = reactExports.useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = reactExports.useState(false);
  const [isRulesOpen, setIsRulesOpen] = reactExports.useState(false);
  const [isStatsOpen, setIsStatsOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let timer;
    if (currentPhase === "dealing") {
      setTimeLeft(TIMERS.DEALING_DURATION);
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    } else if (currentPhase === "betting") {
      setTimeLeft(TIMERS.BETTING_DURATION);
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    } else if (currentPhase === "revealing") {
      setTimeLeft(TIMERS.REVEALING_DURATION);
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    } else if (currentPhase === "results") {
      setTimeLeft(TIMERS.RESULTS_DURATION);
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 100));
      }, 100);
    } else {
      setTimeLeft(null);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentPhase, gameState?.waitingForAceDecision]);
  reactExports.useEffect(() => {
    const isModalOpen = showGameSummary || showStoreModal || isPreferencesOpen || isRulesOpen || isStatsOpen;
    if (onModalStateChange) {
      onModalStateChange(isModalOpen);
    }
  }, [showGameSummary, showStoreModal, isPreferencesOpen, isRulesOpen, isStatsOpen, onModalStateChange]);
  let phaseInfo = phaseDisplayMap[currentPhase] || { text: "Unknown Phase", icon: "❓" };
  if (gameState?.waitingForAceDecision && currentPhase === "dealing") {
    phaseInfo = { text: "Choosing Ace Value", icon: "🤔" };
  }
  if (gameState?.waitingForSecondChance) {
    phaseInfo = { text: "Second Chance Decision", icon: "🤔" };
  }
  const isCurrentPlayersTurn = socket && socket.auth?.userId && gameState?.currentPlayerId === socket.auth.userId;
  if (currentPhase === "betting" && gameState?.currentPlayerId && gameState?.players) {
    const currentPlayer2 = gameState.players[gameState.currentPlayerId];
    if (currentPlayer2) {
      if (isCurrentPlayersTurn) {
        phaseInfo = {
          text: `Pass or Bet`,
          icon: "🤔"
        };
      } else {
        phaseInfo = {
          text: `${currentPlayer2.name} is Betting`,
          icon: "🤔"
        };
      }
    } else {
      phaseInfo = { text: "Betting Round", icon: "🤔" };
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.headerContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.desktopLayout, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: styles$e.gameTitle, children: [
          "In Between ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$e.liveTag, children: "LIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$e.gameIdText, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: styles$e.gameIdLink,
            onClick: () => setShowGameSummary(true),
            title: "Click to view game summary",
            "data-gamepad-focusable": "true",
            tabIndex: "0",
            children: [
              "Game #",
              gameId
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$e.headerCenter, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `${styles$e.gamePhase} ${currentPhase === "betting" ? isCurrentPlayersTurn ? styles$e.phaseBettingYourTurn : styles$e.phaseBettingWaiting : styles$e[`phase${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}`]}`,
          "data-phase": currentPhase,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$e.phaseIcon, children: phaseInfo.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$e.phaseText, children: phaseInfo.text }),
            timeLeft !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$e.timerBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: styles$e.timerProgress,
                style: {
                  width: `${timeLeft / (currentPhase === "dealing" ? TIMERS.DEALING_DURATION : currentPhase === "betting" ? TIMERS.BETTING_DURATION : currentPhase === "revealing" ? TIMERS.REVEALING_DURATION : TIMERS.RESULTS_DURATION) * 100}%`
                }
              }
            ) })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$e.headerRight, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.controlsStack, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.balanceDisplay, children: [
          "Balance: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: Number(playerBalance), size: "small" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.controlsGroup, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PreferencesButton,
            {
              onModalStateChange: setIsPreferencesOpen,
              "data-gamepad-focusable": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            RulesButton,
            {
              onModalStateChange: setIsRulesOpen,
              "data-gamepad-focusable": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PlayerStatsButton,
            {
              onModalStateChange: setIsStatsOpen,
              "data-gamepad-focusable": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StoreButton, { onClick: () => setShowStoreModal(true), "data-gamepad-focusable": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            LeaveButton,
            {
              onClick: handleLeaveGame,
              disabled: isPlayerReady,
              "data-gamepad-focusable": "true"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.mobileLayout, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.mobileTopRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.headerLeft, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: styles$e.gameTitle, children: [
            "In Between ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$e.liveTag, children: "LIVE" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$e.gameIdText, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: styles$e.gameIdLink,
              onClick: () => setShowGameSummary(true),
              title: "Click to view game summary",
              "data-gamepad-focusable": "true",
              tabIndex: "0",
              children: [
                "Game #",
                gameId
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$e.mobileRight, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.mobileControlsStack, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.balanceDisplay, children: [
            "Balance: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: Number(playerBalance), size: "small" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$e.mobileActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PreferencesButton,
              {
                onModalStateChange: setIsPreferencesOpen,
                "data-gamepad-focusable": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RulesButton,
              {
                onModalStateChange: setIsRulesOpen,
                "data-gamepad-focusable": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PlayerStatsButton,
              {
                onModalStateChange: setIsStatsOpen,
                "data-gamepad-focusable": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StoreButton, { onClick: () => setShowStoreModal(true), "data-gamepad-focusable": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              LeaveButton,
              {
                onClick: handleLeaveGame,
                disabled: isPlayerReady,
                "data-gamepad-focusable": "true"
              }
            )
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$e.mobileBottomRow, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `${styles$e.gamePhase} ${currentPhase === "betting" ? isCurrentPlayersTurn ? styles$e.phaseBettingYourTurn : styles$e.phaseBettingWaiting : styles$e[`phase${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}`]}`,
          "data-phase": currentPhase,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$e.phaseIcon, children: phaseInfo.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$e.phaseText, children: phaseInfo.text }),
            timeLeft !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$e.timerBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: styles$e.timerProgress,
                style: {
                  width: `${timeLeft / (currentPhase === "dealing" ? TIMERS.DEALING_DURATION : currentPhase === "betting" ? TIMERS.BETTING_DURATION : currentPhase === "revealing" ? TIMERS.REVEALING_DURATION : TIMERS.RESULTS_DURATION) * 100}%`
                }
              }
            ) })
          ]
        }
      ) })
    ] }),
    showGameSummary && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameSummaryModal,
      {
        onClose: () => setShowGameSummary(false),
        gameData: gameState
      }
    ),
    showStoreModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      StoreModal,
      {
        onClose: () => setShowStoreModal(false)
      }
    )
  ] });
};

const cardDisplayContainer = "_cardDisplayContainer_h5xgf_1";
const cardsRow = "_cardsRow_h5xgf_9";
const card = "_card_h5xgf_1";
const dealingPhase = "_dealingPhase_h5xgf_53";
const revealingPhase = "_revealingPhase_h5xgf_62";
const cardBack = "_cardBack_h5xgf_88";
const redCard = "_redCard_h5xgf_97";
const blackCard = "_blackCard_h5xgf_101";
const cardCorner = "_cardCorner_h5xgf_105";
const bottomRight = "_bottomRight_h5xgf_114";
const cardValue = "_cardValue_h5xgf_122";
const cardSuit = "_cardSuit_h5xgf_128";
const cardCenter = "_cardCenter_h5xgf_133";
const aceCard = "_aceCard_h5xgf_166";
const aceIndicator = "_aceIndicator_h5xgf_170";
const aceHigh = "_aceHigh_h5xgf_190";
const aceLow = "_aceLow_h5xgf_196";
const indicatorContent = "_indicatorContent_h5xgf_202";
const styles$d = {
	cardDisplayContainer: cardDisplayContainer,
	cardsRow: cardsRow,
	card: card,
	dealingPhase: dealingPhase,
	revealingPhase: revealingPhase,
	cardBack: cardBack,
	redCard: redCard,
	blackCard: blackCard,
	cardCorner: cardCorner,
	bottomRight: bottomRight,
	cardValue: cardValue,
	cardSuit: cardSuit,
	cardCenter: cardCenter,
	aceCard: aceCard,
	aceIndicator: aceIndicator,
	aceHigh: aceHigh,
	aceLow: aceLow,
	indicatorContent: indicatorContent};

const ArrowIcon = ({ direction = "up", color = "currentColor", size = 24 }) => {
  const rotation = direction === "down" ? "rotate(180deg)" : "rotate(0deg)";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { transform: rotation, display: "inline-block", transformOrigin: "center" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11l5-5 5 5M7 17l5-5 5 5" })
    }
  );
};

const CardDisplay = () => {
  const { gameState } = useGameContext();
  if (!gameState) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.loading, children: "Loading game state..." });
  }
  const {
    firstCard,
    secondCard,
    thirdCard,
    phase,
    dealer
  } = gameState;
  dealer?.name;
  const cardLabels = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "J": "J",
    "Q": "Q",
    "K": "K",
    "A": "A"
  };
  const suitSymbols = {
    "hearts": "♥",
    "diamonds": "♦",
    "clubs": "♣",
    "spades": "♠",
    // Handle direct Unicode symbols as well
    "♥": "♥",
    "♦": "♦",
    "♣": "♣",
    "♠": "♠"
  };
  const isRedSuit = (suit) => {
    return suit === "♥" || suit === "♦" || suit === "hearts" || suit === "diamonds";
  };
  const renderCard = (card, index) => {
    if (!card) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.card, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardBack }) }, `empty-${index}`);
    const isRed = isRedSuit(card.suit);
    const isAce = card.value === "A";
    const isAceLow = card.isAceLow;
    const isMiddleCard = index === 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${styles$d.card} ${isRed ? styles$d.redCard : styles$d.blackCard} ${isAce ? styles$d.aceCard : ""}`,
        children: [
          isAce && !isMiddleCard && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles$d.aceIndicator} ${isAceLow ? styles$d.aceLow : styles$d.aceHigh} ${isRed ? styles$d.redCard : styles$d.blackCard}`, children: isAceLow ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$d.indicatorContent, children: [
            "LOW ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowIcon, { direction: "down", color: isRed ? "#e74c3c" : "#2c3e50", size: 16 })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$d.indicatorContent, children: [
            "HIGH ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowIcon, { direction: "up", color: isRed ? "#e74c3c" : "#2c3e50", size: 16 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$d.cardCorner, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardValue, children: cardLabels[card.value] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardSuit, children: suitSymbols[card.suit] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardCenter, children: suitSymbols[card.suit] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$d.cardCorner} ${styles$d.bottomRight}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardValue, children: cardLabels[card.value] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardSuit, children: suitSymbols[card.suit] })
          ] })
        ]
      },
      `${card.value}-${card.suit}-${index}`
    );
  };
  const renderCardLayout = () => {
    let displayCards = [null, null, null];
    if (!firstCard && !secondCard && !thirdCard) {
      return displayCards.map((card, index) => renderCard(card, index));
    }
    if (firstCard) {
      displayCards[0] = { ...firstCard };
    }
    if (secondCard) {
      displayCards[2] = { ...secondCard };
    }
    if (thirdCard) {
      displayCards[1] = { ...thirdCard };
    }
    return displayCards.map((card, index) => renderCard(card, index));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$d.cardDisplayContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles$d.cardsRow} ${phase === "dealing" ? styles$d.dealingPhase : ""} ${phase === "revealing" ? styles$d.revealingPhase : ""}`, children: renderCardLayout() }) });
};

const bettingPanel = "_bettingPanel_1uxgg_1";
const betContainer = "_betContainer_1uxgg_19";
const betText = "_betText_1uxgg_28";
const extremeOptionsRow = "_extremeOptionsRow_1uxgg_45";
const betButtons = "_betButtons_1uxgg_60";
const betButton = "_betButton_1uxgg_60";
const disabledButton = "_disabledButton_1uxgg_110";
const extremeButton = "_extremeButton_1uxgg_117";
const passButton$1 = "_passButton_1uxgg_131";
const customBetContainer = "_customBetContainer_1uxgg_141";
const customBetInput = "_customBetInput_1uxgg_155";
const customBetButton = "_customBetButton_1uxgg_166";
const styles$c = {
	bettingPanel: bettingPanel,
	betContainer: betContainer,
	betText: betText,
	extremeOptionsRow: extremeOptionsRow,
	betButtons: betButtons,
	betButton: betButton,
	disabledButton: disabledButton,
	extremeButton: extremeButton,
	passButton: passButton$1,
	customBetContainer: customBetContainer,
	customBetInput: customBetInput,
	customBetButton: customBetButton
};

const potButton = "_potButton_146vb_5";
const shimmerBorder$1 = "_shimmerBorder_146vb_47";
const buttonBackground = "_buttonBackground_146vb_81";
const reflectionEffect = "_reflectionEffect_146vb_101";
const buttonContent$1 = "_buttonContent_146vb_148";
const potText = "_potText_146vb_164";
const potAmount$1 = "_potAmount_146vb_185";
const disabled = "_disabled_146vb_258";
const styles$b = {
	potButton: potButton,
	shimmerBorder: shimmerBorder$1,
	buttonBackground: buttonBackground,
	reflectionEffect: reflectionEffect,
	buttonContent: buttonContent$1,
	potText: potText,
	potAmount: potAmount$1,
	disabled: disabled
};

const PotButton = ({ amount, disabled, onClick, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `${styles$b.potButton} ${disabled ? styles$b.disabled : ""}`,
      onClick,
      disabled,
      "aria-label": `Bet the pot: ${amount} chips`,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$b.shimmerBorder }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$b.buttonBackground }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$b.reflectionEffect }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$b.buttonContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$b.potText, children: "POT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$b.potAmount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount, background: "pill" }) })
        ] })
      ]
    }
  );
};

const BettingPanel = () => {
  const { gameState, placeBet } = useGameContext();
  const { socket } = useSocket();
  const [customBet, setCustomBet] = reactExports.useState("");
  if (!gameState) return null;
  const {
    players,
    currentPlayerId,
    pot: potAmount,
    phase,
    firstCard,
    secondCard
  } = gameState;
  if (phase !== "betting") return null;
  const isCurrentPlayer = socket && currentPlayerId === socket.auth?.userId;
  const myPlayer = socket && players && socket.auth?.userId ? players[socket.auth.userId] : null;
  const playerBalance = Number(myPlayer?.balance || 0);
  const handleCustomBetChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const maxBet = Math.min(potAmount, playerBalance);
    if (value && parseInt(value) > maxBet) {
      setCustomBet(maxBet.toString());
    } else {
      setCustomBet(value);
    }
  };
  const handleCustomBetSubmit = () => {
    if (customBet && !isNaN(customBet)) {
      const betAmount = parseInt(customBet, 10);
      if (betAmount >= 1 && betAmount <= Math.min(potAmount, playerBalance)) {
        placeBet(betAmount);
        setCustomBet("");
      }
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCustomBetSubmit();
    }
  };
  const renderBettingControls = () => {
    if (!isCurrentPlayer) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$c.betContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$c.betText, children: [
        "Place your bet (Min: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: 1 }),
        ", Max: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: Math.min(potAmount, playerBalance) }),
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$c.extremeOptionsRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$c.betButton} ${styles$c.extremeButton} ${styles$c.passButton}`,
            onClick: () => placeBet(0),
            "data-gamepad-focusable": "true",
            autoFocus: true,
            children: "PASS"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PotButton,
          {
            amount: potAmount,
            onClick: () => placeBet(potAmount),
            disabled: potAmount > playerBalance,
            "data-gamepad-focusable": "true"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$c.betButtons, children: [
        [1, 2, 5].map((amount) => {
          const maxBet = Math.min(potAmount, playerBalance);
          const disabled = amount > maxBet;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `${styles$c.betButton} ${disabled ? styles$c.disabledButton : ""}`,
              onClick: () => placeBet(amount),
              disabled,
              "data-gamepad-focusable": "true",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount })
            },
            amount
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$c.customBetContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GamepadInput,
            {
              title: "Enter Bet Amount",
              type: "number",
              className: styles$c.customBetInput,
              placeholder: "Custom",
              value: customBet,
              onChange: handleCustomBetChange,
              onKeyPress: handleKeyPress
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: styles$c.customBetButton,
              onClick: handleCustomBetSubmit,
              disabled: !customBet,
              "data-gamepad-focusable": "true",
              children: "Bet"
            }
          )
        ] })
      ] })
    ] });
  };
  if (!isCurrentPlayer) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$c.bettingPanel, children: renderBettingControls() });
};

const playersContainer = "_playersContainer_1etil_1";
const playersTitle = "_playersTitle_1etil_15";
const playersList = "_playersList_1etil_38";
const playerItem = "_playerItem_1etil_44";
const currentPlayer = "_currentPlayer_1etil_72";
const currentUser = "_currentUser_1etil_78";
const playerInfo = "_playerInfo_1etil_82";
const playerName = "_playerName_1etil_89";
const playerStatus = "_playerStatus_1etil_94";
const disconnectedIndicator = "_disconnectedIndicator_1etil_101";
const playerBalanceContainer = "_playerBalanceContainer_1etil_108";
const playerBalance = "_playerBalance_1etil_108";
const balanceIncrease = "_balanceIncrease_1etil_127";
const balanceDecrease = "_balanceDecrease_1etil_131";
const readyIndicator = "_readyIndicator_1etil_161";
const ready = "_ready_1etil_161";
const notReady = "_notReady_1etil_172";
const sittingOut = "_sittingOut_1etil_176";
const emptyPlayerList = "_emptyPlayerList_1etil_191";
const styles$a = {
	playersContainer: playersContainer,
	playersTitle: playersTitle,
	playersList: playersList,
	playerItem: playerItem,
	currentPlayer: currentPlayer,
	currentUser: currentUser,
	playerInfo: playerInfo,
	playerName: playerName,
	playerStatus: playerStatus,
	disconnectedIndicator: disconnectedIndicator,
	playerBalanceContainer: playerBalanceContainer,
	playerBalance: playerBalance,
	balanceIncrease: balanceIncrease,
	balanceDecrease: balanceDecrease,
	readyIndicator: readyIndicator,
	ready: ready,
	notReady: notReady,
	sittingOut: sittingOut,
	emptyPlayerList: emptyPlayerList};

const PlayerList = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const userDataContext = reactExports.useContext(UserDataContext);
  reactExports.useEffect(() => {
    if (gameState?.players && userDataContext) {
      const userIds = Object.values(gameState.players).map((player) => player.userId).filter(Boolean);
      if (userIds.length > 0) {
        userDataContext.prefetchUsers(userIds);
      }
    }
  }, [gameState?.players, userDataContext]);
  if (!gameState || !gameState.players) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$a.emptyPlayerList, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Waiting for game data..." }) });
  }
  const { players, currentPlayerId, dealerId, gameTransactions = [] } = gameState;
  const currentUserId = socket?.auth?.userId;
  const playerTotals = gameState.totals || {};
  if (!players || Object.keys(players).length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$a.emptyPlayerList, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Waiting for players to join..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$a.playersContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: styles$a.playersTitle, children: "Scoreboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$a.playersList, children: gameState.seats.filter((playerId) => playerId !== null && players[playerId]).map((playerId) => {
      const player = players[playerId];
      const isCurrentPlayer = playerId === currentPlayerId;
      const isCurrentUser = player.userId === currentUserId;
      const isDealer = playerId === dealerId;
      player.disconnected === true;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `
                  ${styles$a.playerItem}
                  ${isCurrentPlayer ? styles$a.currentPlayer : ""}
                  ${isCurrentUser ? styles$a.currentUser : ""}
                `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$a.playerInfo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserAvatar,
                {
                  userId: player.userId,
                  size: "small",
                  showName: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$a.playerName, children: [
                player.name,
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$a.playerStatus, children: [
                  isDealer && ` ${ICONS.DEALER}`,
                  player.disconnected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$a.disconnectedIndicator, title: "Player disconnected", children: "⚠️ Disconnected" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$a.playerBalanceContainer, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BalanceDisplay, { balance: playerTotals[playerId] || 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `
                    ${styles$a.readyIndicator} 
                    ${player.isSittingOut ? styles$a.sittingOut : player.isReady ? styles$a.ready : styles$a.notReady}
                  `,
                  title: player.isSittingOut ? "Sitting Out" : player.isReady ? "Ready" : "Not Ready"
                }
              )
            ] })
          ]
        },
        playerId
      );
    }) })
  ] });
};
const BalanceDisplay = ({ balance }) => {
  const [prevBalance, setPrevBalance] = reactExports.useState(balance);
  const [animationClass, setAnimationClass] = reactExports.useState("");
  const timeoutRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (balance !== prevBalance) {
      const isIncrease = balance > prevBalance;
      setAnimationClass(isIncrease ? styles$a.balanceIncrease : styles$a.balanceDecrease);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setAnimationClass("");
      }, 1e3);
      setPrevBalance(balance);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [balance]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles$a.playerBalance} ${animationClass}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: balance }) });
};

const potDisplayContainer = "_potDisplayContainer_1seua_1";
const potIconWrapper = "_potIconWrapper_1seua_29";
const potIcon = "_potIcon_1seua_29";
const potInfo = "_potInfo_1seua_55";
const potLabel = "_potLabel_1seua_61";
const potAmount = "_potAmount_1seua_73";
const potCounter = "_potCounter_1seua_80";
const styles$9 = {
	potDisplayContainer: potDisplayContainer,
	potIconWrapper: potIconWrapper,
	potIcon: potIcon,
	potInfo: potInfo,
	potLabel: potLabel,
	potAmount: potAmount,
	potCounter: potCounter
};

const PotDisplay = () => {
  const { gameState } = useGameContext();
  if (!gameState) return null;
  const { pot, round = 1 } = gameState;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.potDisplayContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.potIconWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$9.potIcon, children: ICONS.POT }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.potInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: styles$9.potLabel, children: [
        "POT ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$9.potCounter, children: [
          "(",
          round,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$9.potAmount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: pot, size: "medium" }) })
    ] })
  ] });
};

const deckDisplayContainer = "_deckDisplayContainer_1nuck_1";
const deckVisual = "_deckVisual_1nuck_29";
const deckIcon = "_deckIcon_1nuck_37";
const deckThick = "_deckThick_1nuck_45";
const deckMedium = "_deckMedium_1nuck_46";
const deckThin = "_deckThin_1nuck_47";
const deckVeryThin = "_deckVeryThin_1nuck_48";
const deckInfo = "_deckInfo_1nuck_95";
const deckLabel = "_deckLabel_1nuck_101";
const deckCount = "_deckCount_1nuck_113";
const deckCounter = "_deckCounter_1nuck_120";
const styles$8 = {
	deckDisplayContainer: deckDisplayContainer,
	deckVisual: deckVisual,
	deckIcon: deckIcon,
	deckThick: deckThick,
	deckMedium: deckMedium,
	deckThin: deckThin,
	deckVeryThin: deckVeryThin,
	deckInfo: deckInfo,
	deckLabel: deckLabel,
	deckCount: deckCount,
	deckCounter: deckCounter
};

const DeckDisplay = () => {
  const { gameState } = useGameContext();
  if (!gameState) return null;
  const { deckSize = 0, deckCount = 1 } = gameState;
  const getThicknessClass = () => {
    if (deckSize >= 40) return styles$8.deckThick;
    if (deckSize >= 25) return styles$8.deckMedium;
    if (deckSize >= 10) return styles$8.deckThin;
    return styles$8.deckVeryThin;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.deckDisplayContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles$8.deckVisual} ${getThicknessClass()}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$8.deckIcon, children: ICONS.DECK }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$8.deckInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: styles$8.deckLabel, children: [
        "DECK ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$8.deckCounter, children: [
          "(",
          deckCount,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$8.deckCount, children: deckSize })
    ] })
  ] });
};

const anteControlsWrapper = "_anteControlsWrapper_kosev_1";
const controlsContainer = "_controlsContainer_kosev_8";
const autoAnteContainer = "_autoAnteContainer_kosev_25";
const anteButton = "_anteButton_kosev_32";
const backOutButton = "_backOutButton_kosev_32";
const shimmerBorder = "_shimmerBorder_kosev_107";
const anteIcon = "_anteIcon_kosev_225";
const backOutIcon = "_backOutIcon_kosev_225";
const buttonInfo = "_buttonInfo_kosev_244";
const buttonLabel = "_buttonLabel_kosev_250";
const buttonAmount = "_buttonAmount_kosev_267";
const notEnoughChipsText = "_notEnoughChipsText_kosev_282";
const buttonContainerRow = "_buttonContainerRow_kosev_294";
const sitOutHalfWidth = "_sitOutHalfWidth_kosev_304";
const styles$7 = {
	anteControlsWrapper: anteControlsWrapper,
	controlsContainer: controlsContainer,
	autoAnteContainer: autoAnteContainer,
	anteButton: anteButton,
	backOutButton: backOutButton,
	shimmerBorder: shimmerBorder,
	anteIcon: anteIcon,
	backOutIcon: backOutIcon,
	buttonInfo: buttonInfo,
	buttonLabel: buttonLabel,
	buttonAmount: buttonAmount,
	notEnoughChipsText: notEnoughChipsText,
	buttonContainerRow: buttonContainerRow,
	sitOutHalfWidth: sitOutHalfWidth};

const toggleContainer = "_toggleContainer_11qbc_1";
const toggleLabel = "_toggleLabel_11qbc_12";
const toggleInput = "_toggleInput_11qbc_19";
const toggleSlider = "_toggleSlider_11qbc_25";
const toggleText = "_toggleText_11qbc_74";
const loading = "_loading_11qbc_82";
const styles$6 = {
	toggleContainer: toggleContainer,
	toggleLabel: toggleLabel,
	toggleInput: toggleInput,
	toggleSlider: toggleSlider,
	toggleText: toggleText,
	loading: loading
};

const AutoAnteToggle = () => {
  const { preferences, toggleAutoAnte, loading } = usePreferences();
  const { gameState, playerReady } = useGameContext();
  const { socket } = useSocket();
  const handleToggle = async () => {
    const newValue = !preferences.autoAnte;
    const success = await toggleAutoAnte();
    if (newValue && success && playerReady) {
      let myPlayer = null;
      if (socket && socket.auth?.userId && gameState?.players) {
        const playerIds = Object.keys(gameState.players);
        for (const id of playerIds) {
          if (gameState.players[id].userId === socket.auth.userId) {
            myPlayer = gameState.players[id];
            break;
          }
        }
      }
      const isPlayerReady = myPlayer?.isReady;
      if (!isPlayerReady) {
        playerReady();
      }
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$6.loading, children: "Loading preferences..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$6.toggleContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: styles$6.toggleLabel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        checked: preferences.autoAnte,
        onChange: handleToggle,
        className: styles$6.toggleInput,
        "data-gamepad-focusable": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$6.toggleSlider }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$6.toggleText, children: "Auto-Ante" })
  ] }) });
};

const AnteControls = () => {
  const { gameState, playerReady, playerUnready } = useGameContext();
  const { socket } = useSocket();
  const { user } = useAuth();
  if (!gameState) return null;
  const {
    players,
    anteAmount,
    phase
  } = gameState;
  if (phase !== "waiting") return null;
  let myPlayer = null;
  if (socket && socket.auth?.userId && players) {
    const playerIds = Object.keys(players);
    for (const id of playerIds) {
      if (players[id].userId === socket.auth.userId) {
        myPlayer = players[id];
        break;
      }
    }
  } else if (user && players) {
    const playerIds = Object.keys(players);
    for (const id of playerIds) {
      if (players[id].userId === user.id) {
        myPlayer = players[id];
        console.log(`[AnteControls] Found player by user ID instead of socket ID`);
        break;
      }
    }
  }
  const playerBalance = Number(myPlayer?.balance || 0);
  const isPlayerReady = myPlayer?.isReady;
  const hasEnoughChips = playerBalance >= anteAmount;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.anteControlsWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$7.controlsContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.buttonContainerRow, children: !isPlayerReady ? (
      // Player is not ready - show Ante button and Sit Out button side by side
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$7.buttonContainerRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: styles$7.anteButton,
            onClick: playerReady,
            disabled: !hasEnoughChips,
            "aria-label": "Ante up",
            "data-gamepad-focusable": "true",
            autoFocus: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.shimmerBorder }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$7.anteIcon, children: ICONS.CHECK }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$7.buttonInfo, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: styles$7.buttonLabel, children: "ANTE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$7.buttonAmount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: anteAmount }) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: `${styles$7.backOutButton} ${styles$7.sitOutHalfWidth}`,
            onClick: () => {
              if (socket && gameState && user) {
                socket.emit("sitOut", {
                  gameId: gameState.id,
                  userId: socket.auth?.userId || user.id
                });
              }
            },
            disabled: myPlayer?.isSittingOut,
            title: myPlayer?.isSittingOut ? "You are currently sitting out" : "Sit out next round",
            "aria-label": "Sit Out",
            "data-gamepad-focusable": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.shimmerBorder }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.buttonInfo, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: styles$7.buttonLabel, children: "SIT OUT" }) })
            ]
          }
        ),
        !hasEnoughChips && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$7.notEnoughChipsText, children: [
          "Not enough coins (",
          /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: anteAmount }),
          " required)"
        ] })
      ] })
    ) : (
      // Player is ready - show Back Out button
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.buttonContainerRow, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: styles$7.backOutButton,
          onClick: () => {
            if (typeof playerUnready === "function") {
              playerUnready();
            } else {
              console.error("playerUnready is not a function");
            }
          },
          "aria-label": "Back out",
          "data-gamepad-focusable": "true",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.shimmerBorder }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$7.backOutIcon, children: "✕" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.buttonInfo, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: styles$7.buttonLabel, children: "BACK OUT" }) })
          ]
        }
      ) })
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.autoAnteContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutoAnteToggle, {}) })
  ] }) });
};

const resultsPanel = "_resultsPanel_ayp0x_1";
const resultContent = "_resultContent_ayp0x_19";
const resultText = "_resultText_ayp0x_27";
const winText = "_winText_ayp0x_34";
const tieText = "_tieText_ayp0x_39";
const loseText = "_loseText_ayp0x_50";
const winningsText = "_winningsText_ayp0x_55";
const countdownContainer = "_countdownContainer_ayp0x_62";
const countdownText = "_countdownText_ayp0x_67";
const countdownProgress = "_countdownProgress_ayp0x_74";
const countdownBar = "_countdownBar_ayp0x_82";
const penaltyWarning = "_penaltyWarning_ayp0x_95";
const styles$5 = {
	resultsPanel: resultsPanel,
	resultContent: resultContent,
	resultText: resultText,
	winText: winText,
	tieText: tieText,
	loseText: loseText,
	winningsText: winningsText,
	countdownContainer: countdownContainer,
	countdownText: countdownText,
	countdownProgress: countdownProgress,
	countdownBar: countdownBar,
	penaltyWarning: penaltyWarning};

const ResultsPanel = () => {
  const { gameState } = useGameContext();
  if (!gameState.result) return null;
  const { result, players, resultCountdown } = gameState;
  const playerName = players[result.playerId]?.name;
  const renderWinResult = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: `${styles$5.resultText} ${styles$5.winText}`, children: [
      playerName,
      " WON!"
    ] }),
    result.winnings > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$5.winningsText, children: [
      "Winnings: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: result.winnings / 2, size: "medium" })
    ] })
  ] });
  const renderLossResult = () => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: `${styles$5.resultText} ${styles$5.loseText}`, children: [
      playerName,
      " LOST!"
    ] }),
    result.betAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$5.winningsText, children: [
      "Loss: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: result.betAmount, size: "medium" })
    ] })
  ] });
  const renderTieResult = () => {
    const penaltyAmount = result.betAmount * (result.isTripleAceTie ? 3 : 2);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$5.penaltyWarning, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$5.cautionTape }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: `${styles$5.resultText} ${styles$5.tieText}`, children: [
        playerName,
        " ",
        result.isTripleAceTie ? "3X" : "2X",
        " PENALTY!"
      ] }),
      result.betAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$5.winningsText, children: [
        "Penalty: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: penaltyAmount, size: "medium" })
      ] })
    ] });
  };
  const renderOutcome = () => {
    switch (result.outcome) {
      case "win":
        return renderWinResult();
      case "lose":
        return renderLossResult();
      case "tie":
        return renderTieResult();
      default:
        return null;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$5.resultsPanel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$5.resultContent, children: [
    renderOutcome(),
    resultCountdown && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$5.countdownContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$5.countdownText, children: [
        "Next hand in: ",
        resultCountdown.countdownSeconds,
        "s"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$5.countdownProgress, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: styles$5.countdownBar,
          style: { width: `${resultCountdown.countdownSeconds / 5 * 100}%` }
        }
      ) })
    ] })
  ] }) });
};

const aceChoicePanel = "_aceChoicePanel_1y6rg_1";
const aceChoiceControls = "_aceChoiceControls_1y6rg_18";
const aceChoiceText = "_aceChoiceText_1y6rg_31";
const waitingMessage$1 = "_waitingMessage_1y6rg_39";
const waitingText$1 = "_waitingText_1y6rg_53";
const countdown$1 = "_countdown_1y6rg_60";
const aceChoiceButtons = "_aceChoiceButtons_1y6rg_66";
const aceChoiceButton = "_aceChoiceButton_1y6rg_66";
const aceHighButton = "_aceHighButton_1y6rg_100";
const aceLowButton = "_aceLowButton_1y6rg_111";
const buttonContent = "_buttonContent_1y6rg_122";
const styles$4 = {
	aceChoicePanel: aceChoicePanel,
	aceChoiceControls: aceChoiceControls,
	aceChoiceText: aceChoiceText,
	waitingMessage: waitingMessage$1,
	waitingText: waitingText$1,
	countdown: countdown$1,
	aceChoiceButtons: aceChoiceButtons,
	aceChoiceButton: aceChoiceButton,
	aceHighButton: aceHighButton,
	aceLowButton: aceLowButton,
	buttonContent: buttonContent};

const AceChoicePanel = () => {
  const { socket } = useSocket();
  const { gameState } = useGameContext();
  const { user } = useAuth();
  const [countdown, setCountdown] = reactExports.useState(15);
  reactExports.useEffect(() => {
    if (gameState?.waitingForAceDecision && socket?.auth?.userId === gameState.currentPlayerId) {
      setCountdown(15);
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1e3);
      return () => clearInterval(timer);
    }
  }, [gameState?.waitingForAceDecision, gameState?.currentPlayerId, socket?.auth?.userId]);
  const handleAceChoice = (isAceLow) => {
    socket.emit("chooseAceValue", { isAceLow });
  };
  const isCurrentPlayersTurn = socket?.auth?.userId === gameState.currentPlayerId;
  const currentPlayerName = gameState.players[gameState.currentPlayerId]?.name || "Current player";
  const renderAceChoiceControls = () => {
    if (!isCurrentPlayersTurn) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.aceChoiceControls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$4.aceChoiceText, children: [
        "You've been dealt an Ace! Choose whether it should be high or low.",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$4.countdown, children: [
          " (",
          countdown,
          "s)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.aceChoiceButtons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$4.aceChoiceButton} ${styles$4.aceHighButton}`,
            onClick: () => handleAceChoice(false),
            "data-gamepad-focusable": "true",
            autoFocus: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$4.buttonContent, children: [
              "ACE HIGH ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowIcon, { direction: "up", color: "white", size: 20 })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$4.aceChoiceButton} ${styles$4.aceLowButton}`,
            onClick: () => handleAceChoice(true),
            "data-gamepad-focusable": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$4.buttonContent, children: [
              "ACE LOW ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowIcon, { direction: "down", color: "white", size: 20 })
            ] })
          }
        )
      ] })
    ] });
  };
  const renderWaitingMessage = () => {
    if (isCurrentPlayersTurn) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.waitingMessage, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$4.waitingText, children: [
      currentPlayerName,
      " is choosing whether their Ace is high or low..."
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.aceChoicePanel, children: [
    renderAceChoiceControls(),
    renderWaitingMessage()
  ] });
};

const secondChancePanel = "_secondChancePanel_mgk8a_1";
const secondChanceControls = "_secondChanceControls_mgk8a_18";
const secondChanceText = "_secondChanceText_mgk8a_31";
const waitingMessage = "_waitingMessage_mgk8a_40";
const waitingText = "_waitingText_mgk8a_54";
const countdown = "_countdown_mgk8a_61";
const secondChanceButtons = "_secondChanceButtons_mgk8a_68";
const secondChanceButton = "_secondChanceButton_mgk8a_68";
const anteAgainButton = "_anteAgainButton_mgk8a_94";
const passButton = "_passButton_mgk8a_107";
const currencyWrapper = "_currencyWrapper_mgk8a_120";
const styles$3 = {
	secondChancePanel: secondChancePanel,
	secondChanceControls: secondChanceControls,
	secondChanceText: secondChanceText,
	waitingMessage: waitingMessage,
	waitingText: waitingText,
	countdown: countdown,
	secondChanceButtons: secondChanceButtons,
	secondChanceButton: secondChanceButton,
	anteAgainButton: anteAgainButton,
	passButton: passButton,
	currencyWrapper: currencyWrapper};

const SecondChancePanel = () => {
  const { gameState } = useGameContext();
  const { socket } = useSocket();
  const [loading, setLoading] = reactExports.useState(false);
  const [actionType, setActionType] = reactExports.useState(null);
  const [countdown, setCountdown] = reactExports.useState(15);
  reactExports.useEffect(() => {
    if (gameState?.waitingForSecondChance && socket?.auth?.userId === gameState.currentPlayerId) {
      setCountdown(15);
      const timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1e3);
      return () => clearInterval(timer);
    }
  }, [gameState?.waitingForSecondChance, gameState?.currentPlayerId, socket?.auth?.userId]);
  const {
    players,
    currentPlayerId,
    anteAmount = 1
  } = gameState;
  const isCurrentPlayer = socket && currentPlayerId === socket.auth?.userId;
  const currentPlayer = players[currentPlayerId];
  const handleSecondChance = (anteAgain) => {
    if (socket) {
      setLoading(true);
      setActionType(anteAgain ? "ante" : "pass");
      socket.emit("secondChance", { anteAgain });
    }
  };
  const renderSecondChanceControls = () => {
    if (!isCurrentPlayer) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.secondChanceControls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$3.secondChanceText, children: [
        "Would you like to ante up again for a second chance?",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$3.countdown, children: [
          " (",
          countdown,
          "s)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.secondChanceButtons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$3.secondChanceButton} ${styles$3.anteAgainButton}`,
            onClick: () => handleSecondChance(true),
            "data-gamepad-focusable": "true",
            autoFocus: true,
            children: loading && actionType === "ante" ? "Processing..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Ante Up ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.currencyWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: anteAmount, size: "small" }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$3.secondChanceButton} ${styles$3.passButton}`,
            onClick: () => handleSecondChance(false),
            "data-gamepad-focusable": "true",
            children: loading && actionType === "pass" ? "Processing..." : "Pass"
          }
        )
      ] })
    ] });
  };
  const renderWaitingMessage = () => {
    if (isCurrentPlayer) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.waitingMessage, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: styles$3.waitingText, children: [
      currentPlayer?.name,
      " is deciding whether to take a second chance."
    ] }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.secondChancePanel, children: [
    renderSecondChanceControls(),
    renderWaitingMessage()
  ] });
};

const gameLogContainer = "_gameLogContainer_1c2o8_1";
const gameLogHeader = "_gameLogHeader_1c2o8_10";
const expandIcon = "_expandIcon_1c2o8_28";
const gameLogEntries = "_gameLogEntries_1c2o8_51";
const expanded = "_expanded_1c2o8_61";
const logEntry = "_logEntry_1c2o8_65";
const logTime = "_logTime_1c2o8_90";
const logMessage = "_logMessage_1c2o8_97";
const emptyLog = "_emptyLog_1c2o8_102";
const showMoreButton = "_showMoreButton_1c2o8_110";
const styles$2 = {
	gameLogContainer: gameLogContainer,
	gameLogHeader: gameLogHeader,
	expandIcon: expandIcon,
	gameLogEntries: gameLogEntries,
	expanded: expanded,
	logEntry: logEntry,
	logTime: logTime,
	logMessage: logMessage,
	emptyLog: emptyLog,
	showMoreButton: showMoreButton
};

const GameLog = () => {
  const { gameState } = useGameContext();
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  if (!gameState || !gameState.gameLog) return null;
  const logEntries = gameState.gameLog || [];
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const displayEntries = isExpanded ? logEntries : logEntries.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.gameLogContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.gameLogHeader, onClick: toggleExpanded, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Game Log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.expandIcon, children: isExpanded ? "▲" : "▼" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles$2.gameLogEntries} ${isExpanded ? styles$2.expanded : ""}`, children: displayEntries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.emptyLog, children: "No game events yet" }) : displayEntries.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.logEntry, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.logTime, children: formatTime(entry.timestamp) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.logMessage, children: entry.message })
    ] }, index)) }),
    !isExpanded && logEntries.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.showMoreButton, onClick: toggleExpanded, children: [
      "Show ",
      logEntries.length - 5,
      " more entries"
    ] })
  ] });
};

const emojiReactions = "_emojiReactions_19n7s_1";
const toggleButton = "_toggleButton_19n7s_8";
const emojiPanel = "_emojiPanel_19n7s_34";
const emojiGrid = "_emojiGrid_19n7s_59";
const emojiButton = "_emojiButton_19n7s_65";
const styles$1 = {
	emojiReactions: emojiReactions,
	toggleButton: toggleButton,
	emojiPanel: emojiPanel,
	emojiGrid: emojiGrid,
	emojiButton: emojiButton};

const EmojiReactions = () => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const { socket } = useSocket();
  const { gameState } = useGameContext();
  const { user } = useAuth();
  const emojis = [
    { emoji: "🔥", name: "Fire", color: "#FF6B35" },
    // Orange-red flame
    { emoji: "😄", name: "Happy", color: "#FFD93D" },
    // Yellow happy face
    { emoji: "💩", name: "Poop", color: "#8B4513" },
    // Brown
    { emoji: "😎", name: "Cool", color: "#4A5568" },
    // Dark gray (sunglasses)
    { emoji: "🤯", name: "Mind Blown", color: "#FFA500" },
    // Orange explosion
    { emoji: "😈", name: "Devilish", color: "#9333EA" },
    // Purple devil
    { emoji: "😬", name: "Worried", color: "#FCD34D" },
    // Yellow grimace
    { emoji: "👏", name: "Applause", color: "#FBBF24" },
    // Skin tone yellow
    { emoji: "😭", name: "Crying", color: "#3B82F6" },
    // Blue tears
    { emoji: "🤡", name: "Clown", color: "#EF4444" },
    // Red nose
    { emoji: "💪", name: "Strong", color: "#F59E0B" },
    // Skin/muscle tone
    { emoji: "😅", name: "Nervous", color: "#60A5FA" },
    // Blue sweat drop
    { emoji: "🎉", name: "Celebration", color: "#A855F7" },
    // Multi-color party
    { emoji: "🤔", name: "Thinking", color: "#6B7280" },
    // Neutral gray
    { emoji: "🙈", name: "See No Evil", color: "#A0522D" },
    // Monkey brown
    { emoji: "😤", name: "Confident", color: "#DC2626" }
    // Red anger/steam
  ];
  const handleEmojiClick = (emojiData) => {
    if (!socket || !gameState || !user) {
      return;
    }
    socket.emit("emojiReaction", {
      gameId: gameState.id,
      emoji: emojiData.emoji,
      color: emojiData.color,
      playerName: user.username
    });
    setIsOpen(false);
  };
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.emojiReactions, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: styles$1.toggleButton,
        onClick: togglePanel,
        "data-gamepad-focusable": "true",
        "aria-label": "Toggle emoji reactions",
        children: "😊"
      }
    ),
    isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.emojiPanel, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.emojiGrid, children: emojis.map((emojiData, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: styles$1.emojiButton,
        onClick: () => handleEmojiClick(emojiData),
        "data-gamepad-focusable": "true",
        title: emojiData.name,
        style: { "--emoji-color": emojiData.color },
        children: emojiData.emoji
      },
      index
    )) }) })
  ] });
};

const GameScreen = ({ onReturnToLobby }) => {
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const {
    gameState,
    error,
    clearError
  } = useGameContext();
  useGamepadNavigation(true);
  reactExports.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 1e4);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);
  const handleLeaveGame = () => {
    if (onReturnToLobby) {
      onReturnToLobby();
    }
  };
  const { socket } = useSocket();
  const { user } = useAuth();
  if (!gameState) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$f.loadingContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Loading game state..." }) });
  }
  const phase = gameState.phase || "waiting";
  const currentUserId = user?.id;
  const currentPlayer = gameState.players && currentUserId ? gameState.players[currentUserId] : null;
  const handleImBackClick = () => {
    if (socket && gameState.id) {
      socket.emit("imBack", { gameId: gameState.id });
    } else {
      console.error("Cannot emit 'imBack': socket or gameId missing.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$f.gameContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$f.gameScreen} mobile-scale-content`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameHeader,
        {
          handleLeaveGame,
          onModalStateChange: setIsModalOpen
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$f.errorContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$f.errorText, children: error }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$f.gameInfoWrapper, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DeckDisplay, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PotDisplay, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDisplay, {}),
      currentPlayer?.isSittingOut ? (
        // If sitting out, always show the 'I'm Back!' button regardless of phase
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleImBackClick, className: styles$f.imBackButton, "data-gamepad-focusable": "true", autoFocus: true, children: "I'm Back!" })
      ) : (
        // If not sitting out, render controls based on the game phase
        phase === "waiting" ? (
          /* Show ante controls during waiting phase */
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnteControls, {})
        ) : phase === "results" ? (
          /* Show the results panel during results phase */
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResultsPanel, {})
        ) : gameState.waitingForAceDecision ? (
          /* Show the Ace choice panel when first card is an Ace */
          /* @__PURE__ */ jsxRuntimeExports.jsx(AceChoicePanel, {})
        ) : gameState.waitingForSecondChance ? (
          /* Show the Second Chance panel when matching cards are dealt */
          /* @__PURE__ */ jsxRuntimeExports.jsx(SecondChancePanel, {})
        ) : phase === "betting" ? (
          /* Show the betting panel only during betting phase */
          /* @__PURE__ */ jsxRuntimeExports.jsx(BettingPanel, {})
        ) : null
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$f.gameBottomSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$f.playerListContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerList, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$f.gameLogContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameLog, {}) })
      ] })
    ] }),
    !isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(EmojiReactions, {})
  ] });
};

const modalOverlay = "_modalOverlay_quw6f_1";
const modalContent = "_modalContent_quw6f_14";
const passwordInput = "_passwordInput_quw6f_34";
const modalActions = "_modalActions_quw6f_52";
const modalButton = "_modalButton_quw6f_58";
const cancelButton = "_cancelButton_quw6f_69";
const submitButton = "_submitButton_quw6f_78";
const styles = {
	modalOverlay: modalOverlay,
	modalContent: modalContent,
	passwordInput: passwordInput,
	modalActions: modalActions,
	modalButton: modalButton,
	cancelButton: cancelButton,
	submitButton: submitButton
};

function PasswordPromptModal({ isOpen, onClose, onSubmit, gameId }) {
  const [password, setPassword] = reactExports.useState("");
  if (!isOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
    setPassword("");
  };
  const handleCancel = () => {
    setPassword("");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.modalOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.modalContent, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Password Required" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Please enter the password for game ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: gameId || "" }),
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GamepadInput,
        {
          title: "Enter Game Password",
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          className: styles.passwordInput,
          autoFocus: true,
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.modalActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleCancel, className: `${styles.modalButton} ${styles.cancelButton}`, "data-gamepad-focusable": "true", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: `${styles.modalButton} ${styles.submitButton}`, "data-gamepad-focusable": "true", children: "Join Game" })
      ] })
    ] })
  ] }) });
}

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { socket, isConnected } = useSocket();
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = reactExports.useState(false);
  const hasInitiatedJoin = reactExports.useRef(false);
  const handleReturnToLobby = reactExports.useCallback(() => {
    if (socket && isConnected && gameId) {
      soundService.play("ui.leave");
      socket.emit("leaveGame", { gameId });
      navigate("/");
    }
  }, [socket, isConnected, gameId, navigate]);
  const handlePasswordSubmit = reactExports.useCallback((password) => {
    setIsPasswordModalOpen(false);
    if (socket && gameId && password) {
      setError(null);
      socket.emit("joinGame", { gameId, password });
      setLoading(true);
    }
  }, [socket, gameId]);
  const handlePasswordCancel = reactExports.useCallback(() => {
    setIsPasswordModalOpen(false);
    navigate("/");
  }, [navigate]);
  reactExports.useEffect(() => {
    setError(null);
    setIsPasswordModalOpen(false);
    setLoading(true);
  }, [gameId]);
  reactExports.useEffect(() => {
    if (!socket) {
      return;
    }
    const onGameJoined = (data) => {
      if (data && data.game && data.game.id === gameId) {
        soundService.play("ui.join");
        setLoading(false);
        setError(null);
        setIsPasswordModalOpen(false);
      }
    };
    const onError = (errorData) => {
      const message = errorData.message || "An unknown error occurred";
      if (message === "Password required") {
        console.error(errorData);
        setIsPasswordModalOpen(true);
        setLoading(false);
        setError(null);
      } else if (message === "Invalid password") {
        console.error(errorData);
        setError("Invalid password.");
        setIsPasswordModalOpen(true);
        setLoading(false);
      } else if (message === "Game not found") {
        navigate("/");
      } else if (message === "Game is full") {
        setError(message);
        setLoading(false);
        setIsPasswordModalOpen(false);
        setTimeout(() => navigate("/"), 3e3);
      } else {
        setError(message);
        setLoading(false);
        setIsPasswordModalOpen(false);
      }
    };
    socket.on("gameJoined", onGameJoined);
    socket.on("error", onError);
    return () => {
      socket.off("gameJoined", onGameJoined);
      socket.off("error", onError);
    };
  }, [socket, gameId, navigate]);
  reactExports.useEffect(() => {
    if (socket && gameId && !hasInitiatedJoin.current) {
      hasInitiatedJoin.current = true;
      setLoading(true);
      setError(null);
      setIsPasswordModalOpen(false);
      socket.emit("joinGame", { gameId });
    }
  }, [socket, gameId]);
  const GameRoomContent = () => {
    const { gameState } = useGameContext();
    const { socket: socket2 } = useSocket();
    reactExports.useEffect(() => {
      const handleBeforeUnload = (e) => {
        const currentUserId = socket2?.auth?.userId;
        const currentPlayer = currentUserId && gameState?.players ? gameState.players[currentUserId] : null;
        const isPlayerReady = currentPlayer?.isReady || false;
        if (isPlayerReady) {
          e.preventDefault();
          e.returnValue = "You have money in the pot! Are you sure you want to leave?";
          return e.returnValue;
        }
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, [gameState, socket2]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PasswordPromptModal,
        {
          isOpen: isPasswordModalOpen,
          onClose: handlePasswordCancel,
          onSubmit: handlePasswordSubmit,
          gameId
        }
      ),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: `Joining game ${gameId}...` }),
      error && !loading && !isPasswordModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "error-container", style: { padding: "20px", color: "red", textAlign: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "An error occurred" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => window.location.reload(), children: "Refresh Page" })
      ] }),
      !loading && !error && gameState && /* @__PURE__ */ jsxRuntimeExports.jsx(GameScreen, { onReturnToLobby: handleReturnToLobby })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GameProvider, { gameId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameRoomContent, {}) });
};

export { GameRoom as default };
//# sourceMappingURL=GameRoom-CurwYyeV.js.map
