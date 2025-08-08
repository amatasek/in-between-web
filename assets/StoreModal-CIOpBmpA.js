import { r as reactExports, j as jsxRuntimeExports } from './react-D-xSlSIM.js';
import { b as useUserData, u as useAuth, f as usePreferences, A as API_URL, c as baseModalStyles, B as BaseModal, U as UserDataContext, e as useVirtualKeyboardContext } from './index-B_3z-Zzg.js';

const coinIcon = "_coinIcon_1htv9_1";
const small$1 = "_small_1htv9_15";
const medium$1 = "_medium_1htv9_19";
const large$1 = "_large_1htv9_23";
const styles$a = {
	coinIcon: coinIcon,
	small: small$1,
	medium: medium$1,
	large: large$1
};

const CoinIcon = ({ size = "small", className = "" }) => {
  const sizeMap = {
    small: 15,
    medium: 19,
    large: 24
  };
  const pixelSize = sizeMap[size] || sizeMap.small;
  const gradientId = reactExports.useMemo(() => `goldGradient-${Math.random().toString(36).substr(2, 9)}`, []);
  const shineId = reactExports.useMemo(() => `goldShine-${Math.random().toString(36).substr(2, 9)}`, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles$a.coinIcon} ${styles$a[size]} ${className}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: pixelSize,
      height: pixelSize,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#FFD700" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#FFA500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#FF8C00" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: shineId, x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#FFED4E" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#FFD700" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 2L22 12L12 22L2 12L12 2Z",
            fill: `url(#${gradientId})`,
            stroke: "#D4AF37",
            strokeWidth: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 5L18 12L12 18L6 12L12 5Z",
            fill: `url(#${shineId})`,
            opacity: "0.6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 2L16 6L12 8L8 6L12 2Z",
            fill: "#FFFACD",
            opacity: "0.7"
          }
        )
      ]
    }
  ) });
};

const userAvatarContainer = "_userAvatarContainer_1spmo_1";
const containerRight = "_containerRight_1spmo_6";
const containerBelow = "_containerBelow_1spmo_11";
const avatar = "_avatar_1spmo_16";
const small = "_small_1spmo_33";
const medium = "_medium_1spmo_39";
const large = "_large_1spmo_45";
const avatarImageContainer = "_avatarImageContainer_1spmo_51";
const avatarImage = "_avatarImage_1spmo_51";
const initialsPlaceholder = "_initialsPlaceholder_1spmo_69";
const userInfo = "_userInfo_1spmo_83";
const username = "_username_1spmo_89";
const userTitle = "_userTitle_1spmo_95";
const playerCard = "_playerCard_1spmo_114";
const cardAppear = "_cardAppear_1spmo_1";
const playerCardAvatar = "_playerCardAvatar_1spmo_142";
const playerCardImage = "_playerCardImage_1spmo_151";
const playerCardInitials = "_playerCardInitials_1spmo_159";
const playerCardInfo = "_playerCardInfo_1spmo_173";
const playerCardUsername = "_playerCardUsername_1spmo_182";
const playerCardTitle = "_playerCardTitle_1spmo_190";
const playerCardXP = "_playerCardXP_1spmo_198";
const playerCardLevelXP = "_playerCardLevelXP_1spmo_206";
const separator = "_separator_1spmo_214";
const xpValue = "_xpValue_1spmo_218";
const loading = "_loading_1spmo_223";
const shimmerBg = "_shimmerBg_1spmo_1";
const avatarLoader = "_avatarLoader_1spmo_229";
const shimmerOverlay = "_shimmerOverlay_1spmo_1";
const skeletonUsername = "_skeletonUsername_1spmo_238";
const skeletonTitle = "_skeletonTitle_1spmo_248";
const shimmerText = "_shimmerText_1spmo_1";
const styles$9 = {
	userAvatarContainer: userAvatarContainer,
	containerRight: containerRight,
	containerBelow: containerBelow,
	avatar: avatar,
	small: small,
	medium: medium,
	large: large,
	avatarImageContainer: avatarImageContainer,
	avatarImage: avatarImage,
	initialsPlaceholder: initialsPlaceholder,
	userInfo: userInfo,
	username: username,
	userTitle: userTitle,
	playerCard: playerCard,
	cardAppear: cardAppear,
	playerCardAvatar: playerCardAvatar,
	playerCardImage: playerCardImage,
	playerCardInitials: playerCardInitials,
	playerCardInfo: playerCardInfo,
	playerCardUsername: playerCardUsername,
	playerCardTitle: playerCardTitle,
	playerCardXP: playerCardXP,
	playerCardLevelXP: playerCardLevelXP,
	separator: separator,
	xpValue: xpValue,
	loading: loading,
	shimmerBg: shimmerBg,
	avatarLoader: avatarLoader,
	shimmerOverlay: shimmerOverlay,
	skeletonUsername: skeletonUsername,
	skeletonTitle: skeletonTitle,
	shimmerText: shimmerText
};

const UserAvatar = ({
  userId,
  size = "medium",
  showName = true,
  namePosition = "right",
  className = "",
  showTitle = true
}) => {
  const [showPlayerCard, setShowPlayerCard] = reactExports.useState(false);
  const user = useUserData(userId);
  if (!userId) return null;
  if (!user) {
    const sizeClass2 = styles$9[size] || styles$9.medium;
    const containerClass2 = showName ? styles$9[`container${namePosition.charAt(0).toUpperCase() + namePosition.slice(1)}`] : "";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$9.userAvatarContainer} ${containerClass2} ${className}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${styles$9.avatar} ${sizeClass2} ${styles$9.loading}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.avatarLoader }) }),
      showName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.userInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.skeletonUsername }),
        showTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.skeletonTitle })
      ] })
    ] });
  }
  const { username, profileImg, title, xp, level } = user;
  const initials = getInitials(username || "Unknown");
  const sizeClass = styles$9[size] || styles$9.medium;
  const containerClass = showName ? styles$9[`container${namePosition.charAt(0).toUpperCase() + namePosition.slice(1)}`] : "";
  const API_URL = "https://api.in-between.live";
  let formattedImageUrl = null;
  if (profileImg) {
    if (profileImg.startsWith("http")) {
      formattedImageUrl = profileImg;
    } else if (profileImg.includes("/uploads/")) {
      const filename = profileImg.split("/").pop();
      formattedImageUrl = `${API_URL}/files/images/${filename}`;
    } else {
      formattedImageUrl = `${API_URL}${profileImg}`;
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${styles$9.userAvatarContainer} ${containerClass} ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `${styles$9.avatar} ${sizeClass}`,
        onMouseEnter: () => setShowPlayerCard(true),
        onMouseLeave: () => setShowPlayerCard(false),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.avatarImageContainer, children: [
            formattedImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: formattedImageUrl,
                alt: `${username}'s avatar`,
                className: styles$9.avatarImage,
                onError: (e) => {
                  console.error(`Failed to load profile image for ${username}:`, e);
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: styles$9.initialsPlaceholder,
                style: { display: formattedImageUrl ? "none" : "flex" },
                children: initials
              }
            )
          ] }),
          showPlayerCard && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.playerCard, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.playerCardAvatar, children: formattedImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: formattedImageUrl,
                alt: `${username}'s avatar`,
                className: styles$9.playerCardImage
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.playerCardInitials, children: initials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.playerCardInfo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.playerCardUsername, children: username || "Unknown" }),
              title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.playerCardTitle, children: title }),
              level !== void 0 && xp !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.playerCardLevelXP, children: [
                "Level ",
                level,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$9.separator, children: "•" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$9.xpValue, children: [
                  formatXP(xp),
                  " XP"
                ] })
              ] })
            ] })
          ] })
        ]
      }
    ),
    showName && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$9.userInfo, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.username, children: username || "Unknown" }),
      showTitle && title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$9.userTitle, children: title })
    ] })
  ] });
};
const getInitials = (name) => {
  return name.split(" ").map((part) => part.charAt(0)).join("").toUpperCase().substring(0, 2);
};
const formatXP = (xp) => {
  if (xp >= 1e6) {
    return (xp / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (xp >= 1e3) {
    return (xp / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return xp.toString();
};

const currencyAmount = "_currencyAmount_18625_1";
const pillBackground = "_pillBackground_18625_18";
const darkBackground = "_darkBackground_18625_29";
const styles$8 = {
	currencyAmount: currencyAmount,
	pillBackground: pillBackground,
	darkBackground: darkBackground
};

const CurrencyAmount = ({ amount, size, background, customClass }) => {
  const containerClasses = [
    styles$8.currencyAmount,
    background === "dark" ? styles$8.darkBackground : "",
    background === "pill" ? styles$8.pillBackground : "",
    customClass || ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: containerClasses, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoinIcon, { size }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: amount.toLocaleString() })
  ] });
};

const GearIcon = ({ className = "h-6 w-6", ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.004.827c-.29.24-.438.613-.431.992a6.759 6.759 0 010 1.905c-.007.378.141.75.431.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.29-.24.438-.613.43-.992a6.932 6.932 0 010-1.905c.007-.378-.14-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281zM15 12a3 3 0 11-6 0 3 3 0 016 0z"
        }
      )
    }
  );
};

const toggleContainer = "_toggleContainer_19p7v_1";
const toggleInput = "_toggleInput_19p7v_8";
const toggleLabel = "_toggleLabel_19p7v_14";
const toggleSlider = "_toggleSlider_19p7v_21";
const toggleText = "_toggleText_19p7v_70";
const styles$7 = {
	toggleContainer: toggleContainer,
	toggleInput: toggleInput,
	toggleLabel: toggleLabel,
	toggleSlider: toggleSlider,
	toggleText: toggleText
};

const ToggleSwitch = ({ isChecked, onChange, label }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$7.toggleContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: styles$7.toggleLabel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        checked: isChecked,
        onChange,
        className: styles$7.toggleInput,
        "data-gamepad-focusable": "true"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$7.toggleSlider }),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$7.toggleText, children: label })
  ] }) });
};

const fileUploadContainer = "_fileUploadContainer_1ak4l_1";
const fileInput = "_fileInput_1ak4l_8";
const uploadButton = "_uploadButton_1ak4l_12";
const changeButton = "_changeButton_1ak4l_37";
const previewContainer = "_previewContainer_1ak4l_53";
const imagePreview = "_imagePreview_1ak4l_61";
const audioPreview = "_audioPreview_1ak4l_70";
const errorMessage$2 = "_errorMessage_1ak4l_76";
const styles$6 = {
	fileUploadContainer: fileUploadContainer,
	fileInput: fileInput,
	uploadButton: uploadButton,
	changeButton: changeButton,
	previewContainer: previewContainer,
	imagePreview: imagePreview,
	audioPreview: audioPreview,
	errorMessage: errorMessage$2};

const FileUpload = ({
  onUpload,
  currentFileUrl,
  acceptedFileTypes,
  label,
  previewType = "image"
  // 'image', 'audio', or 'none'
}) => {
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("[FileUpload] No file selected");
      return;
    }
    console.log("[FileUpload] File selected:", {
      name: file.name,
      type: file.type,
      size: file.size
    });
    setError(null);
    setIsUploading(true);
    try {
      console.log("[FileUpload] Calling onUpload function");
      const success = await onUpload(file);
      console.log("[FileUpload] Upload result:", success);
      if (!success) {
        console.error("[FileUpload] Upload failed");
        setError("Failed to upload file. Please try again.");
      } else {
        console.log("[FileUpload] Upload successful");
      }
    } catch (err) {
      console.error("[FileUpload] Error uploading file:", err);
      setError("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const renderPreview = () => {
    if (!currentFileUrl) return null;
    if (previewType === "image") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$6.previewContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: currentFileUrl,
          alt: "Preview",
          className: styles$6.imagePreview
        }
      ) });
    } else if (previewType === "audio") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$6.previewContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "audio",
        {
          controls: true,
          src: currentFileUrl,
          className: styles$6.audioPreview,
          children: "Your browser does not support the audio element."
        }
      ) });
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$6.fileUploadContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "file",
        ref: fileInputRef,
        onChange: handleFileChange,
        accept: acceptedFileTypes,
        className: styles$6.fileInput
      }
    ),
    currentFileUrl && renderPreview(),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleButtonClick,
        className: `${styles$6.uploadButton} ${currentFileUrl ? styles$6.changeButton : ""}`,
        disabled: isUploading,
        "data-gamepad-focusable": "true",
        children: isUploading ? "Uploading..." : currentFileUrl ? `Change ${label}` : `Upload ${label}`
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$6.errorMessage, children: error })
  ] });
};

const TitlesSelector = () => {
  const { token } = useAuth();
  const { preferences, updateSelectedTitle } = usePreferences();
  const [titles, setTitles] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadTitles();
  }, []);
  const loadTitles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/me/titles`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to load titles");
      }
      const userTitles = await response.json();
      setTitles(userTitles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleTitleSelect = async (titleString) => {
    try {
      await updateSelectedTitle(titleString);
    } catch (err) {
      setError("Failed to update title");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.loadingMessage, children: "Loading titles..." });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.errorMessage, children: error });
  }
  if (titles.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: "20px", color: "#a0b9d6" }, children: "No titles unlocked yet. Play games to earn achievements!" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    paddingBottom: "8px"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => handleTitleSelect(""),
        style: {
          display: "inline-block",
          width: "120px",
          height: "36px",
          padding: "8px",
          margin: "0 8px 0 0",
          borderRadius: "6px",
          cursor: "pointer",
          textAlign: "center",
          backgroundColor: !preferences.selectedTitle ? "rgba(100, 169, 255, 0.3)" : "rgba(255, 255, 255, 0.08)",
          border: !preferences.selectedTitle ? "2px solid #64a9ff" : "2px solid rgba(255, 255, 255, 0.15)",
          verticalAlign: "top",
          whiteSpace: "normal",
          flexDirection: "column",
          justifyContent: "center"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "bold", color: "#bcdcff", fontSize: "13px" }, children: "No Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#a0b9d6", fontSize: "10px", marginTop: "2px" }, children: "Display no title" })
        ]
      }
    ),
    titles.map((title) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: () => handleTitleSelect(title.title),
        style: {
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "130px",
          height: "36px",
          padding: "8px",
          margin: "0 8px 0 0",
          borderRadius: "6px",
          cursor: "pointer",
          textAlign: "center",
          backgroundColor: preferences.selectedTitle === title.title ? "rgba(100, 169, 255, 0.3)" : "rgba(255, 255, 255, 0.08)",
          border: preferences.selectedTitle === title.title ? "2px solid #64a9ff" : "2px solid rgba(255, 255, 255, 0.15)",
          verticalAlign: "top",
          whiteSpace: "normal"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "bold", color: "#bcdcff", fontSize: "13px" }, children: title.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#a0b9d6", fontSize: "10px", marginTop: "2px" }, children: title.description })
        ]
      },
      title.title
    )),
    titles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      textAlign: "center",
      padding: "16px",
      color: "#a0b9d6",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: "6px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "8px",
      whiteSpace: "normal"
    }, children: "No titles unlocked yet. Play games to earn achievements!" })
  ] });
};

const PreferencesModal = ({ onClose }) => {
  const {
    preferences,
    toggleAutoAnte,
    toggleMute,
    uploadTwoSecondPotGif,
    uploadTwoSecondPotMp3,
    uploadProfileImg,
    loading
  } = usePreferences();
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BaseModal, { title: "Preferences", onClose, style: { maxWidth: 600, maxHeight: "25vh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.loadingMessage, children: "Loading preferences..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BaseModal, { title: "Preferences", onClose, style: { maxWidth: 600, maxHeight: "80vh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingsContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Game Options" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Mute Sound" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Mute all game sound effects" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToggleSwitch,
        {
          isChecked: preferences.muted,
          onChange: toggleMute
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Auto-Ante" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Automatically ante up when a new round begins" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToggleSwitch,
        {
          isChecked: preferences.autoAnte,
          onChange: toggleAutoAnte
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Customization Options" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Profile Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Upload a profile image to personalize your account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FileUpload,
        {
          onUpload: uploadProfileImg,
          currentFileUrl: preferences.profileImg,
          acceptedFileTypes: "image/jpeg,image/png,image/gif",
          label: "Image",
          previewType: "image"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingItem, style: { flexDirection: "column", alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, style: { marginRight: 0, marginBottom: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Choose a title to display with your name. Unlock more by playing games!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TitlesSelector, {})
    ] })
  ] }) });
};

const iconButton = "_iconButton_3xp6j_1";
const danger = "_danger_3xp6j_31";
const preferences = "_preferences_3xp6j_44";
const stats = "_stats_3xp6j_57";
const store = "_store_3xp6j_70";
const styles$5 = {
	iconButton: iconButton,
	"default": "_default_3xp6j_18",
	danger: danger,
	preferences: preferences,
	stats: stats,
	store: store
};

const IconButton = ({
  icon,
  title,
  onClick,
  variant = "default",
  compact = true,
  className = "",
  ...restProps
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: `${styles$5.iconButton} ${styles$5[variant]} ${className}`,
      onClick,
      title,
      type: "button",
      ...restProps,
      children: icon
    }
  );
};

const PreferencesButton = ({ onModalStateChange }) => {
  const [isPreferencesOpen, setIsPreferencesOpen] = reactExports.useState(false);
  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };
  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };
  reactExports.useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isPreferencesOpen);
    }
  }, [isPreferencesOpen, onModalStateChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        onClick: openPreferences,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GearIcon, { style: { color: "white", width: 20, height: 20 } }),
        "aria-label": "Open Preferences",
        variant: "preferences",
        title: "Preferences",
        "data-gamepad-focusable": "true"
      }
    ),
    isPreferencesOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(PreferencesModal, { isOpen: isPreferencesOpen, onClose: closePreferences })
  ] });
};

const BarChartIcon = ({ color = "currentColor", size = 24 }) => {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "20", x2: "18", y2: "10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "20", x2: "12", y2: "4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "20", x2: "6", y2: "14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "20", x2: "21", y2: "20" })
      ]
    }
  );
};

const settingsContainer = "_settingsContainer_22a3p_1";
const tabsContainer$2 = "_tabsContainer_22a3p_6";
const tabButton$2 = "_tabButton_22a3p_13";
const activeTab$2 = "_activeTab_22a3p_30";
const tabContent$2 = "_tabContent_22a3p_45";
const totalsTable = "_totalsTable_22a3p_51";
const settleUpTable = "_settleUpTable_22a3p_51";
const totalRow = "_totalRow_22a3p_57";
const paymentRow = "_paymentRow_22a3p_57";
const playerName = "_playerName_22a3p_66";
const totalAmount = "_totalAmount_22a3p_77";
const paymentAmount = "_paymentAmount_22a3p_77";
const positive = "_positive_22a3p_83";
const negative = "_negative_22a3p_87";
const paymentText = "_paymentText_22a3p_91";
const noDataMessage$1 = "_noDataMessage_22a3p_102";
const loadingMessage$2 = "_loadingMessage_22a3p_109";
const styles$4 = {
	settingsContainer: settingsContainer,
	tabsContainer: tabsContainer$2,
	tabButton: tabButton$2,
	activeTab: activeTab$2,
	tabContent: tabContent$2,
	totalsTable: totalsTable,
	settleUpTable: settleUpTable,
	totalRow: totalRow,
	paymentRow: paymentRow,
	playerName: playerName,
	totalAmount: totalAmount,
	paymentAmount: paymentAmount,
	positive: positive,
	negative: negative,
	paymentText: paymentText,
	noDataMessage: noDataMessage$1,
	loadingMessage: loadingMessage$2
};

const DownloadIcon = ({ color = "currentColor", size = 24 }) => {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 15 L12 18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.5 16.5 L12 19 L14.5 16.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 10 L10 10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 10 L14 10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 10 L16 10" })
      ]
    }
  );
};

let useGameContext;
try {
  useGameContext = require("../../contexts/GameContext").useGameContext;
} catch (error) {
  useGameContext = () => ({ gameState: null });
}
const TransactionDownloadButton = ({
  title = "Download Transaction Log as CSV",
  gameState: propGameState,
  ...restProps
}) => {
  let contextValue;
  try {
    contextValue = useGameContext ? useGameContext() : { gameState: null };
  } catch (error) {
    contextValue = { gameState: null };
  }
  const gameData = propGameState || contextValue?.gameState;
  const gameTransactions = gameData?.gameTransactions || gameData?.gameData?.gameTransactions || [];
  const gameId = gameData?._id || gameData?.id || "unknown";
  const downloadTransactionsCSV = () => {
    const transactions = Array.isArray(gameTransactions) ? gameTransactions : [];
    if (transactions.length === 0) return;
    let csvContent = "Player,Transaction Type,Amount,Round,Timestamp\n";
    const sortedTransactions = [...transactions].map((tx) => ({
      ...tx,
      // Ensure timestamp is a Date object for sorting
      timestamp: tx.timestamp ? new Date(tx.timestamp) : /* @__PURE__ */ new Date()
    }));
    sortedTransactions.sort((a, b) => a.timestamp - b.timestamp);
    sortedTransactions.forEach((tx) => {
      const timestamp = tx.timestamp ? new Date(tx.timestamp).toLocaleString() : "N/A";
      const playerName = tx.playerName || tx.player || "Unknown Player";
      const escapedName = playerName.includes(",") ? `"${playerName}"` : playerName;
      let transactionType = tx.transactionType || "Transaction";
      if (!tx.transactionType && tx.reason) {
        const reasonParts = tx.reason.split(" ");
        transactionType = reasonParts[0];
        if (reasonParts[0] === "Won") {
          transactionType = "Win";
        } else if (tx.reason.includes("penalty")) {
          transactionType = "Penalty";
        }
      }
      csvContent += `${escapedName},${transactionType},${tx.amount},${tx.round || "N/A"},${timestamp}
`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `game-${gameId}-transactions.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DownloadIcon, { color: "white", size: 20 }),
      title,
      onClick: downloadTransactionsCSV,
      variant: "default",
      ...restProps
    }
  );
};

const noDataMessage = "_noDataMessage_qnwhh_2";
const tabContent$1 = "_tabContent_qnwhh_9";
const statsGrid$1 = "_statsGrid_qnwhh_15";
const statItem$1 = "_statItem_qnwhh_24";
const statLabel$1 = "_statLabel_qnwhh_40";
const statValue$1 = "_statValue_qnwhh_47";
const statSuffix$1 = "_statSuffix_qnwhh_55";
const styles$3 = {
	noDataMessage: noDataMessage,
	tabContent: tabContent$1,
	statsGrid: statsGrid$1,
	statItem: statItem$1,
	statLabel: statLabel$1,
	statValue: statValue$1,
	statSuffix: statSuffix$1
};

const GameStats = ({ gameData }) => {
  const transactions = gameData.gameTransactions;
  const players = gameData.players;
  const playerNames = {};
  Object.entries(players).forEach(([playerId, player]) => {
    playerNames[playerId] = player.name;
  });
  transactions.forEach((tx) => {
    if (tx.playerId && !playerNames[tx.playerId]) {
      playerNames[tx.playerId] = tx.playerName || "Unknown Player";
    }
  });
  const gameStats = reactExports.useMemo(() => {
    if (transactions.length === 0) {
      return [];
    }
    const formatNumber = (num) => num.toLocaleString();
    const playerTransactions = {};
    transactions.forEach((tx) => {
      if (!playerTransactions[tx.playerId]) {
        playerTransactions[tx.playerId] = [];
      }
      playerTransactions[tx.playerId].push(tx);
    });
    const rounds = gameData.round || 1;
    const decks = gameData.deckCount || 1;
    const totalAnteAmount = transactions.filter((tx) => tx.transactionType === "Ante").reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const totalBetAmount = transactions.filter((tx) => tx.transactionType === "Bet").reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const bets = transactions.filter((tx) => tx.transactionType === "Bet");
    const biggestBet = bets.length > 0 ? bets.reduce((max, tx) => Math.abs(tx.amount) > Math.abs(max.amount) ? tx : max, bets[0]) : null;
    const biggestPot = transactions.reduce((max, tx) => tx.potAmount > max ? tx.potAmount : max, 0);
    const penalties = transactions.filter((tx) => tx.transactionType === "2x" || tx.transactionType === "3x");
    const totalPenaltyAmount = penalties.reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const playerBetCounts = {};
    bets.forEach((tx) => {
      playerBetCounts[tx.playerId] = (playerBetCounts[tx.playerId] || 0) + 1;
    });
    let mostAggressivePlayerId = null;
    let mostBets = 0;
    Object.entries(playerBetCounts).forEach(([playerId, count]) => {
      if (count > mostBets) {
        mostBets = count;
        mostAggressivePlayerId = playerId;
      }
    });
    const playerBetTotals = {};
    bets.forEach((tx) => {
      if (!playerBetTotals[tx.playerId]) {
        playerBetTotals[tx.playerId] = { total: 0, count: 0 };
      }
      playerBetTotals[tx.playerId].total += Math.abs(tx.amount);
      playerBetTotals[tx.playerId].count += 1;
    });
    let highestAvgBetPlayerId = null;
    let highestAvgBet = 0;
    Object.entries(playerBetTotals).forEach(([playerId, data]) => {
      const avg = data.total / data.count;
      if (avg > highestAvgBet) {
        highestAvgBet = avg;
        highestAvgBetPlayerId = playerId;
      }
    });
    const playerWins = {};
    transactions.filter((tx) => tx.transactionType === "Win").forEach((tx) => {
      playerWins[tx.playerId] = (playerWins[tx.playerId] || 0) + 1;
    });
    let mostWinningPlayerId = null;
    let mostWins = 0;
    Object.entries(playerWins).forEach(([playerId, wins]) => {
      if (wins > mostWins) {
        mostWins = wins;
        mostWinningPlayerId = playerId;
      }
    });
    const playerPenalties = {};
    penalties.forEach((tx) => {
      playerPenalties[tx.playerId] = (playerPenalties[tx.playerId] || 0) + 1;
    });
    let mostPenaltiesPlayerId = null;
    let mostPenalties = 0;
    Object.entries(playerPenalties).forEach(([playerId, count]) => {
      if (count > mostPenalties) {
        mostPenalties = count;
        mostPenaltiesPlayerId = playerId;
      }
    });
    const playerProfits = gameData.totals || {};
    let biggestWinnerId = null;
    let biggestWin = 0;
    let biggestLoserId = null;
    let biggestLoss = 0;
    Object.entries(playerProfits).forEach(([playerId, profit]) => {
      if (profit > biggestWin) {
        biggestWin = profit;
        biggestWinnerId = playerId;
      }
      if (profit < biggestLoss) {
        biggestLoss = profit;
        biggestLoserId = playerId;
      }
    });
    return [
      {
        key: "totalDecks",
        label: "Total Decks",
        value: decks,
        type: "number"
      },
      {
        key: "totalRounds",
        label: "Total Rounds",
        value: rounds,
        type: "number"
      },
      {
        key: "totalBets",
        label: "Total Bets Placed",
        value: bets.length,
        type: "number"
      },
      {
        key: "totalAnte",
        label: "Total Ante Amount",
        value: totalAnteAmount,
        type: "currency"
      },
      {
        key: "totalBetAmount",
        label: "Total Bet Amount",
        value: totalBetAmount,
        type: "currency"
      },
      {
        key: "biggestPot",
        label: "Biggest Pot",
        value: biggestPot,
        type: "currency"
      },
      {
        key: "biggestBet",
        label: "Biggest Single Bet",
        value: biggestBet ? Math.abs(biggestBet.amount) : 0,
        type: "currency",
        suffix: biggestBet ? ` by ${biggestBet.playerName}` : ""
      },
      {
        key: "biggestWinner",
        label: "Biggest Winner",
        value: biggestWinnerId ? playerNames[biggestWinnerId] || "Unknown Player" : "N/A",
        type: "text",
        suffix: biggestWinnerId ? ` (+${formatNumber(biggestWin)})` : ""
      },
      {
        key: "biggestLoser",
        label: "Biggest Loser",
        value: biggestLoserId ? playerNames[biggestLoserId] || "Unknown Player" : "N/A",
        type: "text",
        suffix: biggestLoserId ? ` (${formatNumber(biggestLoss)})` : ""
      },
      {
        key: "mostAggressive",
        label: "Most Aggressive Player",
        value: mostAggressivePlayerId ? playerNames[mostAggressivePlayerId] || "Unknown Player" : "N/A",
        type: "text",
        suffix: mostAggressivePlayerId ? ` (${formatNumber(mostBets)} bets)` : ""
      },
      {
        key: "highestAvgBet",
        label: "Highest Average Bet",
        value: highestAvgBetPlayerId ? playerNames[highestAvgBetPlayerId] || "Unknown Player" : "N/A",
        type: "text",
        suffix: highestAvgBetPlayerId ? ` (avg: ${formatNumber(Math.round(highestAvgBet))})` : ""
      },
      {
        key: "mostWinning",
        label: "Most Winning Player",
        value: mostWinningPlayerId ? playerNames[mostWinningPlayerId] || "Unknown Player" : "N/A",
        type: "text",
        suffix: mostWinningPlayerId ? ` (${formatNumber(mostWins)} wins)` : ""
      },
      {
        key: "totalPenalties",
        label: "Total Penalties",
        value: penalties.length,
        type: "number",
        suffix: penalties.length > 0 ? ` (${formatNumber(totalPenaltyAmount)} coins)` : ""
      },
      {
        key: "unluckyPlayer",
        label: "Most Penalized Player",
        value: mostPenaltiesPlayerId ? playerNames[mostPenaltiesPlayerId] || "Unknown Player" : "N/A",
        type: "text",
        suffix: mostPenaltiesPlayerId ? ` (${formatNumber(mostPenalties)} penalties)` : ""
      }
    ];
  }, [transactions, playerNames]);
  const formatStatValue = (type, value) => {
    if (type === "currency") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: value, size: "small" });
    }
    if (type === "percentage") {
      return `${(value * 100).toFixed(1)}%`;
    }
    if (type === "number") {
      return value.toLocaleString();
    }
    return value;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.tabContent, children: gameStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$3.noDataMessage, children: "No statistics available for this game." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.statsGrid, children: gameStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.statItem, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$3.statLabel, children: stat.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$3.statValue, children: [
      formatStatValue(stat.type, stat.value),
      stat.suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$3.statSuffix, children: stat.suffix })
    ] })
  ] }, stat.key)) }) });
};

const GameSummaryModal = ({ onClose, gameData }) => {
  if (!gameData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      BaseModal,
      {
        title: "Game Summary",
        onClose,
        style: { maxWidth: 800 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.loadingMessage, children: "Loading game data..." })
      }
    );
  }
  const gameTransactions = gameData.gameTransactions || [];
  const players = gameData.players || {};
  const gameId = gameData.id || "unknown";
  const showPayoutsTab = gameData.settings?.isPrivate || false;
  const transactions = Array.isArray(gameTransactions) ? gameTransactions : [];
  const playerNames = {};
  Object.entries(players).forEach(([playerId, player]) => {
    playerNames[playerId] = player.name;
  });
  transactions.forEach((tx) => {
    if (tx.playerId && !playerNames[tx.playerId]) {
      playerNames[tx.playerId] = tx.playerName || "Unknown Player";
    }
  });
  const playerTotals = gameData.totals || {};
  const settleUpPayments = reactExports.useMemo(() => {
    if (Object.keys(playerTotals).length === 2) {
      const players2 = Object.entries(playerTotals);
      const [player1Id, player1Total] = players2[0];
      const [player2Id, player2Total] = players2[1];
      if (Math.abs(player1Total + player2Total) < 0.1) {
        if (player1Total > 0) {
          return [{
            from: player2Id,
            fromName: playerNames[player2Id],
            to: player1Id,
            toName: playerNames[player1Id],
            amount: Math.abs(player1Total)
          }];
        } else if (player2Total > 0) {
          return [{
            from: player1Id,
            fromName: playerNames[player1Id],
            to: player2Id,
            toName: playerNames[player2Id],
            amount: Math.abs(player2Total)
          }];
        }
      }
    }
    const payments = [];
    const losers = Object.entries(playerTotals).filter(([_, amount]) => amount < 0).map(([playerId, amount]) => ({
      playerId,
      playerName: playerNames[playerId] || "Unknown Player",
      amount: Math.abs(amount)
      // Convert to positive amount for easier calculation
    }));
    const winners = Object.entries(playerTotals).filter(([_, amount]) => amount > 0).map(([playerId, amount]) => ({
      playerId,
      playerName: playerNames[playerId] || "Unknown Player",
      amount
    }));
    losers.sort((a, b) => b.amount - a.amount);
    winners.sort((a, b) => b.amount - a.amount);
    while (winners.length > 0 && losers.length > 0) {
      const winner = winners[0];
      const loser = losers[0];
      const paymentAmount = Math.min(winner.amount, loser.amount);
      if (paymentAmount > 0.01) {
        payments.push({
          from: loser.playerId,
          fromName: loser.playerName,
          to: winner.playerId,
          toName: winner.playerName,
          amount: paymentAmount
        });
        winner.amount -= paymentAmount;
        loser.amount -= paymentAmount;
        if (winner.amount < 0.01) {
          winners.shift();
        }
        if (loser.amount < 0.01) {
          losers.shift();
        }
      } else {
        break;
      }
    }
    return payments;
  }, [playerTotals, playerNames]);
  const [activeTab, setActiveTab] = reactExports.useState("totals");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    BaseModal,
    {
      title: `Game Summary (${gameId})`,
      onClose,
      headerButtons: /* @__PURE__ */ jsxRuntimeExports.jsx(TransactionDownloadButton, { gameState: gameData }),
      style: { maxWidth: 800 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.settingsContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.tabsContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `${styles$4.tabButton} ${activeTab === "totals" ? styles$4.activeTab : ""}`,
              onClick: () => setActiveTab("totals"),
              "data-gamepad-focusable": "true",
              children: "Totals"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `${styles$4.tabButton} ${activeTab === "stats" ? styles$4.activeTab : ""}`,
              onClick: () => setActiveTab("stats"),
              "data-gamepad-focusable": "true",
              children: "Stats"
            }
          ),
          showPayoutsTab && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `${styles$4.tabButton} ${activeTab === "payouts" ? styles$4.activeTab : ""}`,
              onClick: () => setActiveTab("payouts"),
              "data-gamepad-focusable": "true",
              children: "Payouts"
            }
          )
        ] }),
        activeTab === "totals" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.tabContent, children: Object.keys(playerTotals).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$4.noDataMessage, children: "No transactions recorded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.totalsTable, children: Object.entries(playerTotals).map(([playerId, total]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.totalRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$4.playerName, children: playerNames[playerId] || "Unknown Player" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `${styles$4.totalAmount} ${total >= 0 ? styles$4.positive : styles$4.negative}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: total, size: "small" }) })
        ] }, playerId)) }) }),
        activeTab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx(GameStats, { gameData }),
        activeTab === "payouts" && showPayoutsTab && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.tabContent, children: settleUpPayments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: styles$4.noDataMessage, children: "No payments needed or no transactions recorded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$4.settleUpTable, children: settleUpPayments.map((payment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$4.paymentRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: styles$4.paymentText, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$4.playerName, children: payment.fromName }),
            " pays",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$4.playerName, children: payment.toName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$4.paymentAmount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: payment.amount, size: "small" }) })
        ] }, index)) }) })
      ] })
    }
  );
};

const leaderboardContainer = "_leaderboardContainer_1gsc7_1";
const leaderboardHeader = "_leaderboardHeader_1gsc7_9";
const durationSelector = "_durationSelector_1gsc7_15";
const durationButton = "_durationButton_1gsc7_23";
const active = "_active_1gsc7_38";
const loadingMessage$1 = "_loadingMessage_1gsc7_43";
const errorMessage$1 = "_errorMessage_1gsc7_43";
const emptyMessage = "_emptyMessage_1gsc7_43";
const loadingSpinner$2 = "_loadingSpinner_1gsc7_55";
const leaderboardList = "_leaderboardList_1gsc7_73";
const leaderboardRow = "_leaderboardRow_1gsc7_82";
const rankCell = "_rankCell_1gsc7_97";
const rank = "_rank_1gsc7_97";
const playerCell = "_playerCell_1gsc7_108";
const statsCell = "_statsCell_1gsc7_113";
const styles$2 = {
	leaderboardContainer: leaderboardContainer,
	leaderboardHeader: leaderboardHeader,
	durationSelector: durationSelector,
	durationButton: durationButton,
	active: active,
	loadingMessage: loadingMessage$1,
	errorMessage: errorMessage$1,
	emptyMessage: emptyMessage,
	loadingSpinner: loadingSpinner$2,
	leaderboardList: leaderboardList,
	leaderboardRow: leaderboardRow,
	rankCell: rankCell,
	rank: rank,
	playerCell: playerCell,
	statsCell: statsCell
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [duration, setDuration] = reactExports.useState("all");
  const userDataContext = reactExports.useContext(UserDataContext);
  reactExports.useEffect(() => {
    fetchLeaderboard();
  }, [duration]);
  const fetchLeaderboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/leaderboard?duration=${duration}`);
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard");
      }
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
      if (userDataContext && data.leaderboard) {
        const userIds = data.leaderboard.map((player) => player.userId);
        userDataContext.prefetchUsers(userIds);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getRankDisplay = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.leaderboardContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.leaderboardHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.durationSelector, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `${styles$2.durationButton} ${duration === "all" ? styles$2.active : ""}`,
          onClick: () => setDuration("all"),
          "data-gamepad-focusable": "true",
          children: "All Time"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `${styles$2.durationButton} ${duration === "30days" ? styles$2.active : ""}`,
          onClick: () => setDuration("30days"),
          "data-gamepad-focusable": "true",
          children: "Last 30 Days"
        }
      )
    ] }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.loadingMessage, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.loadingSpinner }),
      "Loading leaderboard..."
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.errorMessage, children: [
      "Error: ",
      error
    ] }) : leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.emptyMessage, children: "No players found for this time period." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: styles$2.leaderboardList,
        "data-gamepad-scrollable": "true",
        tabIndex: "0",
        children: leaderboard.map((player) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$2.leaderboardRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.rankCell, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$2.rank, children: getRankDisplay(player.rank) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.playerCell, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            UserAvatar,
            {
              userId: player.userId,
              size: "small",
              showName: true,
              showTitle: true,
              namePosition: "right"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$2.statsCell, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: player.totalProfit, size: "small" }) })
        ] }, player.userId))
      }
    )
  ] });
};

const statsPlaceholder = "_statsPlaceholder_t0x7w_1";
const tabsContainer$1 = "_tabsContainer_t0x7w_12";
const tabButton$1 = "_tabButton_t0x7w_19";
const activeTab$1 = "_activeTab_t0x7w_36";
const tabContent = "_tabContent_t0x7w_51";
const statsGrid = "_statsGrid_t0x7w_62";
const statItem = "_statItem_t0x7w_92";
const statLabel = "_statLabel_t0x7w_108";
const statValue = "_statValue_t0x7w_115";
const statSuffix = "_statSuffix_t0x7w_123";
const historyTable = "_historyTable_t0x7w_137";
const tableHeader = "_tableHeader_t0x7w_169";
const gameNameHeader = "_gameNameHeader_t0x7w_180";
const playerCountHeader = "_playerCountHeader_t0x7w_180";
const roundsHeader = "_roundsHeader_t0x7w_180";
const endDateHeader = "_endDateHeader_t0x7w_180";
const historyRow = "_historyRow_t0x7w_196";
const gameNameCell = "_gameNameCell_t0x7w_203";
const playerCountCell = "_playerCountCell_t0x7w_211";
const roundsCell = "_roundsCell_t0x7w_211";
const endDateCell = "_endDateCell_t0x7w_219";
const gameNameLink = "_gameNameLink_t0x7w_227";
const pageButton = "_pageButton_t0x7w_313";
const pageInfo = "_pageInfo_t0x7w_339";
const errorMessage = "_errorMessage_t0x7w_351";
const loadingMessage = "_loadingMessage_t0x7w_372";
const loadingSpinner$1 = "_loadingSpinner_t0x7w_383";
const styles$1 = {
	statsPlaceholder: statsPlaceholder,
	tabsContainer: tabsContainer$1,
	tabButton: tabButton$1,
	activeTab: activeTab$1,
	tabContent: tabContent,
	statsGrid: statsGrid,
	statItem: statItem,
	statLabel: statLabel,
	statValue: statValue,
	statSuffix: statSuffix,
	historyTable: historyTable,
	tableHeader: tableHeader,
	gameNameHeader: gameNameHeader,
	playerCountHeader: playerCountHeader,
	roundsHeader: roundsHeader,
	endDateHeader: endDateHeader,
	historyRow: historyRow,
	gameNameCell: gameNameCell,
	playerCountCell: playerCountCell,
	roundsCell: roundsCell,
	endDateCell: endDateCell,
	gameNameLink: gameNameLink,
	pageButton: pageButton,
	pageInfo: pageInfo,
	errorMessage: errorMessage,
	loadingMessage: loadingMessage,
	loadingSpinner: loadingSpinner$1};

const PlayerStatsModal = ({ onClose }) => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("leaderboard");
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [historyData, setHistoryData] = reactExports.useState({ games: [], pagination: {} });
  const [currentPage, setCurrentPage] = reactExports.useState(0);
  const [showGameSummary, setShowGameSummary] = reactExports.useState(false);
  const [selectedGameData, setSelectedGameData] = reactExports.useState(null);
  const [lifetimeStats, setLifetimeStats] = reactExports.useState(null);
  const [statsLoading, setStatsLoading] = reactExports.useState(true);
  const [statsError, setStatsError] = reactExports.useState(null);
  const pageSize = 5;
  reactExports.useEffect(() => {
    const fetchGameHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/games/history?pageSize=${pageSize}&pageNumber=${currentPage}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch game history");
        }
        const data = await response.json();
        setHistoryData(data);
      } catch (err) {
        console.error("Error fetching game history:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGameHistory();
  }, [token, currentPage]);
  reactExports.useEffect(() => {
    const fetchLifetimeStats = async () => {
      setStatsLoading(true);
      setStatsError(null);
      try {
        const response = await fetch(`${API_URL}/me/stats`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch lifetime stats");
        }
        const data = await response.json();
        setLifetimeStats(data.stats);
      } catch (err) {
        console.error("Error fetching lifetime stats:", err);
        setStatsError(err.message);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchLifetimeStats();
  }, [token]);
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (historyData.pagination && historyData.games.length === pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };
  const formatStatValue = (type, value) => {
    if (typeof value === "number") {
      if (type === "currency") {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CurrencyAmount, { amount: value.toFixed(2), size: "small" });
      }
      if (type === "percentage") {
        return `${(value * 100).toFixed(1)}%`;
      }
      return value.toLocaleString();
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    if (type === "date" || value instanceof Date) {
      return formatDate(value);
    }
    if (type === "number") {
      return Number(value).toLocaleString();
    }
    return String(value);
  };
  const getRoundCount = (game) => {
    return game.roundCount || 0;
  };
  const handleGameClick = (gameId) => {
    const selectedGame = historyData.games.find((game) => game.id === gameId);
    if (selectedGame) {
      setSelectedGameData(selectedGame);
      setShowGameSummary(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BaseModal, { title: "Player Stats", onClose, style: { maxWidth: 800, height: "90ßvh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingsContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.tabsContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$1.tabButton} ${activeTab === "leaderboard" ? styles$1.activeTab : ""}`,
            onClick: () => setActiveTab("leaderboard"),
            "data-gamepad-focusable": "true",
            children: "Leaderboard"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$1.tabButton} ${activeTab === "stats" ? styles$1.activeTab : ""}`,
            onClick: () => setActiveTab("stats"),
            "data-gamepad-focusable": "true",
            children: "Lifetime Stats"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: `${styles$1.tabButton} ${activeTab === "history" ? styles$1.activeTab : ""}`,
            onClick: () => setActiveTab("history"),
            "data-gamepad-focusable": "true",
            children: "Game History"
          }
        )
      ] }),
      activeTab === "leaderboard" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.tabContent, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Leaderboard, {}) }),
      activeTab === "stats" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.tabContent, children: statsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.loadingMessage, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.loadingSpinner }),
        "Loading your lifetime stats..."
      ] }) : statsError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.errorMessage, children: [
        "Error: ",
        statsError
      ] }) : !lifetimeStats || lifetimeStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.statsPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No lifetime statistics available." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: styles$1.statsGrid,
          "data-gamepad-scrollable": "true",
          tabIndex: "0",
          children: lifetimeStats.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.statItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.statLabel, children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.statValue, children: [
              formatStatValue(stat.type, stat.value),
              stat.suffix && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles$1.statSuffix, children: stat.suffix })
            ] })
          ] }, stat.key || `stat-${index}`))
        }
      ) }),
      activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.tabContent, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.loadingMessage, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.loadingSpinner }),
        "Loading your game history..."
      ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.errorMessage, children: [
        "Error: ",
        error
      ] }) : historyData.games.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.statsPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No games found in your history." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: styles$1.historyTable,
            "data-gamepad-scrollable": "true",
            tabIndex: "0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.tableHeader, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.gameNameHeader, children: "Game" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.playerCountHeader, children: "Players" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.roundsHeader, children: "Rounds" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.endDateHeader, children: "Ended" })
              ] }),
              historyData.games.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.historyRow, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.gameNameCell, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: styles$1.gameNameLink,
                    onClick: () => handleGameClick(game.id),
                    tabIndex: "0",
                    role: "button",
                    "data-gamepad-focusable": "true",
                    children: [
                      "#",
                      game.id
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.playerCountCell, children: game.totalPlayerCount }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.roundsCell, children: getRoundCount(game) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles$1.endDateCell, children: formatDate(game.endedAt) })
              ] }, game.id))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles$1.pageInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handlePreviousPage,
              disabled: currentPage === 0,
              className: styles$1.pageButton,
              "aria-label": "Previous page",
              "data-gamepad-focusable": "true",
              children: "←"
            }
          ),
          "Page ",
          currentPage + 1,
          historyData.pagination && historyData.pagination.total ? ` of ${Math.ceil(historyData.pagination.total / pageSize)}` : "",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleNextPage,
              disabled: !historyData.pagination || historyData.games.length < pageSize,
              className: styles$1.pageButton,
              "aria-label": "Next page",
              "data-gamepad-focusable": "true",
              children: "→"
            }
          )
        ] })
      ] }) })
    ] }) }),
    showGameSummary && selectedGameData && /* @__PURE__ */ jsxRuntimeExports.jsx(
      GameSummaryModal,
      {
        gameData: selectedGameData,
        onClose: () => {
          setShowGameSummary(false);
          setSelectedGameData(null);
        }
      }
    )
  ] });
};

const PlayerStatsButton = ({ onModalStateChange, ...props }) => {
  const [isStatsOpen, setIsStatsOpen] = reactExports.useState(false);
  const openStats = () => {
    setIsStatsOpen(true);
  };
  const closeStats = () => {
    setIsStatsOpen(false);
  };
  reactExports.useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(isStatsOpen);
    }
  }, [isStatsOpen, onModalStateChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        onClick: openStats,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BarChartIcon, { color: "white", size: 20 }),
        "aria-label": "Open Player Stats",
        variant: "stats",
        title: "Player Stats",
        ...props
      }
    ),
    isStatsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerStatsModal, { isOpen: isStatsOpen, onClose: closeStats })
  ] });
};

const StoreIcon = ({ className = "h-6 w-6", ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.8,
      stroke: "currentColor",
      className,
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m-2.25 9h12a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-12a1.5 1.5 0 00-1.5 1.5v6a1.5 1.5 0 001.5 1.5z"
        }
      )
    }
  );
};

const StoreButton = ({ onClick, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IconButton,
    {
      onClick,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(StoreIcon, { style: { color: "white", width: 20, height: 20 } }),
      "aria-label": "Store",
      variant: "store",
      title: "Store",
      ...props
    }
  );
};

const QuestionIcon = ({ color = "currentColor", size = 24 }) => {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "17.01" })
      ]
    }
  );
};

const GameRulesModal = ({ onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    BaseModal,
    {
      title: "Game Rules",
      onClose,
      style: { maxWidth: 600 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Objective" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingDescription, children: 'The goal is to bet on whether the third card will have a value that falls "in between" the first two cards.' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Card Values" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingDescription, children: "Cards are valued numerically: 2-10 as face value, Jack = 11, Queen = 12, King = 13, and Ace = 1 or 14 (player's choice)." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Game Flow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingDescription, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { style: { paddingLeft: 20, margin: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Each player antes up to join the round." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The player to the right of the dealer goes first." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Two cards are dealt face up." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Player decides whether to bet or pass." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If a bet is placed, the third card is revealed." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Bets are settled." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Next player goes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "If the pot is empty, players ante up again to start a new round." })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Betting" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: baseModalStyles.settingDescription, children: [
            "If you think the third card will fall between the first two cards, you can bet up to the pot amount.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "If you win, you receive the amount of your bet from the pot.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "If you lose, your bet is added to the pot."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 22 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "POT Button" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingDescription, children: "The POT button allows you to bet the entire pot amount at once for maximum winnings." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Special Rules" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.settingDescription, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: { paddingLeft: 20, margin: 0 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ace Choice:" }),
              " If the first card is an Ace, you can choose to play it as low (1) or high (14)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Second Chance:" }),
              " If the first two cards are the same, you can chose to ante again to see another hand."
            ] })
          ] }) })
        ] })
      ]
    }
  );
};

const RulesButton = ({
  title = "View Game Rules",
  onModalStateChange,
  ...restProps
}) => {
  const [showRules, setShowRules] = reactExports.useState(false);
  const openRules = () => {
    setShowRules(true);
  };
  const closeRules = () => {
    setShowRules(false);
  };
  reactExports.useEffect(() => {
    if (onModalStateChange) {
      onModalStateChange(showRules);
    }
  }, [showRules, onModalStateChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IconButton,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionIcon, { color: "white", size: 20 }),
        title,
        onClick: openRules,
        variant: "default",
        ...restProps
      }
    ),
    showRules && /* @__PURE__ */ jsxRuntimeExports.jsx(GameRulesModal, { onClose: closeRules })
  ] });
};

const GamepadInput = ({
  type = "text",
  title = "",
  ...props
}) => {
  const inputRef = reactExports.useRef(null);
  const { enhanceInput } = useVirtualKeyboardContext();
  reactExports.useEffect(() => {
    if (inputRef.current) {
      const cleanup = enhanceInput(inputRef.current, type, title);
      return cleanup;
    }
  }, [enhanceInput, type, title]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref: inputRef,
      type,
      "data-gamepad-focusable": "true",
      ...props
    }
  );
};

const tabsContainer = "_tabsContainer_191ec_2";
const tabButton = "_tabButton_191ec_8";
const activeTab = "_activeTab_191ec_27";
const loadingSpinner = "_loadingSpinner_191ec_41";
const styles = {
	tabsContainer: tabsContainer,
	tabButton: tabButton,
	activeTab: activeTab,
	loadingSpinner: loadingSpinner};

class StoreService {
  constructor() {
    this.API_URL = "https://api.in-between.live";
    this.baseURL = `${this.API_URL}/purchases`;
  }
  /**
   * Get the authorization header for API requests
   * @returns {Object} Headers object with authorization
   */
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `Bearer ${token}` : ""
    };
  }
  /**
   * Get product offerings by type
   * @param {string} offeringType - Type of offering (e.g., 'coin')
   * @returns {Promise<Array>} Array of product offerings
   */
  async getOfferingsByType(offeringType) {
    try {
      const url = `${this.baseURL}/offerings?offeringType=${encodeURIComponent(offeringType)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch offerings`);
      }
      const data = await response.json();
      return data.offerings || [];
    } catch (error) {
      console.error("[PURCHASE_SERVICE] Error fetching offerings:", error);
      throw new Error(`Failed to fetch product offerings: ${error.message}`);
    }
  }
  /**
   * Get all available product offerings
   * @returns {Promise<Array>} Array of all product offerings
   */
  async getAllOfferings() {
    try {
      const response = await fetch(`${this.baseURL}/offerings`, {
        method: "GET",
        headers: this.getAuthHeaders(),
        credentials: "include"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch offerings`);
      }
      const data = await response.json();
      return data.offerings || [];
    } catch (error) {
      console.error("[PURCHASE_SERVICE] Error fetching all offerings:", error);
      throw new Error(`Failed to fetch product offerings: ${error.message}`);
    }
  }
  /**
   * Process a purchase
   * @param {string} productId - ID of the product to purchase
   * @returns {Promise<Object>} Purchase result
   */
  async processPurchase(productId) {
    try {
      if (!productId) {
        throw new Error("Product ID is required");
      }
      const response = await fetch(`${this.baseURL}/process`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        credentials: "include",
        body: JSON.stringify({ productId })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: Purchase failed`);
      }
      const result = await response.json();
      console.log("[PURCHASE_SERVICE] Purchase completed:", {
        productId,
        coinsAdded: result.coinsAdded,
        newBalance: result.newBalance
      });
      return result;
    } catch (error) {
      console.error("[PURCHASE_SERVICE] Error processing purchase:", error);
      throw new Error(`Purchase failed: ${error.message}`);
    }
  }
  /**
   * Get coin offerings specifically
   * @returns {Promise<Array>} Array of coin product offerings
   */
  async getCoinOfferings() {
    return this.getOfferingsByType("coin");
  }
}
const storeService = new StoreService();

const StoreModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = reactExports.useState("coins");
  const [coinOfferings, setCoinOfferings] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [purchasing, setPurchasing] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadCoinOfferings();
  }, []);
  const loadCoinOfferings = async () => {
    try {
      setLoading(true);
      setError(null);
      const offerings = await storeService.getCoinOfferings();
      setCoinOfferings(offerings);
    } catch (err) {
      console.error("Failed to load coin offerings:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handlePurchase = async (productId) => {
    try {
      setPurchasing(productId);
      setError(null);
      const result = await storeService.processPurchase(productId);
      console.log("Purchase successful:", result);
      onClose();
    } catch (err) {
      console.error("Purchase failed:", err);
      setError(err.message || "Purchase failed. Please try again.");
    } finally {
      setPurchasing(null);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price);
  };
  const formatCoins = (amount) => {
    return new Intl.NumberFormat("en-US").format(amount);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(BaseModal, { title: "Store", onClose, style: { maxWidth: 800, maxHeight: "80vh" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: "2rem", color: "#a0b9d6" }, children: "Loading products..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(BaseModal, { title: "Store", onClose, style: { maxWidth: 800, maxHeight: "80vh" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.tabsContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: `${styles.tabButton} ${activeTab === "coins" ? styles.activeTab : ""}`,
        onClick: () => setActiveTab("coins"),
        "data-gamepad-focusable": "true",
        children: "Coin Packs"
      }
    ) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      marginBottom: "1rem",
      padding: "0.75rem",
      backgroundColor: "rgba(231, 76, 60, 0.1)",
      border: "1px solid #e74c3c",
      borderRadius: "8px",
      color: "#ffb3b3"
    }, children: error }),
    activeTab === "coins" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: baseModalStyles.sectionHeader, children: "Available Coin Packs" }),
      coinOfferings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", padding: "2rem", color: "#a0b9d6" }, children: "No coin packs available at the moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
      }, children: coinOfferings.map((offering) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: baseModalStyles.settingItem,
          style: {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            padding: "1.5rem",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            minHeight: "280px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80px",
              marginBottom: "1rem"
            }, children: offering.imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: offering.imageUrl,
                alt: offering.name,
                style: {
                  width: "64px",
                  height: "64px",
                  objectFit: "contain"
                },
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginBottom: "1rem"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: {
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#FFD700",
                margin: "0 0 0.5rem 0",
                textAlign: "center"
              }, children: [
                formatCoins(offering.coinAmount),
                " Coins"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: {
                color: "#a0b9d6",
                fontSize: "0.875rem",
                margin: "0 0 0.75rem 0",
                textAlign: "center",
                lineHeight: "1.4"
              }, children: offering.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#bcdcff",
                textAlign: "center"
              }, children: formatPrice(offering.priceUSD) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => handlePurchase(offering.id),
                disabled: purchasing === offering.id,
                className: baseModalStyles.primaryButton,
                style: {
                  width: "100%",
                  opacity: purchasing === offering.id ? 0.6 : 1,
                  cursor: purchasing === offering.id ? "not-allowed" : "pointer"
                },
                "data-gamepad-focusable": "true",
                children: purchasing === offering.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { display: "flex", alignItems: "center", justifyContent: "center" }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.loadingSpinner, style: {
                    marginRight: "0.5rem"
                  } }),
                  "Processing..."
                ] }) : "Purchase"
              }
            )
          ]
        },
        offering.id
      )) })
    ] })
  ] });
};

export { CurrencyAmount as C, GamepadInput as G, IconButton as I, PlayerStatsButton as P, RulesButton as R, StoreButton as S, ToggleSwitch as T, UserAvatar as U, PreferencesButton as a, StoreModal as b, GameSummaryModal as c };
//# sourceMappingURL=StoreModal-CIOpBmpA.js.map
