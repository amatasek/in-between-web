import { r as reactExports, j as jsxRuntimeExports, u as useNavigate } from './react-D-xSlSIM.js';
import { G as GamepadTextField, A as AppHeader } from './AppHeader-B6hEGbia.js';
import { u as useMediaQuery, P as Paper, T as Typography, A as Alert, B as Button, a as Box } from './mui-CG7ta6LR.js';
import { u as useAuth, A as API_URL } from './index-B_3z-Zzg.js';
import { u as useGamepadNavigation } from './useGamepadNavigation-BcjfaxZ8.js';
import './vendor-B9LcgdhK.js';
import './socket-KU1mICmt.js';

const authForm = "_authForm_121ec_1";
const submitButton = "_submitButton_121ec_99";
const styles$1 = {
	authForm: authForm,
	submitButton: submitButton
};

const AuthForm = ({ onSubmit, mode }) => {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  useMediaQuery("(max-width:600px)");
  const isSmallMobile = useMediaQuery("(max-width:400px)");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit(username, password);
    } catch (err) {
      setError(err.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { className: styles$1.authForm, elevation: 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { variant: "h5", component: "h2", gutterBottom: true, sx: { color: "var(--info)", fontWeight: 600 }, children: mode === "login" ? "Welcome Back" : "Create Account" }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { severity: "error", sx: { mb: 2, backgroundColor: "rgba(231, 76, 60, 0.2)", color: "var(--text-primary)" }, children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GamepadTextField,
        {
          title: "Enter Username",
          label: "Username",
          variant: "outlined",
          fullWidth: true,
          margin: "normal",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          required: true,
          size: isSmallMobile ? "small" : "medium",
          inputProps: { minLength: 3 },
          sx: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--info-light)"
              },
              "&:hover fieldset": {
                borderColor: "var(--info)"
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--info)"
              },
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            },
            "& .MuiInputLabel-root": {
              color: "var(--info-light)",
              fontSize: isSmallMobile ? "0.9rem" : "1rem"
            },
            "& .MuiOutlinedInput-input": {
              color: "var(--text-dark)",
              fontWeight: 500,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: isSmallMobile ? "12px 14px" : "16.5px 14px"
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--info)"
            },
            marginBottom: isSmallMobile ? "0.5rem" : "1rem"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        GamepadTextField,
        {
          title: "Enter Password",
          label: "Password",
          type: "password",
          variant: "outlined",
          fullWidth: true,
          margin: "normal",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          required: true,
          size: isSmallMobile ? "small" : "medium",
          inputProps: { minLength: 6 },
          sx: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "var(--info-light)"
              },
              "&:hover fieldset": {
                borderColor: "var(--info)"
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--info)"
              },
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            },
            "& .MuiInputLabel-root": {
              color: "var(--info-light)",
              fontSize: isSmallMobile ? "0.9rem" : "1rem"
            },
            "& .MuiOutlinedInput-input": {
              color: "var(--text-dark)",
              fontWeight: 500,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: isSmallMobile ? "12px 14px" : "16.5px 14px"
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--info)"
            },
            marginBottom: isSmallMobile ? "0.5rem" : "1rem"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          variant: "contained",
          fullWidth: true,
          size: "large",
          className: styles$1.submitButton,
          "data-gamepad-focusable": "true",
          sx: {
            mt: isSmallMobile ? 2 : 3,
            background: "linear-gradient(to right, var(--info), var(--success))",
            textTransform: "none",
            fontWeight: "bold",
            letterSpacing: "0.5px",
            padding: isSmallMobile ? "10px" : "12px",
            fontSize: isSmallMobile ? "0.9rem" : "1rem",
            "&:hover": {
              background: "linear-gradient(to right, var(--info-dark), var(--success-dark))",
              boxShadow: "var(--shadow-lg)",
              transform: "translateY(-2px)"
            }
          },
          children: mode === "login" ? "Sign In" : "Create Account"
        }
      )
    ] })
  ] });
};

const authPage = "_authPage_1fizs_1";
const error = "_error_1fizs_40";
const formContainer = "_formContainer_1fizs_53";
const styles = {
	authPage: authPage,
	error: error,
	formContainer: formContainer};

const AuthPage = () => {
  const [mode, setMode] = reactExports.useState("login");
  const { login } = useAuth();
  const navigate = useNavigate();
  useGamepadNavigation(true);
  const [error, setError] = reactExports.useState(null);
  const handleAuth = async (username, password) => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setError(null);
    const endpoint = `${API_URL}/auth/${mode}`;
    try {
      const requestBody = { username, password };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(requestBody)
      });
      let data;
      try {
        data = await response.json();
      } catch (error2) {
        console.error("[Client] Error parsing response:", error2);
        throw new Error("Invalid response from server");
      }
      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }
      if (!data.user?.username || !data.user?.id || !data.token) {
        console.error("[Client] Invalid response format:", {
          hasUser: !!data.user,
          hasUsername: !!data.user?.username,
          hasId: !!data.user?.id,
          hasToken: !!data.token
        });
        throw new Error("Invalid server response format");
      }
      try {
        login(data.user, data.token);
        navigate("/");
      } catch (error2) {
        console.error("[Client] Error in login callback:", error2);
        throw new Error("Failed to initialize user session");
      }
    } catch (error2) {
      console.error("[Client] Auth error:", {
        message: error2.message,
        endpoint,
        mode
      });
      setError(error2.message || "Failed to connect to server");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { className: styles.authPage, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { className: styles.formContainer, children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(Typography, { className: styles.error, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AuthForm, { mode, onSubmit: handleAuth }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { textAlign: "center", mt: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "primary",
          onClick: () => setMode(mode === "login" ? "register" : "login"),
          "data-gamepad-focusable": "true",
          sx: {
            color: "#ecf0f1",
            textTransform: "none",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }
          },
          children: mode === "login" ? "Don't have an account? Register" : "Already have an account? Login"
        }
      ) })
    ] })
  ] });
};

export { AuthPage as default };
//# sourceMappingURL=AuthPage-BJdYI7Km.js.map
