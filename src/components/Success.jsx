import React from 'react';

export function Success({ count }) {
    return (
        <div className="success-block">
            <img src="/assets/success.svg" alt="Success" className="success-img" />
            <h3 className="success-title">Успешно!</h3>
            <p className="success-description">
                Всем {count} пользователям отправлено приглашение.
            </p>
            <button onClick={() => window.location.reload()} className="send-invite-btn">
                Назад
            </button>
        </div>
    );
}
