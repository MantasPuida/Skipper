import * as React from "react";
import { ContentWrapper } from "./content-wrapper";

export const Content = React.memo(() => {
	const extensionContent = "Extension Content";
	return <ContentWrapper>{extensionContent}</ContentWrapper>;
});
