import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import ActiveUser from './ActiveUser';
import Inactive from './InactiveUser';

interface Screen {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  customMessage?: string;
}

const MyForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Screen>({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    customMessage: '',
  });
  const [activeUsers, setActiveUsers] = useState<Screen[]>([]);
  const [inactiveUsers, setInactiveUsers] = useState<Screen[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
        alert('Form submitted');
        setFormData({
          _id: '',
          firstName: '',
          lastName: '',
          email: '',
          customMessage: '',
        });
        setShowForm(false);
        fetchSubmittedData();
      } else {
        console.error('Error submitting form data:', response.status);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleClick = () => {
    setShowForm(true);
  };

  useEffect(() => {
    fetchSubmittedData();
  }, []);

  const fetchSubmittedData = async () => {
    try {
      const responseActive = await fetch('http://localhost:3000/user/active');
      const responseInactive = await fetch('http://localhost:3000/user/inactive');

      if (responseActive.ok && responseInactive.ok) {
        const dataActive: Screen[] = await responseActive.json();
        const dataInactive: Screen[] = await responseInactive.json();
        setActiveUsers(dataActive);
        setInactiveUsers(dataInactive);
      } else {
        console.error('Error fetching submitted data');
      }
    } catch (error) {
      console.error('Error fetching submitted data:', error);
    }
  };

  const setStatus = async (userId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        console.log(`User status set to ${status} successfully!`);
        fetchSubmittedData();
      } else {
        console.error('Error setting user status:', response.status);
      }
    } catch (error) {
      console.error('Error setting user status:', error);
    }
  };

  return (

    <div className="main-container">

      <div className="form-div">
        {!showForm ? (
          <>
            <div>
              <button onClick={handleClick}>Invite</button>
            </div>

            {activeUsers.length > 0 && (
              <div>
                <h2>Active Users:</h2>
                {activeUsers.map((user) => (
                  <ActiveUser user={user} setStatus={setStatus} key={user._id} />
                ))}
              </div>
            )}
            {inactiveUsers.length > 0 && (
              <div>
                <h2>Inactive Users:</h2>
                {inactiveUsers.map((user) => (
                  <Inactive user={user} setStatus={setStatus} key={user._id} />

                ))}
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              id="fname"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              id="lname"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label htmlFor="message">Custom Message:</label>
            <textarea
              id="message"
              name="customMessage"
              value={formData.customMessage}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Invite</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyForm;
