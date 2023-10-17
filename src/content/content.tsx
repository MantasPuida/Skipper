import * as React from "react";
import { ContentWrapper } from "./content-wrapper";
import { YoutubeView } from "../views/youtube/youtube-view";

export const Content = React.memo(() => (
	<ContentWrapper>
		<YoutubeView />
	</ContentWrapper>
));
