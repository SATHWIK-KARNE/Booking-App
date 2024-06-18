const apiDomain= process.env.NEXT_PUBLIC_API_DOMAIN || null;

// fetch all properties from mongodb using /api/properties  
// we're asking server(next api) for data from db

async function fetchProperties(){
  const timestamp = new Date().getTime();
  try {
    // when api domain is not available yet case: just return empty array meaning no properties
    if (!apiDomain) {
      return []; 
    }
    const res= await fetch(`${apiDomain}/properties?_=${timestamp}`); //this is from server
    if(!res.ok){
      throw new Error("failed to fetch data");
    }
    return res.json();
  } 
  catch (error) {
    console.log(error);
    return [];
  }
}

// fetch single property from db using server api /api/properties/:id using findById(db function)
async function fetchProperty(id){
  const timestamp = new Date().getTime();
  try {
    // when api domain is not available yet case: just return empty array meaning no properties
    if (!apiDomain) {
      return null; 
    }
    const res= await fetch(`${apiDomain}/properties/${id}?_=${timestamp}`); //this is from server
    if(!res.ok){
      throw new Error("failed to fetch data");
    }
    return res.json();
  } 
  catch (error) {
    console.log(error);
    return null;
  }
}
export {fetchProperties,fetchProperty};