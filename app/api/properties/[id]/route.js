import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from '@/utils/getSessionUser';

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

// DELETE /api/properties/:id =>delete single property
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;
    await connectDB();
    const property = await Property.findById(propertyId);

    if (!property) return new Response('Property Not Found', { status: 404 });

    // only property owner can perform delete operation
    if (property.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    await property.deleteOne(); //delete property

    return new Response('Property Deleted', {status: 200});
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};