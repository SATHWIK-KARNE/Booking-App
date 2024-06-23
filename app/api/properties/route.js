import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


// GET /api/properties => to get all properties from db
export const GET = async (request) => {
  try {
    await connectDB();
    const properties= await Property.find({});
    return new Response(JSON.stringify(properties), { status: 200 });
  }
   catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};


export const POST= async (request)=>{
  try {
    await connectDB();
    // whenever we need to get loggedIn user we just call getSessionUser()
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }
    const { userId } = sessionUser;
    const formData= await request.formData();
    
    // get all values from amenities and images
    const amenities= formData.getAll("amenities");
    const images= formData.getAll("images").filter((image)=>image.name!=='');

    // create property data object for db
    const propertyData = {
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
          street: formData.get('location.street'),
          city: formData.get('location.city'),
          state: formData.get('location.state'),
          zipcode: formData.get('location.zipcode'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
          weekly: formData.get('rates.weekly'),
          monthly: formData.get('rates.monthly'),
          nightly: formData.get('rates.nightly'),
        },
        seller_info: {
          name: formData.get('seller_info.name'),
          email: formData.get('seller_info.email'),
          phone: formData.get('seller_info.phone'),
        },
        owner: userId,
        
    };
    // cloudinary and image handling notes.txt=>point 11
    // upload images to cloudinary
    const imageUploadPromises = [];
    // images comes from formData submitted inside form
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');

      // Make request to upload to Cloudinary. this format can be uploaded to cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: 'Rental Booking App',
        }
      );

      imageUploadPromises.push(result.secure_url);//this gives URL's

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the propertyData object. By this object images URL's gets uploaded to DB.
      propertyData.images = uploadedImages;
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    // created new property and redirected to it
    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
    // return new Response(JSON.stringify({Message:"Success"}),{status:200});
  }
  catch(error){
    return new Response("Failed to add property",{status:500});
  }
}
