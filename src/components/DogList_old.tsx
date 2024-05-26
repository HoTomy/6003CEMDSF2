    import React from 'react';
    import { api } from './common/http-common';
    import axios from 'axios';

    const Dog = () => {
      const [dogs, setDogs] = React.useState([]);

      React.useEffect(() => {
        axios.get(`${api.uri}/dogs`)
          .then((res) => {
            console.log(res.data); // Log the data to see what is being returned by the API
            setDogs(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      return (
        <div>
              <h2>adfasf </h2>

            
          )
        </div>
      );
    }

    export default Dog;