import React, { Fragment } from 'react';
import { type ModalProps } from '../../utils';

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  className = ''
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      <div className="fixed z-10 inset-0  overflow-hidden fixed">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <div
            className={className}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="max-h-screen overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Modal.defaultProps = {
  className:
    'inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:my-8 lg:align-middle w-2/4'
};

export default Modal;
