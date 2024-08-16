"use client"

import PropertyCard from "@/components/PropertyCard"
import Spinner from "@/components/Spinner"
import { useState,useEffect} from "react"
import { toast } from "react-toastify"


//this is to show all bookmarked properties of user in /properties/saved 
const SavedPropertyPage = () => {
  const [savedProperties, setSavedProperties]=useState([]);
  const [loading, setLoading] = useState(true);

  // /api/bookmarks has all bookmarks of current user. 
  // fetch them all and create cards for each saved property
  useEffect(() => {
    const fetchSavedProperty = async () => {
      try {
        const res= await fetch('/api/bookmarks');
        if(res.status===200){
          const data = await res.json();
          setSavedProperties(data);
        }
        else{
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      }
      finally{
        setLoading(false);
      }
    }

    fetchSavedProperty();
  }, []);

  // console.log(savedProperties);

  //to show card for each property=> same code from  properties/page.jsx to  show all properties
  return loading ? (<Spinner loading={loading} />) : (
    <section className="px-4 py-6">
      <h1 className="text-2xl mb-4"> Saved Properties</h1>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {savedProperties.length == 0 ? (
          <p>No Saved Properties </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SavedPropertyPage
