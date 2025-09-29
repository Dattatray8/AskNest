import { Bot, Copy, CheckCircle } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { formatTimestamp } from "../utils/formatTimeStamp";

function AiResponse({ message }) {
  const sender = useRef();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    sender.current?.scrollIntoView({ behavior: "smooth" });
  }, [message?.message]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message?.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const components = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <div className="my-4">
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            className="!m-0 !p-4 rounded-lg text-sm overflow-x-auto"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-red-600 dark:text-red-400"
          {...props}
        >
          {children}
        </code>
      );
    },

    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4 mt-6 text-gray-900 dark:text-white first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mb-3 mt-5 text-gray-900 dark:text-white first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mb-2 mt-4 text-gray-900 dark:text-white first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-bold mb-2 mt-3 text-gray-900 dark:text-white first:mt-0">
        {children}
      </h4>
    ),

    p: ({ children }) => (
      <p className="mb-4 text-gray-800 dark:text-gray-200 leading-relaxed first:mt-0">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-800 dark:text-gray-200">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-800 dark:text-gray-200">
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,

    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),

    hr: () => <hr className="my-6 border-gray-300 dark:border-gray-600" />,

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 italic">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-left font-semibold text-gray-900 dark:text-white">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-800 dark:text-gray-200">
        {children}
      </td>
    ),
  };

  return (
    <div className="w-[95%] self-start sm:pl-4 pl-2 mb-4" ref={sender}>
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <Bot />
        </div>

        <div className="chat-header flex items-center gap-2 mb-1">
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            AI Assistant
          </span>
          <button
            onClick={copyToClipboard}
            className="btn btn-ghost btn-xs opacity-60 hover:opacity-100 transition-opacity"
            title="Copy response"
          >
            {copied ? (
              <CheckCircle className="w-3 h-3 text-green-500" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
          </button>
        </div>

        <div className="chat-bubble bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-700">
          <ReactMarkdown components={components}>
            {message?.message}
          </ReactMarkdown>
        </div>

        <div className="chat-footer opacity-60 text-xs mt-1">
          {formatTimestamp(message?.createdAt)}
        </div>
      </div>
    </div>
  );
}

export default AiResponse;
