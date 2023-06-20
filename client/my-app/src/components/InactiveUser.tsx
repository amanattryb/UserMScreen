import React from 'react'

type Prop = {
    user: any
    setStatus: any
}

const Inactive = ({ user, setStatus }: Prop) => {
    return (
        <div>
            <p className="form-nav">Invite Member</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => setStatus(user._id, 'active')}>
                <b>Set active</b>
            </button>
        </div>
    )
}

export default Inactive