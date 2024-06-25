"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import PropertyDetails from "@/components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";

import Spinner from "@/components/Spinner";
import { SP } from "next/dist/shared/lib/utils";
import PropertyImages from "@/components/PropertyImages";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertyContactForm";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  // if we are fetching from client we should have loading state also
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // to call fetchProperty we need async f(n) but useEffect can't be async. so create new f(n)
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        // to get property data=>  calling /api/properties/:id(fetchProperty)
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error("error fetching property!", error);
      } finally {
        setLoading(false);
      }
    };
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center  text-xl"
              >
                <FaArrowLeft className="mr-2" />
                Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4 mt-4">
                  <BookmarkButton property={property}/>
                  <ShareButtons property={property}/>
              
                  {/* <!-- Contact Form --> */}
                  <PropertyContactForm property={property}/>
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
