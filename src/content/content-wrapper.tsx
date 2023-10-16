import * as React from "react";
import { useTabValidator } from "../hooks/use-tab-validator";

interface Props {
	children?: React.ReactNode;
}

export const ContentWrapper = React.memo<Props>(props => {
	const isYoutube = useTabValidator();
	return isYoutube ? props.children : null;
});
