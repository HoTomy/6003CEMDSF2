import { Col, Row, Spin, Select } from "antd";
import React, { useEffect, useState } from "react";

const Dogapi1 = () => {
  const [dogs, setDogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestDogs = async (value: string) => {
    const apiUrl = `https://dog.ceo/api/breed/${value}/images/random`;

    console.log(apiUrl);

    try {
      setIsLoading(true);

      const apiResponse = await fetch(apiUrl);
      const jsonResult = await apiResponse.json();

      // Logging for debugging
      console.log("dogs result", jsonResult);

      setDogs(jsonResult);
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    requestDogs("");
  }, []);

  const breedOptions = [
    { value: 'affenpinscher', label: 'Affenpinscher' },
    { value: 'african', label: 'African' },
    { value: 'airedale', label: 'Airedale' },
    { value: 'akita', label: 'Akita' },
    { value: 'appenzeller', label: 'Appenzeller' },
    { value: 'australian', label: 'Australian' },
    { value: 'basenji', label: 'Basenji' },
    { value: 'beagle', label: 'Beagle' },
    { value: 'bluetick', label: 'Bluetick' },
    { value: 'borzoi', label: 'Borzoi' },
    { value: 'bouvier', label: 'Bouvier' },
    { value: 'boxer', label: 'Boxer' },
    { value: 'brabancon', label: 'Brabancon' },
    { value: 'briard', label: 'Briard' },
    { value: 'buhund', label: 'Buhund' },
    { value: 'bulldog', label: 'Bulldog' },
    { value: 'bullterrier', label: 'Bullterrier' },
    { value: 'cattledog', label: 'Cattledog' },
    { value: 'chihuahua', label: 'Chihuahua' },
    { value: 'chow', label: 'Chow' },
    { value: 'clumber', label: 'Clumber' },
    { value: 'cockapoo', label: 'Cockapoo' },
    { value: 'collie', label: 'Collie' },
    { value: 'coonhound', label: 'Coonhound' },
    { value: 'corgi', label: 'Corgi' },
    { value: 'cotondetulear', label: 'Cotondetulear' },
    { value: 'dachshund', label: 'Dachshund' },
    { value: 'dalmatian', label: 'Dalmatian' },
    { value: 'dane', label: 'Dane' },
    { value: 'deerhound', label: 'Deerhound' },
    { value: 'dhole', label: 'Dhole' },
    { value: 'dingo', label: 'Dingo' },
    { value: 'doberman', label: 'Doberman' },
    { value: 'elkhound', label: 'Elkhound' },
    { value: 'entlebucher', label: 'Entlebucher' },
    { value: 'eskimo', label: 'Eskimo' },
    { value: 'finnish', label: 'Finnish' },
    { value: 'frise', label: 'Frise' },
    { value: 'germanshepherd', label: 'German Shepherd' },
    { value: 'greyhound', label: 'Greyhound' },
    { value: 'groenendael', label: 'Groenendael' },
    { value: 'havanese', label: 'Havanese' },
    { value: 'hound', label: 'Hound' },
    { value: 'husky', label: 'Husky' },
    { value: 'keeshond', label: 'Keeshond' },
    { value: 'kelpie', label: 'Kelpie' },
    { value: 'komondor', label: 'Komondor' },
    { value: 'kuvasz', label: 'Kuvasz' },
    { value: 'labradoodle', label: 'Labradoodle' },
    { value: 'labrador', label: 'Labrador' },
    { value: 'leonberg', label: 'Leonberg' },
    { value: 'lhasa', label: 'Lhasa' },
    { value: 'malamute', label: 'Malamute' },
    { value: 'malinois', label: 'Malinois' },
    { value: 'maltese', label: 'Maltese' },
    { value: 'mastiff', label: 'Mastiff' },
    { value: 'mexicanhairless', label: 'Mexican Hairless' },
    { value: 'mix', label: 'Mix' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'newfoundland', label: 'Newfoundland' },
    {value: 'otterhound', label: 'Otterhound'},
    {value: 'ovcharka', label: 'Ovcharka'},
    {value: 'papillon', label: 'Papillon'},
    {value: 'pekinese', label: 'Pekinese'},
    {value: 'pembroke', label: 'Pembroke'},
    {value: 'pinscher', label: 'Pinscher'},
    {value: 'pitbull', label: 'Pitbull'},
    {value: 'pointer', label: 'Pointer'},
    {value: 'pomeranian', label: 'Pomeranian'},
    {value: 'poodle', label: 'Poodle'},
    {value: 'pug', label: 'Pug'},
    {value: 'puggle', label: 'Puggle'},
    {value: 'pyrenees', label: 'Pyrenees'},
    {value: 'redbone', label: 'Redbone'},
    {value: 'retriever', label: 'Retriever'},
    {value: 'ridgeback', label: 'Ridgeback'},
    {value: 'rottweiler', label: 'Rottweiler'},
    {value: 'saluki', label: 'Saluki'},
    {value: 'samoyed', label: 'Samoyed'},
    {value: 'schipperke', label: 'Schipperke'},
    {value: 'schnauzer', label: 'Schnauzer'},
    {value: 'segugio', label: 'Segugio'},
    {value: 'setter', label: 'Setter'},
    {value: 'sharpei', label: 'Sharpei'},
    {value: 'sheepdog', label: 'Sheepdog'},
    {value: 'shiba', label: 'Shiba'},
    {value: 'shihtzu', label: 'Shihtzu'},
    {value: 'spaniel', label: 'Spaniel'},
    {value: 'spitz', label: 'Spitz'},
    {value: 'springer', label: 'Springer'},
    {value: 'stbernard', label: 'Stbernard'},
    {value: 'terrier', label: 'Terrier'},
    {value: 'tervuren', label: 'Tervuren'},
    {value: 'vizsla', label: 'Vizsla'},
    {value: 'waterdog', label: 'Waterdog'},
    {value: 'weimaraner', label: 'Weimaraner'},
    {value: 'whippet', label: 'Whippet'},
    {value: 'wolfhound', label: 'Wolfhound'},

  ];

  return (
    <>
      <h3>Please select the Dog Breed</h3>
      <Select
        defaultValue=""
        style={{ width: 600 }}
        onChange={requestDogs}
        options={breedOptions}
      />

      <Row className="justify-content-center">
        {isLoading ? (
          <Spin/>
        ) : dogs ? (
          <>
            {Object.values(dogs).map((dog) => (
              <Col key={dog.id}>
                <img src={dog} alt="Dog" width={400} height={400} />
              </Col>
            ))}
          </>
        ) : (
          <h3>Impossible to retrieve dogs</h3>
        )}
      </Row>
      <h4>
        This uses the famous 'Dogs as a Service' (DaaS) API to access dog images from the Stanford University Dogs Dataset.
      </h4>
    </>
  );
};

export default Dogapi1;