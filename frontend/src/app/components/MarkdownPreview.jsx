"use client";
import { marked } from "marked";

export default function MarkdownPreview({ content }) {
    return (
        <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: marked.parse(content || '') }}
        />
    );
}