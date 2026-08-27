import { supabase } from './supabase'

export type ListItemImage = {
  id: number
  list_item_id: number
  user_id: string
  storage_path: string
  created_at: string
}

export async function uploadImage(
  listItemId: number,
  file: File
): Promise<ListItemImage> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User is not authenticated')
  }

  const fileExtension =
    file.name.split('.').pop() || 'jpg'

  const fileName =
    `${crypto.randomUUID()}.${fileExtension}`

  const storagePath =
    `${user.id}/${listItemId}/${fileName}`

  const { error: uploadError } =
    await supabase.storage
      .from('travel-images')
      .upload(storagePath, file, {
        contentType: file.type,
        upsert: false,
      })

  if (uploadError) {
    throw uploadError
  }

  const { data, error } = await supabase
    .from('list_item_images')
    .insert({
      list_item_id: listItemId,
      user_id: user.id,
      storage_path: storagePath,
    })
    .select()
    .single()

  if (error) {
    // If database insert fails, remove the uploaded file
    await supabase.storage
      .from('travel-images')
      .remove([storagePath])

    throw error
  }

  return data as ListItemImage
}

export async function uploadImages(
  listItemId: number,
  files: File[]
): Promise<ListItemImage[]> {
  const uploadedImages: ListItemImage[] = []

  for (const file of files) {
    const image = await uploadImage(
      listItemId,
      file
    )

    uploadedImages.push(image)
  }

  return uploadedImages
}

export async function getImageUrl(
  storagePath: string
): Promise<string> {
  const { data, error } =
    await supabase.storage
      .from('travel-images')
      .createSignedUrl(
        storagePath,
        60 * 60 // 60 minutes
      )

  if (error) {
    throw error
  }

  return data.signedUrl
}

export async function getImageUrls(
  images: ListItemImage[]
): Promise<
  Record<number, string>
> {
  const result: Record<number, string> = {}

  for (const image of images) {
    const url = await getImageUrl(
      image.storage_path
    )

    result[image.id] = url
  }

  return result
}

export async function getImagesForListItem(
  listItemId: number
): Promise<ListItemImage[]> {
  const { data, error } = await supabase
    .from('list_item_images')
    .select('*')
    .eq('list_item_id', listItemId)
    .order('created_at', {
      ascending: true,
    })

  if (error) {
    throw error
  }

  return data as ListItemImage[]
}

export async function deleteImage(
  image: ListItemImage
): Promise<void> {
  //Delete file from Storage
  const { error: storageError } =
    await supabase.storage
      .from('travel-images')
      .remove([image.storage_path])

  if (storageError) {
    throw storageError
  }

  //Delete database record
  const { error: databaseError } =
    await supabase
      .from('list_item_images')
      .delete()
      .eq('id', image.id)

  if (databaseError) {
    throw databaseError
  }
}