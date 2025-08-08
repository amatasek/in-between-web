import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from './react-D-xSlSIM.js';
import { a as useSocket, b as useUserData, B as BaseModal, c as baseModalStyles, u as useAuth, d as useLobby, s as soundService } from './index-B_3z-Zzg.js';
import { u as useGamepadNavigation } from './useGamepadNavigation-BcjfaxZ8.js';
import { A as AppHeader, G as GamepadTextField } from './AppHeader-B6hEGbia.js';
import { C as CurrencyAmount, T as ToggleSwitch, G as GamepadInput, U as UserAvatar, R as RulesButton, P as PlayerStatsButton, S as StoreButton, a as PreferencesButton, b as StoreModal } from './StoreModal-CIOpBmpA.js';
import { u as useMediaQuery, I as InputAdornment } from './mui-CG7ta6LR.js';
import './vendor-B9LcgdhK.js';
import './socket-KU1mICmt.js';

const lobbyContainer = "_lobbyContainer_1v9ur_1";
const gameListContainer = "_gameListContainer_1v9ur_90";
const gameListTitle = "_gameListTitle_1v9ur_115";
const searchContainer = "_searchContainer_1v9ur_128";
const searchIcon = "_searchIcon_1v9ur_170";
const gameListWrapper = "_gameListWrapper_1v9ur_175";
const gameListItem = "_gameListItem_1v9ur_181";
const userDisconnectedGame = "_userDisconnectedGame_1v9ur_194";
const userInGame = "_userInGame_1v9ur_201";
const gameListInfo = "_gameListInfo_1v9ur_224";
const gameListId = "_gameListId_1v9ur_229";
const disconnectedBadge = "_disconnectedBadge_1v9ur_238";
const inGameBadge = "_inGameBadge_1v9ur_250";
const gameListPlayers = "_gameListPlayers_1v9ur_262";
const joinGameButton = "_joinGameButton_1v9ur_268";
const reconnectButton = "_reconnectButton_1v9ur_279";
const continueButton = "_continueButton_1v9ur_290";
const emptyGameList = "_emptyGameList_1v9ur_316";
const emptyStateIcon = "_emptyStateIcon_1v9ur_329";
const emptyStateMessage = "_emptyStateMessage_1v9ur_335";
const emptyStateHint = "_emptyStateHint_1v9ur_342";
const privatePill = "_privatePill_1v9ur_348";
const styles$3 = {
	lobbyContainer: lobbyContainer,
	gameListContainer: gameListContainer,
	gameListTitle: gameListTitle,
	searchContainer: searchContainer,
	searchIcon: searchIcon,
	gameListWrapper: gameListWrapper,
	gameListItem: gameListItem,
	userDisconnectedGame: userDisconnectedGame,
	userInGame: userInGame,
	gameListInfo: gameListInfo,
	gameListId: gameListId,
	disconnectedBadge: disconnectedBadge,
	inGameBadge: inGameBadge,
	gameListPlayers: gameListPlayers,
	joinGameButton: joinGameButton,
	reconnectButton: reconnectButton,
	continueButton: continueButton,
	emptyGameList: emptyGameList,
	emptyStateIcon: emptyStateIcon,
	emptyStateMessage: emptyStateMessage,
	emptyStateHint: emptyStateHint,
	privatePill: privatePill
};

const pill = "_pill_1hv5h_1";
const pulse = "_pulse_1hv5h_22";
const text = "_text_1hv5h_48";
const styles$2 = {
	pill: pill,
	pulse: pulse,
	text: text
};

const OnlinePlayerCount = () => {
  const { socket, isConnected } = useSocket();
  const [count, setCount] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!socket || !isConnected) return;
    socket.emit("getOnlinePlayerCount", (n) => {
      setCount(n);
    });
    const handler = (n) => setCount(n);
    socket.on("onlinePlayerCountUpdate", handler);
    return () => {
      socket.off("onlinePlayerCountUpdate", handler);
    };
  }, [socket, isConnected]);
  if (count === null) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.pill, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.pulse }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$2.text, children: [
      count,
      " online"
    ] })
  ] });
};

const progressInfoContainer = "_progressInfoContainer_nucsq_1";
const balanceSection = "_balanceSection_nucsq_13";
const balanceLabel = "_balanceLabel_nucsq_22";
const xpSection = "_xpSection_nucsq_29";
const xpBarContainer = "_xpBarContainer_nucsq_33";
const xpOverlay = "_xpOverlay_nucsq_43";
const xpLevel = "_xpLevel_nucsq_57";
const xpNext = "_xpNext_nucsq_64";
const xpBar = "_xpBar_nucsq_33";
const styles$1 = {
	progressInfoContainer: progressInfoContainer,
	balanceSection: balanceSection,
	balanceLabel: balanceLabel,
	xpSection: xpSection,
	xpBarContainer: xpBarContainer,
	xpOverlay: xpOverlay,
	xpLevel: xpLevel,
	xpNext: xpNext,
	xpBar: xpBar};

const ProgressInfo = ({ userId, balance }) => {
  const userData = useUserData(userId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.progressInfoContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.balanceSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$1.balanceLabel, children: "Balance:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: Number(balance) || 0, size: "medium" })
    ] }),
    userData && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.xpSection, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.xpBarContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: styles$1.xpBar,
          style: {
            width: userData.level >= 100 ? "100%" : `${userData.percentToNextLevel || 0}%`
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.xpOverlay, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.xpLevel, children: [
          "Level ",
          userData.level
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.xpNext, children: userData.level < 100 ? `${userData.xpToNextLevel.toLocaleString()} XP` : "MAX" })
      ] })
    ] }) })
  ] });
};

const playerPanel = "_playerPanel_1e2ac_1";
const userSection = "_userSection_1e2ac_28";
const avatarContainer = "_avatarContainer_1e2ac_43";
const headerButtons = "_headerButtons_1e2ac_47";
const logoutButton = "_logoutButton_1e2ac_77";
const divider = "_divider_1e2ac_116";
const actionSection = "_actionSection_1e2ac_124";
const actionButton = "_actionButton_1e2ac_131";
const createButton = "_createButton_1e2ac_156";
const cancelButton = "_cancelButton_1e2ac_173";
const styles = {
	playerPanel: playerPanel,
	userSection: userSection,
	avatarContainer: avatarContainer,
	headerButtons: headerButtons,
	logoutButton: logoutButton,
	divider: divider,
	actionSection: actionSection,
	actionButton: actionButton,
	createButton: createButton,
	cancelButton: cancelButton
};

const DEFAULT_SETTINGS = {
  useCustomName: false,
  customName: "",
  isPrivate: false,
  password: "",
  enableAceChoice: true,
  enableSecondChance: true,
  numberOfBots: 0
};
const GameSettingsModal = ({ initialSettings = DEFAULT_SETTINGS, onSubmit, onClose }) => {
  const [settings, setSettings] = reactExports.useState({ ...DEFAULT_SETTINGS, ...initialSettings });
  const [errors, setErrors] = reactExports.useState({});
  const validateSettings = (currentSettings) => {
    const newErrors = {};
    if (currentSettings.useCustomName) {
      const name = currentSettings.customName || "";
      if (!name) {
        newErrors.customName = "Custom name is required.";
      } else if (name.length < 4 || name.length > 26) {
        newErrors.customName = "Name must be 4-26 characters.";
      } else if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
        newErrors.customName = "Use letters, numbers, -, or _.";
      }
    }
    if (currentSettings.isPrivate) {
      const pass = currentSettings.password || "";
      if (!pass) {
        newErrors.password = "Password is required.";
      } else if (pass.length < 3 || pass.length > 36) {
        newErrors.password = "Password must be 3-36 characters.";
      }
    }
    const botCount = currentSettings.numberOfBots;
    if (botCount < 0 || botCount > 16) {
      newErrors.numberOfBots = "Number of bots must be between 0 and 16.";
    }
    return newErrors;
  };
  const handleChange = (key, value) => {
    setSettings((prev) => {
      const updatedSettings = { ...prev, [key]: value };
      if (key === "useCustomName" && !value) {
        updatedSettings.customName = "";
        if (errors.customName) {
          setErrors((currentErrors) => {
            const newErrors = { ...currentErrors };
            delete newErrors.customName;
            return newErrors;
          });
        }
      }
      if (key === "isPrivate" && !value) {
        updatedSettings.password = "";
        if (errors.password) {
          setErrors((currentErrors) => {
            const newErrors = { ...currentErrors };
            delete newErrors.password;
            return newErrors;
          });
        }
      }
      return updatedSettings;
    });
    if ((key === "customName" || key === "useCustomName") && errors.customName) {
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors.customName;
        return newErrors;
      });
    }
    if ((key === "password" || key === "isPrivate") && errors.password) {
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors.password;
        return newErrors;
      });
    }
    if (key === "numberOfBots" && errors.numberOfBots) {
      setErrors((currentErrors) => {
        const newErrors = { ...currentErrors };
        delete newErrors.numberOfBots;
        return newErrors;
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSettings(settings);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const payload = {
        ...settings,
        customName: settings.useCustomName ? settings.customName : null
      };
      delete payload.useCustomName;
      onSubmit(payload);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    BaseModal,
    {
      title: "Game Options",
      onClose,
      style: { maxWidth: 600 },
      footer: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: `${styles.actionButton} ${styles.cancelButton}`,
            "data-gamepad-focusable": "true",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            form: "gameSettingsForm",
            className: `${styles.actionButton} ${styles.createButton}`,
            disabled: Object.keys(errors).length > 0,
            "data-gamepad-focusable": "true",
            children: "Create Game"
          }
        )
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { id: "gameSettingsForm", onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingsContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Custom Game Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Set a custom name for your game lobby" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingControls, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleSwitch,
              {
                isChecked: settings.useCustomName,
                onChange: (e) => handleChange("useCustomName", e.target.checked)
              }
            ),
            settings.useCustomName && /* @__PURE__ */ jsxRuntimeExports.jsx(
              GamepadInput,
              {
                title: "Enter Game Name",
                type: "text",
                value: settings.customName || "",
                onChange: (e) => handleChange("customName", e.target.value),
                className: `${baseModalStyles.textInput}${errors.customName ? " " + baseModalStyles.inputError : ""}`,
                placeholder: "Game Name",
                maxLength: 26,
                autoFocus: true,
                style: { marginTop: 8 }
              }
            ),
            errors.customName && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "errorMessage", children: errors.customName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Private Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Only players with the password can join" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingControls, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToggleSwitch,
              {
                isChecked: settings.isPrivate,
                onChange: (e) => handleChange("isPrivate", e.target.checked)
              }
            ),
            settings.isPrivate && /* @__PURE__ */ jsxRuntimeExports.jsx(
              GamepadInput,
              {
                title: "Enter Game Password",
                type: "password",
                value: settings.password || "",
                onChange: (e) => handleChange("password", e.target.value),
                className: `${baseModalStyles.textInput}${errors.password ? " " + baseModalStyles.inputError : ""}`,
                placeholder: "Password",
                maxLength: 36,
                autoFocus: settings.isPrivate && !settings.useCustomName,
                style: { marginTop: 8 }
              }
            ),
            errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "errorMessage", children: errors.password })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Number of Bots" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Add AI players to your game (0-16)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingControls, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GamepadInput,
              {
                title: "Number of AI Players",
                type: "number",
                min: "0",
                max: "16",
                value: settings.numberOfBots,
                onChange: (e) => handleChange("numberOfBots", parseInt(e.target.value) || 0),
                className: `${baseModalStyles.textInput}${errors.numberOfBots ? " " + baseModalStyles.inputError : ""}`
              }
            ),
            errors.numberOfBots && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "errorMessage", children: errors.numberOfBots })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Enable Ace Choice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Allow players to choose high/low on Ace" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingControls, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleSwitch,
            {
              isChecked: settings.enableAceChoice,
              onChange: (e) => handleChange("enableAceChoice", e.target.checked)
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Enable Second Chance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Allow players to ante up for a second chance" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingControls, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToggleSwitch,
            {
              isChecked: settings.enableSecondChance,
              onChange: (e) => handleChange("enableSecondChance", e.target.checked)
            }
          ) })
        ] })
      ] }) })
    }
  );
};

const PlayerPanel = () => {
  const { user, logout, refreshUserData } = useAuth();
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();
  const [showGameSettingsModal, setShowGameSettingsModal] = reactExports.useState(false);
  const [showStoreModal, setShowStoreModal] = reactExports.useState(false);
  const createGameWithSettings = (settings) => {
    if (!user?.id || !isConnected) {
      return;
    }
    const handleGameCreated = (data) => {
      socket.off("gameCreated", handleGameCreated);
      if (data?.game?.id) {
        navigate(`/${data.game.id}`);
      }
    };
    socket.on("gameCreated", handleGameCreated);
    if (settings) {
      socket.emit("createGame", { settings });
    } else {
      socket.emit("createGame");
    }
  };
  const handleCreateGame = () => createGameWithSettings({ numberOfBots: 5 });
  const handleCreateCustomGame = () => {
    setShowGameSettingsModal(true);
  };
  const handleSubmitCustomSettings = (settings) => {
    setShowGameSettingsModal(false);
    createGameWithSettings(settings);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.playerPanel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.userSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.avatarContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserAvatar,
        {
          userId: user?.id,
          size: "medium",
          showName: true,
          namePosition: "right"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProgressInfo,
        {
          userId: user?.id,
          balance: user?.balance
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.headerButtons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: styles.logoutButton,
            onClick: logout,
            "data-gamepad-focusable": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.buttonText, children: "Logout" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RulesButton, { "data-gamepad-focusable": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerStatsButton, { "data-gamepad-focusable": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StoreButton, { onClick: () => setShowStoreModal(true), "data-gamepad-focusable": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PreferencesButton, { "data-gamepad-focusable": "true" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.divider }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.actionSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `${styles.actionButton} ${styles.createButton}`,
          onClick: handleCreateGame,
          disabled: !user?.username,
          "data-gamepad-focusable": "true",
          children: "Create Quick Game"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `${styles.actionButton} ${styles.createButton}`,
          onClick: handleCreateCustomGame,
          disabled: !user?.username,
          "data-gamepad-focusable": "true",
          children: "Create Custom Game"
        }
      )
    ] }),
    showGameSettingsModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameSettingsModal,
      {
        onSubmit: handleSubmitCustomSettings,
        onClose: () => setShowGameSettingsModal(false)
      }
    ),
    showStoreModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
      StoreModal,
      {
        onClose: () => {
          setShowStoreModal(false);
          if (refreshUserData) {
            refreshUserData();
          }
        }
      }
    )
  ] });
};

const LockIcon = ({ className = "", width = "1em", height = "1em", ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `feather feather-lock ${className}`,
    width,
    height,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ]
  }
);

function GameCard({ game, onJoin, userId }) {
  const gameDisplayName = game.settings?.customName || `Game ${game.id}`;
  const isUserDisconnected = game.disconnectedPlayers?.some((player) => player.userId === userId);
  const isUserInGame = game.allPlayers?.some((player) => player.userId === userId && !player.disconnected);
  let buttonText = "Join";
  let buttonClass = styles$3.joinGameButton;
  if (isUserDisconnected) {
    buttonText = "Reconnect";
    buttonClass += ` ${styles$3.reconnectButton}`;
  } else if (isUserInGame) {
    buttonText = "Continue";
    buttonClass += ` ${styles$3.continueButton}`;
  }
  let cardClass = styles$3.gameListItem;
  if (isUserDisconnected) {
    cardClass += ` ${styles$3.userDisconnectedGame}`;
  } else if (isUserInGame) {
    cardClass += ` ${styles$3.userInGame}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass, children: [
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.gameListInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.gameListId, children: [
        " ",
        gameDisplayName,
        game.settings?.isPrivate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$3.privatePill, title: "Private Game", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LockIcon, { width: "0.9em", height: "0.9em", style: { marginRight: "4px", verticalAlign: "middle" } }),
          "Private"
        ] }),
        isUserDisconnected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.disconnectedBadge, title: "You're disconnected from this game", children: "⚠️ Reconnect" }),
        isUserInGame && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.inGameBadge, title: "You're in this game", children: "You're In" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.gameListPlayers, children: [
        " ",
        game.playerCount,
        " ",
        game.playerCount === 1 ? "player" : "players"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: buttonClass,
        onClick: () => onJoin(game.id),
        disabled: !userId,
        "data-gamepad-focusable": "true",
        children: buttonText
      }
    )
  ] });
}

const Lobby = () => {
  const { gameList, loading: lobbyLoading } = useLobby();
  const { user, logout } = useAuth();
  useUserData(user?.id);
  const { isConnected } = useSocket();
  useGamepadNavigation(true);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  useMediaQuery("(max-width:600px)");
  const isSmallMobile = useMediaQuery("(max-width:400px)");
  const userId = user?.username ? `user_${user.username}` : null;
  reactExports.useEffect(() => {
    if (!user) {
      return;
    }
    if (!user.username || !user.id) {
      console.error("[Lobby] Invalid user data received:", user);
      logout();
      return;
    }
  }, [user, logout]);
  const handleJoinGame = (gameId) => {
    if (!isConnected || !user) {
      return;
    }
    soundService.play("ui.click");
    navigate(`/${gameId}`);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredGameList = reactExports.useMemo(() => {
    if (!gameList) return [];
    let filtered = gameList;
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = gameList.filter(
        (game) => game.id.toLowerCase().includes(query)
      );
    }
    return filtered.sort((a, b) => {
      const userInGameA = a.allPlayers?.some((player) => player.userId === userId);
      const userInGameB = b.allPlayers?.some((player) => player.userId === userId);
      const userDisconnectedInA = a.disconnectedPlayers?.some((player) => player.userId === userId);
      const userDisconnectedInB = b.disconnectedPlayers?.some((player) => player.userId === userId);
      if (userDisconnectedInA && !userDisconnectedInB) return -1;
      if (!userDisconnectedInA && userDisconnectedInB) return 1;
      if (userInGameA && !userInGameB) return -1;
      if (!userInGameA && userInGameB) return 1;
      return a.id.localeCompare(b.id);
    });
  }, [gameList, searchQuery, userId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.lobbyContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1.1em", marginBottom: "-0.6em" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(OnlinePlayerCount, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerPanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.gameListContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: styles$3.gameListTitle, children: "Available Games" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.searchContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GamepadTextField,
        {
          title: "Search Games",
          placeholder: "Search games by ID",
          variant: "outlined",
          fullWidth: true,
          value: searchQuery,
          onChange: handleSearchChange,
          size: isSmallMobile ? "small" : "medium",
          type: "text",
          InputProps: {
            startAdornment: /* @__PURE__ */ jsxRuntimeExports.jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.searchIcon, children: "🔍" }) })
          }
        }
      ) }),
      filteredGameList && filteredGameList.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.gameListWrapper, children: filteredGameList.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        GameCard,
        {
          game,
          onJoin: handleJoinGame,
          userId
        },
        game.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.emptyGameList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.emptyStateIcon, children: "🃏" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$3.emptyStateMessage, children: searchQuery.trim() ? "No matching games found" : "No games in progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$3.emptyStateHint, children: searchQuery.trim() ? "Try a different search or create a new game" : "Create a new game to get started!" })
      ] })
    ] })
  ] });
};

export { Lobby as default };
//# sourceMappingURL=Lobby-CrGfswz3.js.map
