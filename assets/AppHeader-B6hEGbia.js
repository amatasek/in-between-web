import { r as reactExports, j as jsxRuntimeExports } from './react-D-xSlSIM.js';
import { e as useVirtualKeyboardContext } from './index-B_3z-Zzg.js';
import { b as TextField } from './mui-CG7ta6LR.js';

const GamepadTextField = ({
  type = "text",
  title = "",
  inputProps = {},
  ...props
}) => {
  const textFieldRef = reactExports.useRef(null);
  const { enhanceInput } = useVirtualKeyboardContext();
  reactExports.useEffect(() => {
    if (textFieldRef.current) {
      const cleanup = enhanceInput(textFieldRef.current, type, title);
      return cleanup;
    }
  }, [enhanceInput, type, title]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TextField,
    {
      ref: textFieldRef,
      type,
      inputProps: {
        ...inputProps,
        "data-gamepad-focusable": "true"
      },
      ...props
    }
  );
};

const headerContainer = "_headerContainer_7pggh_1";
const gameTitle = "_gameTitle_7pggh_12";
const liveTag = "_liveTag_7pggh_25";
const styles = {
	headerContainer: headerContainer,
	gameTitle: gameTitle,
	liveTag: liveTag
};

const AppHeader = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.headerContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: styles.gameTitle, children: [
    "In Between ",
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.liveTag, children: "LIVE" })
  ] }) });
};

export { AppHeader as A, GamepadTextField as G };
//# sourceMappingURL=AppHeader-B6hEGbia.js.map
