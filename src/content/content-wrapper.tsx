import * as React from "react";

interface Props {
	children?: React.ReactNode;
}

export const ContentWrapper = React.memo<Props>(props => props.children);
