import { Link } from "react-router-dom";
import propTypes from "prop-types";

/**
 * 
 * @param {*} props 
 * @returns parsing to component used
 */

const Button = (props) => {
    const className = [props.className];
    if (props.isPrimary) className.push("btn-primary");
    if (props.isLight) className.push("btn-light");
    if (props.isLarge) className.push("btn-lg");
    if (props.isSmall) className.push("btn-sm");
    if (props.isBlock) className.push("btn-block");
    if (props.hasShadow) className.push("btn-shadow");

    const onClick = () => {
        if (props.onClick) props.onClick();
    };

    if (props.isDisabled || props.isLoading) {
        if (props.isDisabled) className.push("disabled");
        return (
            <div className={className.join(" ")} style={props.style}>
                {props.isLoading ? (
                    <>
                        <div className="spinner-border spinner-border-sm" style={{ margin: '0' }}>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </>
                ) : (
                    props.children
                )}
            </div>
        );
    }

    if (props.type === "link") {
        if (props.isExternal) {
            return (
                // eslint-disable-next-line react/jsx-no-target-blank
                <a
                    href={props.href}
                    className={className.join(" ")}
                    style={props.style}
                    target={props.target === "_blank" ? "_blank" : undefined}
                    rel={props.target === "_blank" ? "noopener noreferrer" : undefined}
                >
                    {props.children}
                </a>
            );
        } else {
            return (
                <Link
                    to={props.href}
                    className={className.join(" ")}
                    style={props.style}
                    onClick={onClick}
                >
                    {props.children}
                </Link>
            );
        }
    }

    return (
        <button
            className={className.join(" ")}
            style={props.style}
            onClick={onClick}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    type: propTypes.oneOf(["button", "link"]),
    onClick: propTypes.func,
    href: propTypes.string,
    target: propTypes.string,
    className: propTypes.string,
    isPrimary: propTypes.bool,
    isLight: propTypes.bool,
    isExternal: propTypes.bool,
    isDisabled: propTypes.bool,
    isLoading: propTypes.bool,
    isSmall: propTypes.bool,
    isLarge: propTypes.bool,
    isBlock: propTypes.bool,
    hasShadow: propTypes.bool,
};

export default Button;