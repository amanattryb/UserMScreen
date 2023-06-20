type Prop = {
    user: any
    setStatus: any
}

const ActiveUser = ({ user, setStatus }: Prop) => {
    return (
        <div>
            <p>
                First Name: {user.firstName}{' '}
                <button onClick={() => setStatus(user._id, 'inactive')}>
                    <b>Set Inactive</b>
                </button>
            </p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default ActiveUser