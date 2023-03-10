/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.scss';
import { withErrorBoundary } from 'react-error-boundary';
import { Success } from './components/Success';
import { Users } from './components/Users';

// import { Skeleton } from './Skeleton';

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = React.useState([]);
    const [invites, setInvites] = React.useState([]);
    const [isLoading, setLoading] = React.useState(true);
    const [searchValue, setSearchValue] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [notFound, setNotFound] = React.useState(false);

    React.useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res) => res.json())
            .then((json) => {
                setUsers(json.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onClickSendInvites = () => {
        setSuccess(true);
    };

    const onChangeNotFound = () => {
        setNotFound(true);
    };

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites((prev) => prev.filter((_id) => _id !== id));
        } else {
            setInvites((prev) => [...prev, id]);
        }
    };

    return (
        <div className="App">
            {success ? (
                <Success count={invites.length} />
            ) : (
                <Users
                    notFound={notFound}
                    onChangeNotFound={onChangeNotFound}
                    count={invites.length}
                    onChangeSearchValue={onChangeSearchValue}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    onClickInvite={onClickInvite}
                    invites={invites}
                    onClickSendInvites={onClickSendInvites}
                />
            )}
        </div>
    );
}

export default withErrorBoundary(App, {
    fallbackRender: (Error) => <div>Error {Error}</div>,
});
