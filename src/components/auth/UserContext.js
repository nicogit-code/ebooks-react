import React from 'react';

const UserContext = React.createContext({
    username: null,
    setUser: () => {},

    getUser: () => {}
    }
);

export default UserContext;