/// <reference path="FixMyMarkdown.d.ts" />

import React, { useEffect } from "react";
import Markdown from "react-markdown";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";

function MyMarkdown({ source }: { source: string }) {
    useEffect(() => {
        document.querySelectorAll("pre code").forEach((block) => {
            hljs.highlightBlock(block);
        });
    }, []);

    return (
        <div
            className="markdown-body entry-content"
            style={{
                padding: 24
            }}
        >
            <Markdown escapeHtml={false} source={source} />
        </div>
    );
}

export default MyMarkdown;
