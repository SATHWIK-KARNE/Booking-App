import React from "react";
// import properties from "@/properties.json";
import PropertyCard from "@/components/PropertyCard";
// import useSWR from 'next/swr';

// /api/properties will fetch data from mongodb and show as response
// here we fetch that response data to show properties in /properties page

async function fetchProperties(){
  try {
    const timestamp = new Date().getTime();
    const res= await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties?_=${timestamp}`); //this is from server
    if(!res.ok){
      throw new Error("failed to fetch data");
    }
    return res.json();
  } 
  catch (error) {
    console.log(error);
  }
}

const PropertiesPage = async ()  => {
  const properties= await fetchProperties();
  properties.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt));
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length == 0 ? (
          <p>No Properties Found </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property}/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
