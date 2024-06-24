import connectDB from "@/config/database";
import Property from "@/models/Property";



// GET /api/properties/user/:userId => to get all properties of this user from db
export const GET = async (request,{params}) => {
  try {
    await connectDB();
    const userId= params.userId; //here .userId used instead of .id cuz folder name of user is userId and not id

    if(!userId) return new Response("UserId is required", { status: 400 });

    const properties= await Property.find({owner:userId});
    return new Response(JSON.stringify(properties), { status: 200 });
  }
   catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
