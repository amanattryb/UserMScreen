import React, { useEffect, useState } from 'react';

interface ret {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  customMessage: string;
}

const Get: React.FC = () => {
  const [retData, setRetData] = useState<ret[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/ret', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRetData(data);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {retData.map((item) => (
        <div key={item.id}>
          <p>{item.firstName}</p>
          <p>{item.lastName}</p>
          <p>{item.email}</p>
          <p>{item.customMessage}</p>
        </div>
      ))}
    </div>
  );
};

export default Get;
