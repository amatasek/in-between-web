const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AuthPage-BJdYI7Km.js","assets/react-D-xSlSIM.js","assets/vendor-B9LcgdhK.js","assets/socket-KU1mICmt.js","assets/AppHeader-B6hEGbia.js","assets/mui-CG7ta6LR.js","assets/AppHeader-Cvwy79-Z.css","assets/useGamepadNavigation-BcjfaxZ8.js","assets/AuthPage-DHf0TyUL.css","assets/Lobby-CrGfswz3.js","assets/StoreModal-CIOpBmpA.js","assets/StoreModal-DCUMMGeg.css","assets/Lobby-B11lu47f.css","assets/GameRoom-CurwYyeV.js","assets/GameRoom-Bv4ASjPu.css"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, g as createBrowserRouter, N as Navigate, d as reactDomExports, h as RouterProvider, i as React, l as client } from './react-D-xSlSIM.js';
import { B as howler } from './vendor-B9LcgdhK.js';
import { l as lookup } from './socket-KU1mICmt.js';

true&&(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
}());

class SoundService {
  constructor() {
    this.sounds = {};
    this.muted = false;
    this.initialized = false;
    this.categories = ["ui"];
    this.lastPlayedTime = {};
    this.debounceTime = 500;
    this.audioUnlocked = false;
    this.API_URL = "https://api.in-between.live";
    if (typeof window !== "undefined") {
      setTimeout(() => {
        this.initialize();
        this._setupMobileAudioUnlock();
      }, 0);
    }
  }
  /**
   * Initialize the sound service and load all sound categories
   */
  initialize() {
    if (this.initialized) return;
    this.loadCategory("ui");
    this.initialized = true;
  }
  /**
   * Load sounds for a specific category
   * @param {string} category - Sound category to load
   */
  loadCategory(category) {
    if (this.sounds[category]) return;
    const sprites = {};
    if (category === "ui") {
      sprites.join = [0, 500];
      sprites.leave = [500, 1e3];
      sprites.alert = [1500, 1500];
    }
    this.sounds[category] = new howler.Howl({
      src: [
        `${this.API_URL}/assets/audio/${category}-sounds.mp3`,
        `${this.API_URL}/assets/audio/${category}-sounds.webm`
      ],
      sprite: sprites,
      preload: true,
      // Use HTML5 Audio on mobile for better compatibility
      html5: this._isMobileDevice(),
      format: ["mp3", "webm"],
      pool: 10
      // Increase the pool size to avoid exhaustion
    });
  }
  /**
   * Play a sound effect
   * @param {string} sound - Sound name (format: category.name or just name for UI category)
   * @param {number} [volume=1] - Volume level (0-1)
   * @returns {number|undefined} Sound ID if played, undefined if not
   */
  play(sound, volume = 1) {
    if (this.muted) return;
    if (!this.initialized) this.initialize();
    let category, soundName;
    if (sound.includes(".")) {
      [category, soundName] = sound.split(".");
    } else {
      category = "ui";
      soundName = sound;
    }
    if (!this.sounds[category]) {
      this.loadCategory(category);
      return;
    }
    const soundKey = `${category}.${soundName}`;
    const now = Date.now();
    const lastPlayed = this.lastPlayedTime[soundKey] || 0;
    if (now - lastPlayed < this.debounceTime) {
      return;
    }
    this.lastPlayedTime[soundKey] = now;
    this.sounds[category].volume(volume);
    return this.sounds[category].play(soundName);
  }
  /**
   * Set muted state
   * @param {boolean} muted - Whether sound should be muted
   */
  setMuted(muted) {
    this.muted = muted;
    Object.values(this.sounds).forEach((sound) => {
      if (sound && sound.mute) {
        sound.mute(muted);
      }
    });
  }
  /**
   * Sync with user preferences
   * @param {Object} preferences - User preferences object
   */
  syncWithPreferences(preferences) {
    if (preferences && typeof preferences.muted !== "undefined") {
      this.setMuted(preferences.muted);
    }
  }
  /**
   * Setup audio unlock for mobile devices
   * @private
   */
  _setupMobileAudioUnlock() {
    if (typeof window === "undefined" || !this._isMobileDevice()) return;
    const unlockAudio = () => {
      if (this.audioUnlocked) return;
      const silence = new Audio();
      silence.src = "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABSAJAJAQgAAgAAAAiIkfC3/////////////////////";
      silence.load();
      silence.play().then(() => {
        this.audioUnlocked = true;
        document.body.removeEventListener("touchstart", unlockAudio);
        document.body.removeEventListener("touchend", unlockAudio);
        document.body.removeEventListener("click", unlockAudio);
      }).catch((e) => {
      });
    };
    document.body.addEventListener("touchstart", unlockAudio, false);
    document.body.addEventListener("touchend", unlockAudio, false);
    document.body.addEventListener("click", unlockAudio, false);
  }
  /**
   * Check if current device is mobile
   * @private
   * @returns {boolean} True if mobile device
   */
  _isMobileDevice() {
    if (typeof navigator === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  }
}
const soundService = new SoundService();

const scriptRel = 'modulepreload';const assetsURL = function(dep) { return "/"+dep };const seen = {};const __vitePreload = function preload(baseModule, deps, importerUrl) {
  let promise = Promise.resolve();
  if (true && deps && deps.length > 0) {
    document.getElementsByTagName("link");
    const cspNonceMeta = document.querySelector(
      "meta[property=csp-nonce]"
    );
    const cspNonce = cspNonceMeta?.nonce || cspNonceMeta?.getAttribute("nonce");
    promise = Promise.allSettled(
      deps.map((dep) => {
        dep = assetsURL(dep);
        if (dep in seen) return;
        seen[dep] = true;
        const isCss = dep.endsWith(".css");
        const cssSelector = isCss ? '[rel="stylesheet"]' : "";
        if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
          return;
        }
        const link = document.createElement("link");
        link.rel = isCss ? "stylesheet" : scriptRel;
        if (!isCss) {
          link.as = "script";
        }
        link.crossOrigin = "";
        link.href = dep;
        if (cspNonce) {
          link.setAttribute("nonce", cspNonce);
        }
        document.head.appendChild(link);
        if (isCss) {
          return new Promise((res, rej) => {
            link.addEventListener("load", res);
            link.addEventListener(
              "error",
              () => rej(new Error(`Unable to preload CSS for ${dep}`))
            );
          });
        }
      })
    );
  }
  function handlePreloadError(err) {
    const e = new Event("vite:preloadError", {
      cancelable: true
    });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  }
  return promise.then((res) => {
    for (const item of res || []) {
      if (item.status !== "rejected") continue;
      handlePreloadError(item.reason);
    }
    return baseModule().catch(handlePreloadError);
  });
};

const loadingScreen = "_loadingScreen_16l5s_1";
const loadingContainer = "_loadingContainer_16l5s_10";
const spinner = "_spinner_16l5s_21";
const message$1 = "_message_16l5s_31";
const styles$2 = {
	loadingScreen: loadingScreen,
	loadingContainer: loadingContainer,
	spinner: spinner,
	message: message$1
};

const LoadingScreen = ({ message = "Loading..." }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.loadingScreen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.loadingContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.spinner }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$2.message, children: message })
  ] }) });
};

const API_URL = "https://api.in-between.live";
const SOCKET_URL = "https://api.in-between.live";

const SocketContext = reactExports.createContext();
const useSocket = () => reactExports.useContext(SocketContext);
const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = reactExports.useState(null);
  const [isConnected, setIsConnected] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setError(null);
      }
      return;
    }
    const newSocket = lookup(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1e3,
      transports: ["websocket", "polling"],
      timeout: 1e4
    });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      setError(null);
    });
    newSocket.on("authenticated", (userData) => {
      newSocket.auth = {
        userId: userData.userId,
        username: userData.username
      };
      setIsConnected(true);
      newSocket.emit("getGameList");
    });
    newSocket.on("connect_error", (error2) => {
      setError("Failed to connect to game server: " + error2.message);
      setIsConnected(false);
    });
    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });
    newSocket.on("error", (err) => {
      setError(err.message || "Unknown socket error");
    });
    const socketEvents = [
      "connect",
      "authenticated",
      "disconnect",
      "connect_error",
      "error",
      "transport"
    ];
    return () => {
      if (newSocket) {
        socketEvents.forEach((event) => newSocket.off(event));
        newSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setError(null);
      }
    };
  }, [token]);
  const value = {
    socket,
    isConnected,
    error,
    setError
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SocketContext.Provider, { value, children });
};

const AuthContext = reactExports.createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = reactExports.useState(null);
  const [token, setToken] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [showWelcomePopup, setShowWelcomePopup] = reactExports.useState(false);
  const socketData = useSocket();
  const socket = socketData?.socket;
  reactExports.useEffect(() => {
    if (socket && user) {
      socket.on("balanceUpdated", (data) => {
        console.log("[AuthContext] Received balanceUpdated event:", data);
        if (data && typeof data.balance === "number") {
          console.log(`[AuthContext] Updating user balance from ${user?.balance} to ${data.balance}`);
          const updatedUser = {
            ...user,
            balance: data.balance
          };
          setUser(updatedUser);
        } else {
          console.warn("[AuthContext] Received invalid balance data:", data);
        }
      });
      return () => {
        socket.off("balanceUpdated");
      };
    }
  }, [socket, user]);
  const fetchUserData = async (authToken) => {
    try {
      if (!authToken) {
        return null;
      }
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`,
          // Use authToken
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("[Auth] Error fetching user data:", error);
      return null;
    }
  };
  reactExports.useEffect(() => {
    const initializeAuth = async () => {
      let currentToken = null;
      try {
        currentToken = localStorage.getItem("token");
        if (currentToken) {
          setToken(currentToken);
        }
      } catch (error) {
        console.error("[Auth] Error reading token from localStorage:", error);
        localStorage.removeItem("token");
      }
      if (currentToken) {
        try {
          const userData = await fetchUserData(currentToken);
          if (userData) {
            setUser(userData);
          } else {
            console.error("[Auth] Token valid but failed to fetch user data. Logging out.");
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("[Auth] Error during user data fetch. Logging out.", error);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);
  const login = async (userData, newToken) => {
    if (!userData || !userData.username || !userData.id || typeof userData.balance !== "number") {
      console.error("[Auth] Invalid user data:", userData);
      throw new Error("Invalid user data provided");
    }
    if (!newToken) {
      console.error("[Auth] No token provided");
      throw new Error("No authentication token provided");
    }
    try {
      const initialUserData = {
        username: userData.username,
        id: userData.id,
        balance: userData.balance
      };
      setUser(initialUserData);
      setToken(newToken);
      localStorage.setItem("token", newToken);
      setShowWelcomePopup(true);
      const completeUserData = await fetchUserData(newToken);
      if (completeUserData) {
        setUser(completeUserData);
      }
    } catch (error) {
      console.error("[Auth] Error during login:", error);
      throw error;
    }
  };
  const logout = reactExports.useCallback(() => {
    setUser(null);
    setToken(null);
    setShowWelcomePopup(false);
    localStorage.removeItem("token");
  }, []);
  const refreshUserData = reactExports.useCallback(async () => {
    try {
      const userData = await fetchUserData(token);
      if (userData) {
        setUser(userData);
      } else {
        console.error("[Auth] Failed to refresh user data. Logging out.");
        logout();
      }
    } catch (error) {
      console.error("[Auth] Error during manual refresh. Logging out.", error);
      logout();
    }
  }, [token, logout]);
  if (loading) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, token, login, logout, refreshUserData, loading }, children });
};
const useAuth = () => {
  const context = reactExports.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const LobbyContext = reactExports.createContext();
const useLobby = () => reactExports.useContext(LobbyContext);
const LobbyProvider = ({ children }) => {
  const { socket, isConnected } = useSocket();
  const [gameList, setGameList] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!socket || !isConnected) return;
    const handleGameList = (games) => {
      setGameList(games);
      setLoading(false);
    };
    const handleError = (err) => {
      console.error("[LobbyContext] Socket error:", err.message || err);
      setError(err.message || "An error occurred");
      setLoading(false);
    };
    socket.on("gameList", handleGameList);
    socket.on("error", handleError);
    socket.emit("getGameList");
    return () => {
      socket.off("gameList", handleGameList);
      socket.off("error", handleError);
    };
  }, [socket, isConnected]);
  const contextValue = {
    gameList,
    loading,
    error
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LobbyContext.Provider, { value: contextValue, children });
};

const AuthPage = reactExports.lazy(() => __vitePreload(() => import('./AuthPage-BJdYI7Km.js'),true?__vite__mapDeps([0,1,2,3,4,5,6,7,8]):void 0));
const Lobby = reactExports.lazy(() => __vitePreload(() => import('./Lobby-CrGfswz3.js'),true?__vite__mapDeps([9,1,2,3,7,4,5,6,10,11,12]):void 0));
const GameRoom = reactExports.lazy(() => __vitePreload(() => import('./GameRoom-CurwYyeV.js'),true?__vite__mapDeps([13,1,2,3,10,11,7,14]):void 0));
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Checking authentication..." });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/auth", replace: true });
  }
  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LobbyProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lobby, {}) }) }) })
  },
  {
    path: "/auth",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthPage, {}) })
  },
  {
    path: "/:gameId",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(GameRoom, {}) }) })
  },
  {
    path: "*",
    element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/", replace: true })
  }
]);

/**
 * Hook to manage virtual keyboard state and integration with input elements
 * Automatically detects gamepad usage and shows virtual keyboard for controller users
 */
const useVirtualKeyboard = () => {
  const [isVisible, setIsVisible] = reactExports.useState(false);
  const [currentInput, setCurrentInput] = reactExports.useState(null);
  const [inputType, setInputType] = reactExports.useState('text');
  const [keyboardTitle, setKeyboardTitle] = reactExports.useState('');
  const [isGamepadActive, setIsGamepadActive] = reactExports.useState(false);

  // Detect if gamepad navigation is active (integrate with existing system)
  reactExports.useEffect(() => {
    const checkGamepadNavigation = () => {
      const connected = document.body.classList.contains('gamepad-navigation-active');
      setIsGamepadActive(connected);
    };
    
    // Check initially
    checkGamepadNavigation();
    
    // Create observer to watch for gamepad navigation class changes
    const observer = new MutationObserver(checkGamepadNavigation);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const showKeyboard = reactExports.useCallback((inputElement, type = 'text', title = '') => {
    if (!inputElement) return;
    
    setCurrentInput(inputElement);
    setInputType(type);
    setKeyboardTitle(title);
    setIsVisible(true);
    
    // Blur the input to prevent mobile keyboard from appearing
    inputElement.blur();
  }, []);

  const hideKeyboard = reactExports.useCallback(() => {
    setIsVisible(false);
    setCurrentInput(null);
    setInputType('text');
    setKeyboardTitle('');
  }, []);


  const handleEnter = reactExports.useCallback((finalValue) => {
    if (!currentInput) return;
    
    // For React/MUI compatibility, we need to set the value and trigger events in a specific way
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(currentInput, finalValue || '');
    
    // Create and dispatch input event that React will recognize
    const inputEvent = new Event('input', { bubbles: true });
    currentInput.dispatchEvent(inputEvent);
    
    // Also dispatch change event
    const changeEvent = new Event('change', { bubbles: true });
    currentInput.dispatchEvent(changeEvent);
    
    // Just close the keyboard - don't submit forms or trigger enter behavior
    hideKeyboard();
  }, [currentInput, hideKeyboard]);

  // Enhanced input wrapper that automatically shows keyboard for gamepad users
  const enhanceInput = reactExports.useCallback((inputElement, type = 'text', title = '') => {
    if (!inputElement) return;
    
    // For Material-UI TextField, find the actual input element
    let actualInput = inputElement;
    if (inputElement.querySelector && inputElement.querySelector('input')) {
      actualInput = inputElement.querySelector('input');
    }
    
    const handleClick = (e) => {
      // Show virtual keyboard on click if gamepad is connected
      // AND if the gamepad navigation is currently active (showing focus indicators)
      // This prevents autoFocus from opening the keyboard
      if (isGamepadActive && document.body.classList.contains('gamepad-navigation-active')) {
        e.preventDefault();
        showKeyboard(actualInput, type, title);
      }
    };
    
    // Add event listeners to the actual input element
    actualInput.addEventListener('click', handleClick);
    
    // Return cleanup function
    return () => {
      actualInput.removeEventListener('click', handleClick);
    };
  }, [isGamepadActive, showKeyboard]);

  // Get current input value for initializing the virtual keyboard
  const getCurrentInputValue = reactExports.useCallback(() => {
    return currentInput?.value || '';
  }, [currentInput]);

  return {
    isVisible,
    inputType,
    keyboardTitle,
    currentInput,
    isGamepadActive,
    showKeyboard,
    hideKeyboard,
    handleEnter,
    enhanceInput,
    getCurrentInputValue
  };
};

const overlay = "_overlay_j8a1u_1";
const modal = "_modal_j8a1u_17";
const header = "_header_j8a1u_38";
const closeButton$1 = "_closeButton_j8a1u_55";
const sectionHeader = "_sectionHeader_j8a1u_74";
const settingItem = "_settingItem_j8a1u_90";
const settingControls = "_settingControls_j8a1u_106";
const primaryButton = "_primaryButton_j8a1u_113";
const settingDescription = "_settingDescription_j8a1u_135";
const textInput = "_textInput_j8a1u_157";
const inputError = "_inputError_j8a1u_175";
const errorMessage = "_errorMessage_j8a1u_180";
const content$1 = "_content_j8a1u_190";
const footer = "_footer_j8a1u_233";
const baseModalStyles = {
	overlay: overlay,
	modal: modal,
	header: header,
	closeButton: closeButton$1,
	sectionHeader: sectionHeader,
	settingItem: settingItem,
	settingControls: settingControls,
	primaryButton: primaryButton,
	settingDescription: settingDescription,
	textInput: textInput,
	inputError: inputError,
	errorMessage: errorMessage,
	content: content$1,
	footer: footer
};

let openModalCount = 0;
function BaseModal({ title, onClose, children, footer, headerButtons, className = "", overlayStyle, ...props }) {
  reactExports.useEffect(() => {
    if (++openModalCount === 1) document.body.classList.add("modal-open");
    return () => {
      if (--openModalCount === 0) document.body.classList.remove("modal-open");
    };
  }, []);
  const modalContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.overlay, style: overlayStyle, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `${baseModalStyles.modal} ${className}`,
      onClick: (e) => e.stopPropagation(),
      ...props,
      children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.header, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" }, children: [
            headerButtons,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: baseModalStyles.closeButton,
                onClick: onClose,
                "aria-label": "Close",
                type: "button",
                "data-gamepad-focusable": "true",
                children: "×"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.content, children }),
        footer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.footer, children: footer })
      ]
    }
  ) });
  return reactDomExports.createPortal(modalContent, document.body);
}

const keyboardModal = "_keyboardModal_7mp5j_2";
const inputDisplay = "_inputDisplay_7mp5j_7";
const tempInput = "_tempInput_7mp5j_13";
const keyboardGrid = "_keyboardGrid_7mp5j_31";
const keyRow = "_keyRow_7mp5j_35";
const key = "_key_7mp5j_2";
const specialKey = "_specialKey_7mp5j_77";
const spaceKey = "_spaceKey_7mp5j_86";
const activeShift = "_activeShift_7mp5j_91";
const styles$1 = {
	keyboardModal: keyboardModal,
	inputDisplay: inputDisplay,
	tempInput: tempInput,
	keyboardGrid: keyboardGrid,
	keyRow: keyRow,
	key: key,
	specialKey: specialKey,
	spaceKey: spaceKey,
	activeShift: activeShift};

const VirtualKeyboard = ({
  isVisible,
  onClose,
  onEnter,
  inputType = "text",
  initialValue = ""
}) => {
  const { keyboardTitle } = useVirtualKeyboardContext();
  const [currentLayout, setCurrentLayout] = reactExports.useState("lowercase");
  const [tempInput, setTempInput] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isVisible) {
      if (inputType === "number") {
        setTempInput(initialValue && initialValue !== "0" ? initialValue : "");
      } else {
        setTempInput(initialValue || "");
      }
    } else {
      setTempInput("");
    }
  }, [isVisible, initialValue, inputType]);
  const layouts = {
    lowercase: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
      ["space", "enter"]
    ],
    uppercase: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["shift", "Z", "X", "C", "V", "B", "N", "M", "backspace"],
      ["space", "enter"]
    ],
    numbers: [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["0", "backspace"],
      ["enter"]
    ]
  };
  const activeLayout = inputType === "number" ? "numbers" : currentLayout;
  const keys = layouts[activeLayout];
  const handleKeyPress = reactExports.useCallback((key) => {
    switch (key) {
      case "shift":
        setCurrentLayout((prev) => prev === "lowercase" ? "uppercase" : "lowercase");
        break;
      case "backspace":
        setTempInput((prev) => prev.slice(0, -1));
        break;
      case "enter":
        onEnter?.(tempInput);
        break;
      case "space":
        setTempInput((prev) => prev + " ");
        break;
      default:
        setTempInput((prev) => prev + key);
        break;
    }
  }, [onEnter, tempInput]);
  const getKeyDisplayText = (key) => {
    switch (key) {
      case "shift":
        return currentLayout === "lowercase" ? "⇧" : "⇧";
      case "backspace":
        return "⌫";
      case "space":
        return "Space";
      case "enter":
        return "↵";
      default:
        return key;
    }
  };
  const getKeyClass = (key) => {
    let className = styles$1.key;
    if (["shift", "backspace", "space", "enter"].includes(key)) {
      className += ` ${styles$1.specialKey}`;
    }
    if (key === "space") {
      className += ` ${styles$1.spaceKey}`;
    }
    if (key === "shift" && currentLayout === "uppercase") {
      className += ` ${styles$1.activeShift}`;
    }
    return className;
  };
  reactExports.useEffect(() => {
    if (isVisible) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose?.();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isVisible, onClose]);
  if (!isVisible) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    BaseModal,
    {
      title: keyboardTitle || (inputType === "number" ? "Number Pad" : "Virtual Keyboard"),
      onClose,
      className: styles$1.keyboardModal,
      overlayStyle: { zIndex: 1300 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.inputDisplay, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: inputType === "password" ? "password" : "text",
            value: tempInput,
            className: styles$1.tempInput,
            readOnly: true,
            placeholder: "Type below..."
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.keyboardGrid, children: keys.map((row, rowIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.keyRow, children: row.map((key, keyIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: getKeyClass(key),
            onClick: () => handleKeyPress(key),
            "data-gamepad-focusable": "true",
            "aria-label": key === "backspace" ? "Backspace" : key === "enter" ? "Enter" : key === "space" ? "Space" : key === "shift" ? "Shift" : key,
            children: getKeyDisplayText(key)
          },
          `${rowIndex}-${keyIndex}`
        )) }, rowIndex)) })
      ]
    }
  );
};

const VirtualKeyboardContext = reactExports.createContext();
const useVirtualKeyboardContext = () => {
  const context = reactExports.useContext(VirtualKeyboardContext);
  if (!context) {
    throw new Error("useVirtualKeyboardContext must be used within a VirtualKeyboardProvider");
  }
  return context;
};
const VirtualKeyboardProvider = ({ children }) => {
  const keyboardState = useVirtualKeyboard();
  const { isVisible, inputType, hideKeyboard, handleEnter, getCurrentInputValue } = keyboardState;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(VirtualKeyboardContext.Provider, { value: keyboardState, children: [
    children,
    isVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
      VirtualKeyboard,
      {
        isVisible,
        inputType,
        initialValue: getCurrentInputValue(),
        onClose: hideKeyboard,
        onEnter: handleEnter
      }
    )
  ] });
};

const toast = "_toast_1yqi6_1";
const slideOut = "_slideOut_1yqi6_31";
const iconWrapper = "_iconWrapper_1yqi6_46";
const icon = "_icon_1yqi6_46";
const emojiIcon = "_emojiIcon_1yqi6_61";
const content = "_content_1yqi6_75";
const title = "_title_1yqi6_82";
const message = "_message_1yqi6_89";
const emojiMessage = "_emojiMessage_1yqi6_97";
const playerName = "_playerName_1yqi6_104";
const reactionText = "_reactionText_1yqi6_110";
const emojiReaction = "_emojiReaction_1yqi6_116";
const closeButton = "_closeButton_1yqi6_134";
const styles = {
	toast: toast,
	slideOut: slideOut,
	iconWrapper: iconWrapper,
	icon: icon,
	emojiIcon: emojiIcon,
	content: content,
	title: title,
	message: message,
	emojiMessage: emojiMessage,
	playerName: playerName,
	reactionText: reactionText,
	emojiReaction: emojiReaction,
	closeButton: closeButton
};

const Toast = ({
  title,
  message,
  emoji = "ℹ",
  color = "#3498db",
  duration = 4e3,
  onClose,
  position
}) => {
  const [isVisible, setIsVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  const isEmojiReaction = !title && emoji !== "ℹ";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `${styles.toast} ${isEmojiReaction && isVisible ? styles.emojiReaction : ""} ${!isVisible ? styles.slideOut : ""}`,
      style: {
        top: "20px",
        zIndex: 1e4 + position,
        borderColor: color,
        background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: styles.iconWrapper,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `${styles.icon} ${isEmojiReaction ? styles.emojiIcon : ""}`,
                style: {
                  color,
                  textShadow: isEmojiReaction ? `0 0 20px ${color}, 0 0 40px ${color}60` : `0 0 8px ${color}80`
                },
                children: emoji
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.content, children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.title, children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles.message} ${isEmojiReaction ? styles.emojiMessage : ""}`, children: isEmojiReaction ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.playerName, children: message }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.reactionText, children: "reacted!" })
          ] }) : message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: styles.closeButton,
            onClick: onClose,
            "aria-label": "Close notification",
            children: "×"
          }
        )
      ]
    }
  );
};

const ToastContext = reactExports.createContext();
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = reactExports.useState([]);
  const [toastQueue, setToastQueue] = reactExports.useState([]);
  const [lastToastTime, setLastToastTime] = reactExports.useState(0);
  const { socket } = useSocket();
  const addToast = reactExports.useCallback((title, message, emoji = "ℹ", color = "#3498db", duration = 4e3) => {
    const id = Date.now() + Math.random();
    const newToast = { id, title, message, emoji, color, duration };
    const now = Date.now();
    const timeSinceLastToast = now - lastToastTime;
    if (timeSinceLastToast >= 600) {
      setToasts((prev) => [...prev, newToast]);
      setLastToastTime(now);
    } else {
      setToastQueue((prev) => [...prev, newToast]);
    }
    return id;
  }, [lastToastTime]);
  const removeToast = reactExports.useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);
  const showSuccess = reactExports.useCallback((title, message, duration) => {
    return addToast(title, message, "✓", "#27ae60", duration);
  }, [addToast]);
  const showError = reactExports.useCallback((title, message, duration) => {
    return addToast(title, message, "✕", "#e74c3c", duration);
  }, [addToast]);
  const showWarning = reactExports.useCallback((title, message, duration) => {
    return addToast(title, message, "⚠", "#f39c12", duration);
  }, [addToast]);
  const showInfo = reactExports.useCallback((title, message, duration) => {
    return addToast(title, message, "ℹ", "#3498db", duration);
  }, [addToast]);
  const showGameEvent = reactExports.useCallback((title, message, duration) => {
    return addToast(title, message, "🎮", "#9b59b6", duration);
  }, [addToast]);
  const showMoneyEvent = reactExports.useCallback((title, message, duration) => {
    return addToast(title, message, "💰", "#16a085", duration);
  }, [addToast]);
  reactExports.useEffect(() => {
    if (toastQueue.length === 0) return;
    const timer = setTimeout(() => {
      const nextToast = toastQueue[0];
      setToastQueue((prev) => prev.slice(1));
      setToasts((prev) => [...prev, nextToast]);
      setLastToastTime(Date.now());
    }, 600);
    return () => clearTimeout(timer);
  }, [toastQueue, toasts]);
  reactExports.useEffect(() => {
    if (!socket) return;
    const handleToast = (data) => {
      addToast(data.title || "", data.message, data.emoji || "ℹ", data.color || "#3498db", data.duration);
    };
    socket.on("toast", handleToast);
    return () => {
      socket.off("toast", handleToast);
    };
  }, [socket, addToast]);
  const value = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showGameEvent,
    showMoneyEvent,
    toasts
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToastContext.Provider, { value, children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toast-container", style: { position: "fixed", top: 0, right: 0, zIndex: 1e4 }, children: toasts.map((toast, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Toast,
      {
        title: toast.title,
        message: toast.message,
        emoji: toast.emoji,
        color: toast.color,
        duration: toast.duration,
        position: index,
        onClose: () => removeToast(toast.id)
      },
      toast.id
    )) })
  ] });
};

function App() {
  reactExports.useEffect(() => {
    soundService.initialize();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToastProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(VirtualKeyboardProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RouterProvider, { router }) }) });
}

const PreferencesContext = reactExports.createContext(null);
const formatImageUrl = (url) => {
  if (!url) return null;
  const API_URL = "https://api.in-between.live";
  if (url.startsWith("http")) {
    return url;
  } else if (url.startsWith("/files/")) {
    return `${API_URL}${url}`;
  } else if (url.includes("/uploads/")) {
    const parts = url.split("/");
    const filename = parts.pop();
    const type = parts[parts.length - 1];
    return `${API_URL}/files/${type}/${filename}`;
  } else {
    return `${API_URL}${url}`;
  }
};
const formatPreferencesData = (data) => {
  if (!data) return {};
  return {
    ...data,
    profileImg: formatImageUrl(data.profileImg),
    twoSecondPotGif: formatImageUrl(data.twoSecondPotGif),
    twoSecondPotMp3: data.twoSecondPotMp3
    // Audio files don't need the same formatting
  };
};
const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = reactExports.useState({
    profileImg: null,
    autoAnte: false,
    muted: false,
    twoSecondPotGif: null,
    twoSecondPotMp3: null,
    selectedTitle: null
  });
  const [loading, setLoading] = reactExports.useState(true);
  const { user } = useAuth();
  const loadPreferences = React.useCallback(async () => {
    if (!user) {
      setPreferences({ autoAnte: false });
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const API_URL = "https://api.in-between.live";
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("[Preferences] No token available");
        setLoading(false);
        return;
      }
      const response = await fetch(`${API_URL}/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to load preferences");
      }
      const data = await response.json();
      const formattedData = formatPreferencesData(data);
      const finalPreferences = formattedData || { autoAnte: false, muted: false };
      setPreferences(finalPreferences);
      if (typeof finalPreferences.muted !== "undefined") {
        soundService.setMuted(finalPreferences.muted);
      }
    } catch (error) {
      console.error("[Preferences] Error loading preferences:", error);
      setPreferences({ autoAnte: false });
    } finally {
      setLoading(false);
    }
  }, [user]);
  reactExports.useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user, loadPreferences]);
  const updatePreference = async (key, value) => {
    if (!user) {
      console.error("[Preferences] Cannot update preferences: User not logged in");
      return false;
    }
    try {
      const API_URL = "https://api.in-between.live";
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("[Preferences] No token available");
        return false;
      }
      setPreferences((prev) => ({
        ...prev,
        [key]: value
      }));
      if (key === "muted") {
        soundService.setMuted(value);
      }
      const response = await fetch(`${API_URL}/preferences/${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ value })
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${key} preference`);
      }
      const data = await response.json();
      const formattedData = formatPreferencesData(data);
      setPreferences(formattedData);
      return true;
    } catch (error) {
      console.error(`[Preferences] Error updating ${key}:`, error);
      await loadPreferences();
      return false;
    }
  };
  const toggleAutoAnte = async () => {
    const newValue = !preferences.autoAnte;
    return await updatePreference("autoAnte", newValue);
  };
  const toggleMute = async () => {
    const newValue = !preferences.muted;
    return await updatePreference("muted", newValue);
  };
  const updateSelectedTitle = async (titleString) => {
    return await updatePreference("selectedTitle", titleString);
  };
  const uploadTwoSecondPotGif = async (file) => {
    if (!file) {
      console.error("[Preferences] No file provided for GIF upload");
      return false;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const API_URL = "https://api.in-between.live";
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("[Preferences] No token available");
        return false;
      }
      const response = await fetch(`${API_URL}/preferences/twoSecondPotGif`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to upload GIF file: ${responseText}`);
      }
      const data = responseText ? JSON.parse(responseText) : {};
      const formattedUrl = formatImageUrl(data.fileUrl);
      setPreferences((prev) => ({
        ...prev,
        twoSecondPotGif: formattedUrl
      }));
      return true;
    } catch (error) {
      console.error("[Preferences] Error uploading GIF:", error);
      return false;
    }
  };
  const uploadTwoSecondPotMp3 = async (file) => {
    if (!file) {
      console.error("[Preferences] No file provided for MP3 upload");
      return false;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const API_URL = "https://api.in-between.live";
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("[Preferences] No token available");
        return false;
      }
      const response = await fetch(`${API_URL}/preferences/twoSecondPotMp3`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to upload MP3 file: ${responseText}`);
      }
      const data = responseText ? JSON.parse(responseText) : {};
      setPreferences((prev) => ({
        ...prev,
        twoSecondPotMp3: data.fileUrl
      }));
      return true;
    } catch (error) {
      console.error("[Preferences] Error uploading MP3:", error);
      return false;
    }
  };
  const uploadProfileImg = async (file) => {
    if (!file) {
      console.error("[Preferences] No file provided for profile image upload");
      return false;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const API_URL = "https://api.in-between.live";
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("[Preferences] No token available");
        return false;
      }
      const response = await fetch(`${API_URL}/preferences/profileImg`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });
      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to upload profile image: ${responseText}`);
      }
      const data = responseText ? JSON.parse(responseText) : {};
      const formattedUrl = formatImageUrl(data.fileUrl);
      setPreferences((prev) => ({
        ...prev,
        profileImg: formattedUrl
      }));
      return true;
    } catch (error) {
      console.error("[Preferences] Error uploading profile image:", error);
      return false;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreferencesContext.Provider,
    {
      value: {
        preferences,
        updatePreference,
        toggleAutoAnte,
        toggleMute,
        updateSelectedTitle,
        uploadTwoSecondPotGif,
        uploadTwoSecondPotMp3,
        uploadProfileImg,
        loading
      },
      children
    }
  );
};
const usePreferences = () => {
  const context = reactExports.useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};

const UserDataContext = reactExports.createContext(null);
const UserDataProvider = ({ children }) => {
  const { socket } = useSocket();
  const { token } = useAuth();
  const [userCache, setUserCache] = reactExports.useState(/* @__PURE__ */ new Map());
  const pendingFetches = reactExports.useRef(/* @__PURE__ */ new Set());
  const fetchTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!socket) return;
    const handleUserDataUpdate = ({ userId, data }) => {
      console.log("[UserDataContext] Received user data update:", userId, data);
      setUserCache((prev) => {
        const newCache = new Map(prev);
        newCache.set(userId, data);
        return newCache;
      });
    };
    socket.on("userDataUpdated", handleUserDataUpdate);
    return () => {
      socket.off("userDataUpdated", handleUserDataUpdate);
    };
  }, [socket]);
  reactExports.useEffect(() => {
    return () => {
      if (fetchTimer.current) {
        clearTimeout(fetchTimer.current);
      }
    };
  }, []);
  const fetchUsersData = reactExports.useCallback(async (userIds) => {
    if (!userIds || userIds.length === 0 || !token) return {};
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userIds })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users data");
      }
      const userData = await response.json();
      setUserCache((prev) => {
        const newCache = new Map(prev);
        Object.entries(userData).forEach(([userId, data]) => {
          newCache.set(userId, data);
        });
        return newCache;
      });
      return userData;
    } catch (error) {
      return {};
    }
  }, [token]);
  const executeBatchFetch = reactExports.useCallback(() => {
    if (pendingFetches.current.size === 0) return;
    const userIds = Array.from(pendingFetches.current);
    pendingFetches.current.clear();
    fetchUsersData(userIds);
  }, [fetchUsersData]);
  const getUserData = reactExports.useCallback((userId) => {
    if (!userId) return null;
    const cached = userCache.get(userId);
    if (cached) return cached;
    pendingFetches.current.add(userId);
    if (fetchTimer.current) {
      clearTimeout(fetchTimer.current);
    }
    fetchTimer.current = setTimeout(() => {
      executeBatchFetch();
    }, 10);
    return null;
  }, [userCache, executeBatchFetch]);
  const prefetchUsers = reactExports.useCallback((userIds) => {
    const uncachedIds = userIds.filter((id) => !userCache.has(id));
    if (uncachedIds.length > 0) {
      fetchUsersData(uncachedIds);
    }
  }, [userCache, fetchUsersData]);
  const value = {
    getUserData,
    prefetchUsers
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UserDataContext.Provider, { value, children });
};
const useUserData = (userId) => {
  const context = reactExports.useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within UserDataProvider");
  }
  return context.getUserData(userId);
};

client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SocketProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserDataProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PreferencesProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) }) }) })
);

export { API_URL as A, BaseModal as B, LoadingScreen as L, UserDataContext as U, useSocket as a, useUserData as b, baseModalStyles as c, useLobby as d, useVirtualKeyboardContext as e, usePreferences as f, soundService as s, useAuth as u };
//# sourceMappingURL=index-B_3z-Zzg.js.map
