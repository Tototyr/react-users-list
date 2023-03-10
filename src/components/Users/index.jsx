/* eslint-disable consistent-return */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export function Users({
    id,
    items,
    isLoading,
    searchValue,
    onChangeSearchValue,
    invites,
    onClickInvite,
    onClickSendInvites,
    count,
    notFound,
    onChangeNotFound,
    setNotFound,
}) {
    // console.log(.length);
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

            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <ul className="user-list">
                    {items
                        .filter((obj) => {
                            const fullName = (
                                obj.first_name +
                                obj.last_name +
                                obj.email
                            ).toLowerCase();

                            if (!fullName.includes(searchValue)) {
                                // return console.log('ff');
                            }
                            return fullName.toLowerCase().includes(searchValue);

                            // if (fullName.includes(searchValue) || obj.email.includes(searchValue)) {
                            //     return fullName || obj.email;
                            // }
                            // return console.log('wrong');

                            // return (
                            //     fullName.includes(searchValue) || obj.email.includes(searchValue)
                            // );
                        })

                        .map((obj) => (
                            <User
                                isInvited={invites.includes(obj.id)}
                                key={obj.id}
                                {...obj}
                                onClickInvite={onClickInvite}
                            />
                        ))}
                </ul>
            )}

            {invites.length > 0 && (
                <button onClick={onClickSendInvites} className="send-invite-btn">
                    Отправить приглашение {count} пользователям
                </button>
            )}
        </>
    );
}
