import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';
import { fullName } from '../../lib/getUserFullName';

export function Users({
    items,
    isLoading,
    searchValue,
    onChangeSearchValue,
    invites,
    onClickInvite,
    onClickSendInvites,
    count,
    error,
}) {
    const filteredUsers = items.filter((users) => {
        return fullName(users).includes(searchValue.toLowerCase());
    });

    const userList = filteredUsers.map((users) => (
        <User
            key={users.id}
            {...users}
            isInvited={invites.includes(users.id)}
            onClickInvite={onClickInvite}
        />
    ));

    let content = null;
    if (isLoading) {
        content = (
            <div className="skeleton-list">
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        );
    } else if (error) {
        content = <div className="error-message">Произошла ошибка: {error}</div>;
    } else if (userList.length === 0) {
        content = <div className="user-list--not_found">Ничего не найдено</div>;
    } else {
        content = <ul className="user-list">{userList}</ul>;
    }

    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="search-icon">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    type="text"
                    placeholder="Найти пользователя..."
                    className="serach-input"
                />
            </div>

            {content}

            {invites.length > 0 && (
                <button onClick={onClickSendInvites} className="send-invite-btn">
                    Отправить приглашение {count} пользователям
                </button>
            )}
        </>
    );
}
