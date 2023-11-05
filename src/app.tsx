import * as React from "react";
import { LayoutWrapper } from "./layout/layout-wrapper";
import { Header } from "./components/header/header-component";
import { Content } from "./components/content/content-component";

export const App = React.memo(() => (
	<LayoutWrapper>
		<Header />
		<Content />
	</LayoutWrapper>
));
