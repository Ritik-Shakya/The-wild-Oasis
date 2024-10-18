import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    throw new Error("Cabin could not be deleted");
  }
}

//only to create cabins and uploading image to the bucket and in cabins table.
// export async function createCabin(cabin) {
//   const imageUrl = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageUrl}`;

//   //1. Creating the cabin and image in the cabins table as a path.
//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...cabin, image: imagePath }])
//     .select()
//     .single();
//   if (error) {
//     throw new Error("Cabin could not be deleted");
//   }

//   //2. Uploading file to the bucket
//   const { error: error2 } = await supabase.storage
//     .from("cabin-images")
//     .upload(`${imageUrl}`, cabin.image);

//   //3. If image is not uploaded we would want to delete the cabin itself which we can get hold of via data in 25 line.
//   if (error2) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     throw new Error("Image could not be deleted and the cabin will be deleted");
//   }
// }

// same function to edit and create cabin.
export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  const imageUrl = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageUrl}`;

  //1. Creating/editing the cabin and image in the cabins table as a path.
  let query = supabase.from("cabins");

  //a. only creatin ie no id
  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  //b.edit ie id is available
  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cabin could not be edited");
  }

  //2. Uploading file to the bucket
  const { error: error2 } = await supabase.storage
    .from("cabin-images")
    .upload(`${imageUrl}`, cabin.image);

  //3. If image is not uploaded we would want to delete the cabin itself which we can get hold of via data in 25 line.
  if (error2) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be deleted and the cabin will be deleted");
  }
}

export async function duplicateCabin(cabin) {
  const { error } = await supabase.from("cabins").insert([cabin]);
  if (error) {
    throw new Error("Cabin could not be duplicated" + error.message);
  }
}

//failed attempt to only edit
// export async function editCabin(cabin, id) {
//   const hasImagePath = typeof cabin.image === "string" ? true : false;
//   const { image } = cabin;

//   const imageUrl = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageUrl}`;

//   if (hasImagePath) {
//     cabin = { ...cabin, image };
//   } else {
//     cabin = { ...cabin, image: imagePath };
//   }

//   const { data, error } = await supabase
//     .from("cabins")
//     .update(cabin)
//     .eq("id", id)
//     .select()
//     .single();

//   const { error: error2 } = await supabase.storage
//     .from("cabin-images")
//     .upload(`${imageUrl}`, cabin.image);

//   if (error) {
//     throw new Error("Cabin could not be edited");
//   }
// }
