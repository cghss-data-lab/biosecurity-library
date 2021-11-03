"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceFill = exports.Network2D = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_force_graph_2d_1 = __importDefault(require("react-force-graph-2d"));
const shapeHelpers_1 = require("./shapeHelpers");
const internal_1 = require("../../internal");
const styled_components_1 = __importStar(require("styled-components"));
const utils_1 = require("../../utils");
const networkThemes_1 = require("../../networkThemes");
const NetworkContainer = styled_components_1.default.div `
  transition: opacity
    ${(props) => props.transitionDurationSec !== undefined
    ? props.transitionDurationSec
    : 0}s
    ease-in-out;
  display: ${(props) => (props.show ? "" : "none")};
  height: 100%;
  width: 100%;
`;
const Network2D = (_a) => {
    var { activeProj, show, graphData, hoveredNode, setHoveredNode, selectedNode, setSelectedNode, interactionSettings, theme = networkThemes_1.defaultTheme } = _a, props = __rest(_a, ["activeProj", "show", "graphData", "hoveredNode", "setHoveredNode", "selectedNode", "setSelectedNode", "interactionSettings", "theme"]);
    // track global scale when each frame is rendered to resize edges
    const [globalScaleState, setGlobalScaleState] = (0, react_1.useState)(1);
    // hide network container until warmup is done
    const [containerOpacity, setContainerOpacity] = (0, react_1.useState)(0);
    const defaultCooldownSec = 5;
    const [cooldownSec, setCooldownSec] = (0, react_1.useState)((props.cooldownTime || defaultCooldownSec * 1000) / 1000);
    // The size of the window
    const [size, setSize] = (0, react_1.useState)({ width: 0, height: 0 });
    /**
     * True if graph has already been rendered and settled once
     */
    const [initialized, setInitialized] = (0, react_1.useState)(false);
    // This function updates the state thus re-render components
    const resizeHandler = () => {
        if (containerRef.current !== null) {
            setSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        }
    };
    const networkRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    // get container size
    (0, react_1.useEffect)(() => {
        if (containerRef.current !== null) {
            setSize({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight,
            });
        }
    }, [containerRef]);
    // Zoom to fit nodes
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if (props.zoomToFitSettings !== undefined && networkRef.current !== null) {
            if (size.width !== 0 && size.height !== 0) {
                const initDelayMsecTmp = ((_a = props.zoomToFitSettings) === null || _a === void 0 ? void 0 : _a.initDelayMsec) !== undefined
                    ? (_b = props.zoomToFitSettings) === null || _b === void 0 ? void 0 : _b.initDelayMsec
                    : (cooldownSec / 2) * 1000;
                const initDelayMsec = initialized ? 0 : initDelayMsecTmp;
                if (initDelayMsec > 0)
                    setContainerOpacity(1);
                setTimeout(() => {
                    var _a, _b, _c, _d;
                    const durationMsec = ((_a = props.zoomToFitSettings) === null || _a === void 0 ? void 0 : _a.durationMsec) !== undefined
                        ? (_b = props.zoomToFitSettings) === null || _b === void 0 ? void 0 : _b.durationMsec
                        : 1000;
                    const paddingPx = ((_c = props.zoomToFitSettings) === null || _c === void 0 ? void 0 : _c.paddingPx) !== undefined
                        ? (_d = props.zoomToFitSettings) === null || _d === void 0 ? void 0 : _d.paddingPx
                        : 40;
                    networkRef.current.zoomToFit(durationMsec, paddingPx);
                    if (!initialized)
                        setInitialized(true);
                }, initDelayMsec);
            }
        }
        else {
            if (!initialized)
                setInitialized(true);
        }
    }, [size]);
    (0, react_1.useEffect)(() => {
        if (initialized && containerOpacity !== 1)
            setContainerOpacity(1);
    }, [containerOpacity, initialized]);
    // Listening for the window resize event
    (0, react_1.useEffect)(() => {
        if (typeof window !== undefined)
            window.addEventListener("resize", resizeHandler);
        return () => {
            if (typeof window !== undefined)
                window.removeEventListener("resize", resizeHandler);
        };
    }, []);
    // shape rendering parameters
    // TODO types
    const params = {
        nodeColor: (n) => n !== undefined && n._color !== undefined ? n._color : "#0D2449",
    };
    // update network map if settings are changed
    const settings = (0, react_1.useContext)(internal_1.SettingsContext);
    (0, react_1.useEffect)(() => {
        if (networkRef.current !== null) {
            if (settings.network.paused) {
                setCooldownSec(0);
                graphData.nodes.forEach((n) => {
                    n.fx = n.x;
                    n.fy = n.y;
                });
            }
            else {
                if (cooldownSec !== defaultCooldownSec)
                    setCooldownSec(defaultCooldownSec);
                const methods = networkRef.current;
                methods.d3ReheatSimulation();
            }
        }
    }, [cooldownSec, graphData.nodes, settings.network.paused]);
    (0, react_1.useEffect)(() => {
        if (networkRef.current !== null) {
            unanchorNodes(graphData);
        }
        // eslint-disable-next-line
    }, [getLinkHash(graphData.links)]);
    (0, react_1.useEffect)(() => {
        activeProj.selectedNode = selectedNode;
        activeProj.dataSources.forEach((ds) => ds.onNodeConfigUpdate());
    }, [activeProj, selectedNode]);
    /**
     * Sets the hovered node equal to the provided node's ID.
     * @param n Node information
     */
    const highlightHoveredNode = (n) => {
        if (n !== null)
            setHoveredNode(n._id);
        else
            setHoveredNode(null);
    };
    /**
     * Sets the clicked node equal to the provided node's ID.
     * @param n Node information
     */
    const selectClickedNode = (n) => {
        if (n !== null && n._id !== selectedNode)
            setSelectedNode(n._id);
        else
            setSelectedNode(null);
    };
    const getLinkColor = (linkInfo) => {
        const hoveredNodeIsPrimary = linkInfo.source._id === hoveredNode ||
            linkInfo.target._id === hoveredNode;
        if (hoveredNode !== null && !hoveredNodeIsPrimary)
            return "#C9C9C920";
        if (linkInfo.color !== undefined)
            return linkInfo.color;
        if (!settings.edges.showEdges) {
            return "#00000000";
        }
        else
            return "#C9C9C9";
    };
    const getHoveredNodePrimaryLinkNodes = (0, react_1.useCallback)(() => {
        const primaryLinks = graphData.links.filter((linkInfo) => {
            const isStruct = linkInfo.source._id !== undefined;
            if (isStruct)
                return (linkInfo.source._id === hoveredNode ||
                    linkInfo.target._id === hoveredNode);
            else
                return (linkInfo.source === hoveredNode || linkInfo.target === hoveredNode);
        });
        return [
            ...new Set(primaryLinks
                .map((linkInfo) => [linkInfo.source._id, linkInfo.target._id])
                .flat()),
        ];
    }, [graphData.links, hoveredNode]);
    /**
     * Add node labels after each frame is rendered.
     * @param ctx The canvas context
     * @param globalScale The global scale
     */
    const addNodeLabels = (ctx, globalScale) => {
        graphData.nodes.forEach((node) => {
            const isSelectedNode = selectedNode === node._id;
            if (node._showLabel || node._shape === "tri" || isSelectedNode) {
                const text = node._label || "Node";
                const fontSize = node._fontSize / globalScale;
                if (node._labelFont !== undefined) {
                    ctx.font = node._labelFont;
                }
                else if (node._labelFontWeight !== undefined) {
                    ctx.font = `${node._labelFontWeight} ${fontSize}px 'Open Sans'`;
                }
                else
                    ctx.font = `${fontSize}px 'Open Sans'`;
                ctx.textAlign = "center";
                const nodeLabelPos = node._labelPos || settings.nodes.labelPos;
                ctx.textBaseline = nodeLabelPos === "center" ? "middle" : "top";
                ctx.fillStyle = node._labelColor || theme.colors.text;
                // add half of icon height including global scale to text y pos
                const iconHeight = 5; // DEBUG
                const scaledIconHeight = iconHeight * 1;
                const gap = 1;
                const textYOffset = nodeLabelPos === "center" ? 0 : scaledIconHeight + gap;
                const textY = (node.y || 0) + textYOffset + (node._labelYOffset || 0);
                drawTextLabel(ctx, text, node, textY, fontSize, nodeLabelPos);
            }
        });
    };
    // JSX
    return ((0, jsx_runtime_1.jsx)(NetworkContainer, Object.assign({ style: Object.assign({ opacity: containerOpacity }, (props.containerStyle || {})), ref: containerRef }, { show }, { children: (0, jsx_runtime_1.jsx)(react_force_graph_2d_1.default, Object.assign({ ref: networkRef, width: size.width, height: size.height !== 0 ? size.height : undefined, cooldownTime: cooldownSec * 1000, onNodeDrag: () => {
                unanchorNodes(graphData);
            }, nodeVisibility: (n) => {
                return n._show;
            }, linkDirectionalArrowLength: 5, linkCurvature: 0.5, linkCurveRotation: 0, linkColor: getLinkColor, linkWidth: (a) => {
                return settings.edges.edgeWidth * a.value * globalScaleState;
            }, nodeLabel: "_label", nodeId: "_id", onNodeHover: highlightHoveredNode, onNodeRightClick: selectClickedNode, nodeCanvasObject: (node, ctx
            // globalScale: number
            ) => {
                const color = params.nodeColor(node);
                const notHoveredNode = hoveredNode !== null &&
                    hoveredNode !== node._id &&
                    !getHoveredNodePrimaryLinkNodes().includes(node._id);
                const isSelectedNode = selectedNode === node._id;
                const [currentNodeColor, currentNodeColorNoAlpha] = getCurrentNodeColor({ hovered: !notHoveredNode, selected: isSelectedNode }, color, settings);
                // TODO modularize image icons
                if (node._icon !== undefined)
                    node._icon = node._icon.trim();
                const usingImg = node._icon !== undefined && node._icon.startsWith("<svg");
                // add white circle frame to icons
                if (usingImg) {
                    ctx.fillStyle = node._backgroundColor || "#ffffff";
                    switch (node._backgroundShape) {
                        case "hexagon":
                            (0, shapeHelpers_1.asHexagon)(Object.assign(Object.assign({}, node), { _size: node._size *
                                    (node._backgroundSize !== undefined
                                        ? node._backgroundSize
                                        : 1) }), ctx);
                            break;
                        default:
                            (0, shapeHelpers_1.asCircle)(Object.assign(Object.assign({}, node), { _size: node._size *
                                    (node._backgroundSize !== undefined
                                        ? node._backgroundSize
                                        : 1) }), ctx);
                    }
                }
                ctx.fillStyle = currentNodeColor;
                if (usingImg) {
                    const img = new Image();
                    img.src =
                        "data:image/svg+xml;charset=utf-8," +
                            encodeURIComponent(replaceFill(node._icon, currentNodeColorNoAlpha));
                    ctx.save();
                    ctx.globalAlpha = notHoveredNode ? 0.2 : 1;
                    const ICON_SCALE_FACTOR = 0.4;
                    const iconWidth = img.width * ICON_SCALE_FACTOR;
                    const iconHeight = img.height * ICON_SCALE_FACTOR;
                    ctx.drawImage(img, node.x - iconWidth / 2, // paste to...
                    node.y - iconHeight / 2, iconWidth, iconHeight);
                    ctx.restore();
                }
                if (!usingImg) {
                    if (node._shape === "square")
                        (0, shapeHelpers_1.asRect)(node, color, ctx);
                    else if (node._shape === "tri")
                        (0, shapeHelpers_1.asTriangle)(node, color, ctx);
                    else
                        (0, shapeHelpers_1.asCircle)(node, ctx);
                }
            } }, props, { onRenderFramePre: (ctx, globalScale) => {
                if (props.onRenderFramePre !== undefined)
                    props.onRenderFramePre(ctx, globalScale);
                setGlobalScaleState(globalScale);
            }, onRenderFramePost: (ctx, globalScale) => {
                if (props.onRenderFramePost !== undefined)
                    props.onRenderFramePost(ctx, globalScale);
                addNodeLabels(ctx, globalScale);
            } }, Object.assign(Object.assign({ graphData: (0, react_1.useMemo)(() => {
                return {
                    nodes: graphData.nodes,
                    links: graphData.links,
                };
            }, [graphData]) }, params), interactionSettings)), void 0) }), void 0));
};
exports.Network2D = Network2D;
/**
 * Renders a text label for the give node.
 * @param ctx Canvas context
 * @param text Label text
 * @param node Node object with properties
 * @param textY Vertical text label offset
 * @param fontSize Font size in pixels
 * @param approxWordsPerLine Approx. number of words for each line, or Infinity
 */
function drawTextLabel(ctx, text, node, textY, fontSize, labelPos, approxWordsPerLine = 3) {
    if (approxWordsPerLine === Infinity)
        ctx.fillText(text, node.x || 0, textY);
    else {
        let toDraw = [];
        const words = text.split(" ");
        let lineNum = 0;
        while (words.length > 0) {
            const curWords = words.splice(0, approxWordsPerLine);
            const oneWordLeft = words.length === 1;
            if (oneWordLeft)
                curWords.push(words.pop() || "");
            toDraw.push({
                text: curWords.join(" "),
                x: node.x || 0,
                y: textY + fontSize * (lineNum + 0) * 1.2,
            });
            lineNum += 1;
        }
        if (labelPos === "center") {
            const spaceAdded = fontSize * (lineNum - 1) * 1.2;
            toDraw = toDraw.map((d) => {
                return Object.assign(Object.assign({}, d), { y: d.y - spaceAdded / 2 });
            });
        }
        toDraw.forEach(({ text, x, y }) => {
            ctx.fillText(text, x, y);
        });
    }
}
/**
 * Given the node's current state, returns the color it should be in the
 * current rendering of the network. Accounts for default node color and
 * current global settings.
 *
 * @param nodeState The node state, e.g., hovered, selected
 * @param color The default color
 * @param settings The current global settings
 * @returns The color (first element) and a version of it without alpha (the
 * second element)
 */
function getCurrentNodeColor(nodeState, color, settings) {
    if (!nodeState.hovered)
        return [color + "20", color];
    if (nodeState.selected)
        return [settings.nodes.selectedColor, settings.nodes.selectedColor];
    return [color, color];
}
function unanchorNodes(graphData) {
    graphData.nodes.forEach((n) => {
        n.fx = undefined;
        n.fy = undefined;
    });
}
/**
 * Create unique hash string representing the links. Used to trigger network
 * map reheat if links are changed.
 * @param links The links
 * @returns A unique has
 */
const getLinkHash = (links) => {
    const hash = links
        .sort((0, utils_1.sortObjectsBy)("value"))
        .sort((0, utils_1.sortObjectsBy)("target"))
        .sort((0, utils_1.sortObjectsBy)("source"))
        .map((l) => {
        if (l.source._id !== undefined)
            return `${l.source._id}__${l.target._id}__${l.value}`;
        return `${l.source}__${l.target}__${l.value}`;
    })
        .join("_");
    return hash;
};
// replace the fill and stroke colors on all child
// elements of the SVG; but only if those elements
// already have a fill or stroke set.
function replaceFill(svg, color) {
    // TODO refactor function
    // this uses node-html-parser instead of native DOM
    // so that it will support server-side-rendering.
    if (!svg.startsWith("<svg")) {
        throw new Error("The string `svg` doesn't appear to be an svg," +
            " please check and try again.");
    }
    const svgDom = new DOMParser().parseFromString(svg, "image/svg+xml");
    const svgElement = svgDom.querySelector("svg");
    const children = svgElement.childNodes;
    for (let child of children) {
        // note this is the node-html-parser implementation
        // of the HTMLElement class, not a native HTMLElement
        if (child instanceof SVGElement) {
            if (child.hasAttribute("fill"))
                child.setAttribute("fill", color);
            if (child.hasAttribute("stroke"))
                child.setAttribute("stroke", color);
        }
    }
    return svgElement.outerHTML;
}
exports.replaceFill = replaceFill;
exports.default = (0, styled_components_1.withTheme)(exports.Network2D);
//# sourceMappingURL=Network2D.js.map