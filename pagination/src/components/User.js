import React from 'react';

const User = ({name, avatar, url}) => {
    return (
        <div className="card">
            <img src={avatar} alt={name} />
            <p>{name}</p>
            <button className="linkBtn"><a href={url}>VIEW PROFILE</a></button>
        </div>
    );
};

export default User;