import * as React from "react";
import { ContentWrapper } from "./content/content-wrapper";
import { YoutubeView } from "./views/youtube/youtube-view";

export const App = React.memo(() => (
	<ContentWrapper>
		<YoutubeView />
	</ContentWrapper>
));
