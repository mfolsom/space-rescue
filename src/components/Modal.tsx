import React, { useState } from 'react';

const Modal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <button onClick={toggleModal}>Open Modalzzz</button>

            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%',
                        height: '50%',
                        backgroundColor: 'pink',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <button
                        onClick={toggleModal}
                        style={{
                            alignSelf: 'flex-end',
                            padding: '5px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                        }}
                    >
                        Close
                    </button>
                    <div style={{ flex: 1, padding: '20px' }}>
                        <p>Hello World</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
