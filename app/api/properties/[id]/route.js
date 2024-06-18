import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET /api/properties/:id will fetch single property data from db using findById 
export const GET = async (request,{params}) => {
  try {
    await connectDB();
    const singleProperty= await Property.findById(params.id);
    if(!singleProperty) return new Response('Property not found!',{status:404});
    return new Response(JSON.stringify(singleProperty), { status: 200 });
  }
   catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
