import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import classNames from 'classnames';

export interface ShareableLingProps {
  url: string;
  label?: string;
  type?: string;
  width?: string;
  height?: string;
  id?: string;
}

const ShareableLink: React.FC<ShareableLingProps> = ({
  url,
  label,
  type,
  width,
  height,
  id
}: ShareableLingProps) => {
  const [copied, setCopied] = useState(false);
  const propStyle = {
    width,
    height
  };

  const handleCopy = (): void => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="mb-4">
      {label !== '' && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className="shadow appearance-none border rounded text-lg py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:shadow-outline"
        style={propStyle}
        value={url}
        readOnly
      />
      <CopyToClipboard text={url} onCopy={handleCopy}>
        <button
          className={classNames(
            'p-2 rounded-r-md',
            copied ? 'bg-green-500' : 'bg-gray-500 hover:bg-gray-600'
          )}
        >
          {copied
            ? (
            <span className="text-white">Copied!</span>
              )
            : (
            <>
              <FiCopy className="text-white" />
              <span className="sr-only">Copy link</span>
            </>
              )}
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default ShareableLink;
